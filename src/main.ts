import {extractData, fetchFromWebOrCache} from './fetch'
import {CharacterUrls} from "./global";

CharacterUrls
    .forEach(charUrl =>
        fetchFromWebOrCache(charUrl.url, true)
            .then(
                htmlData => extractData(htmlData, charUrl.name)
            )
    )
