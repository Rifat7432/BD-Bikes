import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
type TLayout = {
  key: string;
  label: ReactNode;
  children?: TLayout[];
};
type TPath = {
  name?: string;
  path?: string;
  index?: boolean;
  element?: ReactNode;
  children?: TPath[];
};
//function for Generating sidebar
export const sidebarGenerator = (Paths: TPath[],role:string) => {
  const Layout = Paths.reduce((acc: TLayout[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name!,
        label: <NavLink to={`/${role}/${item.path!}`}>{item.name!}</NavLink>,
      });
    }

    if (item.children) {
      acc.push({
        key: item.name!,
        label: item.name,
        children: item.children.map((child) => ({
          key: child.name!,
          label: <NavLink to={`/${role}/${child.path!}`}>{child.name!}</NavLink>,
        })),
      });
    }
    return acc;
  }, []);
  return Layout;
};
