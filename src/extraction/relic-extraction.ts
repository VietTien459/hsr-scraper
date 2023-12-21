import {RelicData, RelicSlot} from "../interfaces";
import CheerioModule from "cheerio";
import {createDir, generateRandomFileName} from "../helper";
import {writeFile} from "fs/promises";

/**
 * Extracts relic data from an HTML string and saves it to a JSON file.
 *
 * @param {string | undefined} htmlData - The HTML string containing relic data.
 * @param {string} [outputFileName] - The name of the output JSON file. If not provided, a random filename will be generated.
 * @throws Will throw an error if the HTML string is empty.
 */
export function extractRelicData(htmlData: string | undefined, outputFileName?: string) {
    if (!htmlData) {
        throw new Error("Empty HTML string")
    }
    createDir('.out/relics')
    const fileName = outputFileName || generateRandomFileName("json")
    extractRelicSlots(htmlData)
    writeFile(
        `.out/relics/${fileName}.json`,
        JSON.stringify({
            ...extractRelicMainData(htmlData),
            slots: extractRelicSlots(htmlData)
        }),
        {encoding: 'utf8'},
    ).then()
}

/**
 * Extracts main relic data from an HTML string.
 *
 * @param {string} html - The HTML string containing relic data.
 * @returns {RelicData | null} An object representing the main relic data or null if data extraction fails.
 */
function extractRelicMainData(html: string): RelicData | null {
    const $ = CheerioModule.load(html)

    const relicData: RelicData = {
        name: '',
        effect: ''
    };

    const getCellValue = (row: cheerio.Cheerio): string => row.next().text().replace(/\s+/g, " ").trim();

    const mainTable = $('table.main_table:first')

    relicData.name = getCellValue(mainTable.find('td:contains("Concepts")'));
    relicData.effect = getCellValue(mainTable.find('td:contains("Effect")'));

    return relicData;
}

const SlotIds = [
    '#head_piece_ids',
    '#hand_piece_ids',
    '#body_piece_ids',
    '#foot_piece_ids',
    '#neck_piece_ids',
    '#object_piece_ids',
]

/**
 * Extracts relic slot data from an HTML string.
 *
 * @param {string} html - The HTML string containing relic data.
 * @returns {RelicSlot[]} An array of objects representing relic slot data.
 */
function extractRelicSlots(html: string): RelicSlot[] {
    const $ = CheerioModule.load(html)
    const storyTable = $('#story_hash')
    const relicSlots: RelicSlot[] = []

    SlotIds.forEach((id) => {
        const slotTable = storyTable.find(id)
        const slotName = slotTable.find('span h3').text()
        if (slotName.length !== 0) {
            relicSlots.push({
                name: $('table.main_table:first').find(`td:contains(${slotName})`).next().text(),
                story: slotTable.find('table').text(),
                slot: slotName
            })
        }

    })

    return relicSlots;
}
