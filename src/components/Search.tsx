import { useState, useEffect, ReactElement, FC, useRef } from "react";
import { useAction, useTypedSelector } from "../redux/hooks";

import { TextField, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PreviewIcon from '@mui/icons-material/Preview';
import Button from '@mui/material/Button';
import { useConfirm } from "material-ui-confirm";
import MaterialTable from 'material-table';
// @ts-ignore
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import '../style/Search.css'

const Search: FC<{}> = (): ReactElement => {

    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const fileName = "Users";

    const { users, error, loading } = useTypedSelector(state => state.users );

    const { fetchUsers } = useAction();
    const { deleteUsers } = useAction();

    const [searchText, setSearchText] = useState<string>('');
    const [selectedRow, setSelectedRow] = useState(null);
    const confirm = useConfirm();

    useEffect(() => {
       fetchUsers();
    }, []);

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

    const exportToCSV = () => {

        const tempArr = users.filter(user => (
            (user.formData.firstName.toLowerCase() +' '+ user.formData.lastName.toLowerCase()).includes(searchText.toLowerCase())
        )).map((res: any) => res.formData);

        const newData = tempArr.map( row => {
            delete row.tableData;
            delete row.id;
            return row
        });
        console.log('users for export', users);
        console.log('tempArr', tempArr);

        const ws = XLSX.utils.json_to_sheet(newData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };

    if(loading){
        return  <h1>Loading.....</h1>
    }
    if( error ){
        return <h1>Error: { error }</h1>
    }

    return (
        <div className='container'>
            <TextField
                fullWidth
                variant="outlined"
                defaultValue=""
                className='searchBar'
                label="Search"
                onChange={(event) => setSearchText(event.target.value)}
                InputProps={{
                    endAdornment: (
                        <IconButton>
                            <SearchOutlined />
                        </IconButton>
                    ),
                }}
            />
            <MaterialTable
                title="User List"
                actions={[
                    {
                        icon: () =>  <Button> Export excel </Button>,
                        tooltip: 'Export excel',
                        onClick: (event, rowData) =>  exportToCSV(),
                        isFreeAction: true
                    },
                ]}
                columns={[
                    // { title: '#', field: 'tableData.id' },
                    { title: 'First Name', field: 'firstName' },
                    { title: 'Last Name', field: 'lastName' },
                    // { title: 'E-mail', field: 'email' },
                    { title: 'City', field: 'city' },
                    { title: 'Postal/Zip', field: 'zip' },
                    { title: 'Address', field: 'address' },
                    { title: 'Age', field: 'age' },
                    {
                        title: "Action",
                        field: "internal_action",
                        render: (rowData) =>
                            rowData && (
                                <div>
                                    <IconButton href={ `/details/${rowData.id}` } color="primary" aria-label="view">
                                        <PreviewIcon fontSize="inherit" />
                                    </IconButton>
                                    <IconButton onClick={ () => handleDelete(rowData.id) } color="secondary" aria-label="delete">
                                        <DeleteForeverIcon fontSize="inherit" />
                                    </IconButton>
                                </div>
                            )
                    }
                ]}
                data={users.filter(user => (
                    (user.formData.firstName.toLowerCase() +' '+ user.formData.lastName.toLowerCase()).includes(searchText.toLowerCase())
                )).map((res: any) => { res.formData.id = res.id; return res.formData })}
                onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
                options={{
                    search: true,
                    exportButton: {
                        csv: true,
                        pdf: true
                    },
                    rowStyle: rowData => ({
                        backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
                        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                        fontSize: 14
                    }),
                    headerStyle: {
                        backgroundColor: '#01579b',
                        color: '#FFF'
                    }
                }}
                localization={{
                    toolbar: {
                        exportTitle: 'Download',
                        exportAriaLabel: 'Download',
                    },
                }}
            />
        </div>
    );
};

export default Search;
