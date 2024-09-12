import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Button, Divider } from '@mui/material';


export function Alunos() {
 return (
   <List
     sx={{ width: '100%', maxWidth: 450, bgcolor: 'background.paper' }}
     aria-label="contacts"
   >
     <ListItem disablePadding>
       <ListItemButton>
         <ListItemText primary="Letícia Fochi Juliani" />
       </ListItemButton>
       <Button>
         <DeleteIcon />
       </Button>
     </ListItem>
     <Divider />
     <ListItem disablePadding>
       <ListItemButton>
         <ListItemText primary="Maria Eduarda de Jesus Padovan" />
       </ListItemButton>
       <Button>
         <DeleteIcon />
       </Button>
     </ListItem>
     <Divider />
   </List>
 );
}