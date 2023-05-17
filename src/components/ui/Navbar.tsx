import { useContext } from 'react'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'


import { UIContext } from '@/context/ui'

export const Navbar = () => {

  const { setIsAddingEntry } = useContext( UIContext )
  const { openSideMenu } = useContext( UIContext )

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

              <Box sx={{ display: 'flex', alignItems: 'center', paddingRight: 4}}>
                <Button
                  startIcon={<AddCircleOutlineOutlinedIcon />}
                  fullWidth
                  variant='outlined'
                  onClick={ () => setIsAddingEntry( true )}
                >
                  Agregar Tareas
                </Button>
              </Box>
              
        </Box>

      </AppBar>
  )
}
