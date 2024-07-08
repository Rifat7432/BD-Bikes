/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Flex, Form, Input, Modal } from "antd";

import { useAppSelector } from "../../redux/hooks/hooks";
import toast from "react-hot-toast";
import {
  TProduct,
  TProductRes,
  TResponse,
} from "../../globalInterface/globalInterface";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import CustomizeForm from "../../componets/ui/CoustomizeForm/CustomizeForm";
import { ProductResolverSchema } from "../../globalConstant/globalResolver";
import CustomizeInput from "../../componets/ui/CoustomizeForm/CustomizeInput";
import CustomizeDatePicker from "../../componets/ui/CoustomizeForm/CustomizeDatePicker";
import { bikeTypeOptions } from "../../globalConstant/globalOptions";
import CustomizeSelect from "../../componets/ui/CoustomizeForm/CustomizeSelect";
import { useCreateProductsMutation } from "../../redux/features/product/productAPI";
//product data type

// add similar product modal
const ModifyProduct = ({
  open,
  setOpen,
  product,
}: {
  open: boolean;
  setOpen: any;
  product: TProduct;
}) => {
  //product data
  const {
    name,
    releaseDate: defaultReleaseDate,
    quantity,
    price,
    brand,
    size,
    material,
    color,
    model,
    type,
    customAttributes,
    suspensionType,
    imageUrl,
  } = product as TProduct;
  const [addProduct] = useCreateProductsMutation();
  const { token } = useAppSelector((state: { auth: any }) => state.auth);
  const add: SubmitHandler<FieldValues> = async (data) => {
    const { releaseDate, quantity, price, color, imageUrl } = data;

    if (releaseDate && releaseDate !== "") {
      const date = new Date(releaseDate);
      data.releaseDate = `${date.getFullYear()}-${
        date.getMonth() + 1 <= 9
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1
      }-${date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate()}`;
    } else {
      data.releaseDate = defaultReleaseDate;
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
      if (typeof imageUrl !== "string") {
        const formData = new FormData();
        formData.append("image", imageUrl);
        //set img on imgBB
        const url = `https://api.imgbb.com/1/upload?&key=d6025c28b6090ab2f03e1df69559b6ee`;
        await fetch(url, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((ImageData) => {
            if (ImageData.data.url) {
              data.imageUrl = ImageData.data.url;
            } else {
              return toast.error("Image field is required");
            }
          });
      }
    } else {
      return toast.error("Image field is required");
    }
    try {
      const res = (await addProduct({ data, token })) as TResponse<TProductRes>;
      setOpen(false);
      if (res.data) {
        toast.success("Product created successfully");
      }
      if (res.error) {
        toast.error(res.error.data.massage);
      }
    } catch (err) {
      toast.error("Login failed");
    }
  };

  return (
    <Modal
      title="Add Similar Product"
      footer=""
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={500}
    >
      <Flex align="center" justify="center">
        <Col span={24}>
          <CustomizeForm
            defaultValues={{
              name,
              quantity: (quantity ? quantity : 0).toString(),
              price: (price ? price : 0).toString(),
              brand,
              size,
              material,
              color,
              model,
              type,
              customAttributes,
              suspensionType,
              imageUrl,
            }}
            resolver={ProductResolverSchema}
            onSubmit={add}
          >
            <CustomizeInput
              type="text"
              label="Name"
              name="name"
            ></CustomizeInput>
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
              value={defaultReleaseDate}
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
    </Modal>
  );
};

export default ModifyProduct;
