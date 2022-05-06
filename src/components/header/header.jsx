// @ts-nocheck
import React from "react";
import { useCallback, useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RoleContext } from "../../App";
import { logout } from "../../slices/auth";
import './header.css';

export default function Header() {
    const {showAdmin, showUser} = useContext(RoleContext);
  // @ts-ignore
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log("userr", currentUser);
//   console.log('rbac', rbac);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>
          Library Management Portal
        </Navbar.Brand>
        <Nav className="me-auto header-nav" style={{width: '100%'}}>
          {currentUser ? (
              <>
              {showAdmin && <Link to={'/admin-dashboard'}>Admin Dashboard</Link>}
              {showUser && <Link to={'/user-dashboard'}>User Dashboard</Link>}

            
            </>
          ) : (
            <>
              <Link to={"/home"}>Home</Link>
              <Link to={"/about"}>About Us</Link>
              <Link to={"/contact"}>Contact Us</Link>
            </>
          )}
        </Nav>

        <Nav className="me-auto header-nav">
          {currentUser ? (
            <>
              <Link to={"/admin-dashboard"}>{currentUser.username}</Link>
              <Link to={"/login"} onClick={() => logOut()}>
                LogOut
              </Link>
            </>
          ) : (
            <>
              <Link to={"/login"}>Login</Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
