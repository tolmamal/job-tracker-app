import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import clsx from 'clsx';
import { AutoSizer, Column, Table } from 'react-virtualized';
import { withStyles, makeStyles } from "@material-ui/styles";
import { Grid, Card, CardHeader, CardContent, Paper, TableCell } from "@material-ui/core";
import APIService from '../../utils/service/APIService';
import { Typography } from "../../utils/Material-UI/components";
import { NavLink } from 'react-router-dom';

const styles = (theme) => ({
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    table: {
        '& .ReactVirtualized__Table__headerRow': {
            flip: false,
            paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
        },
    },
    tableRow: {
        cursor: 'pointer',
    },
    tableRowHover: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    tableCell: {
        flex: 1,
    },
    noClick: {
        cursor: 'initial',
    },


});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 2,
        width: '100%',
        flexWrap: 'wrap'
    },
    card: {
        height: 400,
    },
    underLine: {
        borderBottom: `2px solid #5F9EA0`,
        display: 'inline-block'
    },
    typo: {
        margin: 'auto',
        marginBottom: '30px',
        marginTop: '10px'

    },
}));

class MuiVirtualizedTable extends React.PureComponent {
    static defaultProps = {
        headerHeight: 48,
        rowHeight: 48,
    };

    getRowClassName = ({ index }) => {
        const { classes, onRowClick } = this.props;

        return clsx(classes.tableRow, classes.flexContainer, {
            [classes.tableRowHover]: index !== -1 && onRowClick != null,
        });
    };

    cellRenderer = ({ cellData, columnIndex }) => {
        const { columns, classes, rowHeight, onRowClick } = this.props;
        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, {
                    [classes.noClick]: onRowClick == null,
                })}
                variant="body"
                style={{ height: rowHeight }}
                align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
            >
                {cellData}
            </TableCell>
        );
    };

    headerRenderer = ({ label, columnIndex }) => {
        const { headerHeight, columns, classes } = this.props;

        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
                variant="head"
                style={{ height: headerHeight }}
                align={columns[columnIndex].numeric || false ? 'right' : 'left'}
            >
                <span>{label}</span>
            </TableCell>
        );
    };

    render() {
        const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
        return (
            <AutoSizer>
                {({ height, width }) => (
                    <Table
                        height={height}
                        width={width}
                        rowHeight={rowHeight}
                        gridStyle={{
                            direction: 'inherit',
                        }}
                        headerHeight={headerHeight}
                        className={classes.table}
                        {...tableProps}
                        rowClassName={this.getRowClassName}
                    >
                        {columns.map(({ dataKey, ...other }, index) => {
                            return (
                                <Column
                                    key={dataKey}
                                    headerRenderer={(headerProps) =>
                                        this.headerRenderer({
                                            ...headerProps,
                                            columnIndex: index,
                                        })
                                    }
                                    className={classes.flexContainer}
                                    cellRenderer={this.cellRenderer}
                                    dataKey={dataKey}
                                    {...other}
                                />
                            );
                        })}
                    </Table>
                )}
            </AutoSizer>
        );
    }
}

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

const sample = [
    ['Frozen yoghurt', 159, 6.0, 24, 4.0],
    ['Ice cream sandwich', 237, 9.0, 37, 4.3],
    ['Eclair', 262, 16.0, 24, 6.0],
    ['Cupcake', 305, 3.7, 67, 4.3],
    ['Gingerbread', 356, 16.0, 49, 3.9],
];

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

// function createData(id, dessert, calories, fat, carbs, protein) {
//     return { id, dessert, calories, fat, carbs, protein };
// }

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

for (let i = 0; i < 200; i += 1) {
    const randomSelection = sample[Math.floor(Math.random() * sample.length)];
    rows.push(createData(i, ...randomSelection));
}


const AnalysisTable = () => {
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
        <Grid className={classes.root} container xs={12} spacing={2}>
            <Grid item xs={12}>
                <Typography className={classes.typo} variant="h6">
                    <NavLink to="/dashboard" className={classes.underLine}>Back</NavLink>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Paper style={{ height: 400, width: '100%' }}>
                    <Card className={classes.card}>
                        <CardHeader title="Self Analysis"></CardHeader>
                        <CardContent>
                            <VirtualizedTable
                                rowCount={rows.length}
                                rowGetter={({ index }) => rows[index]}
                                columns={[
                                    {
                                        minWidth: '15%',
                                        width: 17,
                                        label: 'Date',
                                        dataKey: 'date',
                                    },
                                    {
                                        minWidth: '17%',
                                        width: 17,
                                        label: 'Applied',
                                        dataKey: 'applied',
                                    },
                                    {
                                        minWidth: '17%',
                                        width: 17,
                                        label: 'In Progress',
                                        dataKey: 'inprogress',
                                    },
                                    {
                                        minWidth: '17%',
                                        width: 17,
                                        label: 'Interview',
                                        dataKey: 'interview',
                                    },
                                    {
                                        minWidth: '17%',
                                        width: 17,
                                        label: 'Rejected',
                                        dataKey: 'rejected',
                                    },
                                    {
                                        minWidth: '17%',
                                        width: 17,
                                        label: 'Accepted',
                                        dataKey: 'accepted',
                                    },
                                ]}
                            />
                        </CardContent>
                    </Card>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default AnalysisTable;

