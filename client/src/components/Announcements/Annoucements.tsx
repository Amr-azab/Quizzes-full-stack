import React, { useState, useEffect } from "react";
import { FC } from "react";
import classes from "./Annoucements.module.css";
import instance from "../../instance";
import defaultImg from "../../img/default.jpg";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress component

export interface AnnoucementTextProps {
  name: string;
  course: string;
  announcementText: string;
}

export const Annoucements: FC = () => {
  const [announcement, setAnnouncement] = useState<AnnoucementTextProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await instance.get("annoucment/getAnnouncement");
        const data = res.data.data.announcements;
        setAnnouncement(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className={classes.Container}>
      <h2 className={classes.tit}>Announcements</h2>
      {loading ? (
        <div className={classes.Loader}>
          <CircularProgress /> {/* Replace text with CircularProgress */}
        </div>
      ) : (
        announcement.map((item, index) => (
          <div key={index} className={classes.Card}>
            <img className={classes.img} alt="user" src={defaultImg} />
            <div className={classes.container2}>
              <p className={classes.Name}>{item.name}</p>
              <p className={classes.Course}>{item.course}</p>
            </div>
            <p className={classes.Text}>{item.announcementText}</p>
          </div>
        ))
      )}
    </div>
  );
};
