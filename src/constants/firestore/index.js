import setPrefix from '../setPrefix';

import * as events from './events';
import * as users from './users';

export const EVENTS = setPrefix(events, 'EVENT');
export const USERS = setPrefix(users, 'USER');
