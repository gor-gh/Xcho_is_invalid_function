<template>
  <div id="notification">
    <h1 class="header_text">Notifications</h1>
    <ul id="notif_list">
      <li
        v-for="(notif,index) in notifications"
        :key="index"
        class="notification_item"
        :style="{ justifyContent:(notif.slice(0,1) == 'b') ? 'space-around' : 'center' }"
        :class="notif.slice(0,1)"
      >
        <span class="inside_text">{{notif.slice(3)}}</span>
        <button
          v-show="notif.slice(0,1) == 'b'"
          @click="approve(notif.slice(1,notif.indexOf(' ')))"
          class="but approve_but"
          title="approve"
        >
          <font-awesome-icon icon="check-circle"></font-awesome-icon>
        </button>
        <button
          v-show="notif.slice(0,1) == 'b'"
          @click="decline(notif.slice(1,notif.indexOf(' ')))"
          class="but decline_but"
          title="decline"
        >
          <font-awesome-icon icon="times-circle"></font-awesome-icon>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    notifications: Array
  },
  data() {
    return {};
  },
  methods: {
    approve(eventNum) {
      this.$emit("approveEvent", eventNum);
    },
    decline(eventNum) {
      this.$emit("declineEvent", eventNum);
    }
  },
  mounted() {
    document.getElementById("notif_list").style.height =
      window.innerHeight - 58 + "px";
    window.onresize = () => {};
  }
};
</script>
<style>
#notification {
  width: 97%;
  height: 100%;
  /* overflow-y: scroll; */
  color: var(--basic-text-color) !important;
}
.header_text {
  text-align: center;
  font-size: 40px !important;
}
#notif_list {
  list-style-type: none;
  height: 780px;
  overflow: auto;
}
.b {
  background-color: #f9aa0d;
}
.a {
  background-color: yellow;
}
.notification_item {
  display: flex;
  text-align: center;
  justify-content: space-around;
  height: 50px;
  width: 80%;
  margin: 0 auto;
  line-height: 50px;
  user-select: none;
  /* cursor: pointer; */
  color: var(--basic-text-color);
  border-bottom-style: solid;
  border-width: 1px;
  margin-bottom: 5px;
  margin-top: 5px;
  border-radius: 10px;
  border-color: var(--basic-text-color);
}
.notification_item:first-child {
  margin-top: 10px;
}
.notification_item:hover {
  box-shadow: 0px 0px 15px var(--basic-text-color);
}
.approve_but {
  color: green;
}
.decline_but {
  color: red;
}
.but {
  background-color: transparent;
  border: none;
  height: 50px;
  width: 50px;
}
inside_text {
  width: 80%;
}
/* .approve_but:hover{
    box-shadow: 0px 0px 5px var(--basic-text-color);
} */
</style>





