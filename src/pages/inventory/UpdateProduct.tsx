/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Flex, Form, Input, Modal } from "antd";
import { useAppSelector } from "../../redux/hooks/hooks";
import toast from "react-hot-toast";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import CustomizeForm from "../../componets/ui/CoustomizeForm/CustomizeForm";
import { ProductUpdateResolverSchema } from "../../globalConstant/globalResolver";
import CustomizeInput from "../../componets/ui/CoustomizeForm/CustomizeInput";
import CustomizeDatePicker from "../../componets/ui/CoustomizeForm/CustomizeDatePicker";
import CustomizeSelect from "../../componets/ui/CoustomizeForm/CustomizeSelect";
import { bikeTypeOptions } from "../../globalConstant/globalOptions";
import { useUpdateProductMutation } from "../../redux/features/product/productAPI";
import { TProductRes, TResponse } from "../../globalInterface/globalInterface";

{
  /* Update Product modal component*/
}
const UpdateProduct = ({
  open,
  setOpen,
  id,
}: {
  open: boolean;
  setOpen: any;
  id: string;
}) => {
  const { token } = useAppSelector((state: { auth: any }) => state.auth);
  const [updateData] = useUpdateProductMutation();
  const update: SubmitHandler<FieldValues> = async (data) => {
    const { releaseDate, quantity, price, color, imageUrl } = data;

    if (releaseDate && releaseDate !== "") {
      const date = new Date(releaseDate);
      data.releaseDate = `${date.getFullYear()}-${
        date.getMonth() + 1 <= 9
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1
      }-${date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate()}`;
    }
    if (color && color !== "") {
      data.color = color.toLowerCase();
    }
    if (quantity !== "" && quantity) {
      data.quantity = parseFloat(quantity.toString());
    }
    if (price !== "" && price) {
      data.price = parseFloat(price.toString());
    }
    if (imageUrl) {
      const formData = new FormData();
      formData.append("image", imageUrl);
      const url = `https://api.imgbb.com/1/upload?&key=d6025c28b6090ab2f03e1df69559b6ee`;
      await fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imageData) => {
          if (imageData) {
            data.imageUrl = imageData.data.url;
          }
        });
    }
    if (
      data.name ||
      data.imageUrl ||
      data.price ||
      data.quantity ||
      data.suspensionType ||
      data.customAttributes ||
      data.type ||
      data.model ||
      data.color ||
      data.material ||
      data.size ||
      data.brand ||
      data.releaseDate
    ) {
      try {
        const res = (await updateData({
          product: data,
          id,
          token,
        })) as TResponse<TProductRes>;
        setOpen(false);
        if (res.data) {
          toast.success("Product updated successfully");
        }
        if (res.error) {
          toast.error(res.error.data.massage);
        }
      } catch (err) {
        toast.error("Product updated failed");
      }
    } else {
      return toast.error("enter data for update");
    }
  };

  return (
    <Modal
      title="Update Product"
      footer=""
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={500}
    >
      <Flex align="center" justify="center">
        <Col span={24}>
          <CustomizeForm resolver={ProductUpdateResolverSchema} onSubmit={update}>
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

export default UpdateProduct;
