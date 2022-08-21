import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import Product from '../../components/Product/Product';
import { PRODUCT_ADDED_TO_CHECKOUT_SUCCESS, PRODUCT_ALREADY_IN_CHECKOUT_ERROR } from '../../constants/constants';
import { formatFilters } from '../../helpers/formatFilter';
import { DispatchActionEnum, ProductDetailsInterface, ProductInterface } from '../../reducers/types';
import './ProductList.css';

export default function ProductList({ state,dispatch } : { state:ProductDetailsInterface,dispatch:React.Dispatch<{ type: DispatchActionEnum;payload: ProductInterface }> }) {
  const [ filteredList,setFilteredList ] = useState<ProductInterface[]>([])
  const [ loading,setLoading ] = useState(false)
  const [ filtersByBrand,setFiltersByBrand ] = useState<{ name:string,value:string }[]>([])
  const [ activeFilter,setActiveFilter ] = useState<(string | number)[]>([])

  useEffect(()=>{
    setLoading(true)
    setTimeout(()=>{
      if(state.products.length){
        const productList = activeFilter.length ? state.products.filter(data=> activeFilter.includes(data.brand) || activeFilter.includes(data.id)) : [...state.products]
        setFilteredList(productList)
      }
      setLoading(false)
    },1000)
  },[activeFilter])

  useEffect(()=>{
    setFiltersByBrand(formatFilters(state.products,'brand'))
  },[])

  const onFilterChange = (id:number | string) =>{
    const filters = activeFilter.includes(id) ? activeFilter.filter(item => item!==id) : [...activeFilter,id]
    setActiveFilter(filters)
  }

  const addItemToCheckout = async (productData:ProductInterface) => {
    const checkAlreadyExist = state.checkout.find(data => data.id===productData.id)
    if(checkAlreadyExist){
      toast.error(PRODUCT_ALREADY_IN_CHECKOUT_ERROR)
    }
    else{
      dispatch({ type:DispatchActionEnum.ADD_PRODUCT_TO_CART,payload:productData })
      toast.success(PRODUCT_ADDED_TO_CHECKOUT_SUCCESS);
    }
  }
  
  return (
    <div className="product-list-container">
      <section className="filter-wrapper">
        <p className="filter-title">Filter by Department</p>
        <div className="filter-data">
            {state.departments.length
              ? state.departments.map((filter) => (
                  <span key={filter.id} className="filter-item">
                    <label htmlFor={filter.id.toString()}>{filter.name}</label>
                    <input
                      className="filter-checkbox"
                      id={filter.id.toString()}
                      type="checkbox"
                      checked={activeFilter.includes(filter.id)}
                      onChange={() => onFilterChange(filter.id)}
                    />
                  </span>
                ))
              : null}
        </div>
        <p className="filter-title">Filter by Brand</p>
        <div className="filter-data">
            {filtersByBrand.length
              ? filtersByBrand.map((filter, index) => (
                  <span key={index} className="filter-item">
                    <label htmlFor={index.toString()}>{filter.name}</label>
                    <input
                      className="filter-checkbox"
                      id={index.toString()}
                      type="checkbox"
                      checked={activeFilter.includes(filter.value)}
                      onChange={() => onFilterChange(filter.value)}
                    />
                  </span>
                ))
              : null}
          </div>
      </section>
      <h1 className="product-list-header">My Products</h1>
      <section className="products-container">
          {loading ? <Loader message="Loading product list..." /> : null}
          <div className="product-list-product-wrapper">
            {!loading && filteredList.length
              ? filteredList.map((product) => (
                  <Product
                    key={product.id}
                    product={product}
                    addItemToCheckout={addItemToCheckout}
                  />
                ))
              : null}
            {!loading && !filteredList.length ? (
              <p className="product-list-message">
                There are no products that match your filters. Please clear some
                filters to see more producs.
              </p>
            ) : null}
          </div>
        </section>
    </div>
  )
}
