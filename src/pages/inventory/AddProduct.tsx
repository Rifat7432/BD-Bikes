/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Flex, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/hooks";
import toast from "react-hot-toast";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import CustomizeInput from "../../componets/ui/CoustomizeForm/CustomizeInput";
import CustomizeSelect from "../../componets/ui/CoustomizeForm/CustomizeSelect";
import { bikeTypeOptions } from "../../globalConstant/globalOptions";
import CustomizeForm from "../../componets/ui/CoustomizeForm/CustomizeForm";
import { ProductResolverSchema } from "../../globalConstant/globalResolver";
import CustomizeDatePicker from "../../componets/ui/CoustomizeForm/CustomizeDatePicker";
import { useCreateProductsMutation } from "../../redux/features/product/productAPI";
import { TProductRes, TResponse } from "../../globalInterface/globalInterface";

// component for adding product
const AddProduct = () => {
  const { token } = useAppSelector((state: { auth: any }) => state.auth);
  const [createProduct] = useCreateProductsMutation();
  const navigate = useNavigate();

  //add product function
  const addProduct: SubmitHandler<FieldValues> = async (data) => {
    const { releaseDate, color, imageUrl, quantity, price } = data;

    if (releaseDate && releaseDate !== "") {
      const date = new Date(releaseDate);
      data.releaseDate = `${date.getFullYear()}-${
        date.getMonth() + 1 <= 9
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1
      }-${date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate()}`;
    } else {
      return toast.error("Release Date field is required");
    }
    if (color && color !== "") {
      data.color = color.toLowerCase();
    }
    if (quantity) {
      data.quantity = parseFloat(quantity.toString());
    }

    if (price) {
      data.price = parseFloat(price.toString());
    }
    if (imageUrl) {
      const formData = new FormData();
      formData.append("image", imageUrl);
      // set img in imgBB
      const url = `https://api.imgbb.com/1/upload?&key=d6025c28b6090ab2f03e1df69559b6ee`;
      await fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imageData) => {
          if (imageData.data.url) {
            data.imageUrl = imageData.data.url;
          } else {
            return toast.error("Something went wrong");
          }
        });
    } else {
      return toast.error("Image field is required");
    }
    try {
      const res = (await createProduct({
        data,
        token,
      })) as TResponse<TProductRes>;
      if (res.data) {
        toast.success("Product created successfully");
        navigate("/seller/inventory");
      }
      if (res.error) {
        toast.error(res.error.data.massage);
      }
    } catch (err) {
      toast.error("Product created failed");
    }
  };

  return (
    <Flex align="center" justify="center" style={{margin:'20px auto'}}>
      <Col span={18}>
        <CustomizeForm resolver={ProductResolverSchema} onSubmit={addProduct}>
          <CustomizeInput type="text" label="Name" name="name"></CustomizeInput>
          <Controller
            name="imageUrl"
            render={({ field: { onChange, value, ...field } }) => (
              <Form.Item label="Image">
                <Input
                  type="file"
                  value={value?.fileName}
                  {...field}
                  onChange={(e) => onChange(e.target.files?.[0])}
                />
              </Form.Item>
            )}
          />

          <CustomizeDatePicker
            label="Date of Release"
            name="releaseDate"
          ></CustomizeDatePicker>
          <CustomizeInput
            type="number"
            label="Product Quantity"
            name="quantity"
          ></CustomizeInput>
          <CustomizeInput
            type="number"
            label="Product Price"
            name="price"
          ></CustomizeInput>
          <CustomizeInput
            type="text"
            label="Product Brand"
            name="brand"
          ></CustomizeInput>
          <CustomizeInput
            type="text"
            label="Product Size"
            name="size"
          ></CustomizeInput>
          <CustomizeInput
            type="text"
            label="Product Material"
            name="material"
          ></CustomizeInput>
          <CustomizeInput
            type="text"
            label="Product Color"
            name="color"
          ></CustomizeInput>
          <CustomizeSelect
            options={bikeTypeOptions}
            label="Product Type"
            name="type"
          ></CustomizeSelect>
          <CustomizeInput
            type="text"
            label="Product Model"
            name="model"
          ></CustomizeInput>
          <CustomizeInput
            type="text"
            label="Product Attributes"
            name="customAttributes"
          ></CustomizeInput>
          <CustomizeInput
            type="text"
            label="Product Suspension"
            name="suspensionType"
          ></CustomizeInput>
          <Form.Item label=" ">
            <Button
              type="primary"
              style={{ width: "200px", margin: "0 auto" }}
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </CustomizeForm>
      </Col>
    </Flex>
  );
};

export default AddProduct;
