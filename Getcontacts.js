import React from 'react';
import {Platform, StyleSheet, Text, View, FlatList, PermissionsAndroid,TouchableWithoutFeedback} from 'react-native';
import Contacts from 'react-native-contacts';
import AsyncStorage from '@react-native-community/async-storage';
type Props = {};
export default class GetContacts extends React.Component {
  state={
    contacts: null
  }
  componentDidMount(){
  if(Platform.OS === 'ios'){
    Contacts.getAll((err, contacts) => {
      if (err) {
        throw err;
      }
      // contacts returned
      this.setState({contacts})
    })
  }else if(Platform.OS === 'android'){
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'Contacts',
        message: 'This app would like to view your contacts.'
      }
    ).then(() => {
      Contacts.getAll((err, contacts) => {
        if (err === 'denied'){
          // error
        } else {
          // contacts returned in Array
          this.setState({contacts})
        }
      })
    })
  }
  }
  actionOnRow(item,phnum) {
    //alert(item.displayName);
   console.log('Selected Item :'+JSON.stringify(item));
   this.props.navigation.state.params.onGoBack(item,phnum);
    this.props.navigation.goBack();
}
  render () {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.contacts}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.contact_details}>
                Name: {`${item.givenName} `}  {item.familyName} 
              </Text>
              {item.phoneNumbers.map(phone => (
                <TouchableWithoutFeedback onPress={ () => this.actionOnRow(item,phone.number)}>
                <Text style={styles.phones}>{phone.label} : {phone.number}</Text>
                </TouchableWithoutFeedback>
              ))}
            </View>
          )}
          //Setting the number of column
          numColumns={1}
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop:30,
  },
  phones: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  contact_details: {
    textAlign: 'center',
    color: 'red',
    margin: 10,
  },
});