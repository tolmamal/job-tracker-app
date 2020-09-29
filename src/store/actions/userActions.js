export const SAVE_USER_COMPANIES = 'SAVE_USER_COMPANIES';
export const SAVE_USER_APPLICATIONS = 'SAVE_USER_APPLICATIONS';

export const saveUserCompanies = (uid, companies) => {
    return {
        type: 'SAVE_USER_COMPANIES',
        payload: {
            uid: uid,
            companies: companies
        }
    };
};

export const saveUserApplications = (uid, data) => {
    return {
        type: 'SAVE_USER_APPLICATIONS',
        payload: {
            uid: uid,
            applications: data
        }
    }
};
