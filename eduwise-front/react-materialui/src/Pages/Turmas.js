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
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
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

export function Turmas() {
    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [nome, setNome] = useState('');
    const [serie, setSerie] = useState('');
    const [turmas, setTurmas] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [auth, setAuth] = useState(true);
    const [showTurmasList, setShowTurmasList] = useState(false);

    useEffect(() => {
        getTurmas();
    }, []);

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

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

    const handleSchoolIconClick = () => {
        setShowTurmasList(!showTurmasList);
    };

    const adicionarTurma = async () => {
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
        ////
        const novaTurma = {
            name: nome,
            level: parseInt(serie),
            teacher: idProfessor
        };
        axios.post('http://localhost:8080/classrooms', novaTurma)
            .then(response => {
                setTurmas([...turmas, novaTurma]);
                setNome('');
                setSerie('');
                setDialogOpen(false);

                window.location.reload();
            })
            .catch(error => {
                console.error('Erro ao adicionar turma:', error);
            });
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate()

    const aluno = (id) => {
        localStorage.setItem("classId", id)
        navigate("/alunos")
    }

    const inicial = () =>{
        navigate("/turmas")
    }

    const home = () =>{
        localStorage.removeItem('email');
        localStorage.removeItem('authToken');
        navigate("/")
    }

    const handleLogout = () => {
        localStorage.removeItem('email');

        localStorage.removeItem('authToken');

        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={drawerOpen} color='inherit'>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(drawerOpen && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img src='/images/logo.png' alt='logo' style={{ height: 30 }} onClick={home}/>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
                    <IconButton color='inherit' onClick={() => setDialogOpen(true)}>
                        <AddCardIcon />
                    </IconButton>
                    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                        <DialogContent sx={{ height: 400, width: 500 }}>
                            <DialogTitle variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#65469B' }}>
                                CRIE UMA TURMA
                            </DialogTitle>
                            <Typography variant="body1" gutterBottom sx={{ color: '#848484', mt: -1, fontSize: 20 }}>
                                <b>Dados da turma</b>
                            </Typography>
                            <Divider color='#848484' sx={{ width: 450, mt: -1, borderBottomWidth: '3px' }} />
                            <TextField
                                label="Nome da turma"
                                variant="standard"
                                margin="normal"
                                required
                                sx={{ backgroundColor: '#fff', width: 400, marginLeft: 3 }}
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <TextField
                                label="Série ou ano da turma (somente o número)"
                                variant="standard"
                                margin="normal"
                                required
                                sx={{ backgroundColor: '#fff', width: 400, marginLeft: 3, mt: 1 }}
                                value={serie}
                                onChange={(e) => setSerie(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setDialogOpen(false)} sx={{ color: '#65469B' }}>
                                Cancelar
                            </Button>
                            <Button onClick={adicionarTurma} sx={{ color: '#65469B' }}>
                                Criar
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <IconButton color='inherit'>
                        <AppsIcon />
                    </IconButton>
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
            <Drawer variant="permanent" open={drawerOpen}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Início', 'Agenda'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: drawerOpen ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: drawerOpen ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index % 2 === 0 ? <HomeIcon onClick={inicial} /> : <TodayIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: drawerOpen ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
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
                    {['Arquivos', 'Configurações'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: drawerOpen ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: drawerOpen ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index % 2 === 0 ? <ArchiveIcon /> : <SettingsIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: drawerOpen ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {turmas[0] !== undefined && (
                        turmas[0].map((turma, index) => {
                            return (
                                <Card key={index} sx={{ width: 280, height: 180 }} onClick={() => aluno(turma.id)}>
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
                                        <IconButton color="inherit">
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton color="inherit">
                                            <FolderOpenIcon />
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