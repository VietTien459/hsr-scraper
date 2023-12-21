export interface AscensionMaterial {
    itemName: string;
    itemCount: string;
}


export interface CharacterData {
    name: string;
    faction: string;
    rarity: number;
    path: string;
    combatTypes: string;
    chineseName: string;
    englishName: string;
    koreanName: string;
    japaneseName: string;
    ascensionMaterials: AscensionMaterial[];
    traceMaterials: AscensionMaterial[];
    story: string;
}

export interface CharacterStats {
    level: string;
    ATK: number;
    DEF: number;
    HP: number;
    SPD: number;
    CRITRate: string;
    CRITDMG: string;
    Taunt: number;
    Energy: number;
    ascensionMaterials: AscensionMaterial[];
}


export type LightConeStats = Partial<CharacterStats>


export interface Ascension {
    level: number;
    percentage: string;
    ascensionMaterials: AscensionMaterial[];
}

export interface Ability {
    name: string;
    type: string;
    energyRegeneration: number;
    weaknessBreak: string;
    description: string,
    damageDescription: string;
    ascensions: Ascension[];
}

export interface Eidolon {
    name: string,
    level: number,
    description: string
}


export interface LightConeData {
    name: string;
    rarity: number;
    path: string;
    skill: string;
    ascensionMaterials: AscensionMaterial[];
    story: string;
}
