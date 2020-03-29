
import React, { Component } from "react";
import firebase from '../firebase.js';
import moment from 'moment';

import $ from 'jquery'; 

var database = firebase.database();
let nickname;
let nickcolor;
let myKey;

class Chat extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: []
     
    };
 }


componentDidMount() {

    $('#join-chat-button').on("click", function(e) {
        e.preventDefault();

        nickname = $('#nickname-text').val().trim();

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

    // send new message button
    $('#message-button').on("click", function(e) {
        e.preventDefault() 

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
    });


}

  render() {

    return (

        <div>
            <div>   
                <div>
                    <div className="card mb-4 nickname-card">
                        <div className="card-header text-center">Choose a nickname</div>
                        <div className="card-body text-center">
                            <form>
                                <input type="text" id="nickname-text" className="form-control form-control-sm" placeholder="Nickname"></input>
                                <button className="btn btn-sm btn-dark" id="join-chat-button">Enter Lobby</button>
                                <div className="login-display text-center"></div>
                            </form>
                    </div>
                    </div>
                </div>
            </div>

            <div className="stuck">
                <div className="asd">
                    {/* className="card-body" */}
                    <div id="chat-text"></div>
                    
                    <select id="users-list" class="select-style" size="10"></select>
        
                </div>

                <div className="chat-input-div">
                    <form>
                        <input className="form-control form-control-sm" id="message-text" placeholder="Message" type="text"></input>
                        <button className="btn btn-sm btn-dark" id="message-button">Send</button>
                    
                    </form>
                </div>
            </div>


        </div>




    );
  }
}

export default Chat;
