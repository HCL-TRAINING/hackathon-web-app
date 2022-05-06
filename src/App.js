import React, { createContext, useCallback, useEffect, useState } from "react";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Header from "./components/header/header";
import { BrowserRouter } from "react-router-dom";
import LibraryRoutes from "./routes";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./slices/auth";

export const RoleContext = createContext(null);

function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [showUser, setShowUser] = useState(false);
  // @ts-ignore
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // @ts-ignore

  useEffect(() => {
    console.log("current user in app", currentUser);

    if (currentUser) {
      console.log("admin", currentUser.role.includes("ADMIN"));
      console.log("user", currentUser.role.includes("USER"));
      setShowAdmin(currentUser.role.includes("ADMIN"));
      setShowUser(currentUser.role.includes("USER"));
    } else {
      setShowAdmin(false);
      setShowUser(false);
    }
  }, [currentUser]);

  return (
    <div className="App">
      <BrowserRouter basename="/library-management">
        <RoleContext.Provider value={{showAdmin, showUser}}>
        <Header />
        <LibraryRoutes />
        </RoleContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
