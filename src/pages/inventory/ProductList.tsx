import MyCard from "./MyCard";
import Spiner from "../../componets/ui/spiner/Spiner";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import {
  setQuery,
  storProductsAllData,
} from "../../redux/features/product/productSlice";
import { Button, Checkbox, Col, Dropdown, Image, List, Row } from "antd";
import { setLoading } from "../../redux/features/auth/authSlice";
import { useState } from "react";
import UpdateProduct from "./UpdateProduct";
import ModifyProduct from "./ModifyProduct";
import { useNavigate } from "react-router-dom";
import Search from "antd/es/input/Search";
import toast from "react-hot-toast";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../redux/features/product/productAPI";
import { TProduct } from "../../globalInterface/globalInterface";
import { useGetAllMaintenanceAndServicingRequestOfUserQuery } from "../../redux/features/MaintenanceAndServicing/MaintenanceAndServicingAPI";
import { storMaintenanceAndServicingRequestData } from "../../redux/features/MaintenanceAndServicing/MaintenanceAndServicingSlice";

// product list  component
const ProductList = () => {
  const [startBulkDelete, setStartBulkDelete] = useState(false);
  //state for open update product modal
  const [open, setOpen] = useState(false);
  // id for updating product
  const [id, setId] = useState("");
  // state for open add similar product modal
  const [openModify, setOpenModify] = useState(false);
  // ste similar product data
  const [ProductModify, setProductModify] = useState({});
  const navigate = useNavigate();
  // getting product by query
  const state = useAppSelector((state) => state.product.value);
  const { token, user } = useAppSelector((state) => state.auth);
  const maintenanceAndServicing = useAppSelector(
    (state) => state.maintenanceAndServicing.value
  );
  //get query
  const querys = useAppSelector((state) => state.product.querys);
  const dispatch = useAppDispatch();
  // get all product
  const { data: products, isLoading,isFetching } = useGetProductsQuery({
    query: { lowPrice: 0, hightPrice: 999999999999999 },
  });
  const { data: maintenanceAndServicingRequest, isLoading: isServiceLoading } =
    useGetAllMaintenanceAndServicingRequestOfUserQuery(user?._id);
  // delete api function
  const [deleted] = useDeleteProductMutation();

  // get error
  if (isLoading || isServiceLoading || !maintenanceAndServicingRequest || isFetching) {
    return <Spiner></Spiner>;
  }

  // set all product
  if (products.data) {
    dispatch(storProductsAllData(products.data));
  }
  if (maintenanceAndServicingRequest.data) {
    dispatch(
      storMaintenanceAndServicingRequestData(
        maintenanceAndServicingRequest.data
      )
    );
  }
  // set all loading
  dispatch(setLoading(isLoading));
  // array of delete product id
  let deleteList: string[] = [];
  // add product id to the array of delete product id
  const addToDelete = (e: CheckboxChangeEvent) => {
    deleteList.push(e.target.value);
    if (!e.target.checked) {
      return (deleteList = deleteList.filter(
        (id: string) => id !== e.target.value
      ));
    }
  };
  // function to delete product
  const deleteAll = () => {
    deleteList.forEach((id: string) => {
      deleted({ id, token });
    });
    toast.success("Product deleted");
  };

  // function for search product by name
  const onSearch = (e: string) => {
    const query = { ...querys };
    query.searchTerm = e;
    dispatch(
      setQuery({
        ...query,
      })
    );
  };

  return (
    <div style={{ maxWidth: "900px", margin: "50px auto" }}>
      <div style={{ maxWidth: "540px", margin: "50px auto" }}>
        <Search placeholder="Search By Name" onSearch={onSearch} enterButton />
      </div>

      <Row>
        <Col
          style={{ width: "100%", margin: "10px 0" }}
          className="gutter-row"
          xs={24}
          sm={24}
          md={18}
          lg={18}
          xl={18}
        >
          {user?.role === "seller" && (
            <Button
              style={{ marginRight: "auto" }}
              onClick={() => navigate("/seller/inventory/create-product")}
            >
              Add A New Product
            </Button>
          )}
        </Col>
        <Col
          style={{ width: "100%", margin: "10px 0" }}
          className="gutter-row"
          xs={24}
          sm={24}
          md={6}
          lg={6}
          xl={6}
        >
          {user?.role === "seller" &&
            state.length > 0 &&
            (startBulkDelete ? (
              <Button
                onClick={() => {
                  deleteAll();
                  setStartBulkDelete(false);
                }}
                danger
              >
                Delete
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={() => {
                  setStartBulkDelete(true);
                }}
              >
                Select For Delete
              </Button>
            ))}
        </Col>
      </Row>

      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 4,
        }}
        dataSource={state}
        footer={
          <div>
            <h2>BD Bike Shop</h2>
          </div>
        }
        renderItem={(item) => (
          <List.Item
            style={{
              margin: "20px 0",
              boxShadow: " 0 4px 8px 0 #00000033",
              border: "2xp solid #EAEDF2",
            }}
            key={item.name}
            extra={
              <div
                style={{ height: "100%", width: "100%", position: "relative" }}
              >
                <div
                  style={{
                    marginLeft: "auto",
                    width: "20%",
                    marginBottom: "10px",
                    display: "flex",
                  }}
                >
                  {startBulkDelete ? (
                    <Checkbox
                      value={item._id}
                      onChange={addToDelete}
                    ></Checkbox>
                  ) : (
                    user?.role === "seller" && (
                      <Dropdown
                        menu={{
                          items: [
                            {
                              key: "delete",
                              label: (
                                <div
                                  onClick={() =>
                                    deleted({ id: item._id, token })
                                  }
                                  style={{
                                    maxWidth: "65px",
                                    display: "flex",
                                    gap: "5px",
                                  }}
                                >
                                  Delete
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                    />
                                  </svg>
                                </div>
                              ),
                            },
                            {
                              key: "update",
                              label: (
                                <p
                                  onClick={() => {
                                    setOpen(true);
                                    setId(item._id!);
                                  }}
                                  style={{
                                    display: "flex",
                                    gap: "5px",
                                  }}
                                >
                                  Update Product
                                  <svg
                                    style={{ maxWidth: "15px" }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                    />
                                  </svg>
                                </p>
                              ),
                            },
                            {
                              key: "modify",
                              label: (
                                <p
                                  onClick={() => {
                                    setProductModify(item);
                                    setOpenModify(true);
                                  }}
                                >
                                  Add similar Product
                                </p>
                              ),
                            },
                          ],
                        }}
                        placement="bottomRight"
                        arrow={{ pointAtCenter: true }}
                      >
                        <Button type="text" style={{ width: "56px" }}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                            />
                          </svg>
                        </Button>
                      </Dropdown>
                    )
                  )}
                </div>

                <Image.PreviewGroup items={[item.imageUrl]}>
                  <Image
                    style={{
                      height: "95%",
                      width: "100%",
                      maxHeight: "150px",
                      maxWidth: "280px",
                    }}
                    src={item.imageUrl}
                  />
                </Image.PreviewGroup>
              </div>
            }
          >
            <List.Item.Meta title={item.name} description={`$${item.price}`} />
            {/* product card */}
            <MyCard
              product={item}
              maintenanceAndServicingRequest={maintenanceAndServicing}
            ></MyCard>
            {/* Update Product modal */}
            <UpdateProduct
              open={open}
              setOpen={setOpen}
              id={id}
            ></UpdateProduct>
            {/* add similar Product modal */}
            <ModifyProduct
              open={openModify}
              setOpen={setOpenModify}
              product={ProductModify as TProduct}
            ></ModifyProduct>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ProductList;
