import {createDir, generateRandomFileName} from "./helper";
import {writeFile} from "fs/promises";
import {Ability, CharacterData, CharacterStats, Eidolon} from "./interfaces";
import CheerioModule from "cheerio";

export function extractCharacterData(htmlData: string | undefined, outputFileName?: string) {
    console.log("Extracting data from HTML string")
    if (!htmlData) {
        throw new Error("Empty HTML string")
    }
    createDir('.out')
    const fileName = `${outputFileName}` || generateRandomFileName("json")
    writeFile(
        `.out/${fileName}.json`,
        JSON.stringify({
            ...extractCharacterMainData(htmlData),
            stats: extractCharacterStats(htmlData),
            skills: extractSkills(htmlData),
            eidolons: extractEidolons(htmlData)
        }),
        {encoding: 'utf8'},
    ).finally(() =>
        console.log("Saved.")
    );
}

function extractCharacterMainData(html: string): CharacterData | null {
    const $ = CheerioModule.load(html)

    const characterData: CharacterData = {
        name: '',
        faction: '',
        rarity: 0,
        path: '',
        combatTypes: '',
        chineseName: '',
        englishName: '',
        koreanName: '',
        japaneseName: '',
        ascensionMaterials: [],
        traceMaterials: [],
        story: '',
    };

    const getCellValue = (row: cheerio.Cheerio): string => row.next().text().replace(/\s+/g, " ").trim();

    const characterTable = $('table.main_table:first')

    // Extract data from the HTML and populate the characterData object
    characterData.name = getCellValue(characterTable.find('td:contains("Concepts")'));
    characterData.faction = getCellValue(characterTable.find('td:contains("Faction")'));
    characterData.rarity = characterTable.find('td:contains("Rarity")').next().find('img').length;
    characterData.path = getCellValue(characterTable.find('td:contains("Path")'));
    characterData.combatTypes = getCellValue(characterTable.find('td:contains("Combat Types")'));
    characterData.chineseName = getCellValue(characterTable.find('td:contains("Chinese")'));
    characterData.englishName = getCellValue(characterTable.find('td:contains("English")'));
    characterData.koreanName = getCellValue(characterTable.find('td:contains("Korean")'));
    characterData.japaneseName = getCellValue(characterTable.find('td:contains("Japanese")'));

    // Extract ascension materials
    characterTable.find('td:contains("Ascension Materials")').next().find('a').each((_index, element) => {
        const materialName = $(element).find('img').attr('alt') || "";
        const materialCount = $(element).text().trim();
        characterData.ascensionMaterials.push({
            itemName: materialName,
            itemCount: materialCount
        });
    });

    // Extract trace materials
    characterTable.find('td:contains("Trace Materials")').next().find('a').each((_index, element) => {
        const materialName = $(element).find('img').attr('alt') || "";
        const materialCount = $(element).text().trim();
        characterData.traceMaterials.push({
            itemName: materialName,
            itemCount: materialCount
        });
    });

    characterData.story = characterTable.find('td:contains("Story")').next().text().replace(/\s+/g, " ").trim();

    return characterData;
}

function extractCharacterStats(html: string): CharacterStats[] {
    const $ = CheerioModule.load(html)
    const statsTable = $('table.stat_table:first')
    const characterStats: CharacterStats[] = [];

    // Extract data from the HTML and populate the characterStats array
    statsTable.find('tbody tr').each((index, row) => {
        const columns = $(row).find('td');

        const stats: CharacterStats = {
            level: columns.eq(0).text(),
            ATK: parseFloat(columns.eq(1).text()),
            DEF: parseFloat(columns.eq(2).text()),
            HP: parseFloat(columns.eq(3).text()),
            SPD: parseInt(columns.eq(4).text(), 10),
            CRITRate: columns.eq(5).text(),
            CRITDMG: columns.eq(6).text(),
            Taunt: parseInt(columns.eq(7).text(), 10),
            Energy: parseInt(columns.eq(8).text(), 10),
            ascensionMaterials: [],
        };

        // Extract ascension materials
        columns.eq(9).find('a').each((_index, element) => {
            const materialName = $(element).find('img').attr('alt') || "";
            const materialCount = $(element).text().trim();
            stats.ascensionMaterials.push({
                itemName: materialName,
                itemCount: materialCount,
            });
        });

        characterStats.push(stats);
    });

    return characterStats;
}

function extractSkills(html: string) {
    const $ = CheerioModule.load(html)

    return $('#char_skills > table.skill_table').map(((_index, element) => {
        const skill: Ability = {} as Ability
        skill.name = $(element).find('tr:first a').text().replace(/\s+/g, " ").trim()

        const erMatch = $(element).find('td:contains(Energy Regeneration)').text().trim().match(/\d+/)
        skill.energyRegeneration = erMatch ? parseInt(erMatch[0], 10) : 0;

        skill.weaknessBreak = $(element).find('td:contains(Weakness Break \\:)').text().trim()

        skill.description = $(element).find('td.level_slider_desc i').text().replace(/\s+/g, " ").trim()

        return skill
    })).get()
}

function extractEidolons(html: string) {
    const $ = CheerioModule.load(html)

    return $('#char_eidolon > table.skill_table').map(((index, element) => {
        const eidolon: Eidolon = {} as Eidolon

        eidolon.level = index + 1

        eidolon.name = $(element).find('tr:first a').text().replace(/\s+/g, " ").trim()

        eidolon.description = $(element).find('tr:last').text().replace(/\s+/g, " ").trim()

        return eidolon
    })).get()
}
