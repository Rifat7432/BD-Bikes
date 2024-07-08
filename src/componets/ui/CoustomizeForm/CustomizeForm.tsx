import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type TFromProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TConfig;

const CustomizeForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: TFromProps) => {
  const config: TConfig = {};
  if (defaultValues) {
    config["defaultValues"] = defaultValues;
  }
  if (resolver) {
    config["resolver"] = zodResolver(resolver);
  }
  const method = useForm(config);
  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    method.reset();
  };
  return (
    <FormProvider {...method}>
      <Form layout="vertical" onFinish={method.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default CustomizeForm;
