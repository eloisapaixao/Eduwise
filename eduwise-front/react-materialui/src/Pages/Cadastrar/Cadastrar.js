import * as React from 'react'
import LOGIN_IMAGE from '/Users/u22127/Documents/GitHub/Eduwise/eduwise-front/react-materialui/src/Imagens/Prototyping process-rafiki.png'
import LOGO_IMAGE from '/Users/u22127/Documents/GitHub/Eduwise/eduwise-front/react-materialui/src/Imagens/logo.png'
import './Cadastrar.css'
import { Container, Box, TextField, Button, Typography} from '@mui/material'
import Stack from '@mui/material/Stack'
import ButtonGroup from '@mui/material/ButtonGroup'
import { Checkbox, FormControlLabel } from '@mui/material'

export function Cadastrar() {
    return(
        <div className="pagina-login">
            <div className='espaco-imagem-login'>
                <img src={LOGIN_IMAGE} className='imagem-login'/>
            </div>
            <Container 
                maxWidth="sm" 
                sx={{ 
                    backgroundColor: '#f9f9f9', 
                    borderRadius: '8px', 
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',  
                }}
            >
                <div className='espaco-imagem-logo'>
                    <img src={LOGO_IMAGE} className='imagem-logo'/>
                </div>
                <Box 
                    display="flex" 
                    flexDirection="column" 
                >
                    <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#65469B', mt: 15}}>
                        CRIAR UMA CONTA
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom sx={{ color: '#848484'}}>
                        Se inscreva e desbloqueie acesso <b>exclusivo!</b>
                    </Typography>

                    <Box component="form" sx={{ width: '100%' }}>
                        <TextField 
                            id="standard-basic" 
                            label="Seu Nome" 
                            variant="standard" 
                            fullWidth
                            margin="normal"
                            required
                            sx={{ backgroundColor: '#fff'}}
                        />
                        <TextField 
                            id="standard-basic" 
                            label="Email" 
                            variant="standard" 
                            fullWidth
                            margin="normal"
                            required
                            sx={{ backgroundColor: '#fff', color: '#65469B', mt: 5 }}
                        />
                        <TextField 
                            id="standard-basic" 
                            label="Senha" 
                            variant="standard" 
                            fullWidth
                            margin="normal"
                            required
                            sx={{ backgroundColor: '#fff', color: '#65469B', mt: 5 }}
                        />

                        <Stack spacing={2} direction="row" sx={{mt: 5}}>
                            <Button variant="contained" sx={{ fontWeight: 'bold', backgroundColor: '#65469B', color: '#fff',  mt: 15, width: 300}}>REGISTRAR</Button>
                            <Button variant="outlined" sx={{ fontWeight: 'bold', color: '#65469B', mt: 15, width: 300, borderColor: '#65469B'}}>LOGAR</Button>
                        </Stack>
                        <FormControlLabel
                            control={<Checkbox color="secondary" />}
                            label="Eu li e concordo com os Termos de Uso e Política de Privacidade"
                            sx={{mt: 2}}
                        />
                    </Box>
                    <ButtonGroup variant="text" aria-label="text button group" align="left" color="secondary #65469B" sx={{mt: 20}}>
                        <Button sx={{color: '#65469B'}} >Facebook</Button>
                        <Button sx={{color: '#65469B'}}>Linkedin</Button>
                        <Button sx={{color: '#65469B'}}>Google</Button>
                    </ButtonGroup>
                </Box>
            </Container>
        </div>
    )
}