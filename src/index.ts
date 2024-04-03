import * as fs from "fs";
import { NotionDatabaseClient } from "./notion-database-client";
import { NotionPageClient } from "./notion-page-client";

async function handler() {
    const DIR_PATH = "./memos";

    const notionDatabaseChildPages = await NotionDatabaseClient.findNotionDatabaseChildPages();

    for (let subDirName of fs.readdirSync(DIR_PATH)) {
        for (let fileName of fs.readdirSync(`${DIR_PATH}/${subDirName}`)) {
            const filePath = `${DIR_PATH}/${subDirName}/${fileName}`;

            const existingPage = notionDatabaseChildPages.find(p => filePath.endsWith(`/${p.category}/${p.title}.md`));

            if (existingPage) {
                await NotionPageClient.deleteNotionPage(existingPage.pageId);
            }

            await NotionPageClient.createNotionPage(filePath);

        }
    }

}

handler()