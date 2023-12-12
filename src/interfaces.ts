export interface AscensionMaterial {
    itemName: string;
    itemCount: number;
}

export interface SkillMaterial {
    itemName: string;
    itemCount: number;
}

export interface CharacterData {
    name: string;
    concepts: string;
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

export interface StatTableRow {
    level: number;
    atk: number;
    def: number;
    hp: number;
    spd: number;
    critRate: string;
    critDmg: string;
    taunt: number;
    energy: number;
    ascensionMaterials: AscensionMaterial[];
}

export interface CharacterStats {
    stats: StatTableRow[];
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
