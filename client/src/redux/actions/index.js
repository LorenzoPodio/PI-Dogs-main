import axios from 'axios';

export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_ALL_TEMPS = 'GET_ALL_TEMPS';
export const FILTER_BY_TEMP = 'FILTER_BY_TEMP';
export const FILTER_ORIGIN = 'FILTER_ORIGIN';
export const ORDER_BY_BREED = 'ORDER_BY_BREED';
export const ORDER_BY_WEIGHT = 'ORDER_BY_WEIGHT';
export const POST_DOG = 'POST_DOG';
export const GET_DOG = 'GET_DOG';
export const GET_DOG_BY_NAME = 'GET_DOG_BY_NAME';

const URL = 'http://localhost:3001'

export const getAllDogs = () => async dispatch => {
  const { data } = await axios(`${URL}/dogs`);
  return dispatch({
    type: GET_ALL_DOGS,
    payload: data
  });
};

export const getAllTemps = () => async dispatch => {
  const { data } = await axios(`${URL}/temperament`)
  return dispatch({
    type: GET_ALL_TEMPS,
    payload: data
  });
};

export const filterDogsByTemperament = (payload) => {
  return {
    type: FILTER_BY_TEMP,
    payload
  }
};

export const filterOrigin = (payload) => {
  return {
    type: FILTER_ORIGIN,
    payload
  }
};

export const alphabeticSort = (payload) => {
  return {
    type: ORDER_BY_BREED,
    payload
  }
};

export const weightSort = (payload) => {
  return {
    type: ORDER_BY_WEIGHT,
    payload
  }
};

export const getDogByName = (name) => async dispatch => {
  try {
    const { data } = await axios(`${URL}/dogs?name=${name}`)
    return dispatch({
      type: GET_DOG_BY_NAME,
      payload: data
    });
  } catch (error) {
    alert(error);
  }
};

export const getDog = (id) => dispatch => {
  return fetch(`${URL}/dog/${id}`)
    .then(res => res.json())
    .then(dataJSON => {
      dispatch({
        type: GET_DOG,
        payload: dataJSON
      })
    });
};

export const postDog = (payload) => async dispatch => {
  const res = await axios.post(URL+'/dog', payload);
  console.log('posted dog', res);
  return res;
}
