import {
  GET_ALL_CHAINS_DETAILS,
  GET_ALL_CHAINS_SUCCESS,
  GET_ALL_CHAINS_FAILURE,
} from "./actionTypes";

const initialState = {
  errors: {},
  response: {},
  responseData: {},
  loader: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CHAINS_FAILURE:
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };

    case GET_ALL_CHAINS_SUCCESS:
    case GET_ALL_CHAINS_FAILURE:
      return {
        ...state,
        responseData: action.payload?.data,
        errors: {},
      };
    default:
      return state;
      
  }
};

export default reducer;