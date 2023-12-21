import CheerioModule from "cheerio";


export function getAllCharactersUrls(htmlData: string | undefined): UrlData[] {
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

    console.log(hrefAttributes)
    return hrefAttributes
}

type UrlData = {
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

export const LightConeUrls = [
    {
        name: 'arrows-item',
        url: 'https://hsr.honeyhunterworld.com/arrows-item/?lang=EN'
    },
    {
        name: 'cornucopia-item',
        url: 'https://hsr.honeyhunterworld.com/cornucopia-item/?lang=EN'
    },
    {
        name: 'collapsing-sky-item',
        url: 'https://hsr.honeyhunterworld.com/collapsing-sky-item/?lang=EN'
    },
    {
        name: 'amber-item',
        url: 'https://hsr.honeyhunterworld.com/amber-item/?lang=EN'
    },
    {
        name: 'void-item',
        url: 'https://hsr.honeyhunterworld.com/void-item/?lang=EN'
    },
    {
        name: 'chorus-item',
        url: 'https://hsr.honeyhunterworld.com/chorus-item/?lang=EN'
    },
    {
        name: 'data-bank-item',
        url: 'https://hsr.honeyhunterworld.com/data-bank-item/?lang=EN'
    },
    {
        name: 'darting-arrow-item',
        url: 'https://hsr.honeyhunterworld.com/darting-arrow-item/?lang=EN'
    },
    {
        name: 'fine-fruit-item',
        url: 'https://hsr.honeyhunterworld.com/fine-fruit-item/?lang=EN'
    },
    {
        name: 'shattered-home-item',
        url: 'https://hsr.honeyhunterworld.com/shattered-home-item/?lang=EN'
    },
    {
        name: 'defense-item',
        url: 'https://hsr.honeyhunterworld.com/defense-item/?lang=EN'
    },
    {
        name: 'loop-item',
        url: 'https://hsr.honeyhunterworld.com/loop-item/?lang=EN'
    },
    {
        name: 'meshing-cogs-item',
        url: 'https://hsr.honeyhunterworld.com/meshing-cogs-item/?lang=EN'
    },
    {
        name: 'passkey-item',
        url: 'https://hsr.honeyhunterworld.com/passkey-item/?lang=EN'
    },
    {
        name: 'adversarial-item',
        url: 'https://hsr.honeyhunterworld.com/adversarial-item/?lang=EN'
    },
    {
        name: 'multiplication-item',
        url: 'https://hsr.honeyhunterworld.com/multiplication-item/?lang=EN'
    },
    {
        name: 'mutual-demise-item',
        url: 'https://hsr.honeyhunterworld.com/mutual-demise-item/?lang=EN'
    },
    {
        name: 'pioneering-item',
        url: 'https://hsr.honeyhunterworld.com/pioneering-item/?lang=EN'
    },
    {
        name: 'hidden-shadow-item',
        url: 'https://hsr.honeyhunterworld.com/hidden-shadow-item/?lang=EN'
    },
    {
        name: 'mediation-item',
        url: 'https://hsr.honeyhunterworld.com/mediation-item/?lang=EN'
    },
    {
        name: 'sagacity-item',
        url: 'https://hsr.honeyhunterworld.com/sagacity-item/?lang=EN'
    },
    {
        name: 'post-op-conversation-item',
        url: 'https://hsr.honeyhunterworld.com/post-op-conversation-item/?lang=EN'
    },
    {
        name: 'good-night-and-sleep-well-item',
        url: 'https://hsr.honeyhunterworld.com/good-night-and-sleep-well-item/?lang=EN'
    },
    {
        name: 'day-one-of-my-new-life-item',
        url: 'https://hsr.honeyhunterworld.com/day-one-of-my-new-life-item/?lang=EN'
    },
    {
        name: 'only-silence-remains-item',
        url: 'https://hsr.honeyhunterworld.com/only-silence-remains-item/?lang=EN'
    },
    {
        name: 'memories-of-the-past-item',
        url: 'https://hsr.honeyhunterworld.com/memories-of-the-past-item/?lang=EN'
    },
    {
        name: 'the-moles-welcome-you-item',
        url: 'https://hsr.honeyhunterworld.com/the-moles-welcome-you-item/?lang=EN'
    },
    {
        name: 'the-birth-of-the-self-item',
        url: 'https://hsr.honeyhunterworld.com/the-birth-of-the-self-item/?lang=EN'
    },
    {
        name: 'eyes-of-the-prey-item',
        url: 'https://hsr.honeyhunterworld.com/eyes-of-the-prey-item/?lang=EN'
    },
    {
        name: 'landaus-choice-item',
        url: 'https://hsr.honeyhunterworld.com/landaus-choice-item/?lang=EN'
    },
    {
        name: 'swordplay-item',
        url: 'https://hsr.honeyhunterworld.com/swordplay-item/?lang=EN'
    },
    {
        name: 'planetary-rendezvous-item',
        url: 'https://hsr.honeyhunterworld.com/planetary-rendezvous-item/?lang=EN'
    },
    {
        name: 'a-secret-vow-item',
        url: 'https://hsr.honeyhunterworld.com/a-secret-vow-item/?lang=EN'
    },
    {
        name: 'make-the-world-clamor-item',
        url: 'https://hsr.honeyhunterworld.com/make-the-world-clamor-item/?lang=EN'
    },
    {
        name: 'perfect-timing-item',
        url: 'https://hsr.honeyhunterworld.com/perfect-timing-item/?lang=EN'
    },
    {
        name: 'resolution-shines-as-pearls-of-sweat-item',
        url: 'https://hsr.honeyhunterworld.com/resolution-shines-as-pearls-of-sweat-item/?lang=EN'
    },
    {
        name: 'trend-of-the-universal-market-item',
        url: 'https://hsr.honeyhunterworld.com/trend-of-the-universal-market-item/?lang=EN'
    },
    {
        name: 'subscribe-for-more-item',
        url: 'https://hsr.honeyhunterworld.com/subscribe-for-more-item/?lang=EN'
    },
    {
        name: 'dance-dance-dance-item',
        url: 'https://hsr.honeyhunterworld.com/dance-dance-dance-item/?lang=EN'
    },
    {
        name: 'under-the-blue-sky-item',
        url: 'https://hsr.honeyhunterworld.com/under-the-blue-sky-item/?lang=EN'
    },
    {
        name: 'geniuses-repose-item',
        url: 'https://hsr.honeyhunterworld.com/geniuses-repose-item/?lang=EN'
    },
    {
        name: 'quid-pro-quo-item',
        url: 'https://hsr.honeyhunterworld.com/quid-pro-quo-item/?lang=EN'
    },
    {
        name: 'fermata-item',
        url: 'https://hsr.honeyhunterworld.com/fermata-item/?lang=EN'
    },
    {
        name: 'we-are-wildfire-item',
        url: 'https://hsr.honeyhunterworld.com/we-are-wildfire-item/?lang=EN'
    },
    {
        name: 'river-flows-in-spring-item',
        url: 'https://hsr.honeyhunterworld.com/river-flows-in-spring-item/?lang=EN'
    },
    {
        name: 'woof-walk-time-item',
        url: 'https://hsr.honeyhunterworld.com/woof-walk-time-item/?lang=EN'
    },
    {
        name: 'the-seriousness-of-breakfast-item',
        url: 'https://hsr.honeyhunterworld.com/the-seriousness-of-breakfast-item/?lang=EN'
    },
    {
        name: 'warmth-shortens-cold-nights-item',
        url: 'https://hsr.honeyhunterworld.com/warmth-shortens-cold-nights-item/?lang=EN'
    },
    {
        name: 'we-will-meet-again-item',
        url: 'https://hsr.honeyhunterworld.com/we-will-meet-again-item/?lang=EN'
    },
    {
        name: 'this-is-me-item',
        url: 'https://hsr.honeyhunterworld.com/this-is-me-item/?lang=EN'
    },
    {
        name: 'return-to-darkness-item',
        url: 'https://hsr.honeyhunterworld.com/return-to-darkness-item/?lang=EN'
    },
    {
        name: 'carve-the-moon-weave-the-clouds-item',
        url: 'https://hsr.honeyhunterworld.com/carve-the-moon-weave-the-clouds-item/?lang=EN'
    },
    {
        name: 'nowhere-to-run-item',
        url: 'https://hsr.honeyhunterworld.com/nowhere-to-run-item/?lang=EN'
    },
    {
        name: 'today-is-another-peaceful-day-item',
        url: 'https://hsr.honeyhunterworld.com/today-is-another-peaceful-day-item/?lang=EN'
    },
    {
        name: 'before-the-tutorial-mission-starts-item',
        url: 'https://hsr.honeyhunterworld.com/before-the-tutorial-mission-starts-item/?lang=EN'
    },
    {
        name: 'night-on-the-milky-way-item',
        url: 'https://hsr.honeyhunterworld.com/night-on-the-milky-way-item/?lang=EN'
    },
    {
        name: 'in-the-night-item',
        url: 'https://hsr.honeyhunterworld.com/in-the-night-item/?lang=EN'
    },
    {
        name: 'something-irreplaceable-item',
        url: 'https://hsr.honeyhunterworld.com/something-irreplaceable-item/?lang=EN'
    },
    {
        name: 'but-the-battle-isnt-over-item',
        url: 'https://hsr.honeyhunterworld.com/but-the-battle-isnt-over-item/?lang=EN'
    },
    {
        name: 'in-the-name-of-the-world-item',
        url: 'https://hsr.honeyhunterworld.com/in-the-name-of-the-world-item/?lang=EN'
    },
    {
        name: 'moment-of-victory-item',
        url: 'https://hsr.honeyhunterworld.com/moment-of-victory-item/?lang=EN'
    },
    {
        name: 'patience-is-all-you-need-item',
        url: 'https://hsr.honeyhunterworld.com/patience-is-all-you-need-item/?lang=EN'
    },
    {
        name: 'incessant-rain-item',
        url: 'https://hsr.honeyhunterworld.com/incessant-rain-item/?lang=EN'
    },
    {
        name: 'echoes-of-the-coffin-item',
        url: 'https://hsr.honeyhunterworld.com/echoes-of-the-coffin-item/?lang=EN'
    },
    {
        name: 'the-unreachable-side-item',
        url: 'https://hsr.honeyhunterworld.com/the-unreachable-side-item/?lang=EN'
    },
    {
        name: 'before-dawn-item',
        url: 'https://hsr.honeyhunterworld.com/before-dawn-item/?lang=EN'
    },
    {
        name: 'she-already-shut-her-eyes-item',
        url: 'https://hsr.honeyhunterworld.com/she-already-shut-her-eyes-item/?lang=EN'
    },
    {
        name: 'sleep-like-the-dead-item',
        url: 'https://hsr.honeyhunterworld.com/sleep-like-the-dead-item/?lang=EN'
    },
    {
        name: 'time-waits-for-no-one-item',
        url: 'https://hsr.honeyhunterworld.com/time-waits-for-no-one-item/?lang=EN'
    },
    {
        name: 'i-shall-be-my-own-sword-item',
        url: 'https://hsr.honeyhunterworld.com/i-shall-be-my-own-sword-item/?lang=EN'
    },
    {
        name: 'brighter-than-the-sun-item',
        url: 'https://hsr.honeyhunterworld.com/brighter-than-the-sun-item/?lang=EN'
    },
    {
        name: 'worrisome-blissful-item',
        url: 'https://hsr.honeyhunterworld.com/worrisome-blissful-item/?lang=EN'
    },
    {
        name: 'on-the-fall-of-an-aeon-item',
        url: 'https://hsr.honeyhunterworld.com/on-the-fall-of-an-aeon-item/?lang=EN'
    },
    {
        name: 'cruising-in-the-stellar-sea-item',
        url: 'https://hsr.honeyhunterworld.com/cruising-in-the-stellar-sea-item/?lang=EN'
    },
    {
        name: 'texture-of-memories-item',
        url: 'https://hsr.honeyhunterworld.com/texture-of-memories-item/?lang=EN'
    },
    {
        name: 'past-and-future-item',
        url: 'https://hsr.honeyhunterworld.com/past-and-future-item/?lang=EN'
    },
    {
        name: 'night-of-fright-item',
        url: 'https://hsr.honeyhunterworld.com/night-of-fright-item/?lang=EN'
    },
    {
        name: 'an-instant-before-a-gaze-item',
        url: 'https://hsr.honeyhunterworld.com/an-instant-before-a-gaze-item/?lang=EN'
    },
    {
        name: 'past-self-in-mirror-item',
        url: 'https://hsr.honeyhunterworld.com/past-self-in-mirror-item/?lang=EN'
    },
    {
        name: 'baptism-of-pure-thought-item',
        url: 'https://hsr.honeyhunterworld.com/baptism-of-pure-thought-item/?lang=EN'
    },
    {
        name: 'solitary-healing-item',
        url: 'https://hsr.honeyhunterworld.com/solitary-healing-item/?lang=EN'
    },
    {
        name: 'shared-feeling-item',
        url: 'https://hsr.honeyhunterworld.com/shared-feeling-item/?lang=EN'
    },
    {
        name: 'hey-over-here-item',
        url: 'https://hsr.honeyhunterworld.com/hey-over-here-item/?lang=EN'
    }
]



