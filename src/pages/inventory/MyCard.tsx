import { Button, Col, Row } from "antd";
import { useState } from "react";
import AddProductModal from "./AddProductModal";

import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import toast from "react-hot-toast";

import { FieldValues, SubmitHandler } from "react-hook-form";
import { useSaleProductMutation } from "../../redux/features/product/productAPI";
import {
  TMaintenanceAndServicingRequest,
  TMaintenanceAndServicingRequestPopulate,
  TProduct,
  TResponse,
  TSalesHistory,
} from "../../globalInterface/globalInterface";
import { logOut } from "../../redux/features/auth/authSlice";
import MaintenanceModel from "./MaintenanceModel";
import { useCreateMaintenanceAndServicingRequestMutation } from "../../redux/features/MaintenanceAndServicing/MaintenanceAndServicingAPI";
//product data type

//product card component
const MyCard = ({
  product,
  maintenanceAndServicingRequest,
}: {
  product: TProduct;
  maintenanceAndServicingRequest: TMaintenanceAndServicingRequestPopulate[];
}) => {
  const [open, setOpen] = useState(false);
  const [openMaintenance, setOpenMaintenance] = useState(false);

  const userMaintenanceAndServicingRequest =
    maintenanceAndServicingRequest.length;
  const {
    _id,
    quantity,
    price,
    releaseDate,
    brand,
    model,
    type,
    size,
    color,
    material,
    suspensionType,
    customAttributes,
  } = product;

  const [addSale] = useSaleProductMutation();
  const [addRequest] = useCreateMaintenanceAndServicingRequestMutation();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  //sale product function
  const saleProduct: SubmitHandler<FieldValues> = async (data) => {
    const { bayerName, slingDate, quantity } = data;
    const productId = _id;
    if (slingDate && slingDate !== "") {
      const date = new Date(slingDate);
      data.slingDate = `${date.getFullYear()}-${
        date.getMonth() + 1 <= 9
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1
      }-${date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate()}`;
    } else {
      return toast.error("Release Date field is required");
    }
    if (!user) {
      toast.error("User is not found,Please login!");
      return dispatch(logOut());
    }
    const sale = {
      bayerName,
      slingDate: data.slingDate,
      productId,
      sellerId: user._id,
      quantity: parseFloat(quantity.toString()),
    };
    try {
      const res = (await addSale({
        sale,
        id: _id,
      })) as TResponse<TSalesHistory>;
      if (res.data) {
        setOpen(false);
        toast.success("Product sold successfully");
      }
      if (res.error) {
        toast.error(res.error.data.massage);
      }
    } catch (err) {
      toast.error("Product sold failed");
    }
  };
  const addMaintenance: SubmitHandler<FieldValues> = async (data) => {
    const { lastServicingDate, nextServicingDate } = data;
    if (lastServicingDate && lastServicingDate !== "") {
      const date = new Date(lastServicingDate);
      data.lastServicingDate = `${date.getFullYear()}-${
        date.getMonth() + 1 <= 9
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1
      }-${date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate()}`;
    } else {
      return toast.error("Last Servicing Date field is required");
    }
    if (nextServicingDate && nextServicingDate !== "") {
      const date = new Date(nextServicingDate);
      data.nextServicingDate = `${date.getFullYear()}-${
        date.getMonth() + 1 <= 9
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1
      }-${date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate()}`;
    } else {
      return toast.error("Next Servicing Date field is required");
    }
    const lastDate = new Date(lastServicingDate);
    const nextDate = new Date(nextServicingDate);
    if (
      lastDate.getFullYear() >= nextDate.getFullYear() &&
      lastDate.getMonth() >= nextDate.getMonth() &&
      lastDate.getDate() >= nextDate.getDate()
    ) {
      return toast.error('Next Servicing Date Should Be Higher Then Last Servicing Date')
    }
    const requestData = {
      bikeId: _id,
      userId: user?._id,
      ...data,
    };
   
    try {
      const res = (await addRequest(
        requestData
      )) as TResponse<TMaintenanceAndServicingRequest>;
      if (res.data) {
        setOpenMaintenance(false);
        toast.success("Maintenance And Servicing request created successfully");
      }
      if (res.error) {

        toast.error(res.error.data.massage);
      }
    } catch (err) {
      toast.error("Maintenance And Servicing request failed");
    }
  };
  return (
    <div>
      <div>
        <Row gutter={8}>
          <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={12}>
            <p style={{ color: "#666666", fontWeight: "bold" }}>
              Brand: {brand}
            </p>
            <p style={{ color: "#666666", fontWeight: "bold" }}>
              Color {color}
            </p>
            <p style={{ color: "#666666", fontWeight: "bold" }}>Type: {type}</p>
            <p style={{ color: "#666666", fontWeight: "bold" }}>
              Model {model}
            </p>
            <p
              style={{
                color: "#666666",
                fontWeight: "bold",
              }}
            >
              Quantity : {quantity}
            </p>
            <p
              style={{
                color: "#666666",
                fontWeight: "bold",
              }}
            >
              Release Date : {releaseDate}
            </p>
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={12}>
            <p style={{ color: "#666666", fontWeight: "bold" }}>Size: {size}</p>
            <p style={{ color: "#666666", fontWeight: "bold" }}>
              Material: {material}
            </p>
            <p style={{ color: "#666666", fontWeight: "bold" }}>
              Attributes: {customAttributes}
            </p>
            <p style={{ color: "#666666", fontWeight: "bold" }}>
              Suspension Type: {suspensionType}
            </p>
          </Col>
        </Row>
      </div>
      <div>
        {/* sale button */}
        {user?.role === "seller" ? (
          <Button type="primary" onClick={() => setOpen(true)}>
            Sale
          </Button>
        ) : (
          <Button type="primary" onClick={() => setOpenMaintenance(true)}>
            Maintenance and Servicing
          </Button>
        )}
        {/* sale modal */}
        <AddProductModal
          saleProduct={saleProduct}
          open={open}
          setOpen={setOpen}
          quantity={quantity}
        ></AddProductModal>
        <MaintenanceModel
          userMaintenanceAndServicingRequest={
            userMaintenanceAndServicingRequest
          }
          price={price}
          addMaintenance={addMaintenance}
          open={openMaintenance}
          setOpen={setOpenMaintenance}
        ></MaintenanceModel>
      </div>
    </div>
  );
};

export default MyCard;
