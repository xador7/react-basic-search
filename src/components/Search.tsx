import { useState, useEffect, ReactElement, FC } from "react";

import { TextField, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PreviewIcon from '@mui/icons-material/Preview';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useConfirm } from "material-ui-confirm";

import {
    collection,
    query,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

import '../style/Search.css'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Search: FC<{}> = (): ReactElement => {

    const [value, setValue] = useState<string>('');
    const [result, setResult] = useState<any>([]);
    const confirm = useConfirm();

    useEffect(() => {
        const q = query(collection(db, "users"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let tasksArray: any = [];
            querySnapshot.forEach((doc) => {
                tasksArray.push({ ...doc.data(), id: doc.id });
            });
            setResult([]);
            let searchQuery = value.toLocaleLowerCase();
            console.log('searchQuery', searchQuery);
            console.log('tasksArray', tasksArray);
            for(const key in tasksArray){
                let person = tasksArray[key].formData.firstName.toLowerCase() +" "+ tasksArray[key].formData.lastName.toLowerCase();
                console.log('person',person);
                if(person.slice(0, searchQuery.length).indexOf(searchQuery) !== -1){
                    setResult( (prevResult: any) => {
                        return [...prevResult, tasksArray[key]];
                    });
                }
            }
            console.log('tasksArray', tasksArray);
        });
        return () => unsub();
    }, [value]);

    const deleteItem =  async (id: string) => {
        const taskDocRef = doc(db, 'users', id);
        try{
            await deleteDoc(taskDocRef)
        } catch (err) {
            alert(err)
        }
    };

    const handleDelete = (id: string) => {
        console.log('Item ID ------------->', id);
        confirm({title: 'Delete!', description: `Are you sure you want to delete this user?` })
            .then(() => deleteItem(id))
            .catch(() => console.log("Deletion cancelled."));
    };

    return (
        <div className='container'>
            <TextField
                fullWidth
                variant="outlined"
                defaultValue=""
                className='searchBar'
                label="Search"
                onChange={(event) => setValue(event.target.value)}
                InputProps={{
                    endAdornment: (
                        <IconButton>
                            <SearchOutlined />
                        </IconButton>
                    ),
                }}
            />
            <TableContainer component={ Paper } className="customized-table-container">
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell align="right">First Name</StyledTableCell>
                            <StyledTableCell align="right">Last Name</StyledTableCell>
                            <StyledTableCell align="right">City</StyledTableCell>
                            <StyledTableCell align="right">Postal/Zip</StyledTableCell>
                            <StyledTableCell align="right">Address</StyledTableCell>
                            <StyledTableCell align="right">Age</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { result.map( (item: any, index: any) => (
                            <StyledTableRow key={ index + 1 }>
                                <StyledTableCell component="th" scope="row" className="first-col">
                                    { index + 1 + '.' }
                                </StyledTableCell>
                                <StyledTableCell align="right">{item.formData.firstName}</StyledTableCell>
                                <StyledTableCell align="right">{item.formData.lastName}</StyledTableCell>
                                <StyledTableCell align="right">{item.formData.city}</StyledTableCell>
                                <StyledTableCell align="right">{item.formData.zip}</StyledTableCell>
                                <StyledTableCell align="right">{item.formData.address}</StyledTableCell>
                                <StyledTableCell align="right">{item.formData.age}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {/*<Button href={`/details/${item.id}`} variant="outlined" startIcon={<PreviewIcon />}>*/}
                                    {/*    View*/}
                                    {/*</Button>*/}
                                    {/*<Button onClick={() => handleDelete(item.id)} variant="outlined" color="secondary" startIcon={<DeleteForeverIcon />}>*/}
                                    {/*    Delete*/}
                                    {/*</Button>*/}
                                    <IconButton href={ `/details/${item.id}` } color="primary" aria-label="view">
                                        <PreviewIcon fontSize="inherit" />
                                    </IconButton>
                                    <IconButton onClick={ () => handleDelete(item.id) } color="secondary" aria-label="delete">
                                        <DeleteForeverIcon fontSize="inherit" />
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Search;
