import axios from 'axios';

export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const CREATE_DOG = 'CREATE_DOG';
export const GET_DOG = 'GET_DOG';

const URL = 'http://localhost:3001'

export const getAllDogs = () => async dispatch => {
  const json = await axios(`${URL}/dogs`);
  return dispatch({
    type: GET_ALL_DOGS,
    payload: json.data
  });
};

export const getDog = (id) => dispatch => {
  return fetch(`${URL}/dog/${id}`)
  .then(res => res.json())
  .then(dataJSON => {dispatch({
    type: GET_DOG,
    payload: dataJSON
  })});
};
