import * as fs from "fs";
import { NotionPageClient } from "./notion-page-client";

const DIR_PATH = "./memos";

for (let subDirName of fs.readdirSync(DIR_PATH)) {
    for (let fileName of fs.readdirSync(`${DIR_PATH}/${subDirName}`)) {
        NotionPageClient.createNotionPage(`${DIR_PATH}/${subDirName}/${fileName}`);
    }
}

