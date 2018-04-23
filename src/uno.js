import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import RaisedButton from 'material-ui/RaisedButton';
import UserApi from './UserApi.js';


export default class uno extends Component {
  render() {
    return (
      <div>
        <div>
        </div>
        <FlatButton label="Full width" fullWidth={true} />
    </div>
    );
  }
}

// Image of avatar & circle button/icon
// const AvatarIcon = () => (
//   <List>
//     <ListItem
    
//           leftAvatar={<Avatar src={UserApi.getPhotoUrl(
//           )} />} />
//   </List>
// );

// const FlatButtonExampleSimple = () => (
//   <div>
//     <FlatButton label="Start" />
//   </div>
// );

const style = {
  margin: 12,
};

const RaisedButtonExampleSimple = () => (
  <div>
    <RaisedButton label="Start" style={style}/>
  </div>
);

getRandomNumber(){
  var number = Math.floor(Math.random() * 13)
  console.log(number);
}
