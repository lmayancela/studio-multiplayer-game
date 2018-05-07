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
    this.readyplayer1 = firebase.database().ref('/readyplayer1');
    this.readyplayer2 = firebase.database().ref('/readyplayer2');
    this.isCreator = firebase.auth().currentUser.uid === props.location.state.creator;
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
    this.readyplayer1.on('value', s => {
      let v = s.val();
      if (v !== null) {
        this.setState({ readyplayer1: s.val() });
      }
    });
    this.readyplayer2.on('value', s => {
      let v = s.val();
      if (v !== null) {
        this.setState({ readyplayer2: s.val() });
      }
    });
  }

  getRandomNumber1() {
    if (this.state.readyplayer1 === true && this.state.readyplayer2 === true) {
      var randomNumber = Math.floor(Math.random() * 13);
      this.number.set(randomNumber);
      this.buttonDisabled()
      this.enabledNextRoundButton();
    }
    else {
      this.playerOneReady()
    }
  }

  getRandomNumber2() {
    if (this.state.readyplayer2 === true && this.state.readyplayer1 === true) {
      var randomNumber = Math.floor(Math.random() * 13);
      this.number2.set(randomNumber);
      this.buttonDisabled()
      this.enabledNextRoundButton();
    }
    else {
      this.playerTwoReady()
    }
  }

  disabledNextRoundButton() {
    this.setState({ isNextRoundButtonDisabled: true })
  }
  
  enabledNextRoundButton() {
    this.setState({ isNextRoundButtonDisabled: false })
    console.log(this.state.isNextRoundButtonDisabled)
  }

  playerOneReady() {
    this.readyplayer1.set(true);
  }
  
  playerTwoReady() {
    this.readyplayer2.set(true);
  }

  buttonDisabled() {
    this.setState({ isButtonDisabled: true })
  }

  buttonEnabled() {
    this.setState({ isButtonDisabled: false })
    // if (this.state.readyplayer1==true && this.state.readyplayer2==true){
    //   return(
    //   this.setState({isButtonDisabled: false})
    //   )
    // elsif (this.state.readyplayer1==false || this.state.readyplayer2==false {
    //   this.setState({isButtonDisabled: true})
    // }
  }

  comparisonLogic(number) {

  }

  render() {
    return (
      <div>
        <div>
          <RaisedButton label="Player 1 Start" fullWidth={true} disabled={this.isCreator || this.state.isButtonDisabled || this.state.isbuttonEnabled} onClick={this.getRandomNumber1.bind(this)}/>
          <h1 className="number">{this.state.number}</h1>
        </div>
        <div className="center">
          <RaisedButton label="Next Round" fullWidth={false} disabled={true || this.state.isNextRoundButtonDisabled} onClick={this.buttonEnabled.bind(this)}/>
          { this.state.number > this.state.number2 ?  'Player One Wins':
            (this.state.number < this.state.number2 ? 'Player One Loses': 'You Tied')}
          <RaisedButton label="Waiting..." fullWidth={false} disabled />
        </div>
        <div className="playerTwo">
          <h1 className="number">{this.state.number2}</h1>
          <RaisedButton label="Player 2 Start" fullWidth={true} disabled={!this.isCreator || this.state.isButtonDisabled }  onClick={this.getRandomNumber2.bind(this)}/>
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
