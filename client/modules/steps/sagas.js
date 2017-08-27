import { put, select, call, takeEvery } from 'redux-saga/effects';
import {
  getFormValues,
  startAsyncValidation,
  stopAsyncValidation,
} from 'redux-form';

import { checkIt } from 'api/api';
import { actions as stepActions } from 'modules/step';
import * as constants from './constants';

export function* checkStep3() {
  const formValues = yield select(getFormValues(constants.FORM_NAME));
  const textValue = formValues.text;
  try {
    yield put(stepActions.stepFailed(constants.FORM_NAME, 2));
    yield put(startAsyncValidation(constants.FORM_NAME));
    yield call(checkIt, textValue);
    yield put(stopAsyncValidation(constants.FORM_NAME, {}));
    yield put(stepActions.nextStep(constants.FORM_NAME));
  } catch (e) {
    yield put(stopAsyncValidation(constants.FORM_NAME, { text: e.message }));
  }
}

export function* rootSaga() {
  yield takeEvery(constants.CHECK_STEP3, checkStep3);
}

export default [rootSaga];