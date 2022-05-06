import { render, screen } from "@testing-library/react";
//import Enzyme, { mount } from 'enzyme';
//import Adapter from 'enzyme-adapter-react-16';

//Enzyme.configure({ adapter: new Adapter() });
import React from "react";

//import { configure, shallow } from 'enzyme';
import { act } from "react-test-renderer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { unmountComponentAtNode } from "react-dom";
import AdminDashboard from "./adminDashboard";


describe("testing the pet dashboard", () => {
  let container = null;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      render(
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>,
        container
      );
    });
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  test("test book list", () => {
    expect(screen.getByText("List of Books"));
  });

  test("test table title", () => {
    expect(screen.findByText("SL No."));
    expect(screen.findByText("Book Name"));
    expect(screen.findByText("Member Name"));
    expect(screen.findByText("Member ID"));
    expect(screen.findByText("Status"));
  });
});
