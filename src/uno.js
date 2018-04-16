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
        <RaisedButton label="Default" style={style}/>
      </div>
      <div>
        <AvatarIcon/>
      </div>
    </div>)
  }
}

const AvatarIcon = () => (
  <List>
    <ListItem
    
          leftAvatar={<Avatar src={UserApi.getPhotoUrl()} />} />
  </List>
);

const FlatButtonExampleSimple = () => (
  <div>
    <FlatButton label="Default" />
  </div>
);

const style = {
  margin: 12,
};

const RaisedButtonExampleSimple = () => (
  <div>
    <RaisedButton label="Default" style={style}/>
  </div>
);
