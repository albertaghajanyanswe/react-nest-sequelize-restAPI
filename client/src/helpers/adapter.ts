import { ProductWithImages } from "../configs/shared/types";
import { User, Product, ProductDto } from "../generated/openapi";
import { dateFormat } from "./helper";

function decorateShowField<T extends readonly any[]>(ar: T) {
  return ar as readonly (T[number] & {
    show: (data: { currentUser?: User }) => boolean;
  })[]
}

// Users table data
function adaptUsersTableData(data: User[]) {
  return data.map((item) => {
    return {
      id: item?.id,
      firstName: item?.firstName,
      lastName: item?.lastName,
      email: item?.email,
    }
  });
};

export type ProductsDataType = ReturnType<typeof adaptProductsData>[number];

// Users table data
function adaptProductsData(data: Partial<ProductWithImages>[]) {
  return data.map((item) => {
    return {
      id: item?.id,
      name: item?.name,
      price: item?.price,
      currency: item?.currency,
      description: item?.description,
      otherInfo: item?.otherInfo,
      province: item?.province,
      city: item?.city,
      address: item?.address,
      intendedFor: item?.intendedFor,
      productImage: item?.productImage,
      favoriteProducts: item?.user?.favoriteProducts,
    }
  });
};

export type UsersTableDataType = ReturnType<typeof adaptUsersTableData>[number];

export {
  adaptUsersTableData,
  adaptProductsData,
  decorateShowField
};
