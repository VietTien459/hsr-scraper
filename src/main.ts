import {extractData, fetchFromWebOrCache} from './fetch'

const url = "https://hsr.honeyhunterworld.com/silver-wolf-character/?lang=EN";

fetchFromWebOrCache(url, false).then(extractData)


