
import { Client } from "@notionhq/client";
import { markdownToBlocks } from "@tryfabric/martian";
import * as dotenv from "dotenv";
import * as fs from "fs";
import matter from "gray-matter";

dotenv.config();


const notion = new Client({
    auth: process.env.NOTION_API_KEY
});

export class NotionPageClient {
    static async createNotionPage(filePath: string) {
        const response = await notion.pages.create(this.createNotionPageBodyParameters(filePath));
        console.log(response);
    }

    private static createNotionPageBodyParameters(filePath: string) {
        return {
            parent: {
                database_id: process.env.NOTION_DATABASE_ID as string
            },
            properties: {
                Name: {
                    title: [
                        {
                            text: {
                                content: this.createPageTitle(filePath)
                            }
                        }
                    ]
                },
            },
            //children: this.createChildrenBlocks(filePath)
        }
    }

    private static createPageTitle(filePath: string): string {
        return filePath.split("/").slice(-1)[0].replace(".md", "");
    }

    private static createChildrenBlocks(filePath: string) {
        const buffer = fs.readFileSync(filePath);

        return markdownToBlocks(matter(buffer).content);
    }

}

