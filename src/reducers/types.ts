export interface ProductDetailsInterface {
  departments: DepartmentInterface[]
  products: ProductInterface[]
  checkout: ProductInterface[]
}

export interface DepartmentInterface {
  id: number
  name: string
}

export interface ProductInterface {
  id: number
  name: string
  brand: string
  description: string
  retailPrice: number
  departmentId: number
}

export enum DispatchActionEnum{
  ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART',
  ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT',
  REMOVE_CHECKOUT_ITEM = 'REMOVE_CHECKOUT_ITEM'
}
