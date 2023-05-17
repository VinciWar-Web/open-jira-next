import { useContext } from 'react'
import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined'

import { UIContext } from '@/context/ui'

const munuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts']

export const Sidebar = () => {

  const { sidemenuOpen, closeSideMenu } = useContext( UIContext )

  return (
    <Drawer
        anchor="left"
        open={ sidemenuOpen }
        onClose={ closeSideMenu }
    >
      <Box sx={{width: '250px'}}>
        <Box sx={{ padding: '5px 10px' }}>
            <Typography variant='h4'>Menú</Typography>
        </Box>
        
        <List>
          {
            munuItems.map( (text, index) => (
                <ListItemButton key={ text }>
                  <ListItemIcon>
                    { index % 2 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon /> }
                  </ListItemIcon>
                  <ListItemText primary={ text } />
                </ListItemButton>
            ))
          }
        </List>
        
        <Divider />

        <List>
          {
            munuItems.map( (text, index) => (
                <ListItemButton key={ text }>
                  <ListItemIcon>
                    { index % 2 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon /> }
                  </ListItemIcon>
                  <ListItemText primary={ text } />
                </ListItemButton>
            ))
          }
        </List>

      </Box>
    </Drawer>
  )
}
