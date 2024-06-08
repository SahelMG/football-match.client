import { ChangeEventHandler } from 'react';

export interface GoalData {
    Time: number;
    Player: string;
    Team: string;
}

export interface MatchData {
    Host: string;
    Guest: string;
    Goals: GoalData[];
}

export type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
