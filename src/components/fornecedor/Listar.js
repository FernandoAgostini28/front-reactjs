import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ConfirmDialog from '../notificacao/dialog';
import {
    Link
} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';






export default function Listar() {
    const [dataApi, setDataAPI] = useState([{}])
    const [data, setData] = useState([{}])
    const [confirmDialog, setConfirmDialog] = React.useState({ isOpen: false, title: "", subtitle: "" });

    useEffect(() => {
        buscarFornecedor()
    }, [])

    async function buscarFornecedor() {
        const response = await fetch(`https://back-reacjs.herokuapp.com/fornecedores`);
        const data = await response.json();
        console.log(data)
        setDataAPI(data.fornecedores)
    }

    const handleDelete = (id) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        })

        fetch(`https://back-reacjs.herokuapp.com/fornecedores/deletar/${id}`, {
            method: 'DELETE',
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(res => res.json())
            .then(data => { if (data.erro === false) { window.location.reload() } })
            .catch(err => console.log(err));

    };

    // Paginação
   
   
    const [page, setPage] = React.useState(0);
    const [dense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    // const { count,  onPageChange } = 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    // const handleFirstPageButtonClick = (event) => {
    //   onPageChange(event, 0);
    // };
  
    // const handleBackButtonClick = (event) => {
    //   onPageChange(event, page - 1);
    // };
  
    // const handleNextButtonClick = (event) => {
    //   onPageChange(event, page + 1);
    // };
  
    // const handleLastPageButtonClick = (event) => {
    //   onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    // }
    return (

        <>
            <CssBaseline />
            <Container maxWidth="lg" style={{ marginTop: '20px', marginBottom: '20px'}}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 300 }} aria-label="caption table">
                        {/* <caption>Lista de Fornecedores</caption> */}
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Empresa</TableCell>
                                <TableCell align="left">Endereço</TableCell>
                                <TableCell align="left">Contato</TableCell>
                                <TableCell align="right">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { dataApi.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="left">
                                            <Grid container >
                                                <Grid item xs={12}>
                                                    <Typography variant="body2" gutterBottom><span style={{ fontWeight: 'bold' }}>Nome: </span> {row.NOME}</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="body2" gutterBottom><span style={{ fontWeight: 'bold' }}>Razão Social: </span> {row.RAZAO_SOCIAL}</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="body2" gutterBottom> <span style={{ fontWeight: 'bold' }}>CNPJ: </span> {row.CNPJ}</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="body2" gutterBottom><span style={{ fontWeight: 'bold' }}>Segmento: </span> {row.SEGMENTO}</Typography>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Grid container >
                                                <Grid item xs={12}>
                                                    <Typography variant="body2" gutterBottom><span style={{ fontWeight: 'bold' }}>Cep: </span> {row.CEP}</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="body2" gutterBottom><span style={{ fontWeight: 'bold' }}>Rua: </span> {row.RUA}</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="body2" gutterBottom><span style={{ fontWeight: 'bold' }}>Numero: </span> {row.NUMERO}</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="body2" gutterBottom><span style={{ fontWeight: 'bold' }}>Complemento: </span> {row.COMPLEMENTO}</Typography>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Grid container >
                                                <Grid item xs={12}>
                                                    <Typography variant="body2" gutterBottom><span style={{ fontWeight: 'bold' }}>Telefone: </span> {row.TELEFONE}</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="body2" gutterBottom><span style={{ fontWeight: 'bold' }}>Email: </span> {row.EMAIL}</Typography>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Grid container >
                                                <Grid item xs={6}>
                                                    <Link to={"/Editar/" + row.ID} >
                                                    <Tooltip title="Editar">
                                                        <EditIcon style={{ color: '#4169E1', cursor: 'pointer' }} />
                                                        </Tooltip>
                                                    </Link>

                                                </Grid>
                                                <Grid item xs={6}>
                                                <Tooltip title="Deletar">
                                                    <DeleteForeverIcon style={{ color: '#FF6347', cursor: 'pointer' }}
                                                        // onClick={() => handleDelete(row.ID)}
                                                        onClick={() => setConfirmDialog({
                                                            isOpen: true,
                                                            title: "Excluir Fornecedor?",
                                                            subtitle: "Esta ação não podera ser desfeita",
                                                            onConfirm: () => { handleDelete(row.ID) }
                                                        })}
                                                    />
                                                 </Tooltip>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <ConfirmDialog
                                            confirmDialog={confirmDialog}
                                            setConfirmDialog={setConfirmDialog}
                                        />
                                    </TableRow>
                                ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    style={{ width: "auto", tableLayout: "auto" }}
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={dataApi.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>

                    </Table>

                </TableContainer>
            </Container>
        </>

    );
}