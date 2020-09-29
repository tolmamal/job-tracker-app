import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "../../../utils/Material-UI/components";
import APIService from '../../../utils/service/APIService';
import { Add, Delete } from "@material-ui/icons";
import NoteForm from './AddNote';


const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: 30
    },
    notes: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    card: {
        width: 250,
        height: 250,
        margin: 5,
        border: `1px solid ${theme.palette.border.main}`,
        borderRadius: '4px'
    },
    addBox: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: 250,
        height: 250,
        margin: 5,
        cursor: 'pointer',
        border: `1px solid ${theme.palette.border.main}`,
        borderRadius: '4px'
    },
    cardAction: {
        display: 'flex',
        justifyContent: 'center'
    },
    cardContent: {
        height: '210px',
        overflow: 'hidden',
        cursor: 'pointer'
    },
}));


const NotesCard = (props) => {
    const classes = useStyles();
    const [openAddNote, setOpenAddNote] = useState(false);
    const {title, content, onDelete, id, applicationId, onUpdate, uid} = props;

    const handleAddNoteOpen = () => {
        setOpenAddNote(true);
    };

    const handleAddNoteClose = () => {
        setOpenAddNote(false);
    };

    return (
        <div className={classes.card}>
            <div className={classes.cardContent} onClick={handleAddNoteOpen}>
                <Typography variant="h6" gutterBottom>
                    {title.substring(0, 15)}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {content}
                </Typography>
            </div>
            <div className={classes.cardAction}>
                <Delete
                    style={{ cursor: 'pointer' }}
                    onClick={() => onDelete(id)}
                />
            </div>
            <NoteForm
                open={openAddNote}
                onClose={handleAddNoteClose}
                onChange={onUpdate}
                applicationId={applicationId}
                title={title}
                content={content}
                id={id}
                uid={uid}
            />
        </div>
    );


};

const Notes = props => {
    const classes = useStyles();
    const { notes, applicationId, reload, uid } = props;
    const [openAddNote, setOpenAddNote] = useState(false);

    const noteItems = [];
    for (let x in notes) {
        noteItems.push({
            ...notes[x],
            id: x
        });
    }


    const handleAddNoteOpen = () => {
        setOpenAddNote(true);
    };

    const handleAddNoteClose = () => {
        setOpenAddNote(false);
    };

    const onDelete = (id) => {
        APIService.deleteNote(applicationId, id, uid)
            .then(reload);
    };

    return (
        <div className={classes.root}>
            <Typography variant="h6" color="primary">
                Notes
            </Typography>
            <div className={classes.notes}>
                {noteItems.map(note => (
                    <NotesCard
                        applicationId={applicationId}
                        title={note.title}
                        content={note.content}
                        id={note.id}
                        key={note.id}
                        onDelete={onDelete}
                        onUpdate={reload}
                        uid={uid}
                    />
                ))}
                <div className={classes.addBox} onClick={handleAddNoteOpen}>
                    <Typography variant="h6" gutterBottom>
                        <Add />
                    </Typography>
                </div>
            </div>
            <NoteForm
                open={openAddNote}
                onClose={handleAddNoteClose}
                onChange={reload}
                applicationId={applicationId}
                isNew
                uid={uid}
            />
        </div>
    );
};

export default Notes;
