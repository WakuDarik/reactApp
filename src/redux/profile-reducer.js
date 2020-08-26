import apis from "../api/api";


const GETNAME = 'GETNAME';
const CONTEST = 'CONTEST';
const THIS_CONTEST = 'THIS_CONTEST';
const ACTIVE_CONTEST = 'ACTIVE_CONTEST';

let initialState = {
    userId: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null,
    contest: null,
    currentContest: null,
    activeContest: null
};


const profileReducer = (state = initialState, action) => {

    switch (action.type) {

        case GETNAME: {
            return {
                ...state,
                contest: {
                    name: action.name
                }
            };
        }
        case CONTEST: {
            return {
                ...state,
                contest: [...action.data]
            };
        }
        case THIS_CONTEST: {
            return {
                ...state,
                currentContest: [action.data] 

            };
        }
        case ACTIVE_CONTEST:{
            return {
                ...state,
                activeContest: [action.active]

            };
        }
        default:
            return state;
    }

};

export const contestName = (name) => ({ type: GETNAME, name });
export const contest = (data) => ({ type: CONTEST, data });
export const currentContests = (data) => ({ type: THIS_CONTEST, data });
export const activeContests = (active) => ({ type: ACTIVE_CONTEST, active});


export const getContestTC = (userId) => (dispatch) => {
    apis.getContest(userId).then(response => {
        dispatch(contest(response.data.user.contests));
        console.log(response.data);
    }).catch(function (error) {
        if (error.response) {
            console.log(error.response.status);
            if (error.response.status === 400) {
                console.log('error')
            }
        }
    });
}

export const currentContestTC = (id) => (dispatch) => {
    apis.currentContest(id).then(response => {
        dispatch(currentContests(response.data.contest));
        console.log(response.data.contest);
        return response.data
    }).catch(function (error) {
        console.log(error.response);
    });
}


export const activeCurrentContestTC = (id) => (dispatch) => {
    apis.activeContest(id).then(response => {
        dispatch(activeContests(response.data));
        console.log(response.data.contest);
    }).catch(function (error) {
        console.log(error.response);
    });
}

export default profileReducer