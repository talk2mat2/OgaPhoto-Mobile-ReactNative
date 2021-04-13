/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import {createStore, combineReducers} from 'redux';
import {
  UserReducers,
  NotesReducer,
  photgraphersReducer,
  MyLocationReducer,
  BookingsReducer,
} from './reducer';
import {persistStore, persistReducer} from 'redux-persist';

import AsyncStorage from '@react-native-community/async-storage';

const rootReducer = combineReducers({
  user: UserReducers,
  notes: NotesReducer,
  photographers: photgraphersReducer,
  sessionVenue: MyLocationReducer,
  bookings: BookingsReducer,
});
const authPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};
const persistedReducer = persistReducer(authPersistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
