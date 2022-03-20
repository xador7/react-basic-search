import React, { ReactElement, FC } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            margin: "0 auto",
            width: "53%"
        },
        link: {
            paddingLeft: "20px",
            color: "white",
            textDecoration: "none",
        },
        toolbar: {
            // border: "1px solid red"
        }
    }),
);

export interface INavigationProps {}

const Navigation: FC<INavigationProps> = (): ReactElement => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={ classes.toolbar }>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        {/*<MenuIcon />*/}
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <RouterLink  to="/search" className={ classes.link }>
                            <Button color="inherit">Search</Button>
                        </RouterLink>
                        <RouterLink  to="/new-user" className={ classes.link }>
                            <Button color="inherit">Add User</Button>
                        </RouterLink>
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navigation;
