import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Password from '../../imports/components/passwordDecrypt.js';

if (Meteor.isClient) {
  configure({ adapter: new Adapter() });

  describe('<Password /> (Decrypt)', () => {
    it('should have password input placeholder', () => {
      const wrapper = shallow(<Password />);
      expect(wrapper.find('input[type="password"]').prop('placeholder')).to.equal('Password');
    });

    it('should have a submit button', () => {
      const wrapper = shallow(<Password />);
      expect(wrapper.find('button[type="submit"]').text()).to.equal('Submit');
    });
  });
}
