import React from 'react';
import { useSelector } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { Typography } from "../../../utils/Material-UI/components";
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    BarSeries,
    Title,
    Legend
} from '@devexpress/dx-react-chart-material-ui';
import { Stack, Animation } from '@devexpress/dx-react-chart';
import { graphData as data } from "../../../mockData/mockData";


const legendStyles = () => ({
    root: {
        display: 'flex',
        margin: 'auto',
        flexDirection: 'row',
    },
});

const legendRootBase = ({ classes, ...restProps }) => (
    <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);

const legendLabelStyles = () => ({
    label: {
        whiteSpace: 'nowrap',
    },
});

const legendLabelBase = ({ classes, ...restProps }) => (
    <Legend.Label className={classes.label} {...restProps} />
);

const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);



export default class GraphAnalysis extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data,
        };
    }

    render() {
        const { data: chartData } = this.state;

        return (
            <Paper>
                <Chart
                    data={chartData}
                >
                    <ArgumentAxis />
                    <ValueAxis />

                    <BarSeries
                        name="Applied"
                        valueField="applied"
                        argumentField="month"
                        color="#008B8B"
                    />
                    <BarSeries
                        name="In Progress"
                        valueField="inprogress"
                        argumentField="month"
                        color="#c0c0c0"
                    />
                    <BarSeries
                        name="Rejected"
                        valueField="rejected"
                        argumentField="month"
                        color="#8FBC8F"
                    />
                    <BarSeries
                        name="Accepted"
                        valueField="accepted"
                        argumentField="month"
                        color="#ADD8E6"
                    />
                    <Animation />
                    <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
                    <Title text="Graph Analysis" />
                    <Stack />
                </Chart>
            </Paper>
        );
    }
}



