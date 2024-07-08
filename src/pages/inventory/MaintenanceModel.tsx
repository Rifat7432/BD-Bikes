/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Modal } from "antd";
import CustomizeForm from "../../componets/ui/CoustomizeForm/CustomizeForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomizeSelect from "../../componets/ui/CoustomizeForm/CustomizeSelect";
import { productFieldsOptions } from "../../globalConstant/globalOptions";
import CustomizeInput from "../../componets/ui/CoustomizeForm/CustomizeInput";
import { serviceRequestResolverSchema } from "../../globalConstant/globalResolver";
import CustomizeDatePicker from "../../componets/ui/CoustomizeForm/CustomizeDatePicker";

// sale product modal
const MaintenanceModel = ({
  addMaintenance,
  open,
  setOpen,
  price,
  userMaintenanceAndServicingRequest,
}: {
  addMaintenance: SubmitHandler<FieldValues>;
  open: boolean;
  setOpen: any;
  price: number;
  userMaintenanceAndServicingRequest: number;
}) => {
  const servicePrice = price * (5 / 100);
  const priceWithDiscount =
    servicePrice -
    (userMaintenanceAndServicingRequest >= 20
      ? userMaintenanceAndServicingRequest >= 100
        ? servicePrice * (10 / 100)
        : servicePrice * (5 / 100)
      : 0);
  return (
    <Modal
      title="Maintenance And Servicing Request"
      footer="At 20 request 5% discount and 100 request 10% discount"
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={500}
    >
      <CustomizeForm
        resolver={serviceRequestResolverSchema}
        onSubmit={addMaintenance}
        defaultValues={{ servicingPrice: priceWithDiscount }}
      >
        <CustomizeSelect
          label="Service Details"
          name="serviceDetails"
          options={productFieldsOptions}
          isMultiple={true}
        />
        <CustomizeDatePicker
          name="lastServicingDate"
          label="Last Servicing Date"
        />
        <CustomizeDatePicker
          name="nextServicingDate"
          label="Next Servicing Date"
        />
        <CustomizeInput
          disabled={true}
          name="servicingPrice"
          label="Servicing Price"
          type="number"
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

export default MaintenanceModel;
