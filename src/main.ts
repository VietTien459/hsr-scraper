import {fetchFromWebOrCache} from './fetch'
import {CharacterUrls, LightConeUrls,} from "./global";
import {extractCharacterData} from "./extraction/character-extraction";
import {extractLightConeData} from "./extraction/lightcone-extraction";

CharacterUrls
    .forEach(charUrl =>
        fetchFromWebOrCache(charUrl.url, true)
            .then(
                htmlData => extractCharacterData(htmlData, charUrl.name)
            )
    )

LightConeUrls
    .forEach(charUrl =>
        fetchFromWebOrCache(charUrl.url, true)
            .then(
                htmlData => extractLightConeData(htmlData, charUrl.name)
            )
    )

