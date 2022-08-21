import { DispatchActionEnum, ProductDetailsInterface, ProductInterface } from "./types"

export const  storeReducer = (state : ProductDetailsInterface, { type, payload } : { type:DispatchActionEnum, payload:ProductInterface }) => {
  switch (type) {
    case DispatchActionEnum['ADD_PRODUCT_TO_CART']:
      return {...state,checkout:[...state.checkout,payload] }
    case DispatchActionEnum['ADD_NEW_PRODUCT']:
      return {...state,products:[...state.products,payload] }
    case DispatchActionEnum['REMOVE_CHECKOUT_ITEM']:
      return {...state,checkout:state.checkout.filter(item=> item.id!==payload.id)}
  default:
    return state
  }
}
