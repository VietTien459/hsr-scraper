import {createDir, generateRandomFileName} from "../helper";
import {writeFile} from "fs/promises";
import {Ability, CharacterData, CharacterStats, Eidolon} from "../interfaces";
import CheerioModule from "cheerio";

/**
 * Extracts character data from the provided HTML string and saves it to a JSON file.
 *
 * @param {string | undefined} htmlData - The HTML string containing character data.
 * @param {string} [outputFileName] - The desired output file name (without extension). If not provided, a random name will be generated.
 *
 * @throws {Error} Throws an error if the HTML string is empty.
 *
 * @example
 * const htmlData = '<html>...</html>';
 * const outputFileName = 'character_data';
 * extractCharacterData(htmlData, outputFileName);
 *
 * // Output: Saved. (JSON file with character data is saved in the ".out" directory)
 */
export function extractCharacterData(htmlData: string | undefined, outputFileName?: string) {
    console.log("Extracting data from HTML string")
    if (!htmlData) {
        throw new Error("Empty HTML string")
    }
    createDir('.out/characters')
    const fileName = outputFileName || generateRandomFileName("json")
    writeFile(
        `.out/characters/${fileName}.json`,
        JSON.stringify({
            ...extractCharacterMainData(htmlData),
            stats: extractCharacterStats(htmlData),
            skills: extractSkills(htmlData),
            eidolons: extractEidolons(htmlData)
        }),
        {encoding: 'utf8'},
    ).then()
}


/**
 * Extracts main character data from the provided HTML string.
 *
 * @param {string} html - The HTML string containing character data.
 * @returns {CharacterData | null} The character data object or null if extraction fails.
 *
 * @typedef {object} CharacterData - Object representing main character data.
 * @property {string} name - The name of the character.
 * @property {string} faction - The faction to which the character belongs.
 * @property {number} rarity - The rarity level of the character.
 * @property {string} path - The path of the character.
 * @property {string} combatTypes - The combat types of the character.
 * @property {string} chineseName - The Chinese name of the voice actor.
 * @property {string} englishName - The English name of the voice actor.
 * @property {string} koreanName - The Korean name of the voice actor.
 * @property {string} japaneseName - The Japanese name of the voice actor.
 * @property {Material[]} ascensionMaterials - An array of ascension materials required for the character.
 * @property {Material[]} traceMaterials - An array of trace materials required for the character.
 * @property {string} story - The story of the character.
 *
 * @typedef {object} Material - Object representing an ascension or trace material.
 * @property {string} itemName - The name of the material.
 * @property {string} itemCount - The count of the material.
 *
 * @example
 * const html = '<html>...</html>';
 * const characterData = extractCharacterMainData(html);
 * console.log(characterData);
 *
 * // Output:
 * // {
 * //   name: 'CharacterName',
 * //   faction: 'FactionName',
 * //   rarity: 5,
 * //   path: 'CharacterPath',
 * //   combatTypes: 'Sword, Bow',
 * //   chineseName: '中文名',
 * //   englishName: 'EnglishName',
 * //   koreanName: '한국어 이름',
 * //   japaneseName: '日本語名',
 * //   ascensionMaterials: [{ itemName: 'Material1', itemCount: '10' }, ...],
 * //   traceMaterials: [{ itemName: 'Material2', itemCount: '15' }, ...],
 * //   story: 'CharacterStoryText'
 * // }
 */
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


/**
 * Extracts character stats data from the provided HTML string.
 *
 * @param {string} html - The HTML string containing character stats data.
 * @returns {CharacterStats[]} An array of character stats objects.
 *
 * @typedef {object} CharacterStats - Object representing character statistics.
 * @property {string} level - The level of the character.
 * @property {number} ATK - The attack stat of the character.
 * @property {number} DEF - The defense stat of the character.
 * @property {number} HP - The health points (HP) stat of the character.
 * @property {number} SPD - The speed stat of the character.
 * @property {string} CRITRate - The critical hit rate stat of the character.
 * @property {string} CRITDMG - The critical hit damage stat of the character.
 * @property {number} Taunt - The taunt stat of the character.
 * @property {number} Energy - The energy stat of the character.
 * @property {Material[]} ascensionMaterials - An array of ascension materials required for the character.
 *
 * @typedef {object} Material - Object representing an ascension material.
 * @property {string} itemName - The name of the ascension material.
 * @property {string} itemCount - The count of the ascension material.
 *
 * @example
 * const html = '<html>...</html>';
 * const characterStats = extractCharacterStats(html);
 * console.log(characterStats);
 *
 * // Output:
 * // [
 * //   { level: '1', ATK: 100, DEF: 50, HP: 500, SPD: 20, CRITRate: '10%', CRITDMG: '50%', Taunt: 5, Energy: 100, ascensionMaterials: [{ itemName: 'Material1', itemCount: '10' }, ...] },
 * //   { level: '2', ATK: 120, DEF: 60, HP: 600, SPD: 25, CRITRate: '12%', CRITDMG: '60%', Taunt: 7, Energy: 120, ascensionMaterials: [{ itemName: 'Material2', itemCount: '15' }, ...] },
 * //   ...
 * // ]
 */
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


/**
 * Extracts skill data from the provided HTML string.
 *
 * @param {string} html - The HTML string containing skill data.
 * @returns {Ability[]} An array of skill objects.
 *
 * @typedef {object} Ability - Object representing a character skill.
 * @property {string} name - The name of the skill.
 * @property {number} energyRegeneration - The energy regeneration rate of the skill.
 * @property {string} weaknessBreak - The weakness break information of the skill.
 * @property {string} description - The description of the skill.
 *
 * @example
 * const html = '<html>...</html>';
 * const skills = extractSkills(html);
 * console.log(skills);
 *
 * // Output:
 * // [
 * //   { name: 'Skill1', energyRegeneration: 10, weaknessBreak: 'Break Info', description: 'Description1' },
 * //   { name: 'Skill2', energyRegeneration: 0, weaknessBreak: 'No Break Info', description: 'Description2' },
 * //   ...
 * // ]
 */
function extractSkills(html: string): Ability[] {
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


/**
 * Extracts eidolon data from the provided HTML string.
 *
 * @param {string} html - The HTML string containing eidolon data.
 * @returns {Eidolon[]} An array of eidolon objects.
 *
 * @typedef {object} Eidolon - Object representing an eidolon.
 * @property {number} level - The level of the eidolon.
 * @property {string} name - The name of the eidolon.
 * @property {string} description - The description of the eidolon.
 *
 * @throws {Error} Throws an error if the HTML string is empty.
 *
 * @example
 * const html = '<html>...</html>';
 * const eidolons = extractEidolons(html);
 * console.log(eidolons);
 *
 * // Output:
 * // [
 * //   { level: 1, name: 'Eidolon1', description: 'Description1' },
 * //   { level: 2, name: 'Eidolon2', description: 'Description2' },
 * //   ...
 * // ]
 */
function extractEidolons(html: string): Eidolon[] {
    const $ = CheerioModule.load(html)

    return $('#char_eidolon > table.skill_table').map(((index, element) => {
        const eidolon: Eidolon = {} as Eidolon

        eidolon.level = index + 1

        eidolon.name = $(element).find('tr:first a').text().replace(/\s+/g, " ").trim()

        eidolon.description = $(element).find('tr:last').text().replace(/\s+/g, " ").trim()

        return eidolon
    })).get()
}
