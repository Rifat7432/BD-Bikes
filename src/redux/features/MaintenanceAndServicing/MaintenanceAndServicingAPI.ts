import {
  TMaintenanceAndServicingRequestPopulate,
  TResponseRedux,
} from "../../../globalInterface/globalInterface";
import { baseApi } from "../../services/API";

const MaintenanceAndServicingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get History api
    createMaintenanceAndServicingRequest: builder.mutation({
      query: (maintenanceAndServicing) => {
        return {
          url: `/maintenance-servicing/create-maintenance-servicing-request`,
          method: "POST",
          body: maintenanceAndServicing,
        };
      },
      invalidatesTags: ["getMaintenanceAndServicing"],
    }),
    getAllMaintenanceAndServicingRequestOfUser: builder.query({
      query: (userID) => {
        return {
          url: `/maintenance-servicing/get-all-servicing-request/${userID}`,
          method: "GET",
        };
      },
      transformResponse: (
        response: TResponseRedux<TMaintenanceAndServicingRequestPopulate[]>
      ) => {
        return {
          data: response?.data,
        };
      },
      providesTags: ["getMaintenanceAndServicing"],
    }),
    getAllMaintenanceAndServicingRequest: builder.query({
      query: () => {
        return {
          url: `/maintenance-servicing/get-all-servicing-requests`,
          method: "GET",
        };
      },
      transformResponse: (
        response: TResponseRedux<TMaintenanceAndServicingRequestPopulate[]>
      ) => {
        return {
          data: response?.data,
        };
      },
      providesTags: ["getMaintenanceAndServicing"],
    }),
    completeMaintenanceAndServicingRequest: builder.mutation({
      query: (id) => {
        return {
          url: `/maintenance-servicing/complete-servicing-request/${id}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["getMaintenanceAndServicing"],
    }),
  }),
});

export const {
  useCreateMaintenanceAndServicingRequestMutation,
  useGetAllMaintenanceAndServicingRequestQuery,
  useGetAllMaintenanceAndServicingRequestOfUserQuery,
  useCompleteMaintenanceAndServicingRequestMutation
} = MaintenanceAndServicingApi;
