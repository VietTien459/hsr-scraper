import {RelicData, RelicSlot} from "../interfaces";
import CheerioModule from "cheerio";
import {createDir, generateRandomFileName} from "../helper";
import {writeFile} from "fs/promises";


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
    ).finally(() =>
        console.log("Saved.")
    );
}

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
