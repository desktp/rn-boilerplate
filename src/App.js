import React, { Component } from 'react';
import { AsyncStorage, View, Text, Image } from 'react-native';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';
import { 
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID 
} from 'react-native-dotenv'

import Router from './Router';
import reducers from './auth/reducers';

class App extends Component {
  constructor() {
    super();

    this.state = { rehydrated: false };

    this.store = compose(applyMiddleware(ReduxThunk), autoRehydrate())(createStore)(reducers);

    this.saveFilter = createFilter('auth', ['user']);

    persistStore(this.store, { 
      storage: AsyncStorage, 
      transforms: [this.saveFilter] 
    }, () => { 
      this.setState({ 
        rehydrated: true 
      }) 
    });
  }

  componentWillMount() {
    const firebaseConfig = {
      apiKey: API_KEY,
      authDomain: AUTH_DOMAIN,
      databaseURL: DATABASE_URL,
      storageBucket: STORAGE_BUCKET,
      messagingSenderId: MESSAGING_SENDER_ID
    };

    firebase.initializeApp(firebaseConfig);
  }

  render() {
    if (!this.state.rehydrated) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
    return (
        <Provider store={this.store}>
          <Router />
        </Provider>
    );
  }
}

export default App;
