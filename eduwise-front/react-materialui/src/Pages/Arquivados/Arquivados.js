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
import SettingsIcon from '@mui/icons-material/Settings';
import ArchiveIcon from '@mui/icons-material/Archive';
import AppsIcon from '@mui/icons-material/Apps';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import TodayIcon from '@mui/icons-material/Today';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AddCardIcon from '@mui/icons-material/AddCard';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import FolderOpenIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'

const drawerWidth = 240

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

export function Arquivados() {
    const theme = useTheme()
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [nome, setNome] = useState('')
    const [serie, setSerie] = useState('')
    const [turmas, setTurmas] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)
    const [auth, setAuth] = useState(true)
    const [showTurmasList, setShowTurmasList] = useState(false)
    const [archivedTurmas, setArchivedTurmas] = useState([])

    useEffect(() => {
        getTurmasArquivadas()
        getTurmas()
    }, [])

    const changeDrawerState = () => {
        setDrawerOpen(!drawerOpen);
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
                setNome('');
                setDialogOpen(false);
            })
            .catch(function (error) {
                console.error('Erro ao pegar turma:', error);
            });
    }

    const getTurmasArquivadas = async () => {
        const emailProfessor = localStorage.getItem("email")
        let idProfessor

        try {
            const teacherResponse = await axios.get(`http://localhost:8080/teachers/getByEmail/${emailProfessor}`)
            idProfessor = teacherResponse.data.id

            const turmasResponse = await axios.get(`http://localhost:8080/classrooms/prof/${idProfessor}`)
            const turmasArquivadas = turmasResponse.data.filter(turma => turma.isArchived)

            setArchivedTurmas(turmasArquivadas)
        } catch (error) {
            console.error('Erro ao obter turmas arquivadas:', error)
        }
    }

    const handleSchoolIconClick = () => {
        setShowTurmasList(!showTurmasList)
    }

    const deletarTurma = async (classroom) => {
        try {
            await axios.delete('http://localhost:8080/classrooms/' + classroom)
            setTurmas(turmas.filter(turma => turma.id !== classroom))
            navigate("/turmas")
        } catch (error) {
            console.error('Erro ao deletar turma:', error)
        }
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
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
        localStorage.removeItem('email')
        localStorage.removeItem('authToken')
        navigate("/")
    }

    const handleLogout = () => {
        localStorage.removeItem('email')

        localStorage.removeItem('authToken')

        navigate('/login')
    }

    const arquivados = () => {
        navigate("/arquivados")
    }

    return (
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
                    <img src='/images/logo.png' alt='logo' style={{ height: 30 }} onClick={home} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
                    {auth && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
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
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText sx={{ opacity: drawerOpen ? 1 : 0 }}>Configurações</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {archivedTurmas.map((turma) => (
                        <Card key={turma.id} turma={turma} sx={{ width: 280, height: 180 }}>
                            <CardActionArea sx={{ backgroundColor: turma.color }}>
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
                                <IconButton color="inherit" onClick={() => deletarTurma(turma.id)}>
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton color="inherit">
                                    <FolderOpenIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))}
                </Box>

            </Box>
        </Box>
    );
}