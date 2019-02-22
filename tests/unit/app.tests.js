import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import App from '../../imports/components/app.js';

if (Meteor.isClient) {
  configure({ adapter: new Adapter() });

  describe('<App />', () => {
    it('should have message text within h1', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.find('h1').text()).to.equal('hello this works');
    });
  });
}
