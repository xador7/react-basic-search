import { useState, useEffect, ReactElement, FC } from "react";
import { useAction, useTypedSelector } from "../redux/hooks";

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

     const { users, error, loading } = useTypedSelector(state => state.users );

    const { fetchUsers } = useAction();
    const { deleteUsers } = useAction();
    const { searchUsers } = useAction();

    const [value, setValue] = useState<string>('');
    // const [result, setResult] = useState<string[]>([]);
    const confirm = useConfirm();

    useEffect(() => {
        //fetchUsers();
    }, []);

    useEffect(() => {

        fetchUsers();
        console.log('users ------------> ', users);
        console.log('error ------------> ', error);
        console.log('loading ------------> ', loading);

        searchUsers(users, value.toLocaleLowerCase());

        // setResult([]);
        // let searchQuery: string = value.toLocaleLowerCase();
        // console.log('searchQuery', searchQuery);
        // console.log('users in useEffect', users);
        // for( const key in users ){
        //     let person = users[key].formData.firstName.toLowerCase() +" "+ users[key].formData.lastName.toLowerCase();
        //     console.log('person',person);
        //     if(person.slice(0, searchQuery.length).indexOf(searchQuery) !== -1){
        //         setResult( (prevResult: any) => {
        //             return [...prevResult, users[key]];
        //         });
        //     }
        // }
    }, [value]);

    const deleteItem = (id: string) => {
        deleteUsers( id );

        // const taskDocRef = doc(db, 'users', id);
        // try{
        //     await deleteDoc(taskDocRef)
        // } catch (err) {
        //     alert(err)
        // }
        // setResult([]);
        // setResult( users );
    };

    const handleDelete = (id: string) => {
        console.log('Item ID ------------->', id);
        confirm({title: 'Delete!', description: `Are you sure you want to delete this user?` })
            .then(() => deleteItem(id))
            .catch(() => console.log("Deletion cancelled."));
    };

    if(loading){
        return  <h1>Loading.....</h1>
    }
    if( error ){
        return <h1>{ error }</h1>
    }

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
                        { users.map( (item: any, index: any) => (
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
