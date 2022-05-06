import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RoleContext } from "../../App";

export default function UserDashboard() {
  // @ts-ignore
  const { user: currentUser } = useSelector((state) => state.auth);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { showAdmin, showUser } = useContext(RoleContext);



  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (showAdmin) {
      navigate("/admin-dashboard");
    }

    if (showUser) {
      navigate("/user-dashboard");
    }
  }, [showAdmin, showUser]);

  return <div>User Dashboard</div>;
}
