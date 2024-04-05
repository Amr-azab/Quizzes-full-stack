import React from "react";
import { FC } from "react";
import classes from "./Dashboard.module.css";
import { Due } from "../Due/Due";
import { Middle } from "../middle/middle";
import { Annoucements } from "../Announcements/Annoucements";
import { Header } from "../header/header";

export interface page {}
export const Dashboard: FC<page> = () => {
  return (
    <div className={classes.container}>
      <Header />
      <Middle />
      <div className={classes.twoContainers}>
        <Annoucements />
        <div>
          <Due />
        </div>
      </div>
    </div>
  );
};
