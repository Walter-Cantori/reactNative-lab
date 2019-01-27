import React from 'react';
import { shallow } from 'enzyme';
import { Text, ScrollView, Button, AsyncStorage } from 'react-native';
import sinon from 'sinon';

import List from '../../src/list';

const posts = [
  {id: 1, title: "test1", description: "test1 body"},
  {id: 2, title: "test2", description: "test2 body"},
  {id: 3, title: "test3", description: "test3 body"},
]

describe('List Component Tests', () => {

  it('renders correct children', () => {
    const wrapper = shallow(<List />);
    expect(wrapper.find(ScrollView).exists()).toBe(false);
    
    wrapper.setState({ posts })
    expect(wrapper.find(ScrollView).children()).toHaveLength(3);
  });

  it('renders empty message', () => {
    const wrapper = shallow(<List />);
    expect(wrapper.contains(<Text>Nenhum Post</Text>)).toBe(true);

    wrapper.setState({ posts });
    expect(wrapper.contains(<Text>Nenhum Post</Text>)).toBe(false);
  });

  it('can add new post', () => {
    const wrapper = shallow(<List />);

    wrapper.find({ id: 'new' }).simulate('press');
    expect(wrapper.state('posts')).toHaveLength(1);
  });

  it('delete post', () => {
    const wrapper = shallow(<List />)
    wrapper.setState({ posts })
    wrapper.instance().deletePost(1);

    expect(wrapper.state('posts')).toEqual(posts.filter(post => post.id !== 1))
  })

  it('save posts', () => {
    sinon.spy(AsyncStorage, 'setItem');
    const wrapper = shallow(<List />);
    wrapper.setState({ posts })

    wrapper.find({ id: 'save'}).simulate('press');
    expect(AsyncStorage.setItem.calledOnce).toBe(true);
    expect(AsyncStorage.setItem.args[0][1]).toBe(JSON.stringify(posts))
  })

  it('load posts on init', () => {
    sinon.stub(AsyncStorage, 'getItem').returns(JSON.stringify(posts))

    const wrapper = shallow(<List />)

    expect(AsyncStorage.getItem.calledOnce).toBe(true)
    expect(AsyncStorage.getItem.returnValues[0]).toBe(JSON.stringify(posts))
  })

});