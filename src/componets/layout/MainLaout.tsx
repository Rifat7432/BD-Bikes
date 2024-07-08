import Siders from "./Siders";
import { Layout, Menu } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { sidebarGenerator } from "../../utils/layoutItems.generator";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { logOut } from "../../redux/features/auth/authSlice";
import {  buyerPaths, sellerPaths } from "../../routes/app.routes";
const { Header, Content } = Layout;
//main layout
const MainLaout = () => {
  //getting the boolean if the token is valid
  const { token, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const appPaths = user?.role === "seller" ? sellerPaths : buyerPaths;
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        {!token ? (
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["4"]}
            items={[
              ...sidebarGenerator(appPaths,user?.role as string),
              {
                key: "Login",
                label: <NavLink to={"/login"}>{"Login"}</NavLink>,
              },
              {
                key: "Sign Up",
                label: <NavLink to={"/signUp"}>{"Sign Up"}</NavLink>,
              },
            ]}
            style={{ flex: 1, justifyContent: "space-evenly", minWidth: 0 }}
          />
        ) : (
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["4"]}
            items={[
              ...sidebarGenerator(appPaths,user?.role as string),
              {
                key: "LogOut",
                label: (
                  <p
                    onClick={() => {
                      dispatch(logOut());
                    }}
                  >
                    {"LogOut"}
                  </p>
                ),
              },
            ]}
            style={{ flex: 1, justifyContent: "space-evenly", minWidth: 0 }}
          />
        )}
      </Header>

      <Layout style={{position:'relative'}}>
        <Siders></Siders>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content>
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLaout;
