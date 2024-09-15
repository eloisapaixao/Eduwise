import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IconButton, CardActionArea, CardActions } from '@mui/material';
import Divider from '@mui/material/Divider';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';


export default function CardTurma() {
 return (
   <Card sx={{ maxWidth: 320 }}>
     <CardActionArea href="">
     <CardMedia
         component="img"
         height="120"
         image="./images/padrao-cor.jpeg"
         alt="capa"
       />
       <CardContent>
         <Typography gutterBottom variant="subtitle1" component="div" height={50} >
           1º ANO A
         </Typography>
       </CardContent>
     </CardActionArea>
     <Divider />
     <CardActions>
     <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
       <IconButton color='inherit'>
           <PermContactCalendarIcon />
       </IconButton>
       <IconButton color='inherit'>
           <FolderOpenIcon />
       </IconButton>
     </CardActions>
   </Card>
 );
}