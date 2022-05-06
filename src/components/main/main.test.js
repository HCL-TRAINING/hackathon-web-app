import React from "react";
import Main from "./main";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// @ts-ignore
Enzyme.configure({ adapter: new Adapter() });
import renderer from "react-test-renderer";

describe("main component testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Main />);
    console.log("shallow debuger", wrapper.debug());
  });

  test("renders for snapshot", () => {
    const tree = renderer.create(<Main />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders main div", () => {
    expect(wrapper.find("#main").text()).toContain("main");
  });
});
