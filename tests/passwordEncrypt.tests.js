import React from 'react';
import { shallow, configure } from 'enzyme';
import { assert, expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Password from '../imports/components/passwordEncrypt.js';

if (Meteor.isClient) {
  configure({ adapter: new Adapter() });

  describe('<Password />', () => {
    it('should have password input', () => {
      const wrapper = shallow(<Password />);
      expect(wrapper.find('input[type="password"]').prop('placeholder')).to.equal('Password');
    });
  });
}
