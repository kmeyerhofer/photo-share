import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Error from '../../imports/components/error.js';

if (Meteor.isClient) {
  configure({ adapter: new Adapter() });

  describe('<Error />', () => {
    const error = {
      id: 'testID',
      key: 'testID',
      message: 'This is a testing error message.',
      removeSelf: () => 'a function',
    };
    it('should have message text within a span', () => {
      const wrapper = shallow(
        <Error
          key={error.id}
          message={error.message}
          id={error.id}
          removeSelf={error.removeSelf}
        />,
      );
      expect(wrapper.find('span').text()).to.equal(error.message);
    });

    it('should have an onClick function', () => {
      const wrapper = shallow(
        <Error
          key={error.id}
          message={error.message}
          id={error.id}
          removeSelf={error.removeSelf}
        />,
      );
      expect(wrapper.find('span').prop('onClick')).to.be.an.instanceof(Function);
    });
  });
}
