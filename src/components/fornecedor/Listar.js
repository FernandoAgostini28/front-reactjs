import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ConfirmDialog from '../notificacao/dialog';
import {
    Link
  } from "react-router-dom";






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
            .then(data => { if(data.erro === false ){ window.location.reload()}})
            .catch(err => console.log(err));

    };
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 }} aria-label="caption table">
                    <caption>A basic table example with a caption</caption>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Empresa</TableCell>
                            <TableCell align="right">Endereço</TableCell>
                            <TableCell align="right">Contato</TableCell>
                            <TableCell align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataApi?.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="right">
                                    <Grid container >
                                        <Grid item xs={12}>
                                            <Typography variant="body2" gutterBottom>{row.NOME}</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2" gutterBottom>{row.RAZAO_SOCIAL}</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2" gutterBottom>{row.CNPJ}</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2" gutterBottom>{row.SEGMENTO}</Typography>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell align="right">
                                    <Grid container >
                                        <Grid item xs={12}>
                                            <Typography variant="body2" gutterBottom>{row.CEP}</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2" gutterBottom>{row.RUA}</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2" gutterBottom>{row.NUMERO}</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2" gutterBottom>{row.COMPLEMENTO}</Typography>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell align="right">
                                    <Grid container >
                                        <Grid item xs={12}>
                                            <Typography variant="body2" gutterBottom>{row.TELEFONE}</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2" gutterBottom>{row.EMAIL}</Typography>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell align="right">
                                    <Grid container >
                                        <Grid item xs={6}>
                                            <Link to={"/Editar/" + row.ID} >
                                                <EditIcon style={{ color: '#4169E1', cursor: 'pointer' }} />
                                            </Link>

                                        </Grid>
                                        <Grid item xs={6}>
                                            <DeleteForeverIcon style={{ color: '#FF6347', cursor: 'pointer' }}
                                                // onClick={() => handleDelete(row.ID)}
                                                onClick={() => setConfirmDialog({
                                                    isOpen: true,
                                                    title: "Excluir Fornecedor?",
                                                    subtitle: "Esta ação não podera ser desfeita",
                                                    onConfirm: () => { handleDelete(row.ID) }
                                                })}
                                            />

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

                </Table>

            </TableContainer>
        </>

    );
}