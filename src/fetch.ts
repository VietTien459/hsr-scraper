import axios from 'axios';
import { existsSync, mkdirSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import * as CheerioModule from "cheerio";
import { ISkill, IStats, IWeaknessBreak } from "./skill.interface";
import { Skill, Target } from "./enums";

import { CharacterData, CharacterStats, Ability, AscensionMaterial, Ascension } from './interfaces';
import { log } from 'console';


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
            { encoding: 'utf8' },
        )
    } else {
        console.log(`Fetching ${url} `);
        const htmlData = await fetchPage(url);
        if (!ignoreCache && htmlData) {
            await writeFile(
                `.cache/${Buffer.from(url).toString('base64')}.html`,
                htmlData,
                { encoding: 'utf8' },
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
    const $ = CheerioModule.load(htmlData)

    console.log(extractBasicAtk(htmlData))


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

    mainInfo.delete("Ascension Materials")
    mainInfo.delete("Trace Materials")

    const fileName = mainInfo.get('Concepts')?.toLowerCase().replace(" ", "-") || "Unknown"
    writeFile(
        `.out/${fileName}-main-info.json`,
        JSON.stringify(Object.fromEntries(mainInfo)),
        { encoding: 'utf8' },
    ).finally(() =>
        console.log("Saved Main Info")
    );
    console.log("Extracting character stats info")

    const statInfo = new Map<string, any>()
    $('table.stat_table:first').find('tr:not(:first)').each((j, row) => {
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
            }
        )
    });

    writeFile(
        `.out/${fileName}-stat-info.json`,
        JSON.stringify(Object.fromEntries(statInfo)),
        { encoding: 'utf8' },
    ).finally(() =>
        console.log("Saved Stat Info")
    );

    console.log("Extracting character eidolons info")

    const eidolons = new Map<string, any>()
    $('[id=char_eidolon]').find('table.skill_table').each((j, row) => {
        // map.set($(row).text(),)
        eidolons.set((j + 1).toString(), {
            name: $(row).find('td:nth-child(2)').text(),
            text: $(row).find('td:last').text()
                .replaceAll(/ {2,}/g, " ")
                .replaceAll("\n", "")
        })
    });

    writeFile(
        `.out/${fileName}-eidolon-info.json`,
        JSON.stringify(Object.fromEntries(eidolons)),
        { encoding: 'utf8' },
    ).finally(() =>
        console.log("Saved Eidolons Info")
    );
    console.log("Extracting character Skill info")

    const basic: ISkill = <ISkill>{}

    const skill: ISkill = <ISkill>{}

    const basicReg = /(.*) - (.*) \| (.*)/
    const erReg = /Energy Regeneration : (\d*)/
    const breakReg = /Weakness Break : (.*) : (\d*)/

    const charSkillsTable = $('[id=char_skills]').children();


    charSkillsTable.filter('table.skill_table:contains(Basic ATK)').each((_index, row) => {
        const firstRow = $(row).find('tr:first').find('td:nth-child(2)').text().replace("\n", "")
        basic.name = basicReg.exec(firstRow)?.[1] || ""
        basic.type = basicReg.exec(firstRow)?.[2] as Skill
        basic.target = basicReg.exec(firstRow)?.[3] as Target
        basic.energyRegeneration = +(erReg.exec($(row).find('tr:nth-child(2)').text())?.[1] || NaN)
        basic.weaknessBreak = <IWeaknessBreak>{}
        basic.weaknessBreak.target = breakReg.exec($(row).find('tr:nth-child(3)').text())?.[1] as Target
        basic.weaknessBreak.value = +(breakReg.exec($(row).find('tr:nth-child(3)').text())?.[2] || NaN)
        basic.description = $(row).find('tr:nth-child(4)').find('i').text()
            .replaceAll(/ {2,}/g, " ")
            .replaceAll("\n", "")
        basic.stats = <IStats>{}
        basic.stats.format = $(row).find('tr:nth-child(4)').find('td:first').html()!
            .replaceAll(/ {2,}/g, " ")
            .replaceAll("\n", "")
            .replace(/<br><br><i>.*/, "")
            .replaceAll(/<font.*data="(.)".*<\/font>/g, "<span id='{$1}'></span>")
    });

    charSkillsTable.filter('table.skill_table:contains(Skill)').each((_index, row) => {
        const firstRow = $(row).find('tr:first').find('td:nth-child(2)').text().replaceAll(/ {2,}/g, " ").replaceAll("\n", "")

        console.log(firstRow)
        skill.name = basicReg.exec(firstRow)?.[1] || ""
        skill.type = basicReg.exec(firstRow)?.[2] as Skill
        skill.target = basicReg.exec(firstRow)?.[3] as Target
        skill.energyRegeneration = +(erReg.exec($(row).find('tr:nth-child(2)').text())?.[1] || NaN)
        skill.weaknessBreak = <IWeaknessBreak>{}
        skill.weaknessBreak.target = breakReg.exec($(row).find('tr:nth-child(3)').text())?.[1] as Target
        skill.weaknessBreak.value = +(breakReg.exec($(row).find('tr:nth-child(3)').text())?.[2] || NaN)
        skill.description = $(row).find('tr:nth-child(4)').find('i').text()
            .replaceAll(/ {2,}/g, " ")
            .replaceAll("\n", "")
        skill.stats = <IStats>{}
        skill.stats.format = $(row).find('tr:nth-child(4)').find('td:first').html()!
            .replaceAll(/ {2,}/g, " ")
            .replaceAll("\n", "")
            .replace(/<br><br><i>.*/, "")
            .replaceAll(/<font.*data="(.)".*<\/font>/g, "<span id='{$1}'></span>")
    });

    console.log(skill)
}


function extractCharacterData(html: string): CharacterData | null {
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

    const getCellValue = (row: cheerio.Cheerio): string => row.next().text().trim();

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

    characterData.story = characterTable.find('td:contains("Story")').next().html()?.trim() || '';

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

function extractBasicAtk(html: string) {
    const $ = CheerioModule.load(html)
    const skills: Ability[] = [];
    const skillTable = $('table.skill_table:contains(Basic ATK |)')


    skillTable.each((index, table) => {
        console.log(index);
        
        const skill: Ability = {} as Ability;
        skill.name = $(table).find('td:contains(Basic ATK) a').text().trim();
        skill.type = $(table).find('td:contains(Basic ATK)').text().trim();

        const details: string[] = [];
        $(table).find('td.level_slider_desc').each((i, detail) => {
            details.push($(detail).text().trim());
        });
        // skill.energyRegeneration = parseInt(details[0].split(':')[1].trim(), 10);
        // skill.weaknessBreak = details[1].split(':')[1].trim();

        const damageDescription = details[2];
        skill.damageDescription = `Deals Quantum DMG equal to ${damageDescription} of Fu Xuan's Max HP to a single enemy. Deals minor Quantum DMG to a single enemy.`;

        skill.level = {
            min: 1,
            max: 9,
            current: parseInt($(table).find('input').attr('value') || '', 10),
        };

        const ascensionMaterials: Ascension[] = [];
        $(table).find('.genshin_table.skill_dmg_table tr:gt(0)').each((i, row) => {
            const columns = $(row).find('td');
            const level = parseInt(columns.eq(0).text().trim(), 10);
            const percentage = columns.eq(1).text().trim();
            const materials: AscensionMaterial[] = [];
            columns.eq(2).find('a').each((j, material) => {
                const materialName = $(material).find('img').attr('alt') || '';
                const quantity = $(material).find('span').text().trim();
                materials.push({ itemName: materialName, itemCount: quantity });
            });
            ascensionMaterials.push({ level: level, percentage: percentage, ascensionMaterials: materials });
        });

        skill.ascensions = ascensionMaterials;
        skills.push(skill);
    });

    return { skills: skills };
}