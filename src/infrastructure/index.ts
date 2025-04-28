import { Cache } from './cache';
import { Database } from './database';

export const Infrastructure = [...Cache, ...Database];
