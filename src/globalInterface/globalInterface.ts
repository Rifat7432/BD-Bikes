import { BaseQueryApi } from "@reduxjs/toolkit/query";

//error type
export type TErrorData = {
  data: {
    success: boolean;
    massage: string;
    errorMessage: string;
    errorDetails: null;
    stack: null;
  };
};
export type TResponse<T> = {
  data?: T;
  error?: TErrorData;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TUserLoginData = {
  data: TData;
};

export type TData = {
  user: TUser;
  token: string;
};

export type TUser = {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TProduct = {
  _id?: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  releaseDate: string;
  brand: string;
  model: string;
  type: "road" | "mountain" | "hybrid";
  size: string;
  color: string;
  material: string;
  suspensionType: string;
  customAttributes: string;
  isDeleted: boolean;
};
export type TProductRes = {
  data: TProduct;
};
export type TSalesHistory = {
  bayerName: string;
  slingDate: string;
  quantity: number;
  productId: string;
  sellerId: string;
};
export type TMaintenanceAndServicingRequest = {
  _id: string;
  bikeId: string;
  userId: string;
  isCompleted?: boolean;
  lastServicingDate: string;
  nextServicingDate: string;
  servicingPrice: number;
  serviceDetails: string[];
};
export type TMaintenanceAndServicingRequestPopulate = {

    _id: string;
    bikeId: TProduct;
    userId: TUser;
    servicingPrice: number;
    lastServicingDate: string;
    nextServicingDate: string;
    isCompleted?: boolean;
    serviceDetails: string[];
  
};
