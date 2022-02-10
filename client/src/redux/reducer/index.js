import { CREATE_DOG, GET_ALL_DOGS, GET_DOG } from "../actions";

const initialState = {
  dogs: [],
  dog: {}
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: action.payload
      };
    case GET_DOG:
      return {
        ...state,
        dog: action.payload
      };
    // case CREATE_DOG:
    //   return {
    //     ...state,
    //     dogs: [...state.dogs, action.payload]
    //   };
    default:
      return state;
  }
};