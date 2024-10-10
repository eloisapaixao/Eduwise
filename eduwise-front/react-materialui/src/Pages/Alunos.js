import React, { useState, useEffect } from 'react';
import axios from 'axios'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Divider } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SettingsIcon from '@mui/icons-material/Settings';
import ArchiveIcon from '@mui/icons-material/Archive';
import AppsIcon from '@mui/icons-material/Apps';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import TodayIcon from '@mui/icons-material/Today';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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

export function Alunos() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [auth, setAuth] = useState(true);
  const [nome, setNome] = useState('');
  const [emailAluno, setEmailAluno] = useState('');
  const [birthday, setBirthday] = useState('');
  const [alunos, setAlunos] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const adicionarAluno = async () => {
    const idClassroom = parseInt(localStorage.getItem("classId"))

    let subjects = []
    try {
      const response = await axios.get('http://localhost:8080/subjects')
      subjects = response.data.map(subject => subject.id)
    } catch (error) {
      console.error('Erro ao buscar matérias:', error)
    }

    const novoAluno = {
      name: nome,
      birthday: birthday,
      email: emailAluno,
      classroomId: { id: parseInt(idClassroom, 10) },
      subjects: subjects
    };

    try {
      const response = await axios.post('http://localhost:8080/students', novoAluno)
      console.log('Aluno adicionado com sucesso:', response.data)
      setAlunos([...alunos, response.data])
      setDialogOpen(false)
    } catch (error) {
      console.error('Erro ao adicionar aluno:', error)
    }
  };

  const handleBirthdayChange = (e) => {
    const value = e.target.value.replace(/\D/g, '')
    let formattedValue = ''

    if (value.length >= 1) {
      formattedValue += value.substring(0, 4)
    }
    if (value.length >= 5) {
      formattedValue += '-' + value.substring(4, 6)
    }
    if (value.length >= 7) {
      formattedValue += '-' + value.substring(6, 8)
    }

    setBirthday(formattedValue);
  };

  const navigate = useNavigate();
  const ia = () => {
    navigate('/ia')
  };

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

          <img src='/images/logo.png' alt='logo /' style={{ height: 30, }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
          <IconButton color='inherit' onClick={() => setDialogOpen(true)}>
            <PersonAddAlt1Icon />
          </IconButton>
          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogContent sx={{ height: 500, width: 500 }}>
              <DialogTitle variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#65469B' }}>
                CRIE UM ALUNO
              </DialogTitle>
              <Typography variant="body1" gutterBottom sx={{ color: '#848484', mt: -1, fontSize: 20 }}>
                <b>Dados do aluno</b>
              </Typography>
              <Divider color='#848484' sx={{ width: 450, mt: -1, borderBottomWidth: '3px' }} />

              <TextField
                label="Nome do aluno"
                variant="standard"
                margin="normal"
                required
                sx={{ backgroundColor: '#fff', width: 400, marginLeft: 3 }}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <TextField
                label="Email do aluno"
                variant="standard"
                margin="normal"
                required
                sx={{ backgroundColor: '#fff', width: 400, marginLeft: 3 }}
                value={emailAluno}
                onChange={(e) => setEmailAluno(e.target.value)}
              />
              <TextField
                label="Data de Nascimento (ANO-MÊS-DIA)"
                variant="standard"
                margin="normal"
                required
                sx={{ backgroundColor: '#fff', width: 400, marginLeft: 3 }}
                value={birthday}
                onChange={handleBirthdayChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)} sx={{ color: '#65469B' }}>
                Cancelar
              </Button>
              <Button onClick={adicionarAluno} sx={{ color: '#65469B' }}>
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
                <MenuItem onClick={handleClose}>Logout</MenuItem>
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
                  {<SchoolIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
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
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#65469B', fontStyle: 'italic' }}>
          ALUNOS DA TURMA
        </Typography>
        <Divider sx={{ mt: -1, borderBottomWidth: '3px', borderColor: '#65469B' }} />
        <Box>
          <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            aria-label="alunos"
          >
            {alunos.map((aluno) => (
              <React.Fragment key={aluno.id}>
                <ListItem>
                  <ListItemButton onClick={ia}>
                    <ListItemText primary={aluno.name} />
                  </ListItemButton>
                  <Button>
                    <DeleteIcon />
                  </Button>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
            <Divider />
          </List>
        </Box>

      </Box>
    </Box>
  );
}