import setPrefix from './setPrefix';

import * as auth from './auth';
import * as page from './page';
import * as firestore from './firestore/index';

export const AUTH = setPrefix(auth, 'AUTH');
export const PAGE = setPrefix(page, 'PAGE');
export const FIRESTORE = setPrefix(firestore, 'FIRESTORE');

export const TAB_CHANGE = 'TAB_CHANGE';

export const OPEN_SPLITTER = 'OPEN_SPLITTER'
export const CLOSE_SPLITTER = 'CLOSE_SPLITTER';
