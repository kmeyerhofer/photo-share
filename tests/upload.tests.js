import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import { expect, assert } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Upload from '../imports/components/upload.js';
// import store from '../imports/redux/store.js';

if (Meteor.isClient) {
  configure({ adapter: new Adapter() });

  describe('<Upload />', () => {
    it('should have a form', () => {
      const wrapper = shallow(<Upload />).shallow().dive();
      // expect(wrapper.find('form')).to.equal(true);
      assert.equal(wrapper.find('form'), '<form>');
    });

    it('should have file input', () => {
      const wrapper = shallow(<Upload />);
      expect(wrapper.find('input[type="file"]'));
    });

    it('should have a button', () => {
      const wrapper = shallow(<Upload />);
      expect(wrapper.find('button[type="submit"]')).to.exist;
    });

    it('button should have text \'Upload\'', () => {
      const wrapper = shallow(<Upload />);
      expect(wrapper.find('button[type="submit"]')).to.have.string('Password');

      // expect(wrapper.find('button[type="submit"]').text()).toBe('Upload');
      // expect(wrapper.find('button[type="submit"]').children()'Uploadd');
      // expect(wrapper.find('input[type="password"]').prop('placeholder'), 'Password');
    });
  });
}
