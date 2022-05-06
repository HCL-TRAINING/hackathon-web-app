import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Modal, Form, Button, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RoleContext } from "../../App";
import useInput from "../../custom-hooks/useInput";
import { login } from "../../slices/auth";
import { clearMessage } from "../../slices/message";
import "./loginModal.css";

// @ts-ignore
export default function LoginModal({ show, onHide, onSuccess }) {
  const dispatch = useDispatch();
  // @ts-ignore
  const { message } = useSelector((state) => state.message);
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const { showAdmin, showUser } = useContext(RoleContext);
  let navigate = useNavigate();
  const email = useInput("");
  const password = useInput("");

  const onSubmit = (e) => {
    dispatch(clearMessage());

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setLoading(true);
    // @ts-ignore
    dispatch(login({ email: email.value, password: password.value }))
      .unwrap()
      .then((res) => {
        console.log("apii res", res);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
    e.preventDefault();
  };

  useEffect(() => {
    if (showAdmin) {
      navigate("/admin-dashboard");
    }

    if (showUser) {
      navigate("/user-dashboard");
    }
  }, [showAdmin, showUser]);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  return (
    <>
      <Modal className="position-relative" show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => onSubmit(e)}
            id="user-form"
            noValidate
            validated={validated}
          >
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Id</Form.Label>
              <Form.Control
                type="email"
                placeholder="email"
                autoFocus
                name="email"
                required
                {...email}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email id.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="pwd">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                name="password"
                required
                {...password}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid password.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>

          {message && (
            <Alert variant="danger" className="mt-2">
              {message}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" id="close" onClick={onHide}>
            Close
          </Button>
          <Button
            as="input"
            variant="primary"
            type="submit"
            form="user-form"
            value={"Login"}
            id="submit"
          />
        </Modal.Footer>
        {loading && (
          <Spinner
            animation="border"
            className="loader position-absolute top-0 bottom-0 start-0 end-0 m-auto"
            variant="primary"
          />
        )}
      </Modal>
    </>
  );
}
