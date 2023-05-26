import { FC, ReactNode, useEffect, useReducer } from 'react'
import { useSnackbar } from 'notistack';
import { EntriesContext, entriesReducer } from './'
import { Entry } from '@/interfaces'
import { entriesApi } from '@/apis'

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState  = {
    entries: []
}

interface Props {
    children: ReactNode;
}


export const EntriesProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( entriesReducer, Entries_INITIAL_STATE )
    const { enqueueSnackbar } = useSnackbar()

    const refreshEntries = async() => {
        const { data } = await entriesApi.get<Entry[]>('/entries')
        dispatch({ type: '[Entry] Refresh-Data', payload: data })
    }

    const addNewEntry = async ( description: string ) => {
        const { data } = await entriesApi.post<Entry>('/entries', { description })
        dispatch({ type: '[Entry] Add-Entry', payload: data })

        enqueueSnackbar('Tarea agregada',{
            variant: 'success',
            autoHideDuration: 1500,
            anchorOrigin:{
                vertical: 'bottom',
                horizontal: 'center'
            }
        })
    }

    const updateEntry = async ( { _id, description, status }: Entry ) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${ _id }`, { description, status } )
            dispatch({ type: '[Entry] Entry-Update', payload: data })

            enqueueSnackbar('Tarea actualizada',{
                variant: 'success',
                autoHideDuration: 1500,
                anchorOrigin:{
                    vertical: 'bottom',
                    horizontal: 'center'
                }
            })

        } catch (error) {
            console.log({ error })
        }   
    }


    const deleteEntry = async (  _id: string ) => {
        try {
            const { data } = await entriesApi.delete<Entry>(`/entries/${ _id }` )
            dispatch({ type: '[Entry] Delete-Data', payload: data })

            enqueueSnackbar('Tarea borrada',{
                variant: 'error',
                autoHideDuration: 1500,
                anchorOrigin:{
                    vertical: 'bottom',
                    horizontal: 'center'
                }
            })

            refreshEntries()

        } catch (error) {
            console.log({ error })
        }   
    }


    useEffect(() => {
        refreshEntries()
    }, [])
    
    return (
        <EntriesContext.Provider value={{
            ...state,

            // Metodos
            addNewEntry,
            updateEntry,
            deleteEntry
        }}>
            {children}
        </EntriesContext.Provider>
    )
}
