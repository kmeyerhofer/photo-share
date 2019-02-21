import React from 'react';
import { shallow } from 'enzyme';
import assert from 'chai';
import Upload from '../imports/components/upload.js';

describe('Upload', () => {
  it('should render', () => {
    const item = shallow(<Upload />);
    // console.log('hi');
    assert(item.hasClass());
  });
});
