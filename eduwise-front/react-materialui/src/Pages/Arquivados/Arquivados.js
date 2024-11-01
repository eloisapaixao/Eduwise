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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import FolderOpenIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'

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
}));

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
    const [anchorEl, setAnchorEl] = useState(null)
    const [auth, setAuth] = useState(true)
    const [showTurmasList, setShowTurmasList] = useState(false)
    const [archivedTurmas, setArchivedTurmas] = useState([])
    const navigate = useNavigate()
    const [turmas, setTurmas] = useState([])
    const [nome, setNome] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogDeletarOpen, setDialogDeletarOpen] = useState(false)

    useEffect(() => {
        const storedArchivedTurmas = JSON.parse(localStorage.getItem('archivedTurmas')) || []
        setArchivedTurmas(storedArchivedTurmas)
        getTurmas()
    }, [])

    const changeDrawerState = () => {
        setDrawerOpen(!drawerOpen)
    }

    function handleDrawerOpen(event) {
        if (anchorEl !== event.currentTarget) {
            setDrawerOpen(true)
        }
    }

    function handleDrawerClose(event) {
        if (anchorEl !== event.currentTarget) {
            setDrawerOpen(false)
        }
    }

    const handleSchoolIcon = () => {
        setShowTurmasList(!showTurmasList)
    }

    const handleDesarquivar = (turma) => {
        const updatedArchivedTurmas = archivedTurmas.filter(t => t.id !== turma.id);
        setArchivedTurmas(updatedArchivedTurmas);
        localStorage.setItem('archivedTurmas', JSON.stringify(updatedArchivedTurmas));
        const activeTurmas = JSON.parse(localStorage.getItem('activeTurmas')) || [];
        const turmaExistente = activeTurmas.find(t => t.id === turma.id);
        if (!turmaExistente) {
            activeTurmas.push(turma);
            localStorage.setItem('activeTurmas', JSON.stringify(activeTurmas));
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
                setTurmas([...turmas, response.data])
                setNome('')
                setDialogOpen(false)
            })
            .catch(function (error) {
                console.error('Erro ao pegar turma:', error)
            })
    }

    const deletarTurma = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/classrooms/${id}`)
            setArchivedTurmas(prevTurmas => prevTurmas.filter(turma => turma.id !== id))
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

    const navigateTo = (path) => {
        navigate(path)
    }

    const aluno = (id) => {
        localStorage.setItem("classId", id)
        navigate("/alunos")
    }

    const colorPalette = [
        '#FF4F4F',
        '#5A6ABF',
        '#62B05A',
        '#F8A345',
        '#E04DB6'
    ]

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={drawerOpen} color='inherit'>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        onClick={changeDrawerState}
                        edge="start"
                        sx={{ marginRight: 5 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img src='/images/logo.png' alt='logo' style={{ height: 30 }} onClick={() => navigateTo("/")} />
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
                                <MenuItem onClick={() => {
                                    localStorage.removeItem('email');
                                    localStorage.removeItem('authToken');
                                    navigateTo('/login');
                                }}>Logout</MenuItem>
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
                            onClick={() => navigateTo("/turmas")}
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
                            onClick={() => navigateTo("/arquivados")}
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
                    {archivedTurmas && archivedTurmas.length > 0 ? (
                        archivedTurmas.map((turma) => (
                            <Card key={turma.id} sx={{ width: 280, height: 180 }}>
                                <CardActionArea sx={{ backgroundColor: turma.color }} onClick={() => aluno(turma.id)} style={{ backgroundColor: colorPalette[turma.id % colorPalette.length], color: '#fff' }}>
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
                                                deletarTurma()
                                                setDialogDeletarOpen(false)
                                            }} color="secondary">
                                                Deletar
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                    <IconButton color="inherit">
                                        <Tooltip title="Desarquivar" onClick={() => handleDesarquivar(turma)}>
                                            <FolderOpenIcon />
                                        </Tooltip>
                                    </IconButton>
                                </CardActions>
                            </Card>
                        ))
                    ) : (
                        <Typography variant="h6">Nenhuma turma arquivada.</Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
}