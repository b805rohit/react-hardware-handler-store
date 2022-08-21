import { formatPrice } from '../../helpers/formatPrice'
import { ProductInterface } from '../../reducers/types'
import './CheckoutItem.css'

export default function CheckoutItem({ item,removeItemFromCheckout } : { item:ProductInterface,removeItemFromCheckout:(id:number)=>void }) {
  const { name,brand,description,retailPrice } = item
  return (
    <li className="checkout-item">
      <div>
        <div className="checkout-item-wrapper">
          <div className="checkout-item-data strong">{name}</div>
          <div className="checkout-item-data">
            <span className="strong">By: </span>
            <span>{brand}</span>
          </div>
          <div className="checkout-item-wrapper">{description}</div>
        </div>
      </div>
      <div className="checkout-item-price strong">
        {formatPrice(retailPrice)}
      </div>
      <div>
        <button
          className="primary"
          onClick={() => removeItemFromCheckout(item.id)}
        >
          Remove Product from Checkout
        </button>
      </div>
    </li>
  )
}
