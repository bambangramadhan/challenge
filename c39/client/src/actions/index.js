import * as types from '../constants/ActionTypes'
import request from 'superagent'

const SERVER_URL = 'http://localhost:3001/api/'

export function addData(id, name, phone){
  return {type: types.ADD_DATA, id, name, phone}
}

function addPhoneBooksFailure(){
  return {type: types.ADD_PHONEBOOKS_FAILURE}
}

function addPhoneBooksSuccess(phonebook){
  return {type: types.ADD_PHONEBOOKS_SUCESS, phonebook}
}

export function addPHoneBook(name, phone){
  let id = Date.now()
  return dispatch => {
    dispatch(addData(id, name, phone))
    return request
    .post(`${SERVER_URL}phonebooks`)
    .type('form')
    .send({id: id})
    .send({name: name})
    .send({phone: phone})
    .end((err, res) => {
      if(err){
        console.error(err)
        dispatch(addPhoneBooksFailure())
      }else{
        console.log(res.body.data);
        dispatch(addPhoneBooksSuccess(res.body))
      }
    })
  }
}

export function editData(id, name, phone){
  return {type: types.EDIT_DATA, id, name, phone}
}

export function deleteData(id){
  return {type: types.DELETE_DATA, id}
}

export function deleteAll(){
  return {type: types.DELETE_ALL}
}

function loadPhoneBooksFailure(){
  return {type: types.LOAD_PHONEBOOKS_FAILURE}
}

function loadPhoneBooksSuccess(phonebooks){
  return {type: types.LOAD_PHONEBOOKS_SUCESS, phonebooks}
}

export function loadPHoneBooks(){
  return dispatch => {
    return request
    .get(`${SERVER_URL}phonebooks`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if(err){
        console.error(err)
        dispatch(loadPhoneBooksFailure())
      }else{
        dispatch(loadPhoneBooksSuccess(res.body))
      }
    })
  }
}

export function editPHoneBook(id, name, phone){
  return dispatch => {
    dispatch(editData(id, name, phone))
    return request
    .put(`${SERVER_URL}phonebooks/` + id )
    .type('form')
    .send({name: name})
    .send({phone: phone})
    .end((err) => {
      if(err){
        console.error(err)
      }
    })
  }
}

export function deletePHoneBook(id){
  return dispatch => {
    dispatch(deleteData(id))
    return request
    .delete(`${SERVER_URL}phonebooks/` + id)
    .type('form')
    .end((err) => {
      if(err){
        console.error(err)
      }
    })
  }
}
