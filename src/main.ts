import {extractData, fetchFromWebOrCache} from './fetch'
import {getAllCharactersUrls} from "./global";


fetchFromWebOrCache("https://hsr.honeyhunterworld.com/characters/?lang=EN", true)
    .then(getAllCharactersUrls)
    .then(urls => urls.forEach(url => fetchFromWebOrCache(url, true).then(extractData)))



