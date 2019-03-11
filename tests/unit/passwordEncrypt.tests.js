import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Password from '../../imports/components/passwordEncrypt.js';

if (Meteor.isClient) {
  configure({ adapter: new Adapter() });

  describe('<Password /> (Encrypt)', () => {
    it('should have password input placeholder', () => {
      const wrapper = shallow(<Password />);
      expect(wrapper.find('input[type="password"]').prop('placeholder')).to.equal('Encryption password');
    });
  });
}
