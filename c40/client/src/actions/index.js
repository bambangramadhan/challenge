import * as types from '../constants/ActionTypes'
import request from 'superagent'
import history from '../history';

const SERVER_URL = 'http://localhost:3001/api/'

export function addData(id, title, rate, description, price, brand, dproduct){
  return {type: types.ADD_DATA, id, title, rate, description, price, brand, dproduct}
}

function addFailure(){
  return {type: types.ADD_FAILURE}
}

function addSuccess(product){
  return {type: types.ADD_SUCCESS, product}
}

export function addAds(title, rate, description, price, brand, dproduct) {
  let id = Date.now()
  return dispatch => {
    dispatch(addData(id, title, rate, description, price, brand, dproduct))
    return request
    .post(`${SERVER_URL}products`)
    .type('form')
    .send({id: id})
    .send({title: title})
    .send({rate: rate})
    .send({description: description})
    .send({price: price})
    .send({brand: brand})
    .send({dproduct: dproduct})
    .end((err, res) => {
      if(err){
        console.error(err);
        dispatch(addFailure())
      }else {
        dispatch(addSuccess(res.body))
        history.push('/');
      }
    })
  }
}

function loadFailure(){
  return {type: types.LOAD_FAILURE}
}

function loadSuccess(product){
  return {type: types.LOAD_SUCCESS, product}
}

export function loadProducts(){
  return dispatch => {
    return request
    .get(`${SERVER_URL}products`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if(err){
        console.error(err)
        dispatch(loadFailure())
      }else{
        dispatch(loadSuccess(res.body))
      }
    })
  }
}
