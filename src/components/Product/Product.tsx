import { formatPrice } from "../../helpers/formatPrice";
import { ProductInterface } from "../../reducers/types";
import './Product.css';

export default function Product({product, addItemToCheckout}:{ product: ProductInterface,addItemToCheckout:(item:ProductInterface)=>void }) {
  return (
    <div key={product.id} className="product">
      <div>
        <h3 className="product-name">{product.name}</h3>
      </div>
      <dl>
        <dt>Brand:</dt>
        <dd>{product.brand}</dd>
        <dt>Retail Price:</dt>
        <dd>{formatPrice(product.retailPrice)}</dd>
        <dt>Description:</dt>
        <dd>{product.description}</dd>
      </dl>
      <div className="product-button-wrapper">
        <button className="primary" onClick={() => addItemToCheckout(product)}>
          Add to Checkout
        </button>
      </div>
    </div>
  )
}
