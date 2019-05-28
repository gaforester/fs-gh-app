import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', async () => {
  const wrapper = shallow(<App />);
  const instance = wrapper.instance();
  // await instance.componentDidMount();
  expect(instance.state).toBeDefined();
});
