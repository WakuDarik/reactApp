import apis from "../api/api";


const GETNAME = 'GETNAME';
const CONTEST = 'CONTEST';
const PAY = 'PAY';

let initialState = {
    userId: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null,
    contest: null
};


const contestReducer = (state = initialState, action) => {

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
                contest: { ...action.data }
            };
        }
        default:
            return state;
    }

};

export const contestName = (name) => ({ type: GETNAME, name });
export const contest = (data) => ({ type: CONTEST, data });
export const pay = () => ({ type: PAY });

export const createContestTC = (data, userId) => (dispatch) => {
    apis.createContest(data = { ...data, userId }).then(response => {
        dispatch(contest(response.data));
        console.log(response.data);
    }).catch(function (error) {
        if (error.response) {
            console.log(error.response);
        }
    });
}

export const getAllContestTC = () => (dispatch) => {
    apis.allContest().then(response => {
        dispatch(contest(response.data));
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

export const payForPcg = (data) => (dispatch) => {
    apis.payPcg(data).then(response => {
        dispatch(pay(response.data));
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


export default contestReducer