import React from 'react';
import { Button, TextField, Typography, List, ListItem, ListItemIcon, Grid} from '@mui/material';

const Homepage = () => {
  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
        <Typography variant='h2'>Welcome to Jon's Todo App</Typography>
        <Button onClick={() => alert('Button clicked!')}>Click Me!</Button>
        <p>This is a simple todo app built with Electron and React.</p>
        <Grid spacing={1} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid size={4}>
            <TextField variant='outlined' placeholder="Add a new task"/>
          </Grid>
          <Grid size={2} sx={{ display:'flex', alignItems: 'center' }}>
            <Button variant='contained' sx={{marginLeft:'1rem'}} >Add Task</Button>
          </Grid>
        </Grid>
        <Grid container spacing={2}  justifyContent={'center'} alignItems='center'>
          <Grid size={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <List>
              
              <ListItem>
                <ListItemIcon>1.</ListItemIcon>Task 1</ListItem>
              <ListItem>Task 2</ListItem>
              <ListItem>Task 3</ListItem>
            </List>
          </Grid>
        </Grid>
        <Button variant='contained' onClick={() => alert('Task completed!')}>Complete Task</Button>
    </div>
  );
};

export default Homepage;