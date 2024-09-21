import { Container,  Toolbar } from '@mui/material';
import React from 'react';
import { blue } from '@mui/material/colors';
import Additem from './Additem';
import Todolist from './Todolist';
 

const Body = () => {
  return (
    <Container maxWidth="md" sx={{
        display:'flex',
        flexDirection:'column',
        mt:4,
        gap:4
    }} >
        <Toolbar>
        <Additem/>
        </Toolbar>
        <Toolbar>
        <Todolist/>
        </Toolbar>
    </Container>
  );
}

export default Body;
