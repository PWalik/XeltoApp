import React from 'react';
import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, TextField, 
  Accordion, AccordionSummary, AccordionDetails, 
  Table, Paper, TableCell, TableContainer, TableHead, TableRow, TableBody } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


function App() {
  const classes = useStyles();
  return (
    <div className="App-content">
        <div className="App-panel">
          <Accordion>
            <AccordionSummary>Filtruj tabelę</AccordionSummary>
            <AccordionDetails>
              <div class="Filter-panel">
                <div>
                  <a class = "element">
                  <TextField
                    id="dateFrom"
                    type="date"
                    label="czas od"
                    defaultValue=""
                    InputLabelProps={{
                    shrink: true,
                    }}
                  />
                  </a>
                  <a class = "element">
                  <TextField
                    id="user"
                    type="text"
                    label="użytkownik"
                    defaultValue=""
                    InputLabelProps={{
                    shrink: true,
                    }}
                  />
                  </a>
                </div>
                <div>
                  <a class = "element">
                    <TextField
                      id="dateTo"
                      type="date"
                      label="czas do"
                      defaultValue=""
                      InputLabelProps={{
                      shrink: true,
                      }}
                    />
                  </a>
                  <a class = "element">
                    <TextField
                      id="state"
                      type="text"
                      label="status"
                      defaultValue=""
                      InputLabelProps={{
                      shrink: true,
                      }}
                    />
                  </a>
                <div class = "element">
                  <Button style= {{padding: 5}}>filtruj</Button>
                  </div>
                </div>
              </div>
          </AccordionDetails>
        </Accordion>
        </div>
        <div className="App-panel">
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Użytkownik</TableCell>
            <TableCell align="right">Domena</TableCell>
            <TableCell align="right">Magazyn</TableCell>
            <TableCell align="right">Operation Name</TableCell>
            <TableCell align="right">Operation Status</TableCell>
            <TableCell align="right">Operation Category</TableCell>
            <TableCell align="right">Exception Type</TableCell>
            <TableCell align="right">Start Time</TableCell>
            <TableCell align="right">End Time</TableCell>
            <TableCell align="right">Duration Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
        <div className='rowC'>
          <a class="App-panel">   
          <Accordion>
            <AccordionSummary>INPUT XML</AccordionSummary>
            <AccordionDetails> 
              Edit <code>src/App.js</code> and save to reload.
              <Button>Hey</Button>
            </AccordionDetails>  
          </Accordion>
          </a>
          <a class="App-panel">      
          <Accordion>
            <AccordionSummary>OUTPUT XML</AccordionSummary>
            <AccordionDetails> 
              Edit <code>src/App.js</code> and save to reload.
              <Button>Hey</Button>
            </AccordionDetails>  
          </Accordion>
          </a>
        </div>
    </div>
  );
}

export default App;
