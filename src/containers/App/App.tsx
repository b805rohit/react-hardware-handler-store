import { useReducer } from "react";
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { initialState, storeReducer } from "../../reducers";
import Checkout from "../Checkout/Checkout";
import Home from "../Home/Home";
import NavBar from "../NavBar/NavBar";
import ProductForm from "../ProductForm/ProductForm";
import ProductList from "../ProductList/ProductList";
import './App.css';

function App() {
  const [ state,dispatch ] = useReducer(storeReducer,initialState)
  return (
    <Router>
      <ToastContainer />
      <section className="app-wrapper">
          <NavBar checkoutCount={state.checkout.length} />
          <article className="app-container">
            <Routes>
            <Route element={ <Home /> } path="/" />
            <Route element={ <ProductList state={state} dispatch={dispatch} /> } path="/my-products" />
            <Route path="/new-product-form" element={<ProductForm state={state} dispatch={dispatch} />} />
            <Route path="/checkout" element={ <Checkout state={state} dispatch={dispatch}  /> } />
            </Routes>
          </article>
      </section>
    </Router>
  )
}

export default App
