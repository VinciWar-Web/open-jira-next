import { ChangeEvent, useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { UIContext } from '@/context/ui'
import { NewEntry } from './NewEntry'
import { Button, TextField } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import { EntriesContext } from '@/context/entries'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ModalNewEntry = () => {

    const { isAddingEntry, setIsAddingEntry } = useContext( UIContext )
    const { addNewEntry } = useContext( EntriesContext )

    const [inputValue, setInputValue] = useState('')
    const [errorInput, setErrorInput] = useState(false)

    useEffect(() => {
        setIsAddingEntry(isAddingEntry)
    }, [isAddingEntry])

    const onTextFieldChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        setInputValue( event.target.value )

        if( event.target.value.length === 0 ){
            setErrorInput(true)
        }else{
            setErrorInput(false)
        }
    }

    const onSave = () => {
        if( inputValue.length === 0 ){
            setErrorInput(true)
            return
        }
        addNewEntry( inputValue )
        setIsAddingEntry(false)
        setInputValue('')
    }

    const handleClose = () => setIsAddingEntry(false);
    
    return (
        <div>
            <Modal
                open={isAddingEntry}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Agrega una tarea
                    </Typography>

                    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
                        <TextField
                            fullWidth
                            sx={{ marginTop: 2, marginBottom: 1 }}
                            placeholder='Nueva entrada'
                            autoFocus
                            multiline
                            label='Nueva entrada'
                            helperText={ errorInput && 'Ingrese un valor' } 
                            error={ errorInput }
                            value={ inputValue }
                            onChange={ onTextFieldChange }
                        />

                        <Box display='flex' justifyContent='space-between'>
                            <Button
                                variant='text'
                                onClick={ () => setIsAddingEntry( false )}
                            >
                                Cancelar
                            </Button>   
                            <Button
                                variant='outlined'
                                color='secondary'
                                endIcon={<SaveOutlinedIcon />}
                                onClick={ onSave }
                            >
                                Guardar
                            </Button>
                        </Box>
                    </Box>
                </Box>

            </Modal>
        </div>
    );
}