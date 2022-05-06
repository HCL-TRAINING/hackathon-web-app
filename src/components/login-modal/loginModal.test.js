import { render, screen } from "@testing-library/react";
import React from "react";
import { Button, Form } from "react-bootstrap";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import authService from "../../services/auth.service";
import LoginModal from "./loginModal";

configure({ adapter: new Adapter() });

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  // @ts-ignore
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("testing the login modal", () => {
  let wrapper;

  //   test("find login text", () => {
  //     expect(screen.getByText("Sign In"));
  //   });

  it("Test click event", () => {
    const mockCallBack = jest.fn();
    const button = shallow(
      <Button variant="secondary" id="close" onClick={mockCallBack}>
        Close
      </Button>
    );
    button.find("button").simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  it("Test form submit", () => {
    const formEventMocked = { handleSubmit: jest.fn() };
    wrapper = shallow(<Form onSubmit={formEventMocked.handleSubmit}></Form>);
    expect(formEventMocked.handleSubmit).toBeCalledTimes(0);
    expect(wrapper.find("form")).toHaveLength(1);
  });

  test("Test admin login auth", async () => {
    const data = await authService.login("admin@gmail.com", "admin");
    expect(data).toBe({
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiYWRtaW4iLCJpYXQiOjE2NTE4MjUwODAsImV4cCI6MTY1MTgyODY4MH0.fcgVCLQwuGwFs9L8ZW51KiWjwPgm-tqwJZDDuqkCm9k",
      username: "admin12",
      role: "ADMIN",
    });
  });
});
