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
        return(    
            <div className='rowC'>
            <a class="App-panel">   
                <Accordion>
                    <AccordionSummary>INPUT XML</AccordionSummary>
                    <AccordionDetails> 
                        <code>{this.state.xml1}</code>
                    </AccordionDetails>  
                </Accordion>
                </a>
                <a class="App-panel">      
                <Accordion>
                    <AccordionSummary>OUTPUT XML</AccordionSummary>
                    <AccordionDetails> 
                        <code>{this.state.xml2}</code>
                    </AccordionDetails>  
                </Accordion>
            </a>
            </div>
        );
    }
}

export {XMLFields}