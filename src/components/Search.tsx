import { useState, useEffect, ReactElement, FC } from "react";
import {  TextField, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import './Search.css'

const Search: FC<{}> = (): ReactElement => {
// function Search(props:{}){

    const [value, setValue] = useState<string>('');
    const [result, setResult] = useState<string[]>([]);
    useEffect(() => {
        if(value.length > 0){
            fetch('https://react-basic-search-default-rtdb.europe-west1.firebasedatabase.app/names.json')
                .then(
                    response => response.json()
                ).then( responseData => {
                    console.log('responseData', responseData);
                    setResult([]);
                    let searchQuery = value.toLocaleLowerCase();
                    console.log('searchQuery', searchQuery);
                    for(const key in responseData){
                        let person = responseData[key].toLowerCase();
                        console.log('person',person);
                        if(person.slice(0, searchQuery.length).indexOf(searchQuery) !== -1){
                            setResult( prevResult => {
                                return [...prevResult, responseData[key]];
                            });
                        }
                    }
                }).catch(error => {
                    console.log(error);
                })
        }else{
            setResult([]);
        }
    }, [value]);

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
            <div className='searchList'>
                { result.map((result, index) => (
                        <a href='#' key={index}>
                            <div className='searchEntry'>
                                { result }
                             </div>
                        </a>
                    ))}
            </div>
        </div>
    );
}

export default Search;
