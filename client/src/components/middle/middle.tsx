import React from "react";
import classes from "./middle.module.css";
import laptop from "../../img/laptop.jpg";

export const Middle: React.FC = () => {
  return (
    <div className={classes.Container}>
      <p className={classes.Title}>EXAMS TIME</p>
      <div className={classes.Tip}>
        <p className={classes.Tip}>Here we are, Are you ready to fight?</p>
        <p className={classes.Tip}>
          Don't worry, we prepared some tips to be ready for your exams.
        </p>
        <p className={classes.Quote}>
          "Nothing happens until something moves- <br />
          Albert Einsten"
        </p>
        <button className={classes.Btn}>View exams tips</button>
      </div>
    </div>
  );
};
