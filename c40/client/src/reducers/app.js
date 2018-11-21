import {ADD_DATA, LOAD_SUCCESS, LOAD_FAILURE, ADD_SUCCESS, GET_DATA_BY_ID} from '../constants/ActionTypes'

export default function data(state = [], action){
  switch (action.type) {
    case ADD_DATA:
    return [
      {
        id: action.id,
        title: action.title,
        rate: action.rate,
        description: action.description,
        price: action.price,
        brand: action.brand,
        detailProduct: action.dproduct
      },
      ...state
    ]
    case ADD_SUCCESS:
    return state
    // let product = state
    // let idObject = product.map(function(x){
    //   return x.id
    // }).indexOf(parseInt(action.product.id))
    // if(idObject > -1){
    //   return state
    // }else{
    //   return [action.product, ...state]
    // }
    case LOAD_SUCCESS:
    return action.product

    case LOAD_FAILURE:
    return state

    case GET_DATA_BY_ID:
    return state

    default:
    return state

  }
}
