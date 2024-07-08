import { Button, Table, TableColumnsType, Tag, Tooltip } from "antd";
import {
  TMaintenanceAndServicingRequest,
  TMaintenanceAndServicingRequestPopulate,
  TResponse,
} from "../../globalInterface/globalInterface";
import {
  useCompleteMaintenanceAndServicingRequestMutation,
  useGetAllMaintenanceAndServicingRequestQuery,
} from "../../redux/features/MaintenanceAndServicing/MaintenanceAndServicingAPI";
import toast from "react-hot-toast";
export type TTableData = Pick<
  TMaintenanceAndServicingRequestPopulate,
  | "bikeId"
  | "userId"
  | "serviceDetails"
  | "servicingPrice"
  | "lastServicingDate"
  | "nextServicingDate"
> & { key: string };
const MaintenanceAndServicingRequestList = () => {
  const {
    data: allMaintenanceAndServicingRequestData,
    isLoading,
    isFetching,
  } = useGetAllMaintenanceAndServicingRequestQuery(undefined);
  const [completeRequest] = useCompleteMaintenanceAndServicingRequestMutation();

  const acceptRequest = async (id: string) => {
    try {
      const res = (await completeRequest(
        id
      )) as TResponse<TMaintenanceAndServicingRequest>;
      if (res.data) {
        toast.success(
          "Maintenance And Servicing request completed successfully"
        );
      }
      if (res.error) {
        toast.error(res.error.data.massage);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const tableData = allMaintenanceAndServicingRequestData?.data?.map(
    ({
      _id,
      bikeId,
      userId,
      serviceDetails,
      servicingPrice,
      lastServicingDate,
      nextServicingDate,
    }) => ({
      key: _id,
      bikeId: bikeId,
      userId: userId,
      serviceDetails,
      servicingPrice,
      nextServicingDate,
      lastServicingDate,
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
      ellipsis: true,
    },
    {
      title: "User Email",
      key: "userId",
      dataIndex: "userId",
      render: (_, { userId }) => {
        return <p>{userId.email}</p>;
      },
      ellipsis: true,
    },
    {
      title: "Price",
      key: "servicingPrice",
      dataIndex: "servicingPrice",
      ellipsis: true,
    },
    {
      title: "Last Servicing Date",
      key: "nextServicingDate",
      dataIndex: "lastServicingDate",
      ellipsis: true,
    },
    {
      title: "Next Servicing Date",
      key: "nextServicingDate",
      dataIndex: "nextServicingDate",
      ellipsis: true,
    },
    {
      title: "Service Details",
      key: "serviceDetails",
      dataIndex: "serviceDetails",
      render: (_, { serviceDetails }) => {
        let allTags = "";
        serviceDetails.forEach((i: string) => {
          allTags = allTags + " " + i;
        });

        return (
          <Tooltip placement="top" title={allTags}>
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
          </Tooltip>
        );
      },
      ellipsis: true,
    },
    {
      title: "Action",
      key: "y",
      render: (_, { key }) => {
        return (
          <div>
            <Button onClick={() => acceptRequest(key)}>Accept</Button>
          </div>
        );
      },
      ellipsis: true,
    },
  ];
  return (
    <Table
      columns={columns}
      loading={isLoading || isFetching}
      dataSource={tableData}
    />
  );
};

export default MaintenanceAndServicingRequestList;
