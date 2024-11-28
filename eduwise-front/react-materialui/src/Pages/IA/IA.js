import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SettingsIcon from '@mui/icons-material/Settings'
import ArchiveIcon from '@mui/icons-material/Archive'
import AppsIcon from '@mui/icons-material/Apps'
import SchoolIcon from '@mui/icons-material/School'
import HomeIcon from '@mui/icons-material/Home'
import TodayIcon from '@mui/icons-material/Today'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Container, Grid, Avatar } from '@mui/material'
import './IA.css'
import Autocomplete from '@mui/material/Autocomplete'
import { useLocation } from 'react-router-dom'
import logo from "../../Imagens/logo.png"

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
})

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
})

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    width: '100%',
    position: 'fixed',
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
)

export function IA() {
    const theme = useTheme()
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [turmas, setTurmas] = useState([])
    const [contents, setContents] = useState([])
    const [subcontents, setSubcontents] = useState([])
    const [skills, setSkills] = useState([])
    const [subjects, setSubjects] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)
    const [auth, setAuth] = useState(true)
    const [showTurmasList, setShowTurmasList] = useState(false)
    const [selectedSubject, setSelectedSubject] = useState(null)
    const [selectedContent, setSelectedContent] = useState(null)
    const [selectedSubcontent, setSelectedSubcontent] = useState(null)
    const [selectedSkill, setSelectedSkill] = useState(null)
    const location = useLocation()
    const { nomeAluno, levelAluno } = location.state || {}
    const [mensagemIA, setMensagemIA] = useState([])

    useEffect(() => {
        getTurmas()
        getSubjects()
        getContents()
        getSubcontents()
        getSkills()
    }, []);

    const getTurmas = async () => {
        const emailProfessor = localStorage.getItem("email")
        let idProfessor
        /////
        await axios.get('http://localhost:8080/teachers/getByEmail/' + emailProfessor)
            .then(function (response) {
                idProfessor = response.data.id
            })
            .catch(function (error) {
                console.log(error)
            })
        await axios.get('http://localhost:8080/classrooms/prof/' + idProfessor)
            .then(function (response) {
                setTurmas([...turmas, response.data]);
                setDialogOpen(false);
            })
            .catch(function (error) {
                console.error('Erro ao pegar turma:', error);
            });
    }

    const getSubjects = async () => {
        await axios.get('http://localhost:8080/subjects')
            .then(function (response) {
                setSubjects(response.data);
            })
            .catch(function (error) {
                console.error('Erro ao pegar disciplinas:', error);
            });
    };

    const getContents = async (id) => {
        localStorage.setItem("id", id);
        console.log("Subject ID:", id);

        await axios.get('http://localhost:8080/contents/getBySubject/' + id)
            .then(function (response) {
                setContents(response.data);
            })
            .catch(function (error) {
                console.error('Erro ao pegar conteúdos:', error);
            });
    }

    const getSubcontents = async (id) => {
        localStorage.setItem("id", id);
        console.log("Content ID:", id);

        await axios.get('http://localhost:8080/subcontents/getByContent/' + id)
            .then(function (response) {
                setSubcontents(response.data);
            })
            .catch(function (error) {
                console.error('Erro ao pegar subconteúdos:', error);
            });
    }

    const getSkills = async (id) => {
        localStorage.setItem("id", id);
        console.log("subcontent ID:", id);

        await axios.get('http://localhost:8080/skills/getBySubcontent/' + id)  // Supondo que seja o endpoint correto
            .then(function (response) {
                setSkills(response.data);
            })
            .catch(function (error) {
                console.error('Erro ao pegar habilidades:', error);
            });
    }

    const recomendar = async (skillName) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/recomendar', { "habilidades": [skillName] });
    
            if (response.data.atividades_recomendadas.length === 0) {
                setMensagemIA("Não existem atividades para reforçar essa habilidade.");
            } else {
                const atividadesFormatadas = response.data.atividades_recomendadas.map(atividade => (
                    `Número da atividade: ${atividade.id}\n` +
                    `Descrição: ${atividade.descricao}\n` +
                    `Habilidades envolvidas:\n  - ${atividade.habilidades_relacionadas.join('\n  - ')}\n`
                )).join('\n\n'); // Junta todas as atividades com espaçamento entre elas
                setMensagemIA(atividadesFormatadas);
            }
        } catch (error) {
            console.error('Erro ao recomendar atividade:', error);
            setMensagemIA("Ocorreu um erro ao buscar as recomendações. Tente novamente mais tarde.");
        }
    };
    
    

    const colorPalette = [
        '#FF4F4F',
        '#5A6ABF',
        '#62B05A',
        '#F8A345',
        '#E04DB6'
    ];

    const handleSchoolIconClick = () => {
        setShowTurmasList(!showTurmasList);
    };

    const changeDrawerState = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleDrawerOpen(event) {
        if (anchorEl !== event.currentTarget) {
            setDrawerOpen(true);
        }
    }

    function handleDrawerClose(event) {
        if (anchorEl !== event.currentTarget) {
            setDrawerOpen(false);
        }
    }

    const navigate = useNavigate()

    const aluno = (id) => {
        localStorage.setItem("classId", id)
        navigate("/alunos")
    }

    const inicial = () => {
        navigate("/turmas")
    }

    const home = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('authToken');
        localStorage.removeItem('id')
        navigate("/")
    }

    const handleLogout = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('authToken');
        localStorage.removeItem('id')
        navigate('/login');
    };

    const arquivados = () => {
        navigate("/arquivados")
    }

    const filteredContents = contents.filter((content) => content.level === levelAluno)

    return (
        <div className='pagina-ia'>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={drawerOpen} color='inherit'>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            onClick={changeDrawerState}
                            edge="start"
                            sx={{
                                marginRight: 5
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <img src={logo} alt='logo' style={{ height: 30 }} onClick={home} />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
                        {auth && (
                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onMouseMove={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={drawerOpen} onMouseMove={handleDrawerOpen} onMouseLeave={handleDrawerClose}>
                    <List sx={{ marginTop: '65px' }}>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: drawerOpen ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                onClick={inicial}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: drawerOpen ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText sx={{ opacity: drawerOpen ? 1 : 0 }} >Início</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: drawerOpen ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                onClick={handleSchoolIconClick}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: drawerOpen ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <SchoolIcon />
                                </ListItemIcon>
                                <ListItemText primary="Turmas" sx={{ opacity: drawerOpen ? 1 : 0 }} />
                            </ListItemButton>
                            {showTurmasList && (
                                <List component="div" disablePadding>
                                    {turmas[0].map((turma, index) => {
                                        return (
                                            <ListItemButton key={index} sx={{ pl: 4 }} onClick={() => aluno(turma.id)}>
                                                <ListItemText primary={turma.name} />
                                            </ListItemButton>
                                        )
                                    })}
                                </List>
                            )}
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: drawerOpen ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                onClick={arquivados}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: drawerOpen ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <ArchiveIcon />
                                </ListItemIcon>
                                <ListItemText sx={{ opacity: drawerOpen ? 1 : 0 }}>Arquivados</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
            </Box>
            <Container maxWidth="lg" style={{ marginTop: '60px' }}>
                <Grid container spacing={2} alignItems={'center'} style={{ marginTop: '20px' }}>
                    <Grid item>
                        <Avatar style={{ backgroundColor: '#BDBDBD', width: 56, height: 56 }}>
                            {nomeAluno?.charAt(0)}
                        </Avatar>
                    </Grid>
                    <Grid item>
                        <Typography variant='h6'>
                            {nomeAluno}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={2} style={{ marginTop: '20px' }}>
                    {subjects.map((subject, index) => (
                        <Grid item key={index}>
                            <Button variant='contained' style={{ backgroundColor: colorPalette[index % colorPalette.length], color: '#fff' }}
                                onClick={() => {
                                    setSelectedSubject(subject.id)
                                    getContents(subject.id)
                                    setSelectedContent(null)
                                    setSelectedSubcontent(null)
                                }}>
                                {subject.name.replace(/_/g, ' ')}
                            </Button>
                        </Grid>
                    ))}
                </Grid>

                <Grid container spacing={2} style={{ marginTop: '20px', marginLeft: '0.1px' }}>
                    <Autocomplete
                        disablePortal
                        id="free-solo-demo"
                        freeSolo
                        options={filteredContents.map((content) => content.name)}
                        sx={{ width: 300 }}
                        disabled={!selectedSubject}
                        renderInput={(params) => <TextField {...params} label="Conteúdo" />}
                        onChange={(event, newValue) => {
                            const selectedContent = contents.find(content => content.name === newValue)
                            if (selectedContent) {
                                setSelectedContent(selectedContent.id)
                                getSubcontents(selectedContent.id)
                                setSelectedSubcontent(null)
                            }
                        }}
                    />
                    <Autocomplete
                        id="subcontent-autocomplete"
                        freeSolo
                        options={subcontents.map(subcontent => subcontent.name)}
                        sx={{ width: 300, marginLeft: '58px' }}
                        disabled={!selectedContent}
                        renderInput={(params) => <TextField {...params} label="Subconteúdo" />}
                        onChange={(event, newValue) => {
                            const selectedSubcontent = subcontents.find(subcontent => subcontent.name === newValue);
                            if (selectedSubcontent) {
                                setSelectedSubcontent(selectedSubcontent.id);
                                getSkills(selectedSubcontent.id);
                            }
                        }}
                    />
                    <Autocomplete
                        id="skills-autocomplete"
                        freeSolo
                        options={skills.map(skill => skill.name)}
                        sx={{ width: 300, marginLeft: '58px' }}
                        disabled={!selectedSubcontent}
                        renderInput={(params) => <TextField {...params} label="Habilidades" />}
                        onChange={(event, newValue) => {
                            const selectedSkill = skills.find(skill => skill.name === newValue);
                            if (selectedSkill) {
                                // Passa a skill para o método recomendar
                                recomendar(selectedSkill.name);
                            }
                        }}
                    />
                </Grid>
                <Grid container spacing={2} style={{ marginTop: '20px', marginLeft: '0.1px' }}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Recomendações"
                        multiline
                        rows={10}
                        fullWidth
                        style={{ width: '1020px' }}
                        value={mensagemIA} // Troca de defaultValue para value
                        InputProps={{
                            readOnly: true, // Para evitar edição manual
                        }}
                    />

                </Grid>
            </Container>
        </div>
    )
}
