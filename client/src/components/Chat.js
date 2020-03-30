
import React, { Component } from "react";
import firebase from '../firebase.js';
import moment from 'moment';

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import $ from 'jquery'; 

var database = firebase.database();
let nickname;
let nickcolor;
let myKey;

class Chat extends Component {

  constructor(props){
    super(props);
    this.state = {
        data: [],
        nickState: '',
        msgState: ''
    };

 }



joinChat = (nicknameraw) => {
        let chat = document.getElementById('chat-text');
        chat.style.height = 165 + 'px';
        $('.backdrop').css('display', 'none');
        $('.box').css('display', 'none');

        nickname = nicknameraw.trim();

        let nickIsUnique = true;
        database.ref('users').once("value", function(users) {
            // when a user is removed from database, remove them from the list
            
                for (let key in users.val()) {
                    if (nickname === users.val()[key].nickname) {
                        nickIsUnique = false;
                    };
                }

        if (nickIsUnique) {

            $('.nickname-card').css('display', 'none')
            $('.chat-card').css('display', 'block')

            
            nickcolor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
            
            if (nickname === "") {
                nickname = "Anonymous" + (Math.floor(Math.random() * 1000) + 1);
            }

            $('#message-text').select();

            database.ref('users').push(
                {
                    nickname : nickname,
                    nickcolor : nickcolor,
                    created : moment().format('HH:mm:ss'),
                    last : moment().format('HH:mm:ss')
                });

            database.ref('chat').push({
                time: moment().format('HH:mm:ss'),
                color: nickcolor,
                nickname: nickname,
                message: ` has joined the lobby.`,
                type: `message`
                });      

        } else {

            $('#message-text').select();
            $('.login-display').append(`<br>Sorry nickname '${nickname}' is taken already!`);
        }
        });


    
    // on close
    window.addEventListener('beforeunload', function (e) {
        // remove myself as user
        database.ref('users/' + myKey).remove();
        // send departing message to chat room
        database.ref('chat').push({
            time: moment().format('HH:mm:ss'),
            color: nickcolor,
            nickname: nickname,
            message: ` has left the lobby.`,
            type: `message`
            });
    });



    // listen for new users
    database.ref('users').on("child_added", function(childSnapshot) {
        //prepare the USER to be added to the list
        let userToAppend = $('<option>');
        userToAppend.attr('id', childSnapshot.ref.key);
        userToAppend.attr('value', childSnapshot.val().nickname);
        userToAppend.css('color', childSnapshot.val().nickcolor);
        userToAppend.attr('data-color', childSnapshot.val().nickcolor);
        if (childSnapshot.val().nickname === nickname) {
            // grab myKey when it comes past and add bold to MY name
            myKey = childSnapshot.ref.key;
            userToAppend.css('font-weight', 'bold')
            }
        
        // append append
        $(userToAppend).append(childSnapshot.val().nickname);
        $('#users-list').append(userToAppend);
    });

    database.ref('users').on("child_removed", function(childSnapshot) {
        // when a user is removed from database, remove them from the list
        $(`#${childSnapshot.ref.key}`).remove();
    });


    // listen for new messages
    database.ref('chat').on("child_added", function(childSnapshot) {
        
        // if type is a message, display it in the chat window
        if (childSnapshot.val().type === `message`) {
            $('#chat-text').append(
                `${childSnapshot.val().time} <font color="${childSnapshot.val().color}">${childSnapshot.val().nickname}</font> ${childSnapshot.val().message}<br>`
                );
        }


        // scrolls chat div down to new message
        $('#chat-text').animate({scrollTop: $('#chat-text').prop("scrollHeight")}, 0);
        
        // if the new message is mine, remove it
        if (childSnapshot.val().nickname === nickname) {
            database.ref('chat').child(childSnapshot.ref.key).remove();
        }
    });

}

// send new message function
sendMsg = (e) => { 

    // push message object to chat node in database
    database.ref('chat').push({
    time: moment().format('HH:mm:ss'),
    color: nickcolor,
    nickname: nickname,
    message: $('#message-text').val(),
    type: `message`
    });

    //update user's last activity
    database.ref('users/' + myKey).update({
        last: moment().format('HH:mm:ss')
    })   

    // set selection back to the message input field
    $('#message-text').val('');
    $('#message-text').select();
}


handleChange = (event) => {
    this.setState({
        nickState: event.target.value
    })
}

handleSubmit = (event) => {
    event.preventDefault();
    this.joinChat(this.state.nickState);
}

keyPress = (e) => {
    if(e.keyCode == 13){
        this.joinChat(this.state.nickState);
    }
 }

 handleChangeMsg = (event) => {
    this.setState({
        msgState: event.target.value
    })
}

 keyPressMsg = (e) => {
    if(e.keyCode == 13){
        this.sendMsg(this.state.msgState);
    }
 }

  render() {

    return (

        <div>

                <div className="backdrop"></div>

                <div className="box">
                            <Form.Control size="sm text-center" type="text" placeholder="Enter a nickname" onKeyDown={this.keyPress} onChange={this.handleChange}/>
                            <Button variant="primary" style={{margin: 10 + 'px'}} onClick={this.handleSubmit}>
                                    Enter Chat Lobby
                            </Button>
                </div>
            

            <div className="stuck">
                <div className="asd">

                    <div id="chat-text"></div>
                    
                    <select id="users-list" className="select-style" size="20"></select>
        
                </div>

                <div className="chat-input-div">
                        <input onKeyDown={this.keyPressMsg} onChange={this.handleChangeMsg} className="form-control form-control-sm" id="message-text" placeholder="Message" type="text"></input>
                        <button onClick={this.sendMsg} className="btn btn-sm btn-primary" id="message-button">Send Message</button>
                </div>
            </div>


        </div>




    );
  }
}

export default Chat;
