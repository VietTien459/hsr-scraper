import {LightConeData, LightConeStats} from "../interfaces";
import CheerioModule from "cheerio";
import {createDir, generateRandomFileName} from "../helper";
import {writeFile} from "fs/promises";


export function extractLightConeData(htmlData: string | undefined, outputFileName?: string) {
    console.log("Extracting data from HTML string")
    if (!htmlData) {
        throw new Error("Empty HTML string")
    }
    createDir('.out/lightcones')
    const fileName = outputFileName || generateRandomFileName("json")
    writeFile(
        `.out/lightcones/${fileName}.json`,
        JSON.stringify({
            ...extractLightConeMainData(htmlData),
            stats: extractLightConeStats(htmlData),

        }),
        {encoding: 'utf8'},
    ).finally(() =>
        console.log("Saved.")
    );
}

function extractLightConeMainData(html: string): LightConeData | null {
    const $ = CheerioModule.load(html)

    const lightConeData: LightConeData = {
        name: '',
        rarity: 0,
        path: '',
        skill: '',
        ascensionMaterials: [],
        story: '',
    };

    const getCellValue = (row: cheerio.Cheerio): string => row.next().text().replace(/\s+/g, " ").trim();

    const characterTable = $('table.main_table:first')

    // Extract data from the HTML and populate the characterData object
    lightConeData.name = getCellValue(characterTable.find('td:contains("Concepts")'));
    lightConeData.rarity = characterTable.find('td:contains("Rarity")').next().find('img').length;
    lightConeData.path = getCellValue(characterTable.find('td:contains("Path")'));
    lightConeData.skill = getCellValue(characterTable.find('td:contains("Skill")'));
    lightConeData.story = getCellValue(characterTable.find('td:contains("Story")'));


    // Extract ascension materials
    characterTable.find('td:contains("Ascension Materials")').next().find('a').each((_index, element) => {
        const materialName = $(element).find('img').attr('alt') || "";
        const materialCount = $(element).text().trim();
        lightConeData.ascensionMaterials.push({
            itemName: materialName,
            itemCount: materialCount
        });
    });


    lightConeData.story = characterTable.find('td:contains("Story")').next().text().replace(/\s+/g, " ").trim();

    return lightConeData;
}


function extractLightConeStats(html: string): LightConeStats[] {
    const $ = CheerioModule.load(html)
    const statsTable = $('table.stat_table:first')
    const lightConeStats: LightConeStats[] = []

    // Extract data from the HTML and populate the stats array
    statsTable.find('tbody tr').each((index, row) => {
        const columns = $(row).find('td');

        const stats: LightConeStats = {
            level: columns.eq(0).text(),
            ATK: parseFloat(columns.eq(1).text()),
            DEF: parseFloat(columns.eq(2).text()),
            HP: parseFloat(columns.eq(3).text()),
            ascensionMaterials: [],
        };

        // Extract ascension materials
        columns.eq(4).find('a').each((_index, element) => {
            const materialName = $(element).find('img').attr('alt') || "";
            const materialCount = $(element).text().trim();
            stats.ascensionMaterials?.push({
                itemName: materialName,
                itemCount: materialCount,
            });
        });

        lightConeStats.push(stats);
    });

    return lightConeStats;
}
