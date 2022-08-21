import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import CheckoutItem from "../../components/CheckoutItem/CheckoutItem";
import Loader from "../../components/Loader/Loader";
import { PRODUCT_ADDED_TO_CHECKOUT_ERROR, PRODUCT_REMOVED_FROM_CHECKOUT_SUCCESS } from "../../constants/constants";
import { DispatchActionEnum, ProductDetailsInterface, ProductInterface } from "../../reducers/types";
import './Checkout.css';

export default function Checkout({ state,dispatch } : { state:ProductDetailsInterface,dispatch:React.Dispatch<{ type: DispatchActionEnum;payload: ProductInterface }> }) {
  const [ loading,setLoading ] = useState(false)

  const removeItemFromCheckout = (id:number) =>{
    setLoading(true)
    setTimeout(()=>{
      const payload = state.products.find(data=> data.id===id)
      if(payload){
        dispatch({ type:DispatchActionEnum.REMOVE_CHECKOUT_ITEM,payload })
        toast.success(PRODUCT_REMOVED_FROM_CHECKOUT_SUCCESS)
      }
      else{
        toast.error(PRODUCT_ADDED_TO_CHECKOUT_ERROR)
      }
      setLoading(false)
    },1000)
  }
  
  return (
    <div>
        <h1 className="checkout-title">Checkout Page</h1>
        <div>
          {loading ? <Loader message="Fetching items to checkout..." /> : null}
          {!loading && state.checkout.length ? (
            <div>
              <div className="checkout-header">
                <div>Product Information</div>
                <div>Suggested Retail Price</div>
                <div>Update Checkout</div>
              </div>
              <ul className="checkout-list-wrapper">
                {state.checkout.map((item) => (
                  <CheckoutItem
                    key={item.id}
                    item={item}
                    removeItemFromCheckout={removeItemFromCheckout}
                  />
                ))}
              </ul>
            </div>
          ) : null}
          {!loading  && !state.checkout.length ? (
            <p className="checkout-message">
              The checkout is currently empty. Add some items from the&nbsp;
              <NavLink className="page-link" to="/my-products">
                My Products
              </NavLink>
              &nbsp;page.
            </p>
          ) : null}
        </div>
      </div>
  )
}
