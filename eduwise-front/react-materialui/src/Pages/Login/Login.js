import React, { useState } from 'react'
import axios from 'axios'
import LOGIN_IMAGE from 'C:/Users/elois/Documents/GitHub/Eduwise/eduwise-front/react-materialui/src/Imagens/Prototyping process-rafiki.png'
import LOGO_IMAGE from 'C:/Users/elois/Documents/GitHub/Eduwise/eduwise-front/react-materialui/src/Imagens/logo.png'
import './Login.css'
import { Container, Box, TextField, Button, Typography} from '@mui/material'
import Stack from '@mui/material/Stack'
import ButtonGroup from '@mui/material/ButtonGroup'
import { useNavigate } from 'react-router-dom'
import { Snackbar, Alert } from '@mui/material'

export function Login({ setLoggedInTeacherId }) {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const navigate = useNavigate()

    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')


    const cadastrar = () =>{
        navigate("/cadastrar")
    }

    const logar = () => {
        axios.get('http://localhost:8080/teachers')
        .then(function (response) {
            response.data.forEach(
                item => {
                    if (email === item.email && senha === item.password) {
                        navigate("/turmas")
                        localStorage.setItem("email", item.email)
                    }
                    else {
                        setErrorMessage('Senha ou Usuário errado! Tente novamente.');  // Mensagem personalizada
                        setOpenSnackbar(true)
                    }
                }
            )
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            logar()
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
                    <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#65469B', mt: 15}}>
                        LOGAR EM UMA CONTA
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom sx={{ color: '#848484'}}>
                        Desfrute dos <b>recursos disponíveis!</b>
                    </Typography>

                    <Box component="form" sx={{ width: '100%' }} onKeyDown={handleKeyDown}>
                        <TextField 
                            id="standard-basic" 
                            label="Email" 
                            variant="standard" 
                            fullWidth
                            margin="normal"
                            required
                            sx={{ backgroundColor: '#fff'}}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField 
                            id="standard-basic" 
                            type='password'
                            label="Senha" 
                            variant="standard" 
                            fullWidth
                            margin="normal"
                            required
                            sx={{ backgroundColor: '#fff', color: '#65469B', mt: 5 }}
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />

                        <Typography variant="body2" align="left" sx={{ mt: 5, color: '#7a7a7a' }}>
                            <a href="#termos" style={{ color: '#6200ea' }}>Esqueceu a senha?</a>
                        </Typography>

                        <Stack spacing={2} direction="row" sx={{mt: 5}}>
                            <Button variant="contained" sx={{ fontWeight: 'bold', backgroundColor: '#65469B', color: '#fff',  mt: 15, width: 300}} onClick={logar}>LOGAR</Button>
                            <Button variant="outlined" sx={{ fontWeight: 'bold', color: '#65469B', mt: 15, width: 300, borderColor: '#65469B'}} onClick={cadastrar}>REGISTRAR</Button>
                        </Stack>
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