import React from 'react'
import {Container, Typography, Chip, Grid, Box, Paper, Table, TableHead, TableRow, TableBody, Avatar, IconButton, Grid2} from '@mui/material'
import './IA.css'
import { deepPurple } from '@mui/material/colors'

const subjects = [
    {name: 'Português', color: '#FF4F4F'},
    {name: 'Matemática', color: '#5A6ABF'},
    {name: 'Ciências', color: '#62B05A'},
    {name: 'História', color: '#F8A345'},
    {name: 'Geografia', color: '#E04DB6'},
    {name: 'Inglês', color: '#FF4F4F'},
    {name: 'Artes', color: '5A6ABF'},
    {name: 'Educação Física', color: '#62B05A'},
    {name: 'Ensino Religioso', color: '#F8A345'},
    {name: 'Computação', color: '#E04DB6'}
]

export function IA(){
    return(
        <div className='pagina-ia'>
            <Grid2 container spacing={2} alignItems={'center'}>
                <Grid2 item xs={12}>
                    <Box display={'flex'} alignItems={'center'}>
                        <Avatar sx={{backgroundColor: deepPurple[500], marginRight: 2}}>
                            M
                        </Avatar>
                        <Typography variant='h6' fontWeight={'bold'}>
                            Maria Eduarda de Jesus Padovan
                        </Typography>
                    </Box>
                </Grid2>

                
            </Grid2>
        </div>
    )
}