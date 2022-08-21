import { ProductInterface } from "../reducers/types";

export const formatFilters = (productsForFilters: ProductInterface[], param:keyof ProductInterface) => {
  const filterListSet = new Set();
  productsForFilters.forEach((product) => {
    const itemToFilterBy = Object.assign(
      {},
      { name: product[param], value: product[param] },
    );
    filterListSet.add(JSON.stringify(itemToFilterBy));
  });
  const filterListArray = Array.from(filterListSet) as string[];
  const deSerializeFilterArray = filterListArray.map<{ name:string,value:string }>((item) =>
    JSON.parse(item),
  );
  return deSerializeFilterArray;
};
