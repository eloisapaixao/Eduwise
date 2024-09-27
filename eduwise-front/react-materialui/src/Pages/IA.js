import React from 'react';
import { Container, Typography, Chip, Grid, Box, Paper, Table, TableHead, TableRow, TableCell, TableBody, Avatar, IconButton } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import MenuIcon from '@mui/icons-material/Menu';

const subjects = [
  { name: 'Português', color: '#FF4F4F' },
  { name: 'Matemática', color: '#5A6ABF' },
  { name: 'Ciências', color: '#62B05A' },
  { name: 'Geografia', color: '#F8A345' },
  { name: 'História', color: '#E04DB6' },
];

export function IA() {
  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={2} alignItems="center">
        {/* Header com Menu e Avatar */}
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <IconButton>
              <MenuIcon />
            </IconButton>
            <Avatar sx={{ bgcolor: deepPurple[500], marginRight: 2 }}>M</Avatar>
            <Typography variant="h6" fontWeight="bold">
              MARIA EDUARDA ALMEIDA FERREIRA
            </Typography>
          </Box>
        </Grid>

        {/* Matérias (Chips Coloridos) */}
        <Grid item xs={12}>
          <Box display="flex" gap={2} mt={2}>
            {subjects.map((subject, index) => (
              <Chip
                key={index}
                label={subject.name}
                sx={{ backgroundColor: subject.color, color: '#fff', fontSize: 16, fontWeight: 'bold', paddingX: 2, height: 40 }}
              />
            ))}
          </Box>
        </Grid>

        {/* Tabela */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>Assunto</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>Descrição</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">Matéria 1</TableCell>
                  <TableCell align="center">Descrição do Assunto</TableCell>
                  <TableCell align="center">Pendente</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">Matéria 2</TableCell>
                  <TableCell align="center">Descrição do Assunto</TableCell>
                  <TableCell align="center">Concluído</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
