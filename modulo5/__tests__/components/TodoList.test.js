import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import TodoList from '../../src/TodoList';
import { Text, Button } from 'react-native';

import * as actions from '../../src/store/actions';

const mockStore = configureStore([]);

const initialState = {
  todos: [
    {id: 1, text: 'foo'},
    {id: 2, text: 'bar'},
  ]
}

describe('Testing TodoList', () => {

  const store = mockStore(initialState);
  function createWrapper() {
    return shallow(
      <TodoList />, {context: {store}}
    )
  }

  it('renders as expected', () => {
    const wrapper = createWrapper()

    expect(wrapper.prop('todos')).toEqual(initialState.todos)
    expect(wrapper.dive().find(Text)).toHaveLength(initialState.todos.length)
  });

  it('can add new todo', ()=> {
    const wrapper = createWrapper();

    wrapper.dive().find(Button).simulate('press');
    expect(store.getActions()).toContainEqual(actions.addTodo());
  })

});
