export type Session = {
    id: number;
    sessionDate: Date;
    lastUpdated: Date;
    arts: Art[];
    injuries: Injury[];
}

export type Art = {
    art: string;
    techniques: Technique[];
}

export type Injury = {
    injury: string;
    level: number;
    note: string;
}

export type Technique = {
    technique: string;
    description: string;
}
