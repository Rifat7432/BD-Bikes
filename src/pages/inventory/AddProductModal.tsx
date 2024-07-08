/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Modal } from "antd";
import CustomizeForm from "../../componets/ui/CoustomizeForm/CustomizeForm";
import CustomizeInput from "../../componets/ui/CoustomizeForm/CustomizeInput";
import CustomizeDatePicker from "../../componets/ui/CoustomizeForm/CustomizeDatePicker";
import { FieldValues, SubmitHandler } from "react-hook-form";

// sale product modal
const AddProductModal = ({
  saleProduct,
  open,
  setOpen,
  quantity,
}: {
  saleProduct: SubmitHandler<FieldValues>;
  open: boolean;
  setOpen: any;
  quantity: number;
}) => {
  return (
    <Modal
      title="Sale Product"
      footer=""
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={500}
    >
      <CustomizeForm onSubmit={saleProduct}>
        <CustomizeInput type="text" label="Name of Bayer" name="bayerName" />

        <CustomizeDatePicker label="Date of sling" name="slingDate" />

        <CustomizeInput
          min={1}
          max={quantity}
          placeholder={`Quantity can not more then ${quantity} and less then 1`}
          type="number"
          label="Product Quantity"
          name="quantity"
        />

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
    </Modal>
  );
};

export default AddProductModal;
