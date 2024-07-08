/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Flex, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import Spiner from "../../componets/ui/spiner/Spiner";
import toast from "react-hot-toast";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import CustomizeForm from "../../componets/ui/CoustomizeForm/CustomizeForm";
import CustomizeInput from "../../componets/ui/CoustomizeForm/CustomizeInput";
import CustomizeSelect from "../../componets/ui/CoustomizeForm/CustomizeSelect";
import { userRoleOptions } from "../../globalConstant/globalOptions";
import { useSignUpMutation } from "../../redux/features/auth/authAPI";
import { TResponse, TUser } from "../../globalInterface/globalInterface";
import { SignUpResolverSchema } from "../../globalConstant/globalResolver";

// signUp component
const SignUp = () => {
  const navigate = useNavigate();
  const [addUser, {isLoading}] = useSignUpMutation();
  // add a new user
  const onSubmit: SubmitHandler<FieldValues> =async (values) => {
    try {
      const res = (await  addUser(values)) as TResponse<TUser>;
      if (res.data) {
        navigate("/login");
        toast.success("SignUp successful");
      }
      if (res.error) {
        toast.error(res.error.data.massage);
      }
    } catch (err) {
      toast.error("SignUp failed");
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
        <h2 style={{ margin: "15px auto", width: "50%" }}>SignUp now!</h2>
        <CustomizeForm resolver={SignUpResolverSchema} onSubmit={onSubmit}>
          <CustomizeInput type="text" label="Username" name="username" />
          <CustomizeInput type="email" label="Email" name="email" />
          <CustomizeSelect options={userRoleOptions} label="Role" name="role" />
          <Controller
            name="password"
            render={({ field }) => (
              <Form.Item label="Password">
                <Input.Password size="large" {...field} />
              </Form.Item>
            )}
          />
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
          <div style={{ width: "100%", margin: "10px 0" }}>
            <Button onClick={() => navigate("/login")}>Login</Button>
          </div>
        </CustomizeForm>
      </Col>
    </Flex>
  );
};

export default SignUp;
