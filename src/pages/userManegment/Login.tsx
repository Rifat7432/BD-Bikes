/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Flex, Form, Input } from "antd";
import Spiner from "../../componets/ui/spiner/Spiner";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { storToken, storUserData } from "../../redux/features/auth/authSlice";
import toast from "react-hot-toast";
import {
  TResponse,
  TUserLoginData,
} from "../../globalInterface/globalInterface";
import CustomizeForm from "../../componets/ui/CoustomizeForm/CustomizeForm";
import CustomizeInput from "../../componets/ui/CoustomizeForm/CustomizeInput";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authAPI";
import { LoginResolverSchema } from "../../globalConstant/globalResolver";

// login component
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginUser, { isLoading }] = useLoginMutation();

  //set token
  dispatch(storToken(localStorage.getItem("token")));
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      const res = (await loginUser(values)) as TResponse<TUserLoginData>;
      if (res.data) {
        localStorage.setItem("token", res?.data?.data?.token);
        dispatch(storToken(res?.data?.data?.token));
        dispatch(storUserData(res?.data?.data?.user));
        toast.success("Login successful");
        navigate(`/${res?.data?.data?.user?.role}`);
      }
      if (res.error) {
        toast.error(res.error.data.massage);
      }
    } catch (err) {
      toast.error("Login failed");
    }
  };
  if (isLoading) {
    return <Spiner></Spiner>;
  }
  return (
    <Flex style={{ margin: "50px 0" }} align="center" justify="center">
      <Col
        style={{
          backgroundColor: "whitesmoke",
          borderRadius: "10xp",
          padding: "20px 20px",
        }}
        lg={8} md={16} sm={18} xs={24}
      >
        <h2 style={{ margin: "15px auto", width: "50%" }}>Login now!</h2>
        <CustomizeForm onSubmit={onSubmit} resolver={LoginResolverSchema}>
          <CustomizeInput type="text" label="Username" name="username" />
          <Controller
            name="password"
            render={({ field, fieldState: { error } }) => (
              <Form.Item label="Password">
                <Input.Password size="large" {...field} />
                {error && (
                  <small style={{ color: "red" }}>{error.message}</small>
                )}
              </Form.Item>
            )}
          />
          <Button type="primary" htmlType="submit">
            Login
          </Button>
          <div style={{ width: "100%", margin: "10px 0" }}>
            <Button onClick={() => navigate("/signUp")}>Sign Up</Button>
          </div>
        </CustomizeForm>
      </Col>
    </Flex>
  );
};

export default Login;
