import CheerioModule from "cheerio";
import {readFileSync} from "fs"
import {writeFile} from "fs/promises";
import puppeteer from 'puppeteer';
import {createDir} from "./helper";


export async function getUrlData(url: string, filePath: string): Promise<void> {
    const browser = await puppeteer.launch({headless: "new"});
    const page = await browser.newPage();

    createDir('.out')

    try {
        await page.goto(url);
        await page.select('.sorttable_per_page', '100');

        const htmlData = await page.content();

        const urlData = getUrls(htmlData);

        writeFile(
            `.out/${filePath}.json`,
            JSON.stringify(urlData, null, 2),
            {encoding: 'utf8'},
        );
    } finally {
        await browser.close();
    }
}

function getUrls(htmlData: string | undefined): UrlData[] {
    if (!htmlData) {
        throw new Error("Empty HTML string")
    }

    const $ = CheerioModule.load(htmlData)

    // Get all href attributes
    const hrefAttributes: UrlData[] = [];

    $('td:nth-child(2) a').each((index, element) => {
        const href = $(element).attr('href');
        if (href) {
            hrefAttributes.push({
                name: href.replaceAll("/?lang=EN", "").replace("/", ""),
                url: "https://hsr.honeyhunterworld.com" + href
            });
        }
    });

    return hrefAttributes
}

type UrlData = {
    name: string,
    url: string
}

function loadUrlsFromFile(filePath: string): UrlData[] {
    try {
        return JSON.parse(readFileSync(filePath, 'utf-8'));
    } catch (error) {
        // Handle the case where the file does not exist or cannot be parsed
        console.error(`Error reading or parsing the file '${filePath}'`);
        return []; // Provide a default value or handle it according to your needs
    }
}

export const CharacterUrls: UrlData[] = loadUrlsFromFile('.out/characters.json');
export const LightConeUrls: UrlData[] = loadUrlsFromFile('.out/light-cones.json');
export const RelicUrls: UrlData[] = loadUrlsFromFile('.out/relics.json');






