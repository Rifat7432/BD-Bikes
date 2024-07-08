import Spiner from "../../componets/ui/spiner/Spiner";
import getSaleHistoryData, { TSale } from "../../utils/getSaleHistoryData";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { setLoading } from "../../redux/features/auth/authSlice";
import { useGetHistoryQuery } from "../../redux/features/saleHistory/saleHistoryAPI";
import Invoice from "../inventory/Invoice";
import { usePDF } from "react-to-pdf";
import { Button } from "antd";
// sale data type

// sale history table component
const SaleHistoryList = () => {
  const filter = useAppSelector((state) => state.history.filter);
  const { toPDF, targetRef } = usePDF({
    filename: `Invoice-${filter}-001.pdf`,
  });
  const dispatch = useAppDispatch();
  // query
  const { data, isLoading } = useGetHistoryQuery(undefined);

  if (isLoading) {
    return <Spiner></Spiner>;
  }

  dispatch(setLoading(isLoading));
  // filter all sale history data by query
  let filterData: TSale[] = [];
  if (data && data.data) {
    filterData = getSaleHistoryData(data.data, filter) as TSale[];
  }

  return (
    <div>
      <Button style={{margin:'50px 20px'}} onClick={()=>toPDF()}>Downloads PDF</Button>
      <Invoice targetRef={targetRef} invoiceData={filterData} />
    </div>
  );
};

export default SaleHistoryList;
