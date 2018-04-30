import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import RaisedButton from 'material-ui/RaisedButton';
import UserApi from './UserApi.js';
import firebase from 'firebase';


export default class uno extends Component {

  constructor(props) {
    super(props);
    this.state = {
      number: "",
      number2: "",
      readyplayer1: false,
      readyplayer2: false,
    };
    this.number = firebase.database().ref('/number');
    this.number2 = firebase.database().ref('/number2');
    this.number.on('value', s => {
      let v = s.val();
      if (v !== null) {
        this.setState({ number: s.val() });
      }
    });
    this.number2.on('value', s => {
      let v = s.val();
      if (v !== null) {
        this.setState({ number2: s.val() });
      }
    });
  }

  getRandomNumber1() {
    var randomNumber = Math.floor(Math.random() * 13);
    this.number.set(randomNumber);
  }

  getRandomNumber2() {
    var randomNumber = Math.floor(Math.random() * 13);
    this.number2.set(randomNumber);
  }

  playerOneReady() {
    
    this.readyplayer1.set(true);
    
  }


  render() {
    return (
      <div>
        <div>
          <RaisedButton label="Player 1 Start" fullWidth={true} onClick={this.getRandomNumber1.bind(this)}/>
          
          <h1 class="number">{this.state.number}</h1>
        </div>
        <div class="center">
          <RaisedButton label="Next Round" fullWidth={false} />
          <RaisedButton label="Waiting..." fullWidth={false} disabled />
        </div>
        <div class="playerTwo">
          <h1 class="number">{this.state.number2}</h1>
          <RaisedButton label="Player 2 Start" fullWidth={true} onClick={this.getRandomNumber2.bind(this)}/>
        </div>
    </div>
    );
};
}



const style = {
  margin: 12,
};

// const deck = [
//     {
//       value: "ace", suite: "hearts"

//     }
// ];
