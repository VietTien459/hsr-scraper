import {fetchFromWebOrCache} from './fetch'
import {CharacterUrls, LightConeUrls, RelicUrls,} from "./global";
import {extractCharacterData} from "./extraction/character-extraction";
import {extractLightConeData} from "./extraction/lightcone-extraction";
import {extractRelicData} from "./extraction/relic-extraction";

CharacterUrls
    .forEach(urlData =>
        fetchFromWebOrCache(urlData.url, true)
            .then(
                htmlData => extractCharacterData(htmlData, urlData.name)
            )
    )

LightConeUrls
    .forEach(urlData =>
        fetchFromWebOrCache(urlData.url, true)
            .then(
                htmlData => extractLightConeData(htmlData, urlData.name)
            )
    )

RelicUrls
    .forEach(urlData =>
        fetchFromWebOrCache(urlData.url, true)
            .then(
                htmlData => extractRelicData(htmlData, urlData.name)
            )
    )


