import { TProduct } from "../globalInterface/globalInterface";
import { removeDuplicates } from "./filters";
// sale history data type
type TSalesHistory = {
  bayerName: string;
  slingDate: string;
  quantity: number;
  productId: TProduct;
  sellerId: string;
};
// data type to show sale history table
export type TSale = {
  bikeName: string[];
  quantity: number[];
  totalQuantity: number;
  price: number[];
  slingDate: string;
  totalAmount: number;
};

//function to get week by date, week start january 1 date
const getWeek = (d: string) => {
  let date = new Date(d);
  date = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNumber = Math.ceil(
    ((Number(date) - Number(yearStart)) / 86400000 + 1) / 7
  );
  return weekNumber;
};
//function to get start date by week number , week start january 1 date
const getStartDateOfWeek = (d: string) => {
  let date = new Date(d);
  date = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNumber = Math.ceil(
    ((Number(date) - Number(yearStart)) / 86400000 + 1) / 7
  );
  const startDate = new Date(
    yearStart.getTime() + (weekNumber - 1) * 7 * 86400000
  ).toLocaleDateString();
  return startDate;
};
//function to get end date by week number , week start january 1 date
const getEndDateOfWeek = (d: string) => {
  let date = new Date(d);
  date = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNumber = Math.ceil(
    ((Number(date) - Number(yearStart)) / 86400000 + 1) / 7
  );
  const startDate = new Date(
    yearStart.getTime() + (weekNumber - 1) * 7 * 86400000
  );
  const endDate = new Date(
    startDate.getTime() + 6 * 86400000
  ).toLocaleDateString();
  return endDate;
};
// get Sale History Data filtrating by "Yearly" | "Monthly" | "Daily" | "Weekly"
const getSaleHistoryData = (
  data: TSalesHistory[],
  time: "Yearly" | "Monthly" | "Daily" | "Weekly"
) => {
  const totalData: TSale[] = [];
  // Data filtrating by "Yearly"
  if (time === "Yearly") {
    const date = data.map((element) =>
      new Date(element.slingDate).getFullYear()
    );
    removeDuplicates(date).forEach((e) => {
      const yearlyData: TSale = {
        bikeName: [],
        slingDate: e.toString(),
        quantity: [],
        totalQuantity: 0,
        price: [],
        totalAmount: 0,
      };
      data.forEach((element: TSalesHistory) => {
        const year = new Date(element.slingDate).getFullYear();
        if (year === e) {
          yearlyData.totalAmount += element.quantity * element.productId.price;
          yearlyData.bikeName.push(element.productId.name);
          yearlyData.price.push(element.productId.price);
          yearlyData.quantity.push(element.quantity);
          yearlyData.totalQuantity += element.quantity;
        }
      });
      totalData.push(yearlyData);
    });
    return totalData;
  }
  //Data filtrating by "Monthly"
  else if (time === "Monthly") {
    const date = data.map(
      (element) =>
        `${new Date(element.slingDate).getFullYear()}/${
          new Date(element.slingDate).getMonth() + 1
        }`
    );

    removeDuplicates(date).forEach((e) => {
      const yearlyData: TSale = {
        bikeName: [],
        slingDate: e.toString(),
        quantity: [],
        totalQuantity: 0,
        price: [],
        totalAmount: 0,
      };
      data.forEach((element: TSalesHistory) => {
        const year = `${new Date(element.slingDate).getFullYear()}/${
          new Date(element.slingDate).getMonth() + 1
        }`;
        if (year === e) {
          yearlyData.quantity.push(element.quantity);
          yearlyData.totalQuantity += element.quantity;
          yearlyData.totalAmount += element.quantity * element.productId.price;
          yearlyData.bikeName.push(element.productId.name);
          yearlyData.price.push(element.productId.price);
        }
      });
      totalData.push(yearlyData);
    });
    return totalData;
  }
  // Data filtrating by "Daily"
  else if (time === "Daily") {
    const date = data.map(
      (element) =>
        `${new Date(element.slingDate).getFullYear()}/${
          new Date(element.slingDate).getMonth() + 1
        }/${new Date(element.slingDate).getDate()}`
    );
    removeDuplicates(date).forEach((e) => {
      const yearlyData: TSale = {
        bikeName: [],
        slingDate: e.toString(),
        quantity: [],
        totalQuantity: 0,
        price: [],
        totalAmount: 0,
      };
      data.forEach((element) => {
        const year = `${new Date(element.slingDate).getFullYear()}/${
          new Date(element.slingDate).getMonth() + 1
        }/${new Date(element.slingDate).getDate()}`;
        if (year === e) {
          yearlyData.quantity.push(element.quantity);
          yearlyData.totalQuantity += element.quantity;
          yearlyData.totalAmount += element.quantity * element.productId.price;
          yearlyData.bikeName.push(element.productId.name);
          yearlyData.price.push(element.productId.price);
        }
      });
      totalData.push(yearlyData);
    });
    return totalData;
  }
  // Data filtrating by "Weekly"
  else if (time === "Weekly") {
    const date = data.map(
      (element) =>
        `${getWeek(element.slingDate)}/${new Date(
          element.slingDate
        ).getFullYear()}`
    );

    removeDuplicates(date).forEach((e) => {
      const weekInNumber = e.split("/");
      const yearlyData: TSale = {
        bikeName: [],
        slingDate: e.toString(),
        quantity: [],
        totalQuantity: 0,
        price: [],
        totalAmount: 0,
      };
      data.forEach((element) => {
        const year = new Date(element.slingDate).getFullYear();
        const week = getWeek(element.slingDate);
        if (
          week === parseInt(weekInNumber[0]) &&
          year === parseInt(weekInNumber[1])
        ) {
          yearlyData.quantity.push(element.quantity);
          yearlyData.totalQuantity += element.quantity;
          yearlyData.totalAmount += element.quantity * element.productId.price;
          yearlyData.bikeName.push(element.productId.name);
          yearlyData.price.push(element.productId.price);
          yearlyData.slingDate = `${getStartDateOfWeek(
            element.slingDate
          )} to ${getEndDateOfWeek(element.slingDate)}`;
        }
      });
      totalData.push(yearlyData);
    });
    return totalData;
  }
};

export default getSaleHistoryData;
