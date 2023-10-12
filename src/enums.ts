export type ObjectValues<T> = T[keyof T]

export const SKILL = {
    BASIC: 'Basic ATK',
    Skill: 'Skill',
    ULTIMATE: 'Ultimate',
} as const

export type Skill = ObjectValues<typeof SKILL>

export const TARGET = {
    SINGLE: 'Single Target',
    AOE: 'Aoe',
} as const

export type Target = ObjectValues<typeof TARGET>
