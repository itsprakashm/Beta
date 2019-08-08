import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  Button 
} from 'react-native';
import TouchID from "react-native-touch-id";
import VirtualKeyboard from 'react-native-virtual-keyboard';
export default class Login extends React.Component{
  constructor() {
    super()
    this.pay = this.pay.bind(this);
    this.checkbio = this.checkbio.bind(this);
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    this.state = {
      biometryType: null,
      text: '',
      contactName:'',
      contactNumber:''
    };
  }
  changeText(newText) {
    this.setState({text: newText});
  }

  componentDidMount() {
   this.checkbio();
  }
  checkbio(){
     const optionalConfigObject = {
   title: "", 
   color: "#e00606",
   fallbackLabel: "Show Passcode"
 }
 TouchID.isSupported()
      .then(biometryType => {
    TouchID.authenticate('Do you want to allow Beta App to use ', optionalConfigObject)
      .then(success => {
        //alert('Authenticated Successfully');
      })
      .catch(error => {
        //alert("cancel");
        this.checkbio();
      });
      })
      .catch(error => {
        // Failure code if the user's device does not have touchID or faceID enabled
        console.log(error);
      });
  }
refresh=(data,num)=> {
  //alert(data.displayName);
  //alert(num);
  this.setState({contactName: data.displayName, contactNumber:num});
}
pay(){
  alert("You sent "+this.state.text+" to "+this.state.contactName);

}

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 5,flexDirection: 'column',alignItems:'center',justifyContent:'center'}}>
        <Text style={{fontSize:25}}>${this.state.text}</Text>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('Contacts', {
  onGoBack: this.refresh,
})}>
      <Image
        source={require('./images/plus.png')}
      />
    </TouchableHighlight>
    <Text style={{fontSize:25}}>{this.state.contactName}</Text>
        </View>
        <View style={{flex: 3,height:200, backgroundColor: 'green',flexDirection: 'column'}}>
          <VirtualKeyboard decimal color='white' pressMode='string' onPress={(val) => this.changeText(val)} />
          <Button
  onPress={this.pay}
  title="Pay"
  color="#841584"
/>
        </View>
      </View>
    );
  }

  
}
