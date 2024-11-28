import React, { useState } from 'react'
import axios from 'axios'
import LOGIN_IMAGE from '../../Imagens/Prototyping-process-rafiki.png'
import LOGO_IMAGE from '../../Imagens/logo.png'
import './Cadastrar.css'
import { Container, Box, TextField, Button, Typography} from '@mui/material'
import Stack from '@mui/material/Stack'
import ButtonGroup from '@mui/material/ButtonGroup'
import { Checkbox, FormControlLabel } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Snackbar, Alert } from '@mui/material'

export function Cadastrar() {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [escola, setEscola] = useState('')

    const navigate = useNavigate()

    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const registrar = () => {
        if(nome.length <= 0) {
            setErrorMessage("Preencha todos os campos antes de cadastrar!")
            setOpenSnackbar(true);
            return;
        }

        if (email.length <= 0) {
            setErrorMessage("Preencha todos os campos antes de cadastrar!")
            setOpenSnackbar(true);
            return;
        }
        
        if (senha.length <= 0) {
            setErrorMessage("Preencha todos os campos antes de cadastrar!");
            setOpenSnackbar(true);
            return;
        }

        if (escola.length <= 0) {
            setErrorMessage("Preencha todos os campos antes de cadastrar!");
            setOpenSnackbar(true);
            return;
        }

        axios.post('http://localhost:8080/teachers', {
            email: email,
            password: senha,
            school: escola,
            username: nome
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            console.log(response)
            navigate("/login")
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    const logar = () =>{
        navigate("/login")
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            registrar()
        }
    }

    return(
        <div className="pagina-login">
            <div className='espaco-imagem-login'>
                <img src={LOGIN_IMAGE} className='imagem-login'/>
            </div>
            <Container 
                sx={{ 
                    backgroundColor: '#ffff', 
                    borderRadius: '8px', 
                }}
            >
                <div className='espaco-imagem-logo'>
                    <img src={LOGO_IMAGE} className='imagem-logo'/>
                </div>
                <Box 
                    display="flex" 
                    flexDirection="column" 
                >
                    <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#65469B', mt: 10}}>
                        CRIAR UMA CONTA
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom sx={{ color: '#848484'}}>
                        Se inscreva e desbloqueie acesso <b>exclusivo!</b>
                    </Typography>

                    <Box component="form" sx={{ width: '100%' }} onKeyDown={handleKeyDown}>
                        <TextField 
                            id="standard-basic" 
                            label="Seu Nome" 
                            variant="standard" 
                            fullWidth
                            margin="normal"
                            required
                            sx={{ backgroundColor: '#fff'}}
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <TextField 
                            id="standard-basic" 
                            label="Email" 
                            variant="standard" 
                            fullWidth
                            margin="normal"
                            required
                            sx={{ backgroundColor: '#fff', color: '#65469B', mt: 3 }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField 
                            id="standard-basic" 
                            label="Senha" 
                            variant="standard" 
                            fullWidth
                            margin="normal"
                            required
                            sx={{ backgroundColor: '#fff', color: '#65469B', mt: 3 }}
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <TextField 
                            id="standard-basic" 
                            label="Escola em que trabalha" 
                            variant="standard" 
                            fullWidth
                            margin="normal"
                            required
                            sx={{ backgroundColor: '#fff', color: '#65469B', mt: 3 }}
                            value={escola}
                            onChange={(e) => setEscola(e.target.value)}
                        />

                        <Stack spacing={2} direction="row" sx={{mt: 3}}>
                            <Button variant="contained" sx={{ fontWeight: 'bold', backgroundColor: '#65469B', color: '#fff', width: 300}} onClick={registrar}>REGISTRAR</Button>
                            <Button variant="outlined" sx={{ fontWeight: 'bold', color: '#65469B', width: 300, borderColor: '#65469B'}} onClick={logar}>LOGAR</Button>
                        </Stack>
                        <FormControlLabel
                            control={<Checkbox color="secondary" />}
                            label="Eu li e concordo com os Termos de Uso e Política de Privacidade"
                            sx={{mt: 2}}
                        />
                    </Box>
                </Box>
            </Container>
            <Snackbar 
                open={openSnackbar} 
                autoHideDuration={6000} 
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}
