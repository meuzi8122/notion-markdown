import * as fs from "fs";
import { NotionPageClient } from "./notion-page-client";

const DIR_PATH = "./markdown";

for (let fileName of fs.readdirSync(DIR_PATH)) {
    NotionPageClient.createNotionPage(`${DIR_PATH}/${fileName}`);
}

