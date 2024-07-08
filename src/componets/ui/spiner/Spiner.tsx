import { Spin } from "antd";
// sprier
const Spiner = () => {
  return (
    <div style={{ width: "3%", margin: "250px auto" }}>
      <Spin tip="Loading" size="large" />
    </div>
  );
};

export default Spiner;
