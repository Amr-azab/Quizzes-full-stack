import React from "react";
import { useEffect, useState } from "react";
import classes from "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { SignUp } from "./pages/SignUp/SignUp";
import { SignIn } from "./pages/SignIn/SignIn";
import { useUserIdStore } from "./store/userStorge";
import { Navigate } from "react-router-dom";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { HomeScreen } from "./components/HomeScreen/HomeScreen";
import { Layout } from "./pages/Layout/Layout";
import instance from "./instance";
import { LinearProgress } from "@mui/material";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useUserIdStore((state) => state.userProfile);
  const setUser = useUserIdStore((state) => state.setUser);

  useEffect(() => {
    const fetchUserHandler = async () => {
      try {
        setIsLoading(true);

        const res = await instance.get("/user/getMe");
        const data = res.data.data;
        setUser(data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchUserHandler();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className={classes.loading}>
          <LinearProgress color="inherit" />
        </div>
      ) : (
        <Routes>
          {!user._id ? (
            <>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
            </>
          ) : null}

          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route
              path="/"
              index={true}
              element={
                <ProtectedRoute>
                  <HomeScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/:receiverId"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
