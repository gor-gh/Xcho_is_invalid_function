<template>
  <div
    id="menu_container"
    @mouseover="openMenu"
    @mouseout="closeMenu"
    :class="(pinMenu) ? 'closed_menu' : 'closed_menu_with_anim'"
  >
    <ul class="sidebar navbar-nav">
      <li>
        <div
          class="d-flex but_cont"
          :class="menuOp ? 'justify-content-between' : 'justify-content-center'"
        >
          <span id="app_name" v-show="menuOp">{{appN}}</span>
          <button
            class="btn btn-link btn-sm text-white order-1 order-sm-0"
            id="sidebarToggle"
            href="#"
          >
            <!-- <font-awesome-icon icon="angry"></font-awesome-icon> -->
            <img src="../../public/img/logo.png" class="image_logo" alt />
          </button>
        </div>
      </li>
      <li class="nav-item active" id="month">
        <a class="nav-link" href="#" @click="monthView">
          <font-awesome-icon icon="calendar-alt"></font-awesome-icon>
          <span v-show="menuOp">{{monthText}}</span>
        </a>
      </li>
      <li class="nav-item dropdown" id="week">
        <a class="nav-link" href="#" id="pagesDropdown" @click="weekView">
          <font-awesome-icon icon="calendar-week"></font-awesome-icon>
          <span v-show="menuOp">{{weekText}}</span>
        </a>
      </li>
      <li class="nav-item" id="day">
        <a class="nav-link" href="#" @click="dayView">
          <font-awesome-icon icon="calendar-day"></font-awesome-icon>
          <span v-show="menuOp">{{dayText}}</span>
        </a>
      </li>
      <li class="nav-item" id="list">
        <a class="nav-link" href="#" @click="showNesMen">
          <font-awesome-icon icon="list"></font-awesome-icon>
          <span v-show="menuOp">{{list}}</span>
        </a>
        <ul
          v-show="showNestedMenu && menuOp"
          class="nested_menu"
          :class="(showNestedMenu) ? 'anim_in' : 'anim_out'"
        >
          <li @click="listMonthView">
            <span>{{listM}}</span>
          </li>
          <li @click="listWeekView">
            <span>{{listW}}</span>
          </li>
          <li @click="listDayView">
            <span>{{listD}}</span>
          </li>
        </ul>
      </li>
      <li class="nav-item" id="searchPanel" @click="toggleSearchPanel">
        <a class="nav-link" href="#">
          <font-awesome-icon icon="search"></font-awesome-icon>
          <span v-show="menuOp">{{search}}</span>
        </a>
      </li>
      <li class="nav-item" id="notifications" @click="toggleNotifications">
        <a class="nav-link notif_link" href="#">
          <font-awesome-icon icon="bell"></font-awesome-icon>
          <span v-show="menuOp">{{notific}}</span>
          <div
            v-show="(!menuOp && notificArr.length > 0)"
            class="menu_closed_badge"
          >{{ (notificArr.length > 0 ) ? notificArr.length : ''}}</div>
          <div
            v-show="(menuOp && notificArr.length > 0)"
            class="menu_opened_badge"
          >{{ (notificArr.length > 0 ) ? notificArr.length : ''}}</div>
        </a>
      </li>
      <li class="nav-item" id="searchPanel" @click="toggleChat">
        <a class="nav-link" href="#">
          <font-awesome-icon icon="envelope"></font-awesome-icon>
          <span v-show="menuOp">{{chat}}</span>
        </a>
      </li>
      <li class="nav-item" id="settings" @click="toggleSettings">
        <a class="nav-link" href="#">
          <font-awesome-icon icon="cog"></font-awesome-icon>
          <span v-show="menuOp">{{settings}}</span>
        </a>
      </li>
    </ul>
    <div class="pin_menu" v-show="menuOp">
      <md-switch v-model="pinMenu" class="pinm_text">Pin Menu</md-switch>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chat: String,
    settings: String,
    search: String,
    notific: String,
    notificArr: Array,
    listM: String,
    listW: String,
    listD: String,
    list: String,
    dayText: String,
    weekText: String,
    monthText: String,
    appN: String
  },
  data() {
    return {
      showNestedMenu: false,
      pinMenu: false,
      menuOp: false
    };
  },
  methods: {
    showNesMen() {
      this.showNestedMenu = !this.showNestedMenu;
    },
    toggleSearchPanel() {
      this.$emit("toggleSearch");
    },
    toggleSettings() {
      this.$emit("toggleSettings");
    },
    toggleNotifications() {
      this.$emit("toggleNotifications");
    },
    toggleChat() {
      this.$emit("toggleChat");
    },
    dayView() {
      this.$emit("dayView");
    },
    weekView() {
      this.$emit("weekView");
    },
    monthView() {
      this.$emit("monthView");
    },
    listMonthView() {
      this.$emit("listMonthView");
      this.closeMenu();
    },
    listWeekView() {
      this.$emit("listWeekView");
      this.closeMenu();
    },
    listDayView() {
      this.$emit("listDayView");
      this.closeMenu();
    },
    toggleMenu() {
      this.$emit("toggleMenu");
    },
    openMenu() {
      this.menuOp = true;
    },
    closeMenu() {
      if (!this.pinMenu) this.menuOp = false;
    }
  },
  watch: {
    menuOp() {
      let links = document.querySelectorAll(".sidebar>.nav-item .nav-link");
      let int;
      if (this.menuOp) {
        this.$emit("reduce_cal");
        links.forEach(el => {
          el.style.textAlign = "left";
        });
      } else {
        this.$emit("increase_cal");
        links.forEach(el => {
          el.style.textAlign = "center";
        });
      }
    }
  },
  mounted() {}
};
</script>

<style>
#sidebarToggle {
  height: 100%;
}
.nested_menu {
  list-style-type: none;
}
.nested_menu > li {
  height: 30px;
  line-height: 20px;
  text-align: start;
  padding-left: 30px;
  cursor: pointer;
  color: var(--basic-check-col);
}
.nested_menu > li:hover {
  text-decoration: underline;
}
.md-menu {
  width: 100% !important;
}
.list_button {
  width: 100% !important;
  min-width: 20px !important;
}
.md-ripple {
  padding: 0px !important;
  justify-content: none !important;
}
.md-button-content {
  width: 100%;
}
.md-button-content > .nav-link {
  width: 100%;
}
.md-list-item-content {
  text-align: center !important;
  display: flex;
  justify-content: center !important;
}
.nav-item > .md-menu {
  height: 60.7px;
  padding-top: 13px;
  padding-bottom: 13px;
}
.md-button:not([disabled]).md-focused:before,
.md-button:not([disabled]):active:before,
.md-button:not([disabled]):hover:before {
  background-color: transparent;
}
.sidebar > .nav-item > .nav-link {
  text-align: none;
}
.sidebar > li {
  overflow: hidden;
  white-space: nowrap;
}
.notif_link {
  position: relative;
}
.menu_closed_badge {
  position: absolute;
  top: 12px;
  left: 40px;
  width: 15px;
  height: 15px;
  border-radius: 100%;
  background-color: red;
  font-size: 12px !important;
  line-height: 15px;
  color: white;
  text-align: center;
}
.menu_opened_badge {
  position: absolute;
  top: 22px;
  left: 90%;
  width: 15px;
  height: 15px;
  border-radius: 4px;
  background-color: red;
  font-size: 12px !important;
  line-height: 15px;
  color: white;
  text-align: center;
}
.image_logo {
  width: 40px;
}
.pin_menu {
  margin: 0 auto;
  position: relative;
  bottom: 70px;
  height: 40px;
  width: 100%;
  color: var(--basic-check-col);
}
/*animation */
.closed_menu {
  width: 20%;
}
.closed_menu_with_anim {
  width: 5%;
  transition: width 1s;
}
.closed_menu_with_anim:hover {
  width: 20%;
}

.anim_in {
  animation: nested 0.8s;
}
.anim_out {
  animation: nested 0.5s reverse;
}
animation_in {
  animation: open_menu 0.8;
}
animation_out {
  animation: open_menu 0.8 reverse;
}
/* @keyframes open_menu {
  0% {
    width: 5%;
  }
  100% {
    width: 20%;
  }
} */
@keyframes nested {
  0% {
    height: 0px;
    opacity: 0;
  }
  100% {
    height: 90px;
    opacity: 1;
  }
}

@keyframes openMenu {
  0% {
    width: 5%;
  }

  100% {
    width: 20%;
  }
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    height: 0px;
  }

  100% {
    height: 90px;
  }
}
@media only screen and (max-width: 1201px) {
  .fc-event-container .fc-title {
    font-size: 15px !important;
  }
}
</style>