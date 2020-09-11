import React, { Component } from 'react';
import FilterForm from './components/FilterForm/filterForm';
import DataTable from './components/DataTable/dataTable';
import XMLFields from './components/XMLFields/XMLFields';
import './App.css';
import {
  Button, Box, TextField,
  Accordion, AccordionSummary, AccordionDetails,
  Table, Paper, TableCell, TableContainer, TableHead, TableRow, TableBody
} from '@material-ui/core';


function App() {
  const xmlone = "<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>";
  const xmltwo = "<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me next weekend!</body></note>";
  return (
    <React.Fragment>
      <div className="App-content">
        <div className="App-panel">
          <header>
            <h1>Zadanie testowe Xalto</h1>
            <h2 style={{ textAlign: "center" }}>Patryk Walicki</h2>
          </header>
        </div>
        <div className="App-panel">
          <FilterForm />
        </div>
        <div className="App-panel">
          <DataTable />
        </div>
        <XMLFields xmlone={xmlone} xmltwo={xmltwo} />
      </div>
    </React.Fragment>
  );
}

export default App;
