import React, { Component } from 'react';
import {
  Button, TextField,
  Accordion, AccordionSummary, AccordionDetails
} from '@material-ui/core';

export default class FilterForm extends Component {

  constructor(props)
  {
    super(props);
    this.state= {
      name: "",
      status: ""
    }
    this.onNameChange = this.onNameChange.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
  }





  render() {
    return;
  }
}

export { FilterForm }