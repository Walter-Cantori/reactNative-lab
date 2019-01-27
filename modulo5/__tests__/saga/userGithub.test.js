import SagaTester from 'redux-saga-tester';
import rootSaga from '../../src/store/sagas';
import * as actions from '../../src/store/userActions';

import api from '../../src/services/api';
import MockAdapter from 'axios-mock-adapter';

const userResponse = require('./fixtures/userGithub.json');


describe('Testing User Github Saga', () => {
  let sagaTester = null;
  let apiMock = null;

  beforeEach(() => {
    sagaTester = new SagaTester({});
    apiMock = new MockAdapter(api.axiosInstance)
    sagaTester.start(rootSaga);
  });

  it('can add user', async () => {
    apiMock.onGet('/users/walter-cantori').reply(200, userResponse["/users/walter-cantori"]);

    sagaTester.dispatch(actions.addUserRequest('walter-cantori'));

    await sagaTester.waitFor(actions.addUserSuccess().type);

    expect(sagaTester.getLatestCalledAction()).toEqual(actions.addUserSuccess(userResponse["/users/walter-cantori"]))
  })

  it('throws error', async () => {
    apiMock.onGet('/users/fail').reply(400);

    sagaTester.dispatch(actions.addUserRequest('fail'));
    await sagaTester.waitFor(actions.addUserFailure().type);

    expect(sagaTester.getLatestCalledAction()).toEqual(actions.addUserFailure())
  })
})
