import {BrowserRouter,Routes,Route} from "react-router-dom"

import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from "./components/ProductItemDetails"
import Register from './components/Register' 
import Login from './components/Login'

import './App.css';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path='/register' Component={Register}/>
      <Route exact path='/products' Component={Products}/>
      <Route exact path="/products/:id" Component={ProductItemDetails}/>
      <Route exact path='/login' Component={Login}/>
      <Route exact path='/' Component={Home}/>
    </Routes>
  </BrowserRouter>
)

export default App;
