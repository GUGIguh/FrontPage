import {prisma} from "../src/db/prisma.js";

import data from '../../data/sample-feeds.json' with { type: 'json' }

async function main(){
    const user = await prisma.user.upsert({
        where: {email: "testUser@mail.ru"},
        update: {},
        create: {
            email: "testUser@mail.ru",
            passwordHash: "password",
        },
    })

     for( const [index,curCategory] of data.categories.entries() ) {
        const  category =  await prisma.category.upsert({
            where: {userId_title: {userId: user.id, title: curCategory.name}},
            update: {},
            create: {
                userId: user.id,
                title: curCategory.name,
                position: index,
            }
        })
         for (const curFeed of curCategory.feeds) {
               const feed = await prisma.feed.upsert({
                 where: {url: curFeed.feedUrl,},
                 update: {},
                 create: {
                     url: curFeed.feedUrl,
                     title: curFeed.title,
                     siteUrl: curFeed.siteUrl,
                     description: curFeed.description,
                 },
             });

                 await prisma.subscription.upsert({
                     where:{ userId_feedId:{ userId: user.id , feedId: feed.id}},
                     update:{},
                     create:{
                         userId: user.id,
                         feedId: feed.id,
                         categoryId: category.id,
                     },
                 })



         }
     }



}

main()
    .catch((e) => { console.error(e); process.exitCode = 1 })
    .finally(() => prisma.$disconnect())