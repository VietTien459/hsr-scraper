import axios from 'axios';
import {existsSync, mkdirSync} from "fs";
import {readFile, writeFile} from "fs/promises";
import * as Cheerio from "cheerio";
import {ISkill, IStats, IWeaknessBreak} from "./skill.interface";
import {Skill, Target} from "./enums";

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

    mainInfo.delete("Ascension Materials")
    mainInfo.delete("Trace Materials")

    const fileName = mainInfo.get('Concepts')?.toLowerCase().replace(" ", "-") || "Unknown"
    writeFile(
        `.out/${fileName}-main-info.json`,
        JSON.stringify(Object.fromEntries(mainInfo)),
        {encoding: 'utf8'},
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
        {encoding: 'utf8'},
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
        {encoding: 'utf8'},
    ).finally(() =>
        console.log("Saved Eidolons Info")
    );
    console.log("Extracting character Skill info")

    const basic: ISkill = <ISkill>{}
    const basicReg = /(.*) - (.*) \| (.*)\n/
    const erReg = /Energy Regeneration : (\d*)/
    const breakReg = /Weakness Break : (.*) : (\d*)/

    $('[id=char_skills]').children().filter('table.skill_table:contains(Basic ATK)').each((_index, row) => {
        const firstRow = $(row).find('tr:first').find('td:nth-child(2)').text()
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
            .replaceAll(/<font.*data="(.)".*<\/font>/g, "{$1}")

    });

    console.log(basic)

}



