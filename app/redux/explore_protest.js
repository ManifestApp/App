import i18n from '../utils/languages'
import randomwords from 'random-words'


const GET_PROTESTS_AROUND = 'GET_PROTESTS_AROUND';
const GET_PROTESTS_AROUND_SUCCESS = 'GET_PROTESTS_AROUND_SUCCESS';
const GET_PROTESTS_AROUND_ERROR = 'GET_PROTESTS_AROUND_ERROR';


const INITIAL_STATE = {
    protests: [],
    loading: false,
    error: null
};

export default protests = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PROTESTS_AROUND:
            return {
                ...state,
                loading: true
            };
        case GET_PROTESTS_AROUND_SUCCESS:
            return {
                ...state,
                loading: false,
                protests: action.payload.protests
            };
        case GET_PROTESTS_AROUND_ERROR:
            return {
                ...state,
                loading: false,
                error: i18n.t('error_get_protests')
            };
        default:
            return state
    }
}

export const searchProtest = () => {
    return (dispatch) => new Promise((resolve) => {
        resolve(dispatch({
            type: GET_PROTESTS_AROUND
        }))
    }).then(() => new Promise((resolve) => setTimeout(() => resolve(), 3000)))
        .then(() => dispatch({
            type: GET_PROTESTS_AROUND_SUCCESS,
            payload: {
                protests: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e) => {
                    let x = 48.13 + (Math.random() - 0.5) / 15;
                    let y = 11.57 + (Math.random() - 0.5) / 15;
                    return {
                        id: e,
                        title: `Protest ${e}`,
                        descriptionText: `${e} ${randomwords(50).join(' ')}`,
                        image_url: `https://picsum.photos/200?image=${e}`,
                        // image_url: `https://www.latlong.net/logo.png`,
                        startingPoint: {
                            x: x,
                            y: y,
                        },
                        starting_time: new Date()
                    }
                })
            }
        }))
};