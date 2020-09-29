import React from 'react';
import { ListItemText } from '../../../../../../utils/Material-UI/import';

const ListItemTextWrapper = (props) => {
    const { primary, className, textOverrideClass } = props;
    return (
        <ListItemText
            primary={primary}
            classes={textOverrideClass}
            className={className}
        />
    );
};

export default ListItemTextWrapper;
