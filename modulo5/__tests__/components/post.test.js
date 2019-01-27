import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import { Button } from 'react-native';

import Post from '../../src/post';

const post = { id: 1, title: "test1", description: "test body"}

describe('Post Component Tests', () => {
  it('can delete posts', () => {
    const deleteSpy = sinon.spy();
    const wrapper = shallow(<Post post={post} onDelete={deleteSpy} />)

    wrapper.find(Button).simulate('press');
    expect(deleteSpy.withArgs(post.id).calledOnce).toBe(true)
  })
})
