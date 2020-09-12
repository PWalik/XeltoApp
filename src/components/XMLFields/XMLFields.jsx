import React, {Component} from 'react';
import { Button, TextField, 
    Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';

export default class XMLFields extends Component {

    constructor(props) {
        super(props);
        this.state={
            xml1: this.props.xmlone,
            xml2: this.props.xmltwo
        }
    }

    render() {
        return;
    }
}

export {XMLFields}