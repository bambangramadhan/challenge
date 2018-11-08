import React, { Component } from 'react';
import '../App.css';
import { Switch, Route } from 'react-router-dom'
import ProductList from '../components/ListProduct/ProductList'
import AddProduct from '../components/AddProduct'
import DetailProduct from '../components/DetailProduct/DetailProduct'

class App extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/' component={ProductList} />
        <Route path='/add' component={AddProduct}/>
        <Route path='/detail'component={DetailProduct}/>
      </Switch>
    )
  }
}



export default App;
