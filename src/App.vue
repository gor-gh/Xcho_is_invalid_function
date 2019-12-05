<template>
  <div id="app">
    <LeftMenu
      @toggleSettings="toggleSet"
      @toggleSearch="toggleSearchPanel"
      @toggleNotifications="toggleNotif"
      @toggleChat="togChat"
      @listMonthView="makeListMonthView"
      @listWeekView="makeListWeekView"
      @listDayView="makeListDayView"
      @dayView="makeDayView"
      @weekView="makeWeekView"
      @monthView="makeMonthView"
      @increase_cal="changeCalWidth(95)"
      @reduce_cal="changeCalWidth(85)"
      :listM="listMonth"
      :listW="listWeek"
      :listD="listDay"
      :list="list"
      :dayText="dayView"
      :weekText="weekView"
      :monthText="monthView"
      :appN="appName"
      :settings="settings"
      :search="search"
      :notific="notifText"
      :notificArr="notif"
      :chat="chatN"
    />
    <Calendar
      v-show="whatToShow == 'calendar'"
      @update_notifications="updateNotif"
      :filterAcc="filterAc"
      :filterDic="filterDe"
      :filterWait="filterWa"
      :filterPast="filterPa"
      :viewName="view"
      :mySize="calWidth"
      :apprEvId="localEventIdAppr"
      :decEvId="localEventIdDec"
    />
    <Settings
      v-show="whatToShow == 'settings'"
      @filterAccepted="filterA"
      @filterDeclined="filterD"
      @filterWaiting="filterW"
      @filterPast="filterP"
      @showAccepted="showA"
      @showDeclined="showD"
      @showWaiting="showW"
      @showPast="showP"
    />
    <Notifications
      v-show="whatToShow == 'notifications'"
      @approveEvent="approve"
      @declineEvent="decline"
      :notifications="notif"
    />
    <Chat
      @scrolled="flagForScroll = false"
      v-show="whatToShow == 'chat'"
      :scrollFunction="scrollFunc"
      :flag="flagForScroll"
    />
    <Search v-show="whatToShow == 'searchPanel'" />
  </div>
</template>

<script>
import Calendar from "./components/Calendar.vue";
import Settings from "./components/Settings.vue";
import LeftMenu from "./components/LeftMenu.vue";
import Search from "./components/Search.vue";
import Notifications from "./components/Notifications.vue";
import Chat from "./components/Chat.vue";

export default {
  data: function() {
    return {
      scrollFunc: element => {
        element.scrollIntoView(false);
        console.log("done");
      },
      flagForScroll: false,
      localEventIdAppr: NaN,
      localEventIdDec: NaN,
      calWidth: 85,
      appName: "App-Name",
      settings: "Settings",
      search: "Search",
      notifText: "Notifications",
      list: "List",
      chatN: "Chat",
      listMonth: "List Month",
      listWeek: "List Week",
      listDay: "List Day",
      monthView: "Month",
      weekView: "Week",
      dayView: "Day",
      view: "month",
      whatToShow: "calendar",
      filterAc: false,
      filterDe: false,
      filterWa: false,
      filterPa: false,
      notif: []
    };
  },
  methods: {
    approve(eventId) {
      this.localEventIdAppr = parseInt(eventId);
    },
    decline(eventId) {
      this.localEventIdDec = parseInt(eventId);
    },
    updateNotif(arr) {
      this.notif = [...arr];
    },
    changeCalWidth(width) {
      this.calWidth = width;
    },
    toggleSearchPanel() {
      this.whatToShow = "searchPanel";
    },
    toggleSet() {
      this.whatToShow = "settings";
    },
    toggleNotif() {
      this.whatToShow = "notifications";
    },
    togChat() {
      this.whatToShow = "chat";
      this.flagForScroll = true;
    },
    makeMonthView() {
      this.view = "month";
      this.whatToShow = "calendar";
    },
    makeDayView() {
      this.view = "basicDay";
      this.whatToShow = "calendar";
    },
    makeWeekView() {
      this.view = "basicWeek";
      this.whatToShow = "calendar";
    },
    makeListMonthView() {
      this.view = "listMonth";
      this.whatToShow = "calendar";
    },
    makeListWeekView() {
      this.view = "listWeek";
      this.whatToShow = "calendar";
    },
    makeListDayView() {
      this.view = "listDay";
      this.whatToShow = "calendar";
    },
    filterA() {
      this.filterAc = !this.filterAc;
    },
    filterD() {
      this.filterDe = !this.filterDe;
    },
    filterW() {
      this.filterWa = !this.filterWa;
    },
    filterP() {
      this.filterPa = !this.filterPa;
      console.log(this.filterPa);
    },
    showA() {
      this.filterAc = !this.filterAc;
    },
    showD() {
      this.filterDe = !this.filterDe;
    },
    showW() {
      this.filterWa = !this.filterWa;
    },
    showP() {
      this.filterPa = !this.filterPa;
    }
  },
  name: "app",
  components: {
    Calendar,
    Settings,
    LeftMenu,
    Search,
    Notifications,
    Chat
  }
};
</script>
<style >
#app {
  display: flex;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
