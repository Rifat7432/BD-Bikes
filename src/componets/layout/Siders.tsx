import { Button, Input, Layout, Menu, Space, Tooltip } from "antd";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import {
  handleBrand,
  handleColors,
  handleCustomAttributes,
  handleMaterial,
  handleModel,
  handleSize,
  handleSuspensionType,
  handleType,
} from "../../utils/handelFilter";
import { FormEvent, useState } from "react";
import {
  setQuery,
  storProductsData,
} from "../../redux/features/product/productSlice";
import { storFilter } from "../../redux/features/saleHistory/saleHistory";

import { useGetProductsQuery } from "../../redux/features/product/productAPI";

//type of query object
type TFilter = {
  lowPrice?: number;
  hightPrice?: number;
  model?: string;
  brand?: string;
  releaseDate?: string;
  type?: string;
  size?: string;
  color?: string;
  material?: string;
  suspensionType?: string;
  customAttributes?: string;
  searchTerm?: string;
};

const { Sider } = Layout;
const Siders = () => {
  const [hightPrice, setHightPrice] = useState(1000);
  const [isType, setIsType] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isBroken, setIsBroken] = useState(false);
  const [lowPrice, seLowPrice] = useState(100);
  //getting all products and query object
  const { all: state, querys } = useAppSelector((state) => state.product);
  const user = useAppSelector((state) => state.auth.user);
  const query = { ...querys };
  const dispatch = useAppDispatch();
  // getting products according to the query
  const { data: products } = useGetProductsQuery({
    query: querys,
  });
  const params = useLocation();
  // function for setting the query
  const handleProvinceChange = (element: TFilter) => {
    dispatch(
      setQuery({
        ...element,
        lowPrice: query.lowPrice,
        hightPrice: query.hightPrice,
      })
    );
  };
  // function for setting the query low and hight price
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const lowPrice = parseFloat(formData.get("lowPrice") as string);
    const hightPrice = parseFloat(formData.get("hightPrice") as string);
    const element: TFilter = { lowPrice, hightPrice };
    if (query?.model) {
      element.model = query?.model;
    }
    if (query?.brand) {
      element.brand = query?.brand;
    }
    if (query?.releaseDate) {
      element.releaseDate = query?.releaseDate;
    }
    if (query?.type) {
      element.type = query?.type;
    }
    if (query?.size) {
      element.size = query?.size;
    }
    if (query?.color) {
      element.color = query?.color;
    }
    if (query?.material) {
      element.material = query?.material;
    }
    if (query?.suspensionType) {
      element.suspensionType = query?.suspensionType;
    }
    if (query?.customAttributes) {
      element.customAttributes = query?.customAttributes;
    }
    dispatch(setQuery(element));
  };
  // setting products globally
  if (products) {
    dispatch(storProductsData(products.data));

  }

  // sidebar items
  const items = [
    {
      key: "color",
      label: "Filter By Color",
      children: handleColors(state, handleProvinceChange),
    },
    {
      key: "size",
      label: "Filter By Size",
      children: handleSize(state, handleProvinceChange),
    },
    {
      key: "Model",
      label: "Filter By Model",
      children: handleModel(state, handleProvinceChange),
    },
    {
      key: "Brand",
      label: "Filter By Brand",
      children: handleBrand(state, handleProvinceChange),
    },
    {
      key: "Material",
      label: "Filter By Material",
      children: handleMaterial(state, handleProvinceChange),
    },
    {
      key: "Type",
      label: "Filter By Type",
      children: handleType(state, handleProvinceChange),
    },
    {
      key: "Suspension Type",
      label: "Filter By Suspension Type",
      children: handleSuspensionType(state, handleProvinceChange),
    },
    {
      key: "Custom Attributes",
      label: "Filter By Custom Attributes",
      children: handleCustomAttributes(state, handleProvinceChange),
    },
  ];
  // set  history filter query
  const handleFilter = (data: string) => {
    dispatch(storFilter(data));
  };
  // sidebar items for sale history route
  const timeLine = [
    {
      key: "Time line",
      label: "Filter",
      children: [
        {
          key: "Yearly",
          label: <p onClick={() => handleFilter("Yearly")}>Yearly</p>,
        },
        {
          key: "Monthly",
          label: <p onClick={() => handleFilter("Monthly")}>Monthly</p>,
        },
        {
          key: "Daily",
          label: <p onClick={() => handleFilter("Daily")}>Daily</p>,
        },
        {
          key: "Weekly",
          label: <p onClick={() => handleFilter("Weekly")}>Weekly</p>,
        },
      ],
    },
  ];
  const filterItems =
    params.pathname === `/${user?.role}/inventory`
      ? items
      : params.pathname === `/${user?.role}`
      ? items
      : params.pathname === `/${user?.role}/sale-history`
      ? timeLine
      : [];
  return (
    <Sider
      breakpoint="md"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        setIsBroken(broken)
      }}
      onCollapse={(collapsed, type) => {
        setIsType(type)
        setIsCollapsed(collapsed)
      }}
      style={{position: (!isCollapsed && isBroken  && isType=== 'clickTrigger') ? 'absolute' :'relative',zIndex:1}}
    >
      <div style={{ marginLeft: "5px",height:'100%',padding:'50px 0' }}>
        {params.pathname === `/${user?.role}/inventory` ? (
          <div style={{ width: "95%", color: "white" }}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <Space.Compact size="small">
                <span style={{ marginRight: "2px" }}>Price</span>{" "}
                <Tooltip placement="top" title={lowPrice}>
                  <Input
                    type="number"
                    onChange={(e) => seLowPrice(parseFloat(e.target.value))}
                    defaultValue={
                      query.lowPrice ? (query.lowPrice as number) : 100
                    }
                    name="lowPrice"
                    style={{ marginRight: "1px" }}
                    placeholder="low price"
                  />
                </Tooltip>
                -
                <Tooltip placement="top" title={hightPrice}>
                  <Input
                    type="number"
                    onChange={(e) => setHightPrice(parseFloat(e.target.value))}
                    defaultValue={
                      query.hightPrice ? (query.hightPrice as number) : 1000
                    }
                    name="hightPrice"
                    style={{ marginLeft: "1px" }}
                    placeholder="hight price"
                  />
                </Tooltip>
                <Button htmlType="submit" type="primary">
                  filter
                </Button>
              </Space.Compact>
            </form>
          </div>
        ) : params.pathname === `/${user?.role}` ? (
          <div style={{ width: "95%", color: "white" }}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <Space.Compact size="small">
                <span style={{ marginRight: "2px" }}>Price</span>{" "}
                <Tooltip placement="top" title={lowPrice}>
                  <Input
                    type="number"
                    onChange={(e) => seLowPrice(parseFloat(e.target.value))}
                    defaultValue={
                      query.lowPrice ? (query.lowPrice as number) : 100
                    }
                    name="lowPrice"
                    style={{ marginRight: "1px" }}
                    placeholder="low price"
                  />
                </Tooltip>
                -
                <Tooltip placement="top" title={hightPrice}>
                  <Input
                    type="number"
                    onChange={(e) => setHightPrice(parseFloat(e.target.value))}
                    defaultValue={
                      query.hightPrice ? (query.hightPrice as number) : 1000
                    }
                    name="hightPrice"
                    style={{ marginLeft: "1px" }}
                    placeholder="hight price"
                  />
                </Tooltip>
                <Button htmlType="submit" type="primary">
                  filter
                </Button>
              </Space.Compact>
            </form>
          </div>
        ) : (
          ""
        )}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={filterItems}
        />
      </div>
    </Sider>
  );
};

export default Siders;
