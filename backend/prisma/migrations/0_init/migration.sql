-- Baseline: copied from src/db/schema.sql (the reviewed, hand-written schema).
-- Hand-written on purpose: Prisma cannot generate `create extension citext`
-- or `on delete set null (category_id)` on the composite FK in subscriptions.

create extension if not exists citext;

create table users(
    id bigint generated always as identity primary key,
    email citext not null unique,
    password_hash text not null,
    created_at timestamptz not null default now()
);

create table feeds(
    id bigint generated always  as identity primary key,
    url text not null unique,
    icon_url text,
    site_url text,
    description text,
    title text not null,
    last_fetched_at timestamptz,
    failure_count int default 0 not null,
    last_error text,
    etag text,
    last_modified text

);

create table categories(
    id bigint generated always  as identity primary key,
    user_id bigint not null  references  users(id) on delete cascade,
    title citext not null,
    position int not null,
    unique (user_id,title),
    unique (id,user_id)
);

create table entries (
    id bigint generated always as identity primary key,
    feed_id bigint not null references feeds(id) on delete cascade,
    author text,
    title text not null,
    content text,
    description text,
    published_at timestamptz not null,
    fetched_at timestamptz not null default now(),
    url text not null,
    guid text not null,
    unique (feed_id,guid)
);

create table read_entries(
    user_id bigint not null  references  users(id) on delete cascade,
    entry_id bigint not null references entries(id) on delete cascade,
    read_at timestamptz not null default now(),
    primary key (user_id,entry_id)
);

create table bookmarks(
      user_id bigint not null  references  users(id) on delete cascade,
      entry_id bigint not null references entries(id) on delete cascade,
      added_at timestamptz not null default now(),
      primary key (user_id,entry_id)
);

create table subscriptions(
    user_id bigint  not null references users(id) on delete cascade,
    feed_id bigint  not null references feeds(id) on delete cascade,
    category_id bigint,
    custom_title text,
    primary key (user_id, feed_id),
    foreign key (category_id,user_id)
                          references categories(id,user_id)
                          on delete set null (category_id)
);

create index on entries (feed_id, published_at desc);
create index on subscriptions (feed_id);
create index on read_entries (entry_id);
create index on bookmarks (entry_id);
