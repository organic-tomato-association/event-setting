import '@firebase/firestore';
import { all } from "@redux-saga/core/effects";

import authSagas from './authSagas';
import pageSagas from './pageSagas';
import notificationSagas from './notificationSagas';
import firestoreSagas from './firestore';

export default function* rootSaga() {
  yield all([
    ...authSagas,
    ...pageSagas,
    ...notificationSagas,
    ...firestoreSagas,
  ]);
}