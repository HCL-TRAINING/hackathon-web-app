import React from 'react';
import App from './App';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import Header from './components/header/header';
import LibraryRoutes from './routes';
import renderer from "react-test-renderer";


// @ts-ignore
Enzyme.configure({ adapter: new Adapter() });

describe("app component testing", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App/>);
  });

  test("renders for snapshot", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders header component without crashing", () =>{
    const header = (<Header/>);
    expect(wrapper.contains(header)).toEqual(true);
  });

  test("renders routes component without crashing", () =>{
    const routes = (<LibraryRoutes/>);
    expect(wrapper.contains(routes)).toEqual(true);
  });

  
})
