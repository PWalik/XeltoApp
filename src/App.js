import React, { Component } from 'react';
import FilterForm from './components/FilterForm/filterForm';
import DataTable from './components/DataTable/dataTable';
import XMLFields from './components/XMLFields/XMLFields';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button, Box, TextField,
  Accordion, AccordionSummary, AccordionDetails,
  Table, Paper, TableCell, TableContainer, TableHead, TableRow, TableBody, TablePagination, TableFooter
} from '@material-ui/core';


const xmlone = "<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>";
const xmltwo = "<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me next weekend!</body></note>";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const classes = useStyles;


export default class App extends Component {
  dataTable;
  constructor(props) {

    super(props);
    this.state = {
      data: [{}],
      filteredData: [{}],
      rowsPerPage: 5,
      page: 0,
      nameFilter: "",
      statusFilter: ""
    }
    this.GetData();
    this.GetData = this.GetData.bind(this);
    this.filterData = this.filterData.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this); 
    this.onDateFromChange = this.onDateFromChange.bind(this); 
    this.onDateToChange = this.onDateToChange.bind(this); 
    this.setFilterData = this.setFilterData.bind(this); 
    this.onFilterClear = this.onFilterClear.bind(this);
  }

  setPage(value) {
    this.setState({
      page: value
    })
  }

  setRowsPerPage(value) {
    this.setState({
      rowsPerPage: value
    })
  }

  async GetData() {
    try {
      const response = await fetch("http://localhost:8080/list", {
        method: "GET",
        credentials: 'same-origin',
        headers: { 'Content-type': 'text/plain' }
      });
      const json = await response.json();
      this.setState({
        data: json.recordset,
        selected: -1
      });
    }
    catch {
      var dat = this.createData(100);
      this.setState({
        data: dat,
        selected: -1
      });
    }
    this.setState({
      filteredData: this.state.data
    })
  }

  createRow(i) {
    var row = { Id: i, LogFileName: "" + i, MobileDomain: "" + i, Branch: "" + i, OperationName: "" + i, Status: "" + i, Category: "" + i, ExceptionType: "" + i, StartTime: this.startRandomDate().toDateString(), EndTime: this.endRandomDate().toDateString(), Duration: "" + i, Input: "input" + i, Output: "output" + i }
    return row;
  }

  createData(j) {
    var datas = [];
    for (var i = 0; i < j; i++) {
      datas.push(this.createRow(i));
    }
    return datas;
  }


  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  handleChangeRowsPerPage = (event) => {
    this.setRowsPerPage(parseInt(event.target.value, 10));
    this.setPage(0);
  };

  handleClick = (event, Id, Input, Output) => {
    this.setState({
      input: Input,
      output: Output,
      selected: Id
    });
    this.forceUpdate();
  }

  onNameChange(event)
  {
    this.setState({
      tempName: event.target.value
    });
  }

  onDateFromChange(event)
  {
    this.setState({
      tempDateFrom: event.target.value
    });
  }

  onDateToChange(event)
  {
    this.setState({
      tempDateTo: event.target.value
    },
    );
  }
  onStatusChange(event)
  {
    this.setState({
     tempStatus: event.target.value
    });
  }

  onFilterClear() 
  {
    this.setState({
      tempStatus: "",
      tempName: "",
      tempDateFrom: "",
      tempDateTo: "",
      nameFilter: "",
      statusFilter: "",
      dateToFilter: "",
      dateFromFilter: "",
      filteredData: this.state.data,
      page: 0
    },
    this.forceUpdate());
  }


  filterData() {
    var filtered = [];
    var row;
    for(var i = 0; i < this.state.data.length; i++)
    {
      row = this.state.data[i];
      if ((!this.state.nameFilter || this.state.nameFilter == "" || row.LogFileName.includes(this.state.nameFilter)) && 
      (!this.state.statusFilter || this.state.statusFilter == "" || row.Status.includes(this.state.statusFilter)) && 
      (!this.state.dateFromFilter || Date.parse(this.state.dateFromFilter) <= Date.parse(row.StartTime)) &&
      (!this.state.dateToFilter || Date.parse(this.state.dateToFilter) >= Date.parse(row.EndTime)))
        filtered.push(row);
    }
    this.setState({
      filteredData: filtered,
      page: 0
    },
    this.forceUpdate
    );
  }

  setFilterData() {
    this.setState({
      nameFilter: this.state.tempName,
      statusFilter: this.state.tempStatus,
      dateFromFilter: this.state.tempDateFrom,
      dateToFilter: this.state.tempDateTo
    },
    this.filterData);
  }



startRandomDate() {
    var start = new Date(2001, 0, 1);
    var end = new Date(2005, 0, 5);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

endRandomDate() {
  var start = new Date(2010, 0, 1);
  var end = new Date(2020, 0, 5);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
 

  isSelected = (id) => this.state.selected == id;

  render() {
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
          <Accordion>
        <AccordionSummary>Filtruj tabelę</AccordionSummary>
        <AccordionDetails>
          <div class="Filter-panel">
            <div>
              <a class="element">
                <TextField
                  id="dateFrom"
                  type="datetime-local"
                  label="czas od"
                  value={this.state.tempDateFrom}
                  onChange= {this.onDateFromChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </a>
              <a class="element">
                <TextField
                  id="user"
                  type="text"
                  label="użytkownik"
                  value={this.state.tempName}
                  onChange={this.onNameChange}
                  defaultValue=""
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </a>
            </div>
            <div>
              <a class="element">
                <TextField
                  id="dateTo"
                  type="datetime-local"
                  label="czas do"
                  value={this.state.tempDateTo}
                  onChange= {this.onDateToChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </a>
              <a class="element">
                <TextField
                  id="state"
                  type="text"
                  label="status"
                  value={this.state.tempStatus}
                  onChange={this.onStatusChange}
                  defaultValue=""
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </a>
              <div class="element">
                <Button style={{ padding: 5 }} onClick = {this.setFilterData}>filtruj</Button> 
                <Button style={{ padding: 5 }} onClick = {this.onFilterClear}>wyczyść</Button>
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
                  {this.state.filteredData.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row, index) => {
                    const isItemSelected = this.isSelected(row.Id)
                      return (
                        <TableRow
                          hover
                          key={row.Id}
                          onClick={(event) => this.handleClick(event, row.Id, row.Input, row.Output)}
                          selected={isItemSelected}>
                          <TableCell component="th" scope="row" align = "right">{row.LogFileName}</TableCell>
                          <TableCell align="right">{row.MobileDomain}</TableCell>
                          <TableCell align="right">{row.Branch}</TableCell>
                          <TableCell align="right">{row.OperationName}</TableCell>
                          <TableCell align="right">{row.Status}</TableCell>
                          <TableCell align="right">{row.Category}</TableCell>
                          <TableCell align="right">{row.ExceptionType}</TableCell>
                          <TableCell align="right">{row.StartTime}</TableCell>
                          <TableCell align="right">{row.EndTime}</TableCell>
                          <TableCell align="right">{row.Duration}</TableCell>
                        </TableRow>
                      )
                  })}
                </TableBody>
                <TableFooter>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    count={this.state.filteredData.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                </TableFooter>
              </Table>
            </TableContainer>
          </div>
          <div className='rowC'>
            <a class="App-panel">
              <Accordion expanded={true}>
                <AccordionSummary>INPUT XML</AccordionSummary>
                <AccordionDetails>
                  <code>{this.state.input}</code>
                </AccordionDetails>
              </Accordion>
            </a>
            <a class="App-panel">
              <Accordion expanded={true}>
                <AccordionSummary>OUTPUT XML</AccordionSummary>
                <AccordionDetails>
                  <code>{this.state.output}</code>
                </AccordionDetails>
              </Accordion>
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
