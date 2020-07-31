import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import rootReducer from './reducers';
const PersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: hardSet,
}

const pReducer = persistReducer(PersistConfig, rootReducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store);