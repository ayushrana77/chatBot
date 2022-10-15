import React, { Component, createRef } from "react";
import "./chatContent.css";
import Avatar from "./Avatar";
import ChatItem from "./ChatItem";

const postData = async (query) => {
  const res = await fetch("/home", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });
  const data = await res.json();
  if (res.status === 200) {
    return data;
  } else {
    window.alert("Failed");
    return "";
  }
};

export default class ChatContent extends Component {
  messagesEndRef = createRef(null);
  chatItms = [
    {
      key: 1,
      image:
        "https://media.istockphoto.com/vectors/blue-cute-robot-vector-id1191411980?k=20&m=1191411980&s=612x612&w=0&h=RwynZNA7Gf-VO3W8cuhI1s9bsKbZ1QZ89rKNrfSJCMA=",
      type: "other",
      msg: "Hi, How can i help you",
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      chat: this.chatItms,
      msg: "",
      keyvalue: 2,
    };
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  addToChat = () => {
    if (this.state.msg !== "") {
      this.chatItms.push({
        key: this.state.keyvalue,
        type: "",
        msg: this.state.msg,
        image:
          "https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=",
      });
      this.setState({ chat: [...this.chatItms] });
      this.scrollToBottom();

      this.setState({ keyvalue: this.state.keyvalue + 1 });
      postData(this.state.msg).then((answer) => {
        if (answer !== "") {
          this.chatItms.push({
            key: this.state.keyvalue,
            type: "other",
            msg: answer,
            image:
              "https://media.istockphoto.com/vectors/blue-cute-robot-vector-id1191411980?k=20&m=1191411980&s=612x612&w=0&h=RwynZNA7Gf-VO3W8cuhI1s9bsKbZ1QZ89rKNrfSJCMA=",
          });
          this.setState({ chat: [...this.chatItms] });
          this.scrollToBottom();
          this.setState({ keyvalue: this.state.keyvalue + 1 });
        }
      });
      this.setState({ msg: "" });
    }
  };

  componentDidMount() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.addToChat();
      }
    });
    this.scrollToBottom();
  }
  onStateChange = (e) => {
    console.log(e.target.value);
    this.setState({ msg: e.target.value });
  };
  onHandleClick = (e) => {
    this.addToChat();
  };
  onVoiceClick = (e) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.lang = "en-US";
    recognition.start();
    var self = this;
    recognition.onresult = function(e) {
      var speak = e.results[0][0].transcript;
      document.getElementById("speech").value = speak;
      recognition.stop();
      self.setState({ msg: speak });
    };
    recognition.onerror = function(e) {
      recognition.stop();
    };
  };

  render() {
    return (
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <Avatar image="https://media.istockphoto.com/vectors/blue-cute-robot-vector-id1191411980?k=20&m=1191411980&s=612x612&w=0&h=RwynZNA7Gf-VO3W8cuhI1s9bsKbZ1QZ89rKNrfSJCMA=" />
              <p>Chat Bot</p>
            </div>
          </div>
        </div>
        <div className="content__body">
          <div className="chat__items">
            {this.state.chat.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.key}
                  user={itm.type ? itm.type : "me"}
                  msg={itm.msg}
                  image={itm.image}
                />
              );
            })}
            <div ref={this.messagesEndRef} />
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            <input
              type="text"
              placeholder="Type a message here"
              onChange={this.onStateChange}
              value={this.state.msg}
              id="speech"
            />
            <button
              className="btnSendMsg"
              id="sendMsgBtn"
              onClick={this.onVoiceClick}
            >
              <i className="fa fa-microphone"></i>
            </button>
            <button
              className="btnSendMsg"
              onClick={this.onHandleClick}
              id="sendMsgBtn"
            >
              <i>Send</i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
