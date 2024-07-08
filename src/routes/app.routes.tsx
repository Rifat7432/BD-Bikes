import ProductList from "../pages/inventory/ProductList";
import MaintenanceAndServicingRequestListHistory from "../pages/maintenanceAndServicing/MaintenanceAndServicingRequestHistory";
import MaintenanceAndServicingRequestList from "../pages/maintenanceAndServicing/MaintenanceAndServicingRequestList";
import SaleHistoryList from "../pages/saleHistory/SaleHistoryList";
import Private from "./Private";

// create route and nav items

export const sellerPaths = [
  {
    name: "Inventory",
    path: "inventory",
    element: (
      <Private>
        {" "}
        <ProductList></ProductList>
      </Private>
    ),
  },
  {
    index: true,
    element: (
      <Private>
        <ProductList></ProductList>
      </Private>
    ),
  },
  {
    name: "Sale History",
    path: "sale-history",
    element: (
      <Private>
        <SaleHistoryList></SaleHistoryList>
      </Private>
    ),
  },
  {
    name: "Maintenance Requests",
    path: "maintenance-servicing-requests",
    element: (
      <Private>
        <MaintenanceAndServicingRequestList></MaintenanceAndServicingRequestList>
      </Private>
    ),
  },
];
export const buyerPaths = [
  {
    name: "Inventory",
    path: "inventory",
    element: (
      <Private>
        {" "}
        <ProductList></ProductList>
      </Private>
    ),
  },
  {
    index: true,
    element: (
      <Private>
        <ProductList></ProductList>
      </Private>
    ),
  },
  {
    name: "Servicing History",
    path: "maintenance-servicing-request-history",
    element: (
      <Private>
        <MaintenanceAndServicingRequestListHistory></MaintenanceAndServicingRequestListHistory>
      </Private>
    ),
  },
];
