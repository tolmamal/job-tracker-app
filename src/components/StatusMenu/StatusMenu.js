import React from 'react';
import { MenuItem } from '../../utils/Material-UI/import';
import { Select } from "../../utils/Material-UI/components";

const StatusMenu = props => {
    return (
        <Select label="status" {...props}>
            <MenuItem value="applied">Applied</MenuItem>
            <MenuItem value="inprogress">In Progress</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
            <MenuItem value="accepted">Accepted</MenuItem>
        </Select>
    );
};

export default StatusMenu;
