import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import APIService from '../../utils/service/APIService';
import { withStyles, makeStyles } from "@material-ui/core";
import { Typography } from "../../utils/Material-UI/components";
import {NavLink} from "react-router-dom";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '../../utils/Material-UI/import';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14

    }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        }
    }
}))(TableRow);


const useStyles = makeStyles((theme) => ({
    table: {
        // minWidth: 700,
        width: '90%'

    },
    root: {
        display: 'flex',
        flexGrow: 2,
        width: '100%',
        flexWrap: 'wrap'
    },
    underLine: {
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        display: 'inline-block'
    },
    tableContainer: {
        width: '90%',
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    typo: {
        margin: 'auto',
        marginBottom: '30px',
        marginTop: '10px'

    }
}));

const createData = (date, applied, inprogress, interview, rejected, accepted) => {
    return { date, applied, inprogress, interview, rejected, accepted };
};

const initRows = [
    createData(' ', '', '', '', '', '')
];

const rows = [
    createData('17/05/20', 0, 0, 0, 0),
    createData('16/05/20', 0, 0, 0, 0),
    createData('14/05/20', 0, 0, 0, 0),
    createData('12/05/20', 0, 0, 0, 0)
];

const createRows = (tableData) => {
    const rowsArray = [];
    for (let i = 0; i < tableData.length; i++) {
        let currentDate = tableData[i].date;
        let appliedAmount = 0;
        let interviewAmount = 0;
        let inprogressAmount = 0;
        let rejectedAmount = 0;
        let acceptedAmount = 0;

        tableData[i].data.map(item => {
            if (item.type === 'applied') {
                appliedAmount = item.amount;
            }
            if (item.type === 'interview') {
                interviewAmount = item.amount;
            }
            if (item.type === 'inprogress') {
                inprogressAmount = item.amount;
            }
            if (item.type === 'rejected') {
                rejectedAmount = item.amount;
            }
            if (item.type === 'accepted') {
                acceptedAmount = item.amount;
            }
        });
        rowsArray.push({
            date: currentDate,
            applied: appliedAmount,
            inprogress: inprogressAmount,
            interview: interviewAmount,
            rejected: rejectedAmount,
            accepted: acceptedAmount
        });
    }
    return rowsArray;
};

const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
            currentValue.type
        );
        return result;
    }, {});

};

const sortDates  = (array) => {
    let current = null;
    let cnt = 0;
    const sorted = [];

    for (let i = 0; i < array.length; i++) {
        if (array[i] !== current) {
            if (cnt > 0) {
                sorted.push({
                    type: current,
                    amount: cnt
                });
            }
            current = array[i];
            cnt = 1;
        }
        else {
            cnt ++;
        }
    }
    if (cnt > 0) {
        sorted.push({
            type: current,
            amount: cnt
        });
    }
    return sorted;
};


const parseData = (data) => {
    const parsedData = [];
    const tableData = [];
    data.forEach(item => {
        parsedData.push({
            time: item.time,
            type: item.status
        });
    });
    const typesByDate = groupBy(parsedData, 'time');
    for (let key in typesByDate) {
        typesByDate[key].sort();
    }

    for (let key in typesByDate) {
        let temp = sortDates(typesByDate[key]);
        tableData.push({
            date: key,
            data: temp
        });
    }
    // Sort by date in ascending order
    tableData.sort((a, b) => {
        if (a.data > b.date) return -1;
        if (a.date < b.date) return 1;
        return 0;

    });
    const fixedRows = createRows(tableData);
    return fixedRows;
};

const UserAnalysis = () => {
    const classes = useStyles();
    const auth = useSelector((state) => state.auth);
    const {user: {user: {uid} = {}}} = auth;
    const userApplications = [];
    const [tableData, setTableData] = useState(initRows);
    let fixedRows = [];

    useEffect(() => {
        APIService.getUserAnalysisData(uid)
            .then(response => {
                for (let key in response.data) {
                    userApplications.push(response.data[key]);
                }
                fixedRows = parseData(userApplications);
                setTableData(fixedRows);
            })
            .catch();
    }, []);

    return (
        <div className={classes.root}>
            <Typography className={classes.typo} variant="h6">
                <NavLink to="/dashboard" className={classes.underLine}>Back</NavLink>
            </Typography>
            <br/>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell align="right">Applied</StyledTableCell>
                            <StyledTableCell align="right">In Progress</StyledTableCell>
                            <StyledTableCell align="right">Interview</StyledTableCell>
                            <StyledTableCell align="right">Rejected</StyledTableCell>
                            <StyledTableCell align="right">Accepted</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row) => (
                            <StyledTableRow key={row.date}>
                                <StyledTableCell component="th" scope="row">
                                    {row.date}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.applied}</StyledTableCell>
                                <StyledTableCell align="right">{row.inprogress}</StyledTableCell>
                                <StyledTableCell align="right">{row.interview}</StyledTableCell>
                                <StyledTableCell align="right">{row.rejected}</StyledTableCell>
                                <StyledTableCell align="right">{row.accepted}</StyledTableCell>
                            </StyledTableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

};

export default UserAnalysis;
