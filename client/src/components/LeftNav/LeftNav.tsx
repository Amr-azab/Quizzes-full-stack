import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../../instance";
import { useUserIdStore } from "../../store/userStorge";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import VolumeDownOutlinedIcon from "@mui/icons-material/VolumeDownOutlined";
import { Home, BarChart, Book, School, Event, Mic } from "@mui/icons-material";
import classes from "./LeftNav.module.css";

export const LeftNav: React.FC = () => {
  const navigate = useNavigate();
  const user = useUserIdStore((state) => state.userProfile);
  const setUser = useUserIdStore((state) => state.setUser);
  const [activeIcon, setActiveIcon] = useState("");

  const logOutHandler = async () => {
    const res = await instance.post("/user/logout");
    if (res.data.status === "success") {
      setUser("");
      navigate("/signIn", { replace: true });
    }
  };

  const handleIconClick = (iconName: string) => {
    // console.log("Icon clicked:", iconName);
    setActiveIcon(iconName);
    if (iconName === "home") {
      document.getElementById("dashboard-link")?.classList.add("activeLink");
    } else {
      document.getElementById("dashboard-link")?.classList.remove("activeLink");
    }
    // console.log("Active link:", document.getElementById("dashboard-link"));
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>Coligo</div>
      <div className={classes.links}>
        <div
          className={` ${activeIcon === "home" ? classes.active : ""}`}
          onClick={() => handleIconClick("home")}
        >
          <Home />
          <Link
            to={`/user/${user._id}`}
            className={`${classes.customLink} ${
              activeIcon === "home" ? classes.activeLink : ""
            }`}
            id="dashboard-link"
          >
            Dashboard
          </Link>
        </div>
        <div
          className={`${classes.iconContainer} ${
            activeIcon === "event" ? classes.active : ""
          }`}
          onClick={() => handleIconClick("event")}
        >
          <Event />
          Schedule
        </div>
        <div
          className={`${classes.iconContainer} ${
            activeIcon === "school" ? classes.active : ""
          }`}
          onClick={() => handleIconClick("school")}
        >
          <School />
          GradeBook
        </div>
        <div
          className={`${classes.iconContainer} ${
            activeIcon === "book" ? classes.active : ""
          }`}
          onClick={() => handleIconClick("book")}
        >
          <Book />
          Courses
        </div>
        <div
          className={`${classes.iconContainer} ${
            activeIcon === "barChart" ? classes.active : ""
          }`}
          onClick={() => handleIconClick("barChart")}
        >
          <BarChart />
          Performance
        </div>
        <div
          className={`${classes.iconContainer} ${
            activeIcon === "mic" ? classes.active : ""
          }`}
          onClick={() => handleIconClick("mic")}
        >
          <Mic />
          Announcement
        </div>
        <div
          className={`${classes.iconContainer} ${
            activeIcon === "logout" ? classes.active : ""
          }`}
          onClick={() => handleIconClick("logout")}
        >
          <ExitToAppIcon />
          <Link
            to="/logout"
            className={classes.customLink}
            onClick={logOutHandler}
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};
