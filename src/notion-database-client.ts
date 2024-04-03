import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { notion } from "./notion";


export type NotionDatabaseChildPage = {
    pageId: string;
    title: string;
    category: string;
}


export class NotionDatabaseClient {
    static async findNotionDatabaseChildPages(): Promise<NotionDatabaseChildPage[]> {
        const response = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE_ID as string
        });

        let notionDatabaseChildPages: NotionDatabaseChildPage[] = [];

        for (const _result of response.results) {
            const result = _result as PageObjectResponse;
            const pageId = result.id;

            if (result.properties["Name"].type != "title" || result.properties["Name"].title[0].type != "text") {
                continue;
            }

            if (result.properties["Category"].type != "select" || result.properties["Category"].select == null) {
                continue;
            }

            notionDatabaseChildPages.push({
                pageId,
                title: result.properties["Name"].title[0].text.content,
                category: result.properties["Category"].select.name
            });

        }

        return notionDatabaseChildPages;
    }
}