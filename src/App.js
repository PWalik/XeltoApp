import React, { Component } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { plPL } from '@material-ui/core/locale';
import {
  Button, TextField,
  Accordion, AccordionSummary, AccordionDetails,
  Table, Paper, TableCell, TableContainer, TableHead, TableRow, TableBody, TablePagination, TableFooter
} from '@material-ui/core';
//style for the table
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
//theme showing the default translation option (polish)
const theme = createMuiTheme({}, plPL);
const classes = useStyles;


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //fetched row data
      data: [{}],
      //how many rows per one page of the table
      rowsPerPage: 5,
      //which page of the table are we on
      page: 0,
      nameFilter: "",
      statusFilter: ""
    }
    this.getData();
    this.getData = this.getData.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.onDateFromChange = this.onDateFromChange.bind(this);
    this.onDateToChange = this.onDateToChange.bind(this);
    this.setFilterData = this.setFilterData.bind(this);
    this.onFilterClear = this.onFilterClear.bind(this);
    this.setRowsPerPage = this.setRowsPerPage.bind(this);
    this.setPage = this.setPage.bind(this);
    this.getOutputOfXml = this.getOutputOfXml.bind(this);
  }

  //set the value of page, then fetch needed rows
  setPage(value) {
    this.setState({
      page: value
    }, this.getData);
  }

  //set the value of rowsPerPage, then fetch needed rows
  setRowsPerPage(value) {
    this.setState({
      rowsPerPage: value
    }, this.getData);
  }

  //fetch data by building an SQL query and sending it to the server
  async getData() {
    try {
      var data = this.buildQuery();
      const response = await fetch("http://localhost:8080/list", {
        method: "POST",
        credentials: 'same-origin',
        headers: { 'Content-type': 'text/plain' },
        body: JSON.stringify(data)
      });
      const json = await response.json();
      this.setState({
        data: json.recordset,
        selected: -1
      }, this.forceUpdate);
    }
    //catch an error and display it
    catch (err) {
      console.error(err);
    }
  }

  //build a query with filters and pagination
  buildQuery() {
    //basic query
    var objectQuery = "SELECT * FROM dbo.LogHeader ";
    //have we added a "WHERE" statement in the sql yet?
    var whereAdded = false;
    var filter = "";
    if (this.state.nameFilter && this.state.nameFilter != "") {
      filter += this.addFilterStartToQuery(whereAdded) + "CHARINDEX('" + this.state.nameFilter + "', MobileUserId) > 0 "
      whereAdded = true;
    }
    if (this.state.statusFilter && this.state.nameFilter != "") {
      filter += this.addFilterStartToQuery(whereAdded) + "CHARINDEX('" + this.state.statusFilter + "', Status) > 0 "
      whereAdded = true;
    }
    if (this.state.dateFromFilter && this.state.dateFromFilter != "") {
      //cast AuditDate to miliseconds so it can be checked with our date filter
      filter += this.addFilterStartToQuery(whereAdded) + "cast(DATEDIFF(s, '19700101', cast(AuditDate as datetime)) as bigint) * 1000 >= " + Date.parse(this.state.dateFromFilter) + " ";
      whereAdded = true;
    }
    if (this.state.dateToFilter && this.state.dateToFilter != "") {
      filter += this.addFilterStartToQuery(whereAdded) + "cast(DATEDIFF(s, '19700101', cast(AuditDate as datetime)) as bigint) * 1000 <= " + Date.parse(this.state.dateToFilter) + " ";
      whereAdded = true;
    }
    //if we had any filters, add it to the main query
    if (whereAdded)
      objectQuery += filter;
    //add pagination
    objectQuery += "ORDER BY MobileUserId OFFSET " + this.state.rowsPerPage * this.state.page + " ROWS FETCH NEXT " + this.state.rowsPerPage + " ROWS ONLY";
    return { query: objectQuery };
  }

  //parse the input XML, then get the fetch data from it
  async getOutputOfXml(xml) {
    var output = "";
    //read from xml and get all the requests
    //output += await this.fetchData();
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xml, "text/xml");
    var inputs = xmlDoc.getElementsByTagName("Inputs")[0];
    var anytype = xmlDoc.getElementsByTagName("anyType");
    for (var i = 0; i < anytype.length; i++) {
      output += await this.fetchData(anytype[i].attributes[0].textContent, anytype[i].attributes[1].textContent, anytype[i].childNodes[0].nodeValue);
    }
    //if output is undefined, just change to an empty string
    if (output == undefined)
      output = "";
    //set the output state and refresh the page
    output = "<OUTPUT>" + output + "</OUTPUT>";
    this.setState({
      output: output
    }, this.forceUpdate);
  }

  //fetch data as text with a certain value, type and link 
  async fetchData(link, type, value) {
    try {
      const response = await fetch(link, {
        method: "POST",
        mode: "no-cors",
        headers: { 'Content-type': type },
        body: value
      });
      return await response.body;
    }
    catch (err) {
      console.error(err);
    }
  }

  //add either WHERE or AND to the filter query
  addFilterStartToQuery(firstAdded) {
    if (!firstAdded) {
      return "WHERE "
    }
    return "AND "
  }

  //event handler for changing the page in the ui
  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  //event handler for changing the number of rows on one page in the ui
  handleChangeRowsPerPage = (event) => {
    this.setRowsPerPage(parseInt(event.target.value, 10));
    this.setPage(0);
  };

  //handler for clicking a table row
  handleClick = (event, Id, Input) => {
    this.setState({
      input: Input,
      selected: Id
    });
    this.getOutputOfXml(Input);
    this.forceUpdate();
  }

  //handler for changing filter name
  onNameChange(event) {
    this.setState({
      tempName: event.target.value
    });
  }
  //handler for changing filter DateFrom
  onDateFromChange(event) {
    this.setState({
      tempDateFrom: event.target.value
    });
  }
  //handler for changing filter DateTo
  onDateToChange(event) {
    this.setState({
      tempDateTo: event.target.value
    },
    );
  }
  //handler for changing filter Status
  onStatusChange(event) {
    this.setState({
      tempStatus: event.target.value
    });
  }
  //handler for clearing the filters
  onFilterClear() {
    this.setState({
      tempStatus: "",
      tempName: "",
      tempDateFrom: "",
      tempDateTo: "",
      nameFilter: "",
      statusFilter: "",
      dateToFilter: "",
      dateFromFilter: "",
      page: 0
    },
      this.getData);
  }
  //handler for setting the filter data, and fetching filtered rows
  setFilterData() {
    this.setState({
      nameFilter: this.state.tempName,
      statusFilter: this.state.tempStatus,
      dateFromFilter: this.state.tempDateFrom,
      dateToFilter: this.state.tempDateTo
    },
      this.getData);
  }

  isSelected = (id) => this.state.selected == id;

  render() {
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
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
                          onChange={this.onDateFromChange}
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
                          onChange={this.onDateToChange}
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
                        <Button style={{ padding: 5 }} onClick={this.setFilterData}>filtruj</Button>
                        <Button style={{ padding: 5 }} onClick={this.onFilterClear}>wyczyść</Button>
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
                      <TableCell align="right">Exception Name</TableCell>
                      <TableCell align="right">Start Time</TableCell>
                      <TableCell align="right">End Time</TableCell>
                      <TableCell align="right">Duration Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.data.map((row, index) => {
                      const isItemSelected = this.isSelected(row.Id)
                      return (
                        <TableRow
                          hover
                          key={row.Id}
                          onClick={(event) => this.handleClick(event, row.Id, row.Inputs, row.Output)}
                          selected={isItemSelected}>
                          <TableCell component="th" scope="row" align="right">{row.MobileUserId}</TableCell>
                          <TableCell align="right">{row.MobileDomain}</TableCell>
                          <TableCell align="right">{row.Branch}</TableCell>
                          <TableCell align="right">{row.OperationName}</TableCell>
                          <TableCell align="right">{row.Status}</TableCell>
                          <TableCell align="right">{row.Category}</TableCell>
                          <TableCell align="right">{row.ExceptionType}</TableCell>
                          <TableCell align="right">{row.ExceptionMessage}</TableCell>
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
                      rowsPerPage={this.state.rowsPerPage}
                      page={this.state.page}
                      count={-1}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                      labelDisplayedRows={({ from, to, count }) => "" + from + "-" + to + " z " + (count == -1 ? "więcej niż " + to : count) + ""}
                    />
                  </TableFooter>
                </Table>
              </TableContainer>
            </div>
            <div className='rowC'>
              <a class="App-panel">
                <h2>INPUT XML</h2>
                <code>{this.state.input}</code>
              </a>
              <a class="App-panel">
                <h2>OUTPUT XML</h2>
                <code>{this.state.output}</code>
              </a>
            </div>
          </div>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
