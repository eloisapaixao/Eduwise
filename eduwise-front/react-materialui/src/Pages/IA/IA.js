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
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { Container, Grid, Avatar } from '@mui/material'
import './IA.css'
import Autocomplete from '@mui/material/Autocomplete';

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

export function IA() {
    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [turmas, setTurmas] = useState([]);
    const [contents, setContents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [auth, setAuth] = useState(true);
    const [showTurmasList, setShowTurmasList] = useState(false);

    useEffect(() => {
        getTurmas();
        getSubjects();
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

    const getContents = async () => {
        
    }

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

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
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

    const content = (id) => {
        localStorage.setItem("id", id)
        console.log("Subject ID:", id)
    }

    const inicial = () => {
        navigate("/turmas")
    }

    const home = () => {
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
        <div className='pagina-ia'>
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
                        <img src='/images/logo.png' alt='logo' style={{ height: 30 }} onClick={home} />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
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
            </Box>
            <Container maxWidth="lg" style={{ marginTop: '60px' }}>
                <Grid container spacing={2} alignItems={'center'} style={{ marginTop: '20px' }}>
                    <Grid item>
                        <Avatar style={{ backgroundColor: '#BDBDBD', width: 56, height: 56 }}>
                            M
                        </Avatar>
                    </Grid>
                    <Grid item>
                        <Typography variant='h6'>
                            Maria Eduarda de Jesus Padovan
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={2} style={{ marginTop: '20px' }}>
                    {subjects.map((subject, index) => (
                        <Grid item key={index}>
                            <Button variant='contained' style={{ backgroundColor: colorPalette[index % colorPalette.length], color: '#fff' }} onClick={() => content(subject.id)}>
                                {subject.name.replace(/_/g, ' ')}
                            </Button>
                        </Grid>
                    ))}
                </Grid>

                <Grid container spacing={2} style={{ marginTop: '20px', marginLeft: '0.1px' }}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={subjects.map((subject) => (subject.name))}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Conteúdo" />}
                    />
                </Grid>
            </Container>
        </div>
    )
}