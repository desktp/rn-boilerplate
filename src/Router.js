import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import { Icon } from 'native-base';

import LoginForm from './auth/components/LoginForm';
import RegForm from './auth/components/RegForm';

import UserDetail from './user/components/UserDetail';

class RouterComponent extends Component {
  render() {
    return (
      <Router sceneStyle={{ paddingTop: (Platform.OS === 'ios') ? 65 : 54 }}> 
        <Scene key='auth'>
          <Scene key='login' component={LoginForm} title='Login' hideNavBar />
          <Scene key='register' component={RegForm} title='Registre-se' hideNavBar={false} />
        </Scene>
        
        <Scene key='main'> 
          <Scene key='userDetail' component={UserDetail} title='Detalhes do Usuario' initial />
          <Scene key='userEdit' component={UserDetail} />
        </Scene>
      </Router>
    );  
  }
}

export default RouterComponent;
