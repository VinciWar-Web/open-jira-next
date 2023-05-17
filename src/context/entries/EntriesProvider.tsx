import { FC, ReactNode, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState  = {
    entries: [
        // {
        //     _id: uuidv4(),
        //     description: 'Pendiente cHola Mundo',
        //     status: 'pending',
        //     createdAt: Date.now(),
        // },
        // {
        //     _id: uuidv4(),
        //     description: 'En progreso Hola Mundo2',
        //     status: 'in-progress',
        //     createdAt: Date.now() - 1000000,
        // },
        // {
        //     _id: uuidv4(),
        //     description: 'Terminadas Hola Mundo3',
        //     status: 'finished',
        //     createdAt: Date.now() - 100000,
        // }
    ]
}

interface Props {
    children: ReactNode;
}

export const EntriesProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( entriesReducer, Entries_INITIAL_STATE )

    const addNewEntry = ( description: string ) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'pending'
        }
        dispatch({ type: '[Entry] Add-Entry', payload: newEntry })
    }

    const updateEntry = ( entry: Entry ) => {
        dispatch({ type: '[Entry] Entry-Update', payload: entry })
    }
    
    return (
        <EntriesContext.Provider value={{
            ...state,

            // Metodos
            addNewEntry,
            updateEntry
        }}>
            {children}
        </EntriesContext.Provider>
    )
}
