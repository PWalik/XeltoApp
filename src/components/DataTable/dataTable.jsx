import React, { Component } from 'react';
import { Table, Paper, TableCell, TableContainer, TableHead, TableRow, TableBody } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
/*
const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];
*/
export default class DataTable extends Component {
classes;
    constructor(props) {
        super(props);
        this.classes = useStyles;
    }

    componentDidUpdate() {
        this.createRows();
    }

    createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }
    
    createRows() {
        var data = this.props.data;
        console.log(data);
    }
    
    render() {
        return (
            <TableContainer component={Paper}>
                <Table className={this.classes.table} aria-label="simple table">
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
        );
    }
}

export { DataTable }