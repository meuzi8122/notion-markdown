

import type { BlockObjectRequest } from "@notionhq/client/build/src/api-endpoints";
import { markdownToBlocks } from "@tryfabric/martian";
import * as fs from "fs";
import matter from "gray-matter";
import { notion } from "./notion";


export class NotionPageClient {
    static async createNotionPage(filePath: string) {
        await notion.pages.create(this.createNotionPageBodyParameters(filePath));
    }

    static async deleteNotionPage(pageId: string) {
        await notion.blocks.delete({
            block_id: pageId
        });
    }

    private static createNotionPageBodyParameters(filePath: string) {
        const filePathElements = filePath.split("/");
        const category = filePathElements[2];
        const fileName = filePathElements[3].replace(".md", "");

        return {
            parent: {
                database_id: process.env.NOTION_DATABASE_ID as string
            },
            properties: {
                /* DBのNameカラム */
                Name: {
                    title: [
                        {
                            text: {
                                content: fileName
                            }
                        }
                    ]
                },
                /* DBのCategoryカラム */
                Category: {
                    select: {
                        name: category
                    }
                }
            },
            children: this.createChildrenBlocks(filePath) as BlockObjectRequest[]
        }
    }

    private static createChildrenBlocks(filePath: string) {
        const buffer = fs.readFileSync(filePath);

        return markdownToBlocks(matter(buffer).content);
    }

}

