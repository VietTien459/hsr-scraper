import {fetchFromWebOrCache} from './fetch'
import {CharacterUrls} from "./global";
import {extractCharacterData} from "./character-extraction";

CharacterUrls
    .forEach(charUrl =>
        fetchFromWebOrCache(charUrl.url, true)
            .then(
                htmlData => extractCharacterData(htmlData, charUrl.name)
            )
    )
