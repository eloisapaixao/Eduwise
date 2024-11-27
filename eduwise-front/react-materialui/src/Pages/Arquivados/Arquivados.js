import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArchiveIcon from '@mui/icons-material/Archive';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AddCardIcon from '@mui/icons-material/AddCard';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Button, Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import FolderOpenIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'
import logo from "../../Imagens/logo.png"

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

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
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

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
);

export function Arquivados() {
    const theme = useTheme()
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogDeletarOpen, setDialogDeletarOpen] = useState(false)
    const [nome, setNome] = useState('')
    const [serie, setSerie] = useState('')
    const [turmas, setTurmas] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)
    const [auth, setAuth] = useState(true)
    const [showTurmasList, setShowTurmasList] = useState(false)

    useEffect(() => {
        getTurmas()
    }, [])

    const changeDrawerState = () => {
        setDrawerOpen(!drawerOpen)
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


    const handleSchoolIcon = () => {
        setShowTurmasList(!showTurmasList);
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        localStorage.removeItem('email')

        localStorage.removeItem('authToken')

        navigate('/login')
    }

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
                const turmasArquivadas = response.data.filter(turma => turma.isArchived === true)
                setTurmas([...turmas, turmasArquivadas]);
                setNome('');
                setDialogOpen(false);
            })
            .catch(function (error) {
                console.error('Erro ao pegar turma:', error);
            });
    }


    const deletarTurma = async (classroom) => {
        try {
            await axios.delete('http://localhost:8080/classrooms/' + classroom)
            setTurmas(turmas.filter(turma => turma.id !== classroom))
            window.location.reload();
        } catch (error) {
            console.error('Erro ao deletar turma:', error)
        }
    }

    const desarquivarTurma = async (classroomId) => {
        try {
            const response = await axios.put(`http://localhost:8080/classrooms/unarchive/${classroomId}`)

            setTurmas(turmas.filter(turma => turma.id !== classroomId))
            window.location.reload();
        } catch (error) {
            if (error.response) {
                console.error('Erro na resposta do servidor:', error.response.data)
                console.error('Código de status:', error.response.status)
            } else if (error.request) {
                console.error('Nenhuma resposta recebida:', error.request)
            } else {
                console.error('Erro ao configurar a requisição:', error.message)
            }
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
        navigate("/")
    }

    const arquivados = () => {
        navigate('/arquivados')
    }

    const colorPalette = [
        '#FF4F4F',
        '#5A6ABF',
        '#62B05A',
        '#F8A345',
        '#E04DB6'
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" color='inherit'>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={changeDrawerState}
                        edge="end"
                        sx={{
                            marginRight: 5,
                            marginLeft: '-10px'
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
                                <MenuItem>Profile</MenuItem>
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
                            onClick={handleSchoolIcon}
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
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {turmas[0] !== undefined && (
                        turmas[0].map((turma, index) => {
                            return (
                                <Card key={index} sx={{ width: 280, height: 180 }}>
                                    <CardActionArea sx={{ backgroundColor: turma.color }} onClick={() => aluno(turma.id)} style={{ backgroundColor: colorPalette[index % colorPalette.length], color: '#fff' }}>
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="subtitle1"
                                                component="div"
                                                sx={{ height: 90, color: '#000000' }}
                                            >
                                                {turma.name}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <Divider />
                                    <CardActions>
                                        <IconButton color="inherit" onClick={() => setDialogDeletarOpen(true)}>
                                            <Tooltip title="Deletar">
                                                <DeleteIcon />
                                            </Tooltip>
                                        </IconButton>
                                        <Dialog open={dialogDeletarOpen} onClose={() => setDialogDeletarOpen(false)}>
                                            <DialogTitle>Confirmar Deleção</DialogTitle>
                                            <DialogContent>
                                                <Typography>Tem certeza de que deseja deletar {turma.name}?</Typography>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={() => setDialogDeletarOpen(false)} color="primary">
                                                    Cancelar
                                                </Button>
                                                <Button onClick={() => {
                                                    deletarTurma(turma.id)
                                                    setDialogDeletarOpen(false)
                                                }} color="secondary">
                                                    Deletar
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                        <IconButton color="inherit" onClick={() => desarquivarTurma(turma.id)}>
                                            <Tooltip title="Desarquivar">
                                                <FolderOpenIcon />
                                            </Tooltip>
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            )
                        })
                    )}
                </Box>
            </Box>
        </Box>
    );
}