import todoReducer from '../../src/store/reducers';
import * as actions from '../../src/store/actions';

const todos = [
  {id: 1, text: 'foo'},
  {id: 2, text: 'bar', completed: true},
];

describe('Testing Todo reducer', () => {

  it('can add new todo', () => {
    const state = todoReducer([], actions.addTodo('Fazer café'));

    expect(state).toHaveLength(1);
    expect(state[0].text).toBe('Fazer café');
  });

  it('can remove todo', () => {
    const state = todoReducer(todos, actions.removeTodo(1));
    expect(state).toHaveLength(1);
    expect(state).not.toContainEqual(todos[0]);
  });

  it('can mark todo as complete', () => {
    let state = todoReducer(todos, actions.completeTodo(1));
    expect(state[0].completed).toBe(true);
    state = todoReducer(state, actions.completeTodo(1))
    expect(state[0].completed).toBe(false)
  })
})