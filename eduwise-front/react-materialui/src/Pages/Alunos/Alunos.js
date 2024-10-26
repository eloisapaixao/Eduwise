import React, { useState, useEffect } from 'react';
import axios from 'axios'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Divider, Tooltip } from '@mui/material';
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

export function Alunos() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogAlunoOpen, setDialogAlunoOpen] = useState(false);
  const [dialogDeletarOpen, setDialogDeletarOpen] = useState(false);
  const [auth, setAuth] = useState(true);
  const [nome, setNome] = useState('');
  const [emailAluno, setEmailAluno] = useState('');
  const [birthday, setBirthday] = useState('');
  const [alunos, setAlunos] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const [showTurmasList, setShowTurmasList] = useState(false);
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    getAlunos()
    getTurmas()
  }, [])

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const handleSchoolIconClick = () => {
    setShowTurmasList(!showTurmasList);
  };

  const handleLogout = () => {
    localStorage.removeItem('email');

    localStorage.removeItem('authToken');

    navigate('/login');
  };

  const handleAlunoClick = async (aluno) => {
    const idClassroom = localStorage.getItem("classId")
    try {
      const response = await axios.get(`http://localhost:8080/classrooms/${idClassroom}`);
      const classroom = response.data;

      navigate('/ia', { state: { nomeAluno: aluno, levelAluno: classroom.level } });
    } catch (error) {
      console.error('Erro ao carregar turma:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      adicionarAluno()
    }
  }

  const adicionarAluno = async () => {
    const idClassroom = parseInt(localStorage.getItem("classId"));
    const student = {
      name: nome,
      email: emailAluno,
      birthday: birthday,
    }

    try {
      const response = await axios.post(`http://localhost:8080/students/${idClassroom}`, student);
      console.log('Aluno adicionado com sucesso:', response.data);
      setAlunos([...alunos, response.data]);
      setDialogAlunoOpen(false);

      window.location.reload();
    } catch (error) {
      console.error('Erro ao adicionar aluno:', error);
    }
  }

  const deletarAluno = async (student) => {
    try {
      await axios.delete('http://localhost:8080/students/' + student);
      setTurmas(alunos.filter(aluno => aluno.id !== aluno));
      window.location.reload();
    } catch (error) {
      console.error('Erro ao deletar aluno:', error);
    }
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
        setDialogAlunoOpen(false);
      })
      .catch(function (error) {
        console.error('Erro ao pegar turma:', error);
      });
  }

  const getAlunos = async () => {
    const idClassroom = localStorage.getItem("classId")

    try {
      const response = await axios.get(`http://localhost:8080/students/getByClassroom/${idClassroom}`)
      setAlunos(response.data)
    } catch (error) {
      console.error('Erro ao carregar alunos:', error)
    }
  }

  const navigate = useNavigate();

  const inicial = () => {
    navigate("/turmas")
  }

  const home = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('authToken');
    navigate("/")
  }

  const aluno = (id) => {
    localStorage.setItem("classId", id)
    navigate("/alunos")
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

          <img src='/images/logo.png' alt='logo /' style={{ height: 30, }} onClick={home} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
          <IconButton color='inherit' onClick={() => setDialogAlunoOpen(true)}>
            <Tooltip title="Adicionar Aluno">
              <PersonAddAlt1Icon />
            </Tooltip>
          </IconButton>
          <Dialog open={dialogAlunoOpen} onClose={() => setDialogAlunoOpen(false)} onKeyDown={handleKeyDown}>
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
              <Button onClick={() => setDialogAlunoOpen(false)} sx={{ color: '#65469B' }}>
                Cancelar
              </Button>
              <Button onClick={adicionarAluno} sx={{ color: '#65469B' }}>
                Criar
              </Button>
            </DialogActions>
          </Dialog>
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
                <MenuItem >Profile</MenuItem>
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
                  <ListItemButton onClick={() => setDialogAlunoOpen(true)}>
                    <ListItemText primary={aluno.name} />
                  </ListItemButton>
                  <IconButton color="inherit" onClick={() => setDialogDeletarOpen(true)}>
                    <Tooltip title="Deletar">
                      <DeleteIcon />
                    </Tooltip>
                  </IconButton>
                  <Dialog
                    open={dialogDeletarOpen}
                    onClose={() => setDialogDeletarOpen(false)}
                  >
                    <DialogTitle>Confirmar Deleção</DialogTitle>
                    <DialogContent>
                      Tem certeza de que deseja deletar o(a) aluno(a) {aluno.name}?
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setDialogDeletarOpen(false)} color="primary">
                        Cancelar
                      </Button>
                      <Button onClick={() => deletarAluno()} color="secondary">
                        Deletar
                      </Button>
                    </DialogActions>
                  </Dialog>
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