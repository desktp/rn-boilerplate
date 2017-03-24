import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class UserDetail extends Component {
  render() {
    const { user } = this.props;
    return(
      <View>
        <Text>
          Nome: {user.displayName}
        </Text>
        <Text>
          E-Mail: {user.email}
        </Text>
        <Text>
          Provider: {user.providerData[0].providerId}
        </Text>
      </View>
    );    
  };
};

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
};

export default connect(mapStateToProps)(UserDetail);