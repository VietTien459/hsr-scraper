import {Skill, Target} from "./enums";

export interface ISkill {
    name: string,
    type: Skill,
    target: Target
    energyRegeneration: number,
    weaknessBreak: IWeaknessBreak
    description: string
    stats: IStats
}

export interface IWeaknessBreak {
    target: Target,
    value: number
}

export interface IStats {
    format: string,
    values: [{
        [key: string]: string;
    }]
    ascensionMaterials: [
        {
            material: string,
            quantity: number
        }
    ]
}


