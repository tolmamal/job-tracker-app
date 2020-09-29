import React from 'react';
import { makeStyles } from '../../../utils/Material-UI/import';
import { ListItem, ListItemIcon, ListItemText } from "../../../utils/Material-UI/components";


const useStyles = makeStyles((theme) => ({
    activeClassName: {
        backgroundColor: theme.palette.activeBg.main
    }
}));


const ListItemWithClick = (props) => {
    const classes = useStyles();
    const {icon, primary, onClick, textOverrideClass} = props;

    return (
        <li onClick={onClick} role="presentation">
            <ListItem button>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary} textOverrideClass={textOverrideClass} />
            </ListItem>
        </li>
    );
};

export default ListItemWithClick;
