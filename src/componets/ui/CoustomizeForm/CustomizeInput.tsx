import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

const CustomizeInput = ({
  type,
  name,
  label,
  max,
  min,
  placeholder,
  disabled,
}: {
  type: string;
  name: string;
  label?: string;
  max?: number;
  min?: number;
  placeholder?: string;
  disabled?: boolean;
}) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => {
          return (
            <Form.Item label={label}>
              <Input
                disabled={disabled}
                max={max}
                min={min}
                placeholder={placeholder}
                {...field}
                type={type}
                id={name}
                size="large"
              />
              {error && <small style={{ color: "red" }}>{error.message}</small>}
            </Form.Item>
          );
        }}
      />
    </div>
  );
};

export default CustomizeInput;
