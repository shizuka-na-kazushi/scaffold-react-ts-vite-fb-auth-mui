import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Typography, CssBaseline, Box, Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, } from 'firebase/auth';
import { auth } from '../fb/firebase';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../components/authProvider';
import { CircularProgress } from '@mui/material';

function GoToHome(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      <Link color="inherit" href="/">
        Top page
      </Link>{' '}
    </Typography>
  );
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [logining, setLoging] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { currentUserInfo } = useContext(AuthContext)

  if (currentUserInfo && location.state && location.state.from) {
    navigate(location.state.from)
  }

  const handleLogin = async () => {
    try {
      setLoging(true)
      await signInWithEmailAndPassword(auth, email, password);
      console.log('loggin in successfully');
    } catch (error: any) {
      console.log('Fail to loggin', error);
      setErrorMessage(error.message);
      console.error('code:', error.code);
      console.error('message:', error.message);
      setLoging(false)
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>


        <Typography component="h4" variant="h4">Login</Typography>


        {errorMessage && <Grid item xs={12} sm={6}><Typography color="error">{errorMessage}</Typography></Grid>}

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
              type="email"
              label="E-mail"
              value={email}
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
              type="password"
              label="Passowrd"
              value={password}
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>


        <Button variant="contained"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLogin} >
          Login
          {logining && <CircularProgress sx={{ color: 'white' }} />}
        </Button>

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/createUser" variant="body2">
              Register new account
            </Link>
          </Grid>
        </Grid>

      </Box>
      <GoToHome sx={{ mt: 5 }}></GoToHome>
    </Container>
  );
};

export default Login;
