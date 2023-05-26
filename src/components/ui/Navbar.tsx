import { useContext, useEffect, useState } from 'react'
import { AppBar, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { UIContext } from '@/context/ui'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'


export const Navbar = () => {

  const { setIsAddingEntry, isButton } = useContext( UIContext )
  const { openSideMenu } = useContext( UIContext )

  const [modeTheme, setModeTheme] = useState('Dark')

  const onTheme = () => {
    setModeTheme(theme => theme === 'Light' ? 'Dark' : 'Light');
  }

  useEffect(() => {
    localStorage.setItem('modeTheme', modeTheme)
  }, [modeTheme])
  
  return (


      <AppBar position='sticky'>
        <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
              <Toolbar>
                  <IconButton 
                      size='large'
                      edge='start'
                      onClick={ openSideMenu }
                  >
                      <MenuOutlinedIcon />
                  </IconButton>

                  <Typography variant='h6'>OpenJira</Typography>

              </Toolbar>

              {
                isButton
                  &&
                <Box sx={{ display: 'flex', alignItems: 'center', paddingRight: 8}}>
                  <Button
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                    fullWidth
                    variant='outlined'
                    onClick={ () => setIsAddingEntry( true )}
                  >
                    Agregar Tareas
                  </Button>
                </Box>
              }
              
              <IconButton
                onClick={ onTheme }
                sx={{
                    position: 'fixed',
                    top: 12,
                    right: 20,
                }}
            >
              {
                modeTheme === 'Light'
                    ?
                  <LightModeOutlinedIcon />
                    :
                  <DarkModeOutlinedIcon />
              }
            </IconButton>

              
        </Box>

      </AppBar>
  )
}
