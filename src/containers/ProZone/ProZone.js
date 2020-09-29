import React, { useState, useEffect } from 'react';
import { makeStyles } from '../../utils/Material-UI/import';
import { useSelector } from "react-redux";
import APIService from '../../utils/service/APIService';
import { useToasts } from 'react-toast-notifications';
import Board from 'react-trello';
import NavBar from '../../components/Navbar/Navbar';
import { Fab } from "@material-ui/core";
import { Typography } from "../../utils/Material-UI/components";
import AddField from './AddField/AddField';
//icons
import { Add } from "@material-ui/icons";



const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    },
    fab2: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(10.5)
    },
    mainContent: {

    }

}));

const initData = {
    lanes: []
};

// const data = {
//     lanes: [
//         {
//             id: 'lane1',
//             title: 'Mobile',
//             cards: [
//                 { id: 'Card1', title: 'Dating App', description: 'includes: AI, ML, security' },
//                 { id: 'Card2', title: 'React Native Course', description: 'take course on Udemy' },
//             ],
//         },
//         {
//             id: 'lane2',
//             title: 'Cyber',
//             cards: [],
//         },
//         {
//             id: 'lane3',
//             title: 'Web',
//             cards: [],
//         },
//
//     ]
// };

const EmptyBoard = () => (
    <Typography style={{ marginTop: '20%', textAlign: 'center',  }}>
        Your dashboard is empty :(
    </Typography>
);


const ProZone = () => {
    const classes = useStyles();
    const { addToast } = useToasts();
    const auth = useSelector((state) => state.auth);
    const {user: {user: {uid} = {}}} = auth;
    const [boardData, setBoardData] = useState(initData);
    const [openFieldAdd, setOpenFieldAdd] = useState(false);

    const handleFieldAddOpen = () => {
        setOpenFieldAdd(true);
    };

    const handleFieldAddClose = () => {
        setOpenFieldAdd(false);
    };

    const parseData = (zoneData) => {
        const data = {
            lanes: []
        };
        for (let key in zoneData) {
            console.log("#*#" + JSON.stringify(zoneData[key]));
        }
        for (let key in zoneData) {
            data.lanes.push({
                id: zoneData[key].laneId,
                title: zoneData[key].laneTitle,
                cards: zoneData[key].cards || []
            });
        }
        return data;
    };

    const getZoneData = () => {
        const zoneData = [];
        APIService.getUserProZone(uid)
            .then(res => {
                for (let key in res.data) {
                    zoneData.push({...res.data[key]})
                }
                const processedData = parseData(zoneData);
                setBoardData(processedData);
            })
            .catch();
    };
    const handleCardAdd = (card, laneId) => {
        APIService.addProZoneCard(uid, laneId, card.id, card.title, card.description)
            .then(addToast('Card saved successfully', { appearance: 'success', autoDismiss: true }))
            .catch(err => addToast(err.message, { appearance: 'error', autoDismiss: true }));
    };

    const handleCardDelete = (cardId, laneId) => {
        APIService.deleteProZoneCard(uid, laneId, cardId)
            .then(addToast('Card deleted successfully', { appearance: 'success', autoDismiss: true }))
            .catch(err => addToast(err.message, { appearance: 'error', autoDismiss: true }));
    };


    useEffect(() => {
        getZoneData();
    }, []);

    return (
        <div>
            <NavBar>
                <div>
                    <Typography color="primary" variant="h3">
                        Pro Zone
                    </Typography>
                    <Typography color="grey" variant="h6">
                        This is your personal professional zone!
                        <br/>
                        Do plans for the feature! plan all the feature skills tou would like to accomplish!
                    </Typography>
                </div>
                <br/>
                <Board
                    data={boardData}
                    style={{ height: 'auto', backgroundColor: 'white' }}
                    onCardAdd={handleCardAdd}
                    onCardDelete={handleCardDelete}
                    editable
                />
            </NavBar>
            <Fab
                color="primary"
                aria-label="Add Pro Zone"
                className={classes.fab}
                onClick={handleFieldAddOpen}
            >
                <Add />
            </Fab>
            <AddField
                uid={uid}
                open={openFieldAdd}
                onClose={handleFieldAddClose}
                onChange={getZoneData}
            />
        </div>
    );
};


export default ProZone;
