import React from 'react';
import App from './App';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import Header from './components/header/header';

// @ts-ignore
Enzyme.configure({ adapter: new Adapter() });

describe("app component testing", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App/>);
  });

  test("renders header component without crashing", () =>{
    const header = (<Header/>);
    expect(wrapper.contains(header)).toEqual(true);
  });

  
})
