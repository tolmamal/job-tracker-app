import axios from 'axios';

const API_URL = 'https://job-tracker-8e89e.firebaseio.com/';

const axiosInstance = axios.create({
    baseURL: `${API_URL}/`
});


const authInterceptor = response => response;
const errorHandler = error => {
    const { status } = error.response;
    if (status === 401) {
        document.location = '/';
    }
    return Promise.reject(error);
};

axiosInstance.interceptors.response.use(authInterceptor, errorHandler);



const getJobApplications = (uid) => {
    console.log("server - getJobApplications()");
    const dest = `${API_URL}/applications/${uid}.json`;
    return axiosInstance.get(dest)
        .then(response => {
            console.log(response.data);
            return response.data;

        })
        .catch(err => console.log(err));
};

const addJobApplication = (title, status, company, notes, uid, time) => {
    console.log("server - addJobApplication()");
    const dest = `${API_URL}/applications/${uid}.json`;
    return axiosInstance.post(dest, {
        title,
        status,
        company,
        notes,
        time
    });

};

const deleteApplication = (id, uid) => {
    const dest = `${API_URL}/applications/${uid}/${id}.json`;
    return axiosInstance.delete(dest);

};

const updateJobApplication = (applicationId, jobDetail, uid) => {
    console.log("server - updateJobApplication()");
    const dest = `${API_URL}/applications/${uid}/${applicationId}.json`;
    return axiosInstance.put(dest, jobDetail);
};

const getApplicationDetails = (applicationId, uid) => {
    console.log("server - getApplicationDetails()");
    const dest = `${API_URL}/applications/${uid}/${applicationId}.json`;
    return axiosInstance.get(dest);
};

//NOTES
const deleteNote = (applicationId, noteId, uid) => {
    console.log("server - deleteNote()");
    const dest = `${API_URL}/applications/${uid}/${applicationId}/notes/${noteId}.json`;
    return axiosInstance.delete(dest);
};

const addNotes = (applicationId, title, content, uid) => {
    console.log("server - addNotes()");
    const dest = `${API_URL}/applications/${uid}/${applicationId}/notes.json`;
    console.log("dest = " + dest);
    return axiosInstance.post(dest, {title, content});
};

const updateNote = (applicationId, noteId, title, content, uid) => {
    console.log("server - updateNote()");
    const dest = `${API_URL}/applications/${uid}/${applicationId}/notes/${noteId}`;
    return axiosInstance.put(dest, {title, content});
};

const addTimeLog = (applicationId, type, time, note, uid) => {
    console.log("server - addTimeLog()");
    const dest = `${API_URL}/applications/${uid}/${applicationId}/timelogs.json`;
    return axiosInstance.post(dest, {
        type,
        time,
        note
    });

};

const updateTimeLog = (applicationId, timeLogId, type, time, note, uid) => {
    console.log("server - updateTimeLog()");
    const dest = `${API_URL}/applications/${uid}/${applicationId}/timelogs/${timeLogId}.json`;
    return axiosInstance.put(dest, {
        type,
        time,
        note
    });
};

const deleteTimeLog = (applicationId, timeLogId, uid) => {
    console.log("server - deleteTimeLog()");
    const dest = `${API_URL}/applications/${uid}/${applicationId}/timelogs/${timeLogId}.json`;
    return axiosInstance.delete(dest);


};

const getUserAnalysisData = (uid) => {
    console.log("server - getUserAnalysisData()");
    const dest = `${API_URL}/applications/${uid}.json`;
    return axiosInstance.get(dest);
};

const getUserAllApplications = (uid) => {
    console.log("server - getUserAllCompanies()");
    const dest = `${API_URL}/applications/${uid}.json`;
    return axiosInstance.get(dest);

};

const getUserAllCompanies = (uid, appId) => {
    const dest = `${API_URL}/applications/${uid}/${appId}.json`;
    return axiosInstance.get(dest);
};

const addUserProZone = (uid, data) => {
    console.log("server - addUserProZone()");
    const dest = `${API_URL}/proZone/${uid}/data.json`;
    return axiosInstance.post(dest, data);

};

const addFieldProZone = (uid, laneId, laneTitle) => {
    console.log("server - addFieldProZone()");
    const dest = `${API_URL}/proZone/${uid}.json`;
    return axiosInstance.post(dest, {
        laneId,
        laneTitle,
    });

};

const addProZoneCard = async (uid, laneId, cardId, cardTitle, cardDescription) => {
    console.log("server - addProZoneCard()");
    const {laneKey, ifCards} = await findLaneKey(uid, laneId);
    if (laneKey) {
        const dest = `${API_URL}/proZone/${uid}/${laneKey}.json`;
        // in case there is no cards array - create one and save it
        if (!ifCards) {
            const cards = [];
            cards.push({
                id: cardId,
                title: cardTitle,
                description: cardDescription
            });
            return axiosInstance.put(dest, {
                laneId: laneId,
                laneTitle: laneId,
                cards
            });
        }
        // in case cards exist - need to update card's array
        else if (ifCards) {
            const updatedCards = [];
            const response = await axiosInstance.get(`${API_URL}/proZone/${uid}/${laneKey}/cards.json`);
            for (let key in response.data) {
                updatedCards.push({...response.data[key]});
            }
            updatedCards.push({
                id: cardId,
                title: cardTitle,
                description: cardDescription
            });

            return axiosInstance.put(dest, {
                laneId: laneId,
                laneTitle: laneId,
                cards: updatedCards
            });
        }
    }
};

const deleteProZoneCard = async (uid, laneTitle, cardId) => {
    console.log("server - deleteProZoneCard()");
    const oldCards = [];
    const updatedCards = [];
    const {laneKey} = await findLaneKey(uid,laneTitle);
    const cardIndex = await getProCardIndex(uid, laneKey, cardId);
    const dest = `${API_URL}/proZone/${uid}/${laneKey}/cards.json`;
    const createCardsUrl = `${API_URL}/proZone/${uid}/${laneKey}.json`;
    const response = await axiosInstance.get(dest);
    for (let key in response.data) {
        oldCards.push({...response.data[key]});
    }
    if (cardIndex) {
        oldCards.splice(cardIndex, 1);
        for (let key in oldCards) {
            updatedCards.push({...oldCards[key]});
        }
        if (updatedCards.length === 0) {
            return axiosInstance.delete(dest);
        }
        else if (updatedCards.length === 1) {
            return axiosInstance.put(createCardsUrl, {
                laneId: laneTitle,
                laneTitle: laneTitle,
                cards: updatedCards
            });
        }
        else {
            return axiosInstance.put(createCardsUrl, {
                laneId: laneTitle,
                laneTitle: laneTitle,
                cards: updatedCards
            });
        }
    }
};

const getProCardIndex = async (uid, laneKey, cardId) => {
    console.log("server - getProCardIndex()");
    let cardIndex = null;
    const dest = `${API_URL}/proZone/${uid}/${laneKey}/cards.json`;
    const response = await axiosInstance.get(dest);
    for (let key in response.data) {
        if (response.data[key].id === cardId) {
            cardIndex = key;
        }
    }
    return cardIndex;

};

const findLaneKey =  async (uid, laneId) => {
    console.log("server - findLaneKey()");
    let laneKey = null;
    let ifCards = false;
    const dest = `${API_URL}/proZone/${uid}.json`;
    const response = await axiosInstance.get(dest);
    for (let key in response.data) {
        if (response.data[key].laneId === laneId) {
            laneKey = key;
            if (response.data[key].hasOwnProperty('cards')) {
                ifCards = true;
            }
        }
    }
    return {laneKey, ifCards};


};

const getUserProZone = (uid) => {
    console.log("server - getUserProZone()");
    const dest = `${API_URL}/proZone/${uid}.json`;
    return axiosInstance.get(dest);

};



export default {
    addJobApplication,
    getJobApplications,
    deleteApplication,
    updateJobApplication,
    getApplicationDetails,
    deleteNote,
    addNotes,
    updateNote,
    addTimeLog,
    updateTimeLog,
    deleteTimeLog,
    getUserAnalysisData,
    getUserAllApplications,
    getUserAllCompanies,
    addUserProZone,
    getUserProZone,
    addFieldProZone,
    addProZoneCard,
    findLaneKey,
    deleteProZoneCard,
    getProCardIndex,


};
