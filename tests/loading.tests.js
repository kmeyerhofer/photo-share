import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Loading from '../imports/components/loading.js';

if (Meteor.isClient) {
  configure({ adapter: new Adapter() });

  describe('<Loading />', () => {
    const message = 'This is a testing loading message.';

    it('should have loading message text within div', () => {
      const wrapper = shallow(<Loading message={message} />);
      expect(wrapper.find('div').first().text()).to.equal(message);
    });
  });
}
