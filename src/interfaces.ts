export interface AscensionMaterial {
    itemName: string;
    itemCount: string;
}

export interface SkillMaterial {
    itemName: string;
    itemCount: number;
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


export interface SkillLevelData {
    level: number;
    percentage: string;
    materials: SkillMaterial[]
}

export interface SkillDetails {
    name: string;
    type: string;
    description: string;
    energyRegen: number;
    weaknessBreak: number;
    levelData: SkillLevelData[];
}


 export interface Ascension {
    level: number;
    percentage: string;
    ascensionMaterials: AscensionMaterial[];
}

interface Level {
    min: number;
    max: number;
    current: number;
}

export interface Ability {
    name: string;
    type: string;
    energyRegeneration: number;
    weaknessBreak: string;
    damageDescription: string;
    level: Level;
    ascensions: Ascension[];
}

