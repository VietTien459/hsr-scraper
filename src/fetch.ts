import axios from 'axios';
import {existsSync, mkdirSync} from "fs";
import {readFile, writeFile} from "fs/promises";
import * as Cheerio from "cheerio";

function fetchPage(url: string): Promise<string | undefined> {
    return axios
        .get(url)
        .then(res => res.data)
        .catch(console.error);
}

export async function fetchFromWebOrCache(url: string, ignoreCache = false) {
    // If the cache folder doesn't exist, create it
    if (!existsSync('.cache')) {
        mkdirSync('.cache');
    }
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


export function extractData(htmlData: string | undefined) {
    console.log("Extracting data from HTML string")
    if (!htmlData) {
        throw new Error("Empty HTML string")
    }
    const $ = Cheerio.load(htmlData)

    console.log("Extracting character main info")
    const mainInfo = new Map<string, string>()
    $('table.main_table:first').find('tr').each((j, row) => {
        // map.set($(row).text(),)
        mainInfo.set(
            $(row).find('td:nth-last-child(2)').text(),
            $(row).find('td:last').text()
                .replaceAll(/ {2,}/g, " ")
                .replaceAll("\n", "")
        )
    });

    console.debug(mainInfo)
    const fileName = mainInfo.get('Concepts')?.toLowerCase().replace(" ", "-") || "Unknown"
    writeFile(
        `.out/${fileName}-main-info.json`,
        JSON.stringify(Object.fromEntries(mainInfo)),
        {encoding: 'utf8'},
    );

    const statInfo = new Map<string, any>()
    $('table.stat_table:first').find('tr:not(:first)').each((j, row) => {
        // map.set($(row).text(),)
        statInfo.set(
            $(row).find('td:first').text(),
            {
                atk: $(row).find('td:nth-child(2)').text(),
                def: $(row).find('td:nth-child(3)').text(),
                hp: $(row).find('td:nth-child(4)').text(),
                spd: $(row).find('td:nth-child(5)').text(),
                critRate: $(row).find('td:nth-child(6)').text(),
                critDmg: $(row).find('td:nth-child(7)').text(),
                taunt: $(row).find('td:nth-child(8)').text(),
                energy: $(row).find('td:nth-child(9)').text(),
                // ascensionMaterials: $(row).find('td:nth-child(10)').text(),

            }
        )
    });

    console.log(statInfo)


    const eidolons = new Map<string, string>()
    $('[id=char_eidolon]').find('tr:not(:first)').each((j, row) => {
        // map.set($(row).text(),)
        console.log($(row).find('tr:nth-child(2)').text())
    });



}

