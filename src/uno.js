import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import RaisedButton from 'material-ui/RaisedButton';
import UserApi from './UserApi.js';
import firebase from 'firebase';

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

export default class uno extends Component {
  constructor(props) {
    super(props);
    var allCards = [];
    var suits = ["H","C","S","D"];
    var values = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    for(var v = 0; v < values.length; v++) {
      for(var s = 0; s < suits.length; s++) {
        allCards.push([values[v],suits[s]]);
      }
    }
    
    allCards = shuffle(allCards);
    var leftSide = allCards.splice(0,26);
    var rightSide = allCards.splice(0,26);
    this.state = {
      readyplayer1: false,
      readyplayer2: false,
      stack1: leftSide,
      stack2: rightSide,
      pile1: [],
      pile2: [],
    };
    this.readyplayer1 = firebase.database().ref('/readyplayer1');
    this.readyplayer2 = firebase.database().ref('/readyplayer2');
    this.stack1 = firebase.database().ref('/stack1');
    this.stack2 = firebase.database().ref('/stack2');
    this.pile1 = firebase.database().ref('/pile1');
    this.pile2 = firebase.database().ref('/pile2');
    this.isCreator = firebase.auth().currentUser.uid === props.location.state.creator;
  } 
  componentWillMount(){
    this.readyplayer1.set(this.state.readyplayer1);
    this.readyplayer1.on('value', s => {
      let v = s.val();
      if (v !== null) {
        this.setState({ readyplayer1: s.val() });
      }
    });
    this.readyplayer2.set(this.state.readyplayer2);
    this.readyplayer2.on('value', s => {
      let v = s.val();
      if (v !== null) {
        this.setState({ readyplayer2: s.val() });
      }
    });
    this.stack1.set(this.state.stack1);
    this.stack1.on('value', s => {
      let v = s.val();
      if (v !== null) {
        this.setState({ stack1: s.val() });
      }
    });
    this.stack2.set(this.state.stack2);
    this.stack2.on('value', s => {
      let v = s.val();
      if (v !== null) {
        this.setState({ stack2: s.val() });
      }
    });
    this.pile1.set(this.state.pile1);
    this.pile1.on('value', s => {
      let v = s.val();
      if (v !== null) {
        this.setState({ pile1: s.val() });
      }
    });
    this.pile2.set(this.state.pile2);
    this.pile2.on('value', s => {
      let v = s.val();
      if (v !== null) {
        this.setState({ pile2: s.val() });
      }
    });
  }

  playCard1() {
    this.playerOneReady();
    this.buttonDisabled();
    var card = this.state.stack1.shift();
    this.stack1.set(this.state.stack1);
    this.state.pile1.push(card);
    this.pile1.set(this.state.pile1);
      
    this.enabledNextRoundButton();
  }

  playCard2() {
    this.playerTwoReady();
    this.buttonDisabled();
    var card = this.state.stack2.shift();
    this.stack2.set(this.state.stack2);
    this.state.pile2.push(card);
    this.pile2.set(this.state.pile2);
    this.enabledNextRoundButton();
    
  }

  disabledNextRoundButton() {
    this.setState({ isNextRoundButtonDisabled: true });
  }
  
  enabledNextRoundButton() {
    this.setState({ isNextRoundButtonDisabled: false });
  }

  playerOneReady() {
    this.readyplayer1.set(true);
  }
  
  playerTwoReady() {
    this.readyplayer2.set(true);
  }

  buttonDisabled() {
    this.setState({ isButtonDisabled: true });
  }

  buttonEnabled() {
    this.setState({ isButtonDisabled: false });
    if (this.state.readyplayer1 === true && this.state.readyplayer2 === true){
      console.log(this.setState({isButtonDisabled: false}));
    } else if (this.state.readyplayer1==false || this.state.readyplayer2==false) {
      this.setState({isButtonDisabled: true});
    }
  }

  render() {
     { this.state.number > this.state.number2 ?  'Player One Wins':
            (this.state.number < this.state.number2 ? 'Player One Loses': 'You Tied')}
    return (
      <div>
        <div>
          <RaisedButton label="Player 1 Start" fullWidth={true} disabled={this.isCreator || this.state.isButtonDisabled || this.state.isbuttonEnabled} onClick={this.playCard1.bind(this)}/>
          <h1 className="number"> {this.state.pile1} </h1>
        </div>
        <div className="center">
          <RaisedButton label="Next Round" fullWidth={false} disabled={this.state.isNextRoundButtonDisabled} onClick={this.buttonEnabled.bind(this)}/>
        </div>
        <div className="playerTwo">
          <h1 className="number"> {this.state.pile2} </h1>
          <RaisedButton label="Player 2 Start" fullWidth={true} disabled={!this.isCreator || this.state.isButtonDisabled }  onClick={this.playCard2.bind(this)}/>
        </div>
    </div>
    );
  }
}
