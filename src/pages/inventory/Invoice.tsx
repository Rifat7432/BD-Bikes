import { Table, TableColumnsType, Tag } from "antd";
import { TSale } from "../../utils/getSaleHistoryData";

const Invoice = ({
  invoiceData,
  targetRef,
}: {
  invoiceData: TSale[];
  targetRef: any;
}) => {
  const columns: TableColumnsType<TSale> = [
    {
      title: "Bike Name",
      dataIndex: "bikeName",
      key: "bikeName",
      render: (_, { bikeName }) => (
        <>
          {bikeName.map((tag) => {
            const color = tag.length > 5 ? "geekblue" : "green";

            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
      ellipsis:true
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, { quantity }) => (
        <>
          {quantity.map((tag) => {
            const color = tag.toString().length > 5 ? "geekblue" : "green";
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </>
      ),
      ellipsis:true
    },
    {
      title: "Total Quantity",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
      ellipsis:true
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_, { price }) => (
        <>
          {price.map((tag) => {
            const color = tag.toString().length > 5 ? "geekblue" : "green";
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </>
      ),
      ellipsis:true
    },
    {
      title: "Date of Sale",
      dataIndex: "slingDate",
      key: "slingDate",
      ellipsis:true
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      ellipsis:true
    },
  ];

  return (
    <div ref={targetRef}>
      <div style={{ marginBottom: "20px" }}>
        <h1>Invoice</h1>
      </div>
      <Table
        dataSource={invoiceData}
        columns={columns}
        pagination={false}
        summary={() => (
          <>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={3}>
                Total
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1}>
                {invoiceData.reduce(
                  (total, item) => total + item.totalAmount,
                  0
                )}
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </>
        )}
      />
    </div>
  );
};

export default Invoice;
