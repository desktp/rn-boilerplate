import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Container,
  Content, 
  Item, 
  Input, 
  Form, 
  Icon, 
  Button, 
  Text,
  Spinner
} from 'native-base';
import Toast from 'react-native-simple-toast';
import { TextInputMask } from 'react-native-masked-text';

import { inputChanged, registerUser } from '../actions';

class RegForm extends Component {
  onButtonPress() {
    const { email, password, displayName, phone } = this.props;
    this.props.registerUser({ email, password, displayName, phone });
  }

  onEmailChange(text) {
    this.props.inputChanged('email', text);
  }  

  onPasswordChange(text) {
    this.props.inputChanged('password', text);
  }

  onPhoneChange(text) {
    this.props.inputChanged('phone', text);
  }

  onNameChange(text) {
    this.props.inputChanged('name', text);
  }

  focusNextField(nextField) {
    this.refs[nextField].focus();
  };

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button 
        block 
        style={styles.buttonStyle} 
        onPress={this.onButtonPress.bind(this)}
      >
        <Text style={styles.buttonTextStyle}>Registrar</Text>
      </Button>   
    );
  }

  render() {
    const { iconStyle, errorTextStyle } = styles;

    if (this.props.error) {
      Toast.show(this.props.error);
    }

    return (
      <Container>
        <Content>
          <Form>
            <Item>
              <Icon name='mail' style={iconStyle} />
              <Input 
                label='E-Mail'
                placeholder='exemplo@dominio.com'
                keyboardType='email-address'
                returnKeyType='next' 
                onChangeText={this.onEmailChange.bind(this)}
                onSubmitEditing={() => {
                  this.refs.registerSenha._root.focus();
                }}
              />
            </Item>
          
            <Item>
              <Icon name='lock' style={iconStyle} />
              <Input 
                ref='registerSenha'
                placeholder='senha'
                secureTextEntry 
                label='Senha' 
                returnKeyType='next'
                onChangeText={this.onPasswordChange.bind(this)}
                onSubmitEditing={() => {
                  // this.refs.registerPhone.focus();
                  // this.refs['registerPhone'].focus();
                  // this.focusNextField('registerPhone');
                  // this.registerPhone.focus();
                  //this.refs.registerPhone._root.focus();
                  this.refs['registerPhone'].getElement().focus();
                }}
              />
            </Item>
          
            <Item>
              <Icon name='phone-portrait' style={iconStyle} />
              <TextInputMask
                ref='registerPhone'
                //ref={(ref) => this.registerPhone = ref}
                placeholder='(00) 111 222 333'
                label='Telefone'
                onChangeText={this.onPhoneChange.bind(this)}
                keyboardType='phone-pad'
                returnKeyType='next'
                type={'cel-phone'}
                style={{ flex: 1 }}
                value={this.props.phone}
                onSubmitEditing={() => {
                  this.refs.registerName._root.focus();
                }}
              />
            </Item>

            <Item>
              <Icon name='person' style={iconStyle} />
              <Input 
                last
                ref='registerName'
                placeholder='Nome Completo'
                autoCapitalize='words'
                returnKeyType='done' 
                onChangeText={this.onNameChange.bind(this)}
              />
            </Item>

            {this.renderButton()} 

          </Form>
        </Content>
      </Container>
    );
  }
}
const styles = {
  buttonStyle: {
    margin: 5,
  },
};
const mapStateToProps = ({ auth }) => {
  const { email, password, displayName, phone, error, loading } = auth;

  return { email, password, displayName, phone, error, loading };
};

export default connect(mapStateToProps, { inputChanged, registerUser })(RegForm);
