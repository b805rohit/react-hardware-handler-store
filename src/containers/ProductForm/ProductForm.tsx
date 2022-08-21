import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import { ADD_NEW_PRODUCT_ERROR, ADD_NEW_PRODUCT_SUCCESS } from "../../constants/constants";
import { DispatchActionEnum, ProductDetailsInterface, ProductInterface } from "../../reducers/types";
import './ProductForm.css';
import { FormPayload } from "./types";

const defaultState =  {
  departmentId: null,
  name: '',
  brand: '',
  description: '',
  retailPrice: 0,
}

export default function ProductForm({ state,dispatch } : { state:ProductDetailsInterface,dispatch:React.Dispatch<{ type: DispatchActionEnum;payload: ProductInterface }> }) {
  const [ loading, setLoading ] = useState(false)
  const [ newProduct,setNewProduct ] = useState<FormPayload>(defaultState)

  const onSubmit = () => {
    setLoading(true)
    if(newProduct.departmentId && !state.products.find(data=> data.name===newProduct.name && data.brand===newProduct.brand)){
      const departmentId = newProduct.departmentId
      const maxProductID = Math.max(...state.products.map(prod => prod.id))
      dispatch({ type:DispatchActionEnum.ADD_NEW_PRODUCT,payload:{...newProduct,id:maxProductID+1,departmentId:departmentId} })
      toast.success(ADD_NEW_PRODUCT_SUCCESS)
      setNewProduct(defaultState)
    }
    else{
      toast.error(ADD_NEW_PRODUCT_ERROR)
    }
    setLoading(false)
  }

  const isValid = () => {
    if (!newProduct.departmentId) {
      return false;
    }
    if (!newProduct.name) {
      return false;
    }
    if (!newProduct.brand) {
      return false;
    }
    if (!newProduct.retailPrice) {
      return false;
    }
    return true;
  };

  const onChange = (propName:keyof FormPayload, val:number | string | null) => {
    setNewProduct({ ...newProduct,[propName]:val })
  }

  return (
    <div>
        <h1 className="product-form-header">Add A New Product</h1>
        {loading ? <Loader message="Loading new product form data..." /> : null}
        {!loading ? (
          <form className="product-form">
            <ul className="product-form-list">
              <li className="product-form-list-item">
                <label htmlFor="department">Department</label>
                <select
                  className="product-form-dropdown"
                  id="department"
                  value={newProduct.departmentId || ''}
                  onChange={(e) =>
                    onChange('departmentId', Number(e.target.value) || null)
                  }
                >
                  <option key={-1} value="">
                    Please select a department...
                  </option>
                  {state.departments.length > 0
                    ? state.departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))
                    : null}
                </select>
              </li>
              <li className="product-form-list-item">
                <label htmlFor="name">Product Name</label>
                <input
                  className="product-form-input"
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={newProduct.name}
                  onChange={(e) => onChange('name', e.target.value)}
                />
              </li>
              <li className="product-form-list-item">
                <label htmlFor="brand">Brand</label>
                <input
                  className="product-form-input"
                  id="brand"
                  type="text"
                  placeholder="Brand"
                  value={newProduct.brand}
                  onChange={(e) => onChange('brand', e.target.value)}
                />
              </li>
              <li className="product-form-list-item">
                <label htmlFor="description">Description</label>
                <textarea
                  className="product-form-input"
                  id="description"
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={(e) => onChange('description', e.target.value)}
                />
              </li>
              <li className="product-form-list-item">
                <label htmlFor="price">Retail Price</label>
                <input
                  className="product-form-input"
                  id="price"
                  type="text"
                  placeholder="Retail Price"
                  value={newProduct.retailPrice}
                  onChange={(e) =>
                    onChange('retailPrice', Number(e.target.value))
                  }
                />
              </li>
              <li className="product-form-list-item">
                <button
                  data-testid="submit"
                  type="button"
                  className="primary"
                  onClick={onSubmit}
                  disabled={!isValid()}
                >
                  Submit
                </button>
              </li>
            </ul>
          </form>
        ) : null}
      </div>
  )
}
