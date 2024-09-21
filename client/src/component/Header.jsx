 
import { AppBar, Toolbar, Typography  } from '@mui/material';
import React from 'react';
import { useContext } from 'react';

const Header = () => {
  return (
     <AppBar position="sticky" elevation={8} sx={{ width: '100%' }}>
        <Toolbar sx={{justifyContent:'center'}}>
        <Typography variant='h5' color='secondry' >
            Todo App
        </Typography>
       
        </Toolbar>
     </AppBar>
  );
}

export default Header;
