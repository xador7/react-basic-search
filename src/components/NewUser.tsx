import React, { useState, ReactElement, FC } from "react";

import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

import { db } from '../firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

import { IUserData } from '../models/User'

export interface INewUserProps {}

const ValidationTextField = styled(TextField)({
    '& input:valid + fieldset': {
        borderColor: 'green',
        borderWidth: 1,
    },
    '& input:invalid + fieldset': {
        borderColor: 'red',
        borderWidth: 1,
    },
    '& input:valid:focus + fieldset': {
        borderLeftWidth: 6,
        padding: '4px !important',
    },
});

const NewUser: FC<INewUserProps> = (): ReactElement => {
    const [formData, setFormData] = useState<IUserData>({
        address: "",
        city: "",
        zip: "",
        age: 0,
        firstName: "",
        lastName: "",
        email: ""
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(values => ({...values, [name]: value}))
    };

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await addDoc(collection(db, 'users'), { formData });

        } catch (err) {
            console.log(err);
        }

        console.log('formData----->', formData)
    };

    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 2, md: 15 }, p: { xs: 2, md: 5}}}>
                <form onSubmit={ submitForm }>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { sm: '1fr 1fr' },
                            gap: 1,
                            margin: '0 auto',
                            maxWidth: '400px'
                        }}
                    >
                        <ValidationTextField
                            required
                            variant="outlined"
                            id="validation-outlined-input"
                            label="First Name"
                            name="firstName"
                            value={ formData.firstName }
                            onChange={ handleChange }
                            error={ formData.firstName === "" }
                            helperText={ formData.firstName === "" ? "This field is required!" : " " }
                        />
                        <ValidationTextField
                            required
                            variant="outlined"
                            id="validation-outlined-input"
                            label="Last Name"
                            name="lastName"
                            value={ formData.lastName }
                            onChange={ handleChange }
                            error={ formData.lastName === "" }
                            helperText={ formData.lastName === "" ? "This field is required!" : " " }
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { sm: '1fr' },
                            gap: 1,
                            margin: '0 auto',
                            maxWidth: '400px'
                        }}
                    >
                        <ValidationTextField
                            required
                            variant="outlined"
                            id="validation-outlined-input"
                            label="E-mail"
                            name="email"
                            type="email"
                            value={ formData.email }
                            onChange={ handleChange }
                            error={ formData.email === "" }
                            helperText={ formData.email === "" ? "This field is required!" : " " }
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { sm: '1fr 1fr' },
                            gap: 1,
                            margin: '0 auto',
                            maxWidth: '400px'
                        }}
                    >
                        <ValidationTextField
                            required
                            variant="outlined"
                            id="validation-outlined-input"
                            label="City"
                            name="city"
                            value={ formData.city }
                            onChange={ handleChange }
                            error={ formData.city === "" }
                            helperText={ formData.city === "" ? "This field is required!" : " " }
                        />
                        <ValidationTextField
                            required
                            variant="outlined"
                            id="validation-outlined-input"
                            label="Postal / Zip"
                            name="zip"
                            value={ formData.zip }
                            onChange={ handleChange }
                            error={ formData.zip === "" }
                            helperText={ formData.zip === "" ? "This field is required!" : " " }
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { sm: '1fr' },
                            gap: 1,
                            margin: '0 auto',
                            maxWidth: '400px'
                        }}
                    >
                        <ValidationTextField
                            required
                            variant="outlined"
                            id="validation-outlined-input"
                            label="Address"
                            name="address"
                            value={ formData.address }
                            onChange={ handleChange }
                            error={ formData.address === "" }
                            helperText={ formData.address === "" ? "This field is required!" : " " }
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { sm: '1fr 1fr' },
                            gap: 1,
                            margin: '0 auto',
                            maxWidth: '400px'
                        }}
                    >
                        <TextField
                            variant="outlined"
                            id="validation-outlined-input"
                            label="Age"
                            name="age"
                            type="number"
                            value={ formData.age }
                            onChange={ handleChange }
                            error={ formData.age === 0 }
                            helperText={ formData.age === 0 ? "this field is required!" : " " }
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gridTemplateColumns: { sm: '1fr 1fr' },
                            gap: 2,
                            margin: '0 auto',
                            marginTop: '20px',
                            maxWidth: '400px',
                        }}
                    >
                        <Button
                            style={{ padding: '8px 70px' }}
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Save
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default NewUser;
