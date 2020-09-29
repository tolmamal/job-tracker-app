import React from 'react';
import { Typography, makeStyles } from '../../import';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2),
        letterSpacing: theme.spacing(0.1)
    }
}));

const Types = (props) => {
    const classes = useStyles();
    const { children, variant, component, color, align, style, className } = props;

    return (
        <Typography
            className={clsx(classes.root, className)}
            variant={variant}
            component={component}
            color={color}
            align={align}
            style={style}
        >
            {children}
        </Typography>
    );

};

export default Types;
