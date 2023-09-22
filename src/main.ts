import {extractData, fetchFromWebOrCache} from './fetch'

const url = "https://hsr.honeyhunterworld.com/fu-xuan-character/?lang=EN";

fetchFromWebOrCache(url, false).then(extractData)


