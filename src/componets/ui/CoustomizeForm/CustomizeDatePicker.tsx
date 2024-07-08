import { DatePicker, Form } from "antd";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";
import customParseFormat from "dayjs/plugin/customParseFormat";

const CustomizeDatePicker = ({
  name,
  label,
  value,
}: {
  name: string;
  label?: string;
  value?: string;
}) => {
  dayjs.extend(customParseFormat);
  const dateFormat = "YYYY-MM-DD";
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => {
          return (
            <Form.Item label={label}>
              {value ? (
                <DatePicker
                  defaultValue={dayjs(value, dateFormat)}
                  {...field}
                  style={{ width: "100%" }}
                  id={name}
                  size="large"
                />
              ) : (
                <DatePicker
                  {...field}
                  style={{ width: "100%" }}
                  id={name}
                  size="large"
                />
              )}
              {error && <small style={{ color: "red" }}>{error.message}</small>}
            </Form.Item>
          );
        }}
      />
    </div>
  );
};

export default CustomizeDatePicker;
