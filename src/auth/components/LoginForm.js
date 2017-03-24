import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { 
  Container,
  Content,  
  Input, 
  Icon, 
  Button, 
  Text,
  Spinner,
  Form,
  Item,
  View
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-simple-toast';


import { inputChanged, loginUser, isLoggedIn } from '../actions';

const logo = require('../assets/images/logo_placeholder.png');

class LoginForm extends Component {
  onButtonPress() {
    this.props.loginUser({ email: this.props.email, password: this.props.password });
  }

  onEmailChange(text) {
    this.props.inputChanged('email', text);
  }

  onPasswordChange(text) {
    this.props.inputChanged('password', text);
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="small" />;
    }

    return (
      <View>
        <Button 
          block  
          style={styles.buttonStyle}
          onPress={this.onButtonPress.bind(this)}
        >
          <Text style={styles.buttonTextStyle}>Login</Text>
        </Button>
        <Button 
          block 
          style={styles.buttonStyle}
          onPress={Actions.register}
        >
          <Text style={styles.buttonTextStyle}>Registrar</Text>
        </Button>
      </View>
    );
  }

  renderContent() {
    if (this.props.user.uid) {
      this.props.isLoggedIn(this.props.user);
      return <Container />;
    }
    
    const { 
      imageWrapperStyle, 
      imageStyle, 
      errorTextStyle,
      buttonStyle,
      buttonTextStyle,
      iconStyle } = styles;

    if (this.props.error) {
      Toast.show(this.props.error);
    }

    return (
      <Container>
        <Content>
          <Form>
            <Item style={imageWrapperStyle}>
              <Image
              style={imageStyle}
              source={logo}
              />
            </Item>
            <Item>
              <Icon name='mail' style={iconStyle} />
              <Input 
                label='E-Mail'
                placeholder='exemplo@dominio.com' 
                keyboardType='email-address'
                returnKeyType='next'
                blurOnSubmit={false}
                onChangeText={this.onEmailChange.bind(this)}
                onSubmitEditing={() => {
                  this.refs.loginPassword._root.focus();
                }}
              />
            </Item>
          
            <Item>
              <Icon name='lock' style={iconStyle} />
              <Input 
                last
                ref='loginPassword'
                placeholder='senha'
                secureTextEntry 
                label='Senha' 
                returnKeyType='done'
                onChangeText={this.onPasswordChange.bind(this)}
              />
            </Item>

            {this.renderButton()} 

          </Form>
        </Content>
      </Container>
    );
  }

  render() {    
    return this.renderContent();
  }
}

const styles = {
  imageStyle: {
    flex: 1,
    height: 150,
    width: null,
    resizeMode: 'contain',
  },
  imageWrapperStyle: {
    paddingBottom: 50,
    position: 'relative'
  },
  loginContentStyle: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  buttonStyle: {
    margin: 5,
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, user } = auth;

  return { email, password, error, loading, user };
};

export default connect(mapStateToProps, { 
  inputChanged, 
  loginUser, 
  isLoggedIn 
})(LoginForm);
