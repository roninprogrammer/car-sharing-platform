import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import {getUserToken} from '../../actions'

const mapStateToProps = state => {
  return{
    token: state.userTokenReducers.token,
  }
};


const mapDispatchToProps = dispatch => {
  return{
    getUserToken: () => dispatch(getUserToken()),
  }
};

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
    this.props.getUserToken()
  }

  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = () => {

    this.props.getUserToken().then(() => {
      this.props.navigation.navigate(this.props.token !== null ? 'App' : 'Auth');
    }).catch(error => {
      this.setState({ error })
    })

};

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});



export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);