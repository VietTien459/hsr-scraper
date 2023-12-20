import CheerioModule from "cheerio";

export function getAllCharactersUrls(htmlData: string | undefined): CharacterUrl[] {
    if (!htmlData) {
        throw new Error("Empty HTML string")
    }

    const $ = CheerioModule.load(htmlData)

    // Get all href attributes
    const hrefAttributes: CharacterUrl[] = [];

    $('#characters td:nth-child(2) a').each((index, element) => {
        const href = $(element).attr('href');
        if (href) {
            hrefAttributes.push({
                name: href.replaceAll("/?lang=EN","").replace("/",""),
                url: "https://hsr.honeyhunterworld.com" + href
            });
        }
    });

    console.log(hrefAttributes)
    return hrefAttributes
}

type CharacterUrl = {
    name: string,
    url: string
}

export const CharacterUrls = [
    {
        name: 'march-7th-character',
        url: 'https://hsr.honeyhunterworld.com/march-7th-character/?lang=EN'
    },
    {
        name: 'dan-heng-character',
        url: 'https://hsr.honeyhunterworld.com/dan-heng-character/?lang=EN'
    },
    {
        name: 'himeko-character',
        url: 'https://hsr.honeyhunterworld.com/himeko-character/?lang=EN'
    },
    {
        name: 'welt-character',
        url: 'https://hsr.honeyhunterworld.com/welt-character/?lang=EN'
    },
    {
        name: 'kafka-character',
        url: 'https://hsr.honeyhunterworld.com/kafka-character/?lang=EN'
    },
    {
        name: 'silver-wolf-character',
        url: 'https://hsr.honeyhunterworld.com/silver-wolf-character/?lang=EN'
    },
    {
        name: 'arlan-character',
        url: 'https://hsr.honeyhunterworld.com/arlan-character/?lang=EN'
    },
    {
        name: 'asta-character',
        url: 'https://hsr.honeyhunterworld.com/asta-character/?lang=EN'
    },
    {
        name: 'herta-character',
        url: 'https://hsr.honeyhunterworld.com/herta-character/?lang=EN'
    },
    {
        name: 'bronya-character',
        url: 'https://hsr.honeyhunterworld.com/bronya-character/?lang=EN'
    },
    {
        name: 'seele-character',
        url: 'https://hsr.honeyhunterworld.com/seele-character/?lang=EN'
    },
    {
        name: 'serval-character',
        url: 'https://hsr.honeyhunterworld.com/serval-character/?lang=EN'
    },
    {
        name: 'gepard-character',
        url: 'https://hsr.honeyhunterworld.com/gepard-character/?lang=EN'
    },
    {
        name: 'natasha-character',
        url: 'https://hsr.honeyhunterworld.com/natasha-character/?lang=EN'
    },
    {
        name: 'pela-character',
        url: 'https://hsr.honeyhunterworld.com/pela-character/?lang=EN'
    },
    {
        name: 'clara-character',
        url: 'https://hsr.honeyhunterworld.com/clara-character/?lang=EN'
    },
    {
        name: 'sampo-character',
        url: 'https://hsr.honeyhunterworld.com/sampo-character/?lang=EN'
    },
    {
        name: 'hook-character',
        url: 'https://hsr.honeyhunterworld.com/hook-character/?lang=EN'
    },
    {
        name: 'lynx-character',
        url: 'https://hsr.honeyhunterworld.com/lynx-character/?lang=EN'
    },
    {
        name: 'luka-character',
        url: 'https://hsr.honeyhunterworld.com/luka-character/?lang=EN'
    },
    {
        name: 'topaz-numby-character',
        url: 'https://hsr.honeyhunterworld.com/topaz-numby-character/?lang=EN'
    },
    {
        name: 'qingque-character',
        url: 'https://hsr.honeyhunterworld.com/qingque-character/?lang=EN'
    },
    {
        name: 'tingyun-character',
        url: 'https://hsr.honeyhunterworld.com/tingyun-character/?lang=EN'
    },
    {
        name: 'luocha-character',
        url: 'https://hsr.honeyhunterworld.com/luocha-character/?lang=EN'
    },
    {
        name: 'jing-yuan-character',
        url: 'https://hsr.honeyhunterworld.com/jing-yuan-character/?lang=EN'
    },
    {
        name: 'blade-character',
        url: 'https://hsr.honeyhunterworld.com/blade-character/?lang=EN'
    },
    {
        name: 'sushang-character',
        url: 'https://hsr.honeyhunterworld.com/sushang-character/?lang=EN'
    },
    {
        name: 'yukong-character',
        url: 'https://hsr.honeyhunterworld.com/yukong-character/?lang=EN'
    },
    {
        name: 'fu-xuan-character',
        url: 'https://hsr.honeyhunterworld.com/fu-xuan-character/?lang=EN'
    },
    {
        name: 'yanqing-character',
        url: 'https://hsr.honeyhunterworld.com/yanqing-character/?lang=EN'
    },
    {
        name: 'guinaifen-character',
        url: 'https://hsr.honeyhunterworld.com/guinaifen-character/?lang=EN'
    },
    {
        name: 'bailu-character',
        url: 'https://hsr.honeyhunterworld.com/bailu-character/?lang=EN'
    },
    {
        name: 'jingliu-character',
        url: 'https://hsr.honeyhunterworld.com/jingliu-character/?lang=EN'
    },
    {
        name: 'dan-heng-imbibitor-lunae-character',
        url: 'https://hsr.honeyhunterworld.com/dan-heng-imbibitor-lunae-character/?lang=EN'
    },
    {
        name: 'xueyi-character',
        url: 'https://hsr.honeyhunterworld.com/xueyi-character/?lang=EN'
    },
    {
        name: 'hanya-character',
        url: 'https://hsr.honeyhunterworld.com/hanya-character/?lang=EN'
    },
    {
        name: 'huohuo-character',
        url: 'https://hsr.honeyhunterworld.com/huohuo-character/?lang=EN'
    },
    {
        name: 'argenti-character',
        url: 'https://hsr.honeyhunterworld.com/argenti-character/?lang=EN'
    },
    {
        name: 'ruan-mei-character',
        url: 'https://hsr.honeyhunterworld.com/ruan-mei-character/?lang=EN'
    },
    {
        name: 'dr-ratio-character',
        url: 'https://hsr.honeyhunterworld.com/dr-ratio-character/?lang=EN'
    },
    {
        name: 'trailblazer-character',
        url: 'https://hsr.honeyhunterworld.com/trailblazer-character/?lang=EN'
    },
    {
        name: 'trailblazer-character-2',
        url: 'https://hsr.honeyhunterworld.com/trailblazer-character-2/?lang=EN'
    },
    {
        name: 'trailblazer-character-3',
        url: 'https://hsr.honeyhunterworld.com/trailblazer-character-3/?lang=EN'
    },
    {
        name: 'trailblazer-character-4',
        url: 'https://hsr.honeyhunterworld.com/trailblazer-character-4/?lang=EN'
    }
]


