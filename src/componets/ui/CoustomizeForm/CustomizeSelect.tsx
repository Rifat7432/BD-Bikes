import { Form, Select } from "antd";
import { Controller } from "react-hook-form";
interface TOptions {
  value: string | number;
  label: string | number;
  disabled?: boolean;
}
type TProps = {
  options: TOptions[];
  label: string;
  name: string;
  isMultiple?:boolean
};

const CustomizeSelect = ({ options, label, name,isMultiple }: TProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
         {isMultiple? <Select
            {...field}
            mode="tags"
            style={{ width: "100%" }}
            options={options}
            size="large"
          />:<Select
          {...field}
          style={{ width: "100%" }}
          options={options}
          size="large"
        />}
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default CustomizeSelect;
