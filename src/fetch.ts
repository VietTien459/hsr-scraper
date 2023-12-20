import axios from 'axios';
import {readFile, writeFile} from "fs/promises";
import {createDir} from "./helper";
import {existsSync} from "fs";

function fetchPage(url: string): Promise<string | undefined> {
    return axios
        .get(url)
        .then(res => res.data)
        .catch(error => {
            throw new Error(`Failed to fetch page: ${error.message}`);
        });
}

export async function fetchFromWebOrCache(url: string, ignoreCache = false) {
    // If the cache folder doesn't exist, create it
    createDir(".cache")
    console.log(`Getting data for ${url}...`);
    if (
        !ignoreCache &&
        existsSync(
            `.cache/${Buffer.from(url).toString('base64')}.html`
        )
    ) {
        console.log(`Reading ${url} data from cache`);
        return await readFile(
            `.cache/${Buffer.from(url).toString('base64')}.html`,
            {encoding: 'utf8'},
        )
    } else {
        console.log(`Fetching ${url} `);
        const htmlData = await fetchPage(url);
        if (!ignoreCache && htmlData) {
            await writeFile(
                `.cache/${Buffer.from(url).toString('base64')}.html`,
                htmlData,
                {encoding: 'utf8'},
            );
        }
        return htmlData
    }
}

