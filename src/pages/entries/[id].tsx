import { ChangeEvent, FC, useContext, useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import ReplyAllOutlinedIcon from '@mui/icons-material/ReplyAllOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Layout } from '@/components/layouts'
import { Entry, EstryStatus } from '@/interfaces'
import { dbEntries } from '@/database'
import { EntriesContext } from '@/context/entries'
import { 
    capitalize,
    Button, 
    Card, 
    CardActions, 
    CardContent, 
    CardHeader, 
    FormControl, 
    FormControlLabel, 
    FormLabel, 
    Grid, 
    Radio, 
    RadioGroup, 
    TextField, 
    IconButton
} from '@mui/material'
import { useRouter } from 'next/router';
import { getFormatDistanceToNow } from '@/utils';
import { UIContext } from '@/context/ui';


const validStatus: EstryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
    entry: Entry
}

const EntryPage:FC<Props> = ({ entry }) => {

    const { updateEntry, deleteEntry } = useContext( EntriesContext )
    const { startButton } = useContext( UIContext )


    const [inputValue, setInputValue] = useState(entry.description)
    const [status, setStatus] = useState(entry.status)
    const [touched, setTouched] = useState(false)
    const [isActive, setIsActive] = useState(true)

    const router = useRouter()

    const onInputValueChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        setInputValue( event.target.value )
    }

    const onStatusChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        setStatus( event.target.value as EstryStatus )
    }

    const onSave = () => {
 
        if( inputValue.trim().length === 0 ) return

        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue
        }

        updateEntry( updatedEntry )
        router.push('/')
        startButton()
    }

    const onBack = () => {
        router.push('/')
        startButton()
    }

    const onDelete = () => {
        deleteEntry( entry._id )
        router.push('/')
        startButton()
    }

    useEffect(() => {
        if( 
            entry.description === inputValue &&
            entry.status === status
        ){
            setIsActive(true)
        }else{
            if( inputValue === '' ){
                setIsActive(true)
            }else{
                setIsActive(false)
            }
        }
    }, [ inputValue, status ])


    return (

        <Layout title={ inputValue.substring(0,20) + '...'}>
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
                    <Card>
                        <CardHeader
                            title={`Entrada:`}
                            subheader={`Creada hace ${ getFormatDistanceToNow( entry.createdAt ) }`}
                        />

                        <CardContent>
                            <TextField 
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder="Nueva Entrada"
                                autoFocus
                                multiline
                                label="Nueva Entrada"
                                value={ inputValue }
                                onChange={ onInputValueChange }
                                onBlur={ () => setTouched( true ) }
                                helperText={ inputValue.length <= 0 && touched && 'Ingese un valor' }
                                error={ inputValue.length <= 0 && touched }
                            />

                            <FormControl>
                                <FormLabel>Estado:</FormLabel>
                                <RadioGroup
                                    row
                                    value={ status }
                                    onChange={ onStatusChange }
                                >
                                    {
                                        validStatus.map( option => (
                                            <FormControlLabel 
                                                key={ option }
                                                value={ option }
                                                control={ <Radio /> }
                                                label={ capitalize(option) }
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>

                        <CardActions>
                            <Button
                                startIcon={ <ReplyAllOutlinedIcon /> }
                                variant='outlined'
                                fullWidth
                                onClick={ onBack }
                            >
                                Volver
                            </Button>
                            <Button
                                startIcon={ <SaveOutlinedIcon /> }
                                variant='contained'
                                fullWidth
                                onClick={ onSave }
                                disabled={ isActive }
                            >
                                Salvar
                            </Button>


                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

            <IconButton
                onClick={ onDelete }
                sx={{
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                    backgroundColor: 'error.dark'
                }}
            >
                <DeleteOutlinedIcon />
            </IconButton>
        </Layout>
        
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params as { id: string } // Obtenemos el id de la url

    const entry = await dbEntries.getEntryById( id )

    if( !entry ){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}

export default EntryPage
