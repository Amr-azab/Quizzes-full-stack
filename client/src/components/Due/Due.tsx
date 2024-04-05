import { FC, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { format } from "date-fns";
import instance from "../../instance";
import classes from "./Due.module.css";

interface Data {
  title: string;
  course: string;
  topic: string;
  dueDate: string;
}

export const Due: FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // State for loading

  useEffect(() => {
    const fetchUserHandler = async () => {
      try {
        const res = await instance.get("quiz/getQuizzes");
        const data = res.data.data.quizzes;
        setData(data);
        setLoading(false); // Update loading state once data is fetched
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserHandler();
  }, []);

  const Time = (dueDate: string) => {
    const parsedDate = new Date(dueDate);
    const formattedDate = format(parsedDate, "dd MMM yyyy - hh:mm a");
    return formattedDate;
  };

  return (
    <div className={classes.whatsDue}>
      <h2 className={classes.WhatsDueWord}>What's Due</h2>
      {loading ? ( // Render loading spinner if data is being fetched
        <div className={classes.Loader}>
          <CircularProgress />
        </div>
      ) : (
        // Render the list once data is fetched
        <div className={classes.list}>
          {data.map((item, index) => (
            <div key={index} className={classes.item}>
              <span className={classes.title}> {item.title} </span>
              <span className={classes.course}>Course: {item.course}</span>
              <span className={classes.topic}>Topic: {item.topic}</span>
              <span className={classes.dueDate}>
                Due to: {Time(item.dueDate)}
              </span>
              <button className={classes.Btn}>Start Quiz</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
