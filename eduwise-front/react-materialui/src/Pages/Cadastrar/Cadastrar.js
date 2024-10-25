import React, { useState } from 'react'
import axios from 'axios'
import LOGIN_IMAGE from '/Users/u22127/Documents/GitHub/Eduwise/eduwise-front/react-materialui/src/Imagens/Prototyping process-rafiki.png'
import LOGO_IMAGE from '/Users/u22127/Documents/GitHub/Eduwise/eduwise-front/react-materialui/src/Imagens/logo.png'
import './Cadastrar.css'
import { Container, Box, TextField, Button, Typography} from '@mui/material'
import Stack from '@mui/material/Stack'
import ButtonGroup from '@mui/material/ButtonGroup'
import { Checkbox, FormControlLabel } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export function Cadastrar() {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [escola, setEscola] = useState('')

    const navigate = useNavigate()

    const registrar = () => {
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
            navigate("/turmas")
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    const logar = () =>{
        navigate("/login")
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

                    <Box component="form" sx={{ width: '100%' }}>
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
                    <ButtonGroup variant="text" aria-label="text button group" align="left" color="secondary #65469B" sx={{mt: 5}}>
                        <Button sx={{color: '#65469B'}} >Facebook</Button>
                        <Button sx={{color: '#65469B'}}>Linkedin</Button>
                        <Button sx={{color: '#65469B'}}>Google</Button>
                    </ButtonGroup>
                </Box>
            </Container>
        </div>
    )
}