import { FC } from "react";
import classes from "./HomeScreen.module.css";
import { Navigate } from "react-router-dom";
import { useUserIdStore } from "../../store/userStorge";
import instance from "../../instance";

export interface HomeScreenProps {}
export const HomeScreen: FC<HomeScreenProps> = (props) => {
  const user = useUserIdStore((state) => state.userProfile);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        {user._id && <h1>Welcome {user.userName}</h1>}
      </div>
      <h2>Start to done your quizzes and your assignments </h2>
    </div>
  );
};
