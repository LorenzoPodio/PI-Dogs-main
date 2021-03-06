import { 
  POST_DOG, 
  GET_ALL_DOGS, 
  GET_DOG_BY_ID, 
  FILTER_BY_TEMP,
  FILTER_ORIGIN, 
  GET_ALL_TEMPS, 
  ORDER_BY_BREED,
  ORDER_BY_WEIGHT,
  GET_DOG_BY_NAME
} from "../actions";

const initialState = {
  dogs: [],
  allDogs: [],
  dogDetail: {},
  temperaments: []
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER_FROM':
      const allDoguies = state.allDogs;
      console.log('allDoguies', allDoguies)
      const filterFrom = action.payload === 'Todos' ? allDoguies : allDoguies.filter(o => o.origin?.includes(action.payload));
      return{
        ...state,
        dogs: filterFrom
      }
    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload
      };
    case GET_ALL_TEMPS:
      return {
        ...state,
        temperaments: action.payload
      };
    case GET_DOG_BY_NAME:
      return {
        ...state,
        dogs: action.payload
      };
    case FILTER_BY_TEMP:
      const allDogs = state.allDogs;
      const tempsFiltered = action.payload === 'Todos' ? allDogs : allDogs.filter(d => d.temperament.includes(action.payload))
      return {
        ...state,
        dogs: tempsFiltered
      };
    case FILTER_ORIGIN:
      const dogsAll = state.allDogs;
      let originFilter = [];
      if (action.payload === 'db') originFilter = dogsAll.slice().filter(d => typeof(d.id)==='string');
      else if (action.payload === 'api') originFilter = dogsAll.filter(d => typeof(d.id)!=='string');
      else originFilter = dogsAll;
      return {
        ...state,
        dogs: originFilter
      };
    case ORDER_BY_BREED:
      const alphabeticSort = action.payload === 'asc' ? state.dogs.slice().sort((a, b) => a.name.localeCompare(b.name)) : 
      state.dogs.slice().sort((a, b) => {
        if (a.name > b.name) return -1;
        if (a.name < b.name) return 1;
        return 0;
      });
      return {
        ...state,
        dogs: alphabeticSort
      };
    case ORDER_BY_WEIGHT:
      const weightSort = action.payload === 'asc' ? state.dogs.slice().sort((a, b) => {
        if (parseInt(a.weight.split(' - ').shift()) > parseInt(b.weight.split(' - ').shift())) return 1;
        if (parseInt(a.weight.split(' - ').shift()) < parseInt(b.weight.split(' - ').shift())) return -1;
        return 0;
      }) : 
      state.dogs.slice().sort((a, b) => {
        if (parseInt(a.weight.split(' - ').shift()) > parseInt(b.weight.split(' - ').shift())) return -1;
        if (parseInt(a.weight.split(' - ').shift()) < parseInt(b.weight.split(' - ').shift())) return 1;
        return 0;
      });
      return {
        ...state,
        dogs: weightSort
      };
    case GET_DOG_BY_ID:
      return {
        ...state,
        dogDetail: action.payload
      };
    case POST_DOG:
      return {
        ...state,
      };
    default:
      return state;
  }
};