import { FC } from "react";
import classes from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import { LeftNav } from "../../components/LeftNav/LeftNav";
export interface LayoutProps {}
export const Layout: FC<LayoutProps> = (props) => {
  return (
    <div className={classes.leftNavLayout}>
      <div className={classes.container}>
        <LeftNav />
      </div>
      <div className={classes.content}>
        <Outlet />
      </div>
    </div>
  );
};
