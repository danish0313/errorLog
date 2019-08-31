import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  nav: {

    backgroundColor: '#171c42',
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.nav} >
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="primary" aria-label="menu">

          </IconButton>
          <Typography variant="h6" className={classes.title}>
          Error Logs !

          </Typography>

        </Toolbar>
      </AppBar>
    </div>
  );
}
