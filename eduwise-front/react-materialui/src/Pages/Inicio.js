import React, { useState } from 'react'
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
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import AddCardIcon from '@mui/icons-material/AddCard';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Button} from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActions';
import FolderOpenIcon from '@mui/icons-material/Folder';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

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
    // necessary for content to be below app bar
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

export function Inicio()
{
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
  
    const [nome, setNome] = useState('') 
  
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const close = () => {
        setOpen(false);
    };
  
    const handleDrawerClose = () => {
        setOpen(false);
    };
  
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
        setAnchorEl(null);
    };

    const adicionar = () =>{
        setOpen(true);
    }
  
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} color='inherit'>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img src='/images/logo.png' alt='logo /' style={{height:30,}}/>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
                    <IconButton color='inherit' onClick={adicionar}>
                        <AddCardIcon/>
                    </IconButton>
                    <Dialog open={open} onClose={close}>
                        <DialogTitle variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#65469B'}}>CRIE UMA TURMA</DialogTitle>
                        <Typography variant="body1" gutterBottom sx={{ color: '#848484', marginLeft: 3, mt: -2}}>
                            <b>Dados da turma</b>
                        </Typography>
                        <Divider color='#848484' sx={{width: 450, marginLeft: 3, mt: -1}}/>
                        <DialogContent sx={{height: 400, width: 500, mt: -4}}>
                            <TextField 
                                id="standard-basic" 
                                label="Nome da turma" 
                                variant="standard"
                                margin="normal"
                                marginLeft="3"
                                required
                                sx={{ backgroundColor: '#fff', width: 400, marginLeft: 3}}
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <TextField 
                                id="standard-basic" 
                                label="Série ou ano da turma (somente o número)" 
                                variant="standard" 
                                fullWidth
                                margin="normal"
                                required
                                sx={{ backgroundColor: '#fff', width: 400, marginLeft: 3, mt: -1}}
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <Typography variant="body1" gutterBottom sx={{ color: '#848484', mt: 3}}>
                                <b>Edição</b>
                            </Typography>
                            <Divider color='#848484' sx={{width: 450, mt: -1}}/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={close}>Cancel</Button>
                            <Button onClick={close}>Subscribe</Button>
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
                                    vertical: 'top',
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
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
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
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                              }}
                            >
                                {index % 2 === 0 ? <HomeIcon /> : <TodayIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Turmas'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        >
                        <ListItemIcon
                            sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                            }}
                        >
                            { <SchoolIcon /> }
                        </ListItemIcon>
                        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                {['Arquivos', 'Configurações'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {index % 2 === 0 ? <ArchiveIcon /> : <SettingsIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Card sx={{ maxWidth: 320 }}>
                    <CardActionArea href="">
                        <CardMedia
                            component="img"
                            height="120"
                            image="/Users/u22127/Documents/GitHub/Eduwise/eduwise-front/react-materialui/public/images/padrao-cor.jpeg"
                            alt="capa"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="subtitle1" component="div" height={50} >
                                1º ANO A
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <Divider />
                    <CardActions>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
                        <IconButton color='inherit'>
                            <PermContactCalendarIcon />
                        </IconButton>
                        <IconButton color='inherit'>
                            <FolderOpenIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            </Box>
        </Box>
    );
}