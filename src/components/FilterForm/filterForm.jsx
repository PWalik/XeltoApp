import React, { Component } from 'react';
import {
  Button, TextField,
  Accordion, AccordionSummary, AccordionDetails
} from '@material-ui/core';

export default class FilterForm extends Component {
  render() {
    return (
      <Accordion>
        <AccordionSummary>Filtruj tabelę</AccordionSummary>
        <AccordionDetails>
          <div class="Filter-panel">
            <div>
              <a class="element">
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
              <a class="element">
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
              <a class="element">
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
              <a class="element">
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
              <div class="element">
                <Button style={{ padding: 5 }}>filtruj</Button>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    );
  }
}

export { FilterForm }