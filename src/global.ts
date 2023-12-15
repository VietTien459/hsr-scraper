import CheerioModule from "cheerio";

export function getAllCharactersUrls(htmlData: string | undefined): string[] {
    if (!htmlData) {
        throw new Error("Empty HTML string")
    }

    const $ = CheerioModule.load(htmlData)

    // Get all href attributes
    const hrefAttributes: string[] = [];

    $('#characters td:nth-child(2) a').each((index, element) => {
        const href = $(element).attr('href');
        if (href) {
            hrefAttributes.push("https://hsr.honeyhunterworld.com" + href);
        }
    });
    console.log(hrefAttributes)

    return hrefAttributes
}
