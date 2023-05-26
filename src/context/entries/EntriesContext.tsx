import { createContext } from 'react'
import { Entry } from '@/interfaces'

interface ContextProps {
    entries: Entry[];

    // Metodos
    addNewEntry: (description: string) => void;
    updateEntry: (entry: Entry) => void;
    deleteEntry: ( _id : string) => Promise<void>;
}

export const EntriesContext = createContext({} as ContextProps )
