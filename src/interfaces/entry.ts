

export interface Entry {
    _id: string;
    description: string;
    createdAt: number;
    status: EstryStatus;
}

export type EstryStatus = 'pending' | 'in-progress' | 'finished'