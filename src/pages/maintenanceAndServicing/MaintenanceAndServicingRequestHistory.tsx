import { Table, TableColumnsType, Tag } from "antd";
import { TMaintenanceAndServicingRequestPopulate } from "../../globalInterface/globalInterface";
import { useGetAllMaintenanceAndServicingRequestOfUserQuery } from "../../redux/features/MaintenanceAndServicing/MaintenanceAndServicingAPI";
import { useAppSelector } from "../../redux/hooks/hooks";

export type TTableData = Pick<
  TMaintenanceAndServicingRequestPopulate,
  | "bikeId"
  | "userId"
  | "serviceDetails"
  | "servicingPrice"
  | "lastServicingDate"
  | "nextServicingDate"
  |"isCompleted"
>;
const MaintenanceAndServicingRequestListHistory = () => {
  const user = useAppSelector((state) => state.auth.user);
  const {
    data: allMaintenanceAndServicingRequestData,
    isLoading,
    isFetching,
  } = useGetAllMaintenanceAndServicingRequestOfUserQuery(user?._id);

  const tableData = allMaintenanceAndServicingRequestData?.data?.map(
    ({
      _id,
      bikeId,
      userId,
      serviceDetails,
      servicingPrice,
      lastServicingDate,
      nextServicingDate,
      isCompleted
    }) => ({
      key: _id,
      bikeId: bikeId,
      userId: userId,
      serviceDetails,
      servicingPrice,
      nextServicingDate,
      lastServicingDate,
      isCompleted
    })
  );
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Bike Name",
      key: "bikeId",
      dataIndex: "bikeId",
      render: (_, { bikeId }) => {
        return <p>{bikeId.name}</p>;
      },
      ellipsis:true
    },
    {
      title: "User Email",
      key: "userId",
      dataIndex: "userId",
      render: (_, { userId }) => {
        return <p>{userId.email}</p>;
      },
      ellipsis:true
    },
    {
      title: "Price",
      key: "servicingPrice",
      dataIndex: "servicingPrice",
      ellipsis:true
    },
    {
      title: "Last Servicing Date",
      key: "nextServicingDate",
      dataIndex: "lastServicingDate",
      ellipsis:true
    },
    {
      title: "Next Servicing Date",
      key: "nextServicingDate",
      dataIndex: "nextServicingDate",
      ellipsis:true
    },
    {
      title: "Service Details",
      key: "serviceDetails",
      dataIndex: "serviceDetails",
      render: (_, { serviceDetails }) => (
        <>
          {serviceDetails.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
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
        title: "Status",
        key: "isCompleted",
        dataIndex: "isCompleted",
        render: (_, { isCompleted }) => {
          return <p>{isCompleted ? "Completed":"Padding"}</p>;
        },
        ellipsis:true
      },
  ];
  return (
    <Table
    style={{maxWidth:'100%'}}
      columns={columns}
      loading={isLoading || isFetching}
      dataSource={tableData}
    />
  );
};

export default MaintenanceAndServicingRequestListHistory;
