import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { chainPropTypes } from '@mui/utils';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function FromFornecedor() {
  const [nome, setNome] = useState('')
  const [razaoSocial, setRazaoSocial] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [segmento, setSegmento] = useState('')
  const [cep, setCep] = useState('')
  const [rua, setRua] = useState('')
  const [numero, setNumero] = useState(0)
  const [complemento, setComplemento] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')


  useEffect(() => {

    //
  }, [])

  const handleCep = async (event) => {
    setCep(event.target.value)
    const response = await fetch(`https://ws.apicep.com/cep.json?code=${event.target.value}`);
    const data = await response.json();
    console.log(data)
    const {
      rua = data.address,
      cidade = data.city,
      cep = data.code,
      bairro = data.district,
      statusCep = data.ok,
      estado = data.state,
      status = data.status,
      statusText = data.statusText
    } = data
    setRua(rua)


  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   nome: data.get('name'),
    //   razaoSocial: data.get('razao-social'),
    //   cnpj: data.get('cnpj'),
    //   segmento: data.get('segmento'),
    //   cep: data.get('cep'),
    //   rua: data.get('rua'),
    //   numero: data.get('numero'),
    //   complemento: data.get('complemento'),
    //   telefone: data.get('telefone'),
    //   email: data.get('email'),

    // });

    const dataForm =  {
      NOME: data.get('name'),
      RAZAO_SOCIAL: data.get('razao-social'),
      CNPJ: data.get('cnpj'),
      SEGMENTO: data.get('segmento'),
      CEP: data.get('cep'),
      RUA: data.get('rua'),
      NUMERO: data.get('numero'),
      COMPLEMENTO: data.get('complemento'),
      TELEFONE: data.get('telefone'),
      EMAIL: data.get('email'),

    };

    console.log (dataForm)
    fetch('https://back-reacjs.herokuapp.com/fornecedores', {
      method: "POST",
      body: JSON.stringify(dataForm),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(err => console.log(err));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Novo Fornecedor
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nome"
                  autoFocus
                  value={nome}
                  onChange={(event) => { setNome(event.target.value) }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="razao-social"
                  name="razao-social"
                  required
                  fullWidth
                  id="razao-social"
                  label="Razão Social"
                  autoFocus
                  value={razaoSocial}
                  onChange={(event) => { setRazaoSocial(event.target.value) }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="cnpj"
                  name="cnpj"
                  required
                  fullWidth
                  id="cnpj"
                  label="CNPJ"
                  autoFocus
                  value={cnpj}
                  onChange={(event) => { setCnpj(event.target.value) }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="segmento"
                  name="segmento"
                  required
                  fullWidth
                  id="segmento"
                  label="Segmento"
                  autoFocus
                  value={segmento}
                  onChange={(event) => { setSegmento(event.target.value) }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="cep"
                  name="cep"
                  required
                  fullWidth
                  id="cep"
                  label="CEP"
                  autoFocus
                  value={cep}
                  onChange={(event) => { setCep(event.target.value) }}
                  onBlur={handleCep}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="rua"
                  name="rua"
                  required
                  fullWidth
                  id="rua"
                  label="Rua"
                  autoFocus
                  value={rua}

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="numero"
                  name="numero"
                  required
                  fullWidth
                  id="numero"
                  label="Numero"
                  autoFocus
                  value={numero}
                  onChange={(event) => { setNumero(event.target.value) }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="complemento"
                  name="complemento"
                  required
                  fullWidth
                  id="complemento"
                  label="Complemento"
                  autoFocus
                  value={complemento}
                  onChange={(event) => { setComplemento(event.target.value) }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="telefone"
                  name="telefone"
                  required
                  fullWidth
                  id="telefone"
                  label="Telefone"
                  autoFocus
                  value={telefone}
                  onChange={(event) => { setTelefone(event.target.value) }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  type={'email'}
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  autoFocus
                  value={email}
                  onChange={(event) => { setEmail(event.target.value) }}
                  autoComplete="email"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}