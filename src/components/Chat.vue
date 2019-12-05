<template>
  <div id="chat_container">
    <h1 id="header_text">Chat</h1>
    <div id="messages_container">
      <div id="messages">
        <div
          class="mes_cont"
          v-for="(message,index) in messages"
          :key="index"
          :class="(message.fromUser) ? 'user_message' : 'client_message' "
        >
          <div class="message">
            <h1 id="message_text">{{message.content}}</h1>
            <h3 id="message_time">{{message.when.replace('T',' ')}}</h3>
          </div>
        </div>
      </div>
      <div id="input_field_container">
        <div id="text_input">
          <md-field md-inline>
            <label>Inline</label>
            <md-input ref="input" v-model="newMessage"></md-input>
          </md-field>
        </div>
        <div id="send_btn_cont">
          <button type="submit" id="send_button" @click="sendMessage">
            <font-awesome-icon icon="arrow-circle-right" id="send_icon"></font-awesome-icon>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    scrollFunction: Function,
    flag: Boolean
  },
  data() {
    return {
      newMessage: "",
      messages: [
        {
          fromUser: false,
          when: "2019-11-18T19:30",
          content: "barev Dzez"
        },
        {
          fromUser: true,
          when: "2019-11-18T19:35",
          content: "barev"
        },
        {
          fromUser: false,
          when: "2019-11-18T19:30",
          content: "barev Dzez"
        },
        {
          fromUser: true,
          when: "2019-11-18T19:35",
          content: "barev"
        },
        {
          fromUser: false,
          when: "2019-11-18T19:30",
          content: "barev Dzez"
        },
        {
          fromUser: true,
          when: "2019-11-18T19:35",
          content: "barev"
        },
        {
          fromUser: false,
          when: "2019-11-18T19:30",
          content: "barev Dzez"
        },
        {
          fromUser: true,
          when: "2019-11-18T19:35",
          content: "barev"
        },
        {
          fromUser: false,
          when: "2019-11-18T19:30",
          content: "barev Dzez"
        },
        {
          fromUser: true,
          when: "2019-11-18T19:35",
          content: "barev"
        },
        {
          fromUser: false,
          when: "2019-11-18T19:30",
          content: "barev Dzez"
        },
        {
          fromUser: true,
          when: "2019-11-18T19:35",
          content: "barev"
        },
        {
          fromUser: false,
          when: "2019-11-18T19:30",
          content: "barev Dzez"
        },
        {
          fromUser: true,
          when: "2019-11-18T19:35",
          content: "barev"
        },
        {
          fromUser: true,
          when: "2019-11-18T19:35",
          content: "barev"
        },
        {
          fromUser: false,
          when: "2019-11-18T19:30",
          content: "barev Dzez"
        },
        {
          fromUser: true,
          when: "2019-11-18T19:35",
          content: "barev"
        }
      ]
    };
  },
  mounted() {},
  watch: {
    flag() {
      if (this.flag) {
        this.scrollFunction(document.querySelector(".mes_cont:last-child"));
        this.$emit("scrolled");
      }
    }
  },
  methods: {
    sendMessage() {
      let date = JSON.stringify(moment().format("YYYY-MM-DD HH:mm")).replace(
        /"/g,
        ""
      );
      this.messages.push({
        fromUser: true,
        when: date,
        content: this.$refs.input.value
      });
      console.log(date);
      this.newMessage = "";
      this.scrollFunction(document.querySelector(".mes_cont:last-child"));
    }
  }
};
</script>

<style lang="css">
#chat_container {
  width: 97%;
  height: 100vh;
  /* background-color: red; */
}
#header_text {
  height: 8%;
  margin-bottom: 0;
  color: var(--basic-check-col);
  background-color: var(--basic-text-color);

  /* background-color: red; */
  font-size: 35px !important;
  border-bottom: 2px solid var(--basic-text-color);
}
.mes_cont {
  width: 100%;
  display: flex;
}
#messages_container {
  height: 85%;
  /* background-color: blue; */
  position: relative;
}
#messages {
  overflow-y: auto;
  width: 100%;
  height: 100%;
  list-style-type: none;
  /* background-color: green; */
}
.mes_cont {
  padding: 0 10px;
}
.message {
  padding: 10px 20px;
  margin: 10px 0;
  max-width: 60%;

  /* border-radius: 20px; */
  /* position: absolute; */
}
#message_text {
  text-align: left !important;
  padding-bottom: 0px;
  margin-bottom: 0;
}
#message_time {
  font-size: 9px !important;
  text-align: right;
  margin-bottom: 0;
}
#input_field_container {
  width: 100%;
  height: 9%;
  background-color: var(--basic-check-col);
  display: flex;
  justify-content: center;
}
#text_input {
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#send_btn_cont {
  width: 10%;
  display: flex;
  align-items: center;
  /* flex-direction: column; */
  justify-content: center;
  /* background-color: blue; */
}
#send_button {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  /* background-color: green; */
}
#send_icon {
  width: 100%;
  height: 100%;
}
.user_message {
  justify-content: flex-end;
}
.client_message {
  justify-content: flex-start;
}
.client_message > div {
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: var(--basic-text-color);
  color: var(--basic-check-col);
}
.user_message > div {
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  color: var(--basic-text-color);
  background-color: var(--basic-check-col);
}
</style>