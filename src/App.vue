<template>
  <div id="app">
    <div id="all_container">
        <div id="menu_container">
                <ul class="sidebar navbar-nav">
                        <li>
                            <div class="d-flex but_cont" :class="menuOpened ? 'justify-content-between' : 'justify-content-center'">
                                <span id="app_name" v-show="menuOpened"> {{appName}} </span>
                                <button class="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" @click="menuOpened = !menuOpened" href="#">
                                    <font-awesome-icon icon="bars"></font-awesome-icon>
                                </button>
                            </div>
                        </li>
                        <li class="nav-item active" id="month" >
                          <a class="nav-link" href="#" @click="makeMonthView">
                            <font-awesome-icon icon="calendar-alt"></font-awesome-icon>
                            <span v-show="menuOpened"> {{monthView}} </span>
                          </a>
                        </li>
                        <li class="nav-item dropdown" id="week">
                            <a class="nav-link" href="#" id="pagesDropdown" @click="makeWeekView">
                                <font-awesome-icon icon="calendar-week"></font-awesome-icon>
                                <span v-show="menuOpened"> {{weekView}} </span>
                            </a>
                        </li>
                        <li class="nav-item" id="day">
                            <a class="nav-link" href="#" @click="makeDayView">
                                <font-awesome-icon icon="calendar-day"></font-awesome-icon>
                                <span v-show="menuOpened"> {{dayView}} </span>
                            </a>
                        </li>
                        <li class="nav-item" id="list">
                            <md-menu md-size="medium" :md-offset-x="127" :md-offset-y="-36">
                                <md-button md-menu-trigger class="list_button">
                                    <a class="nav-link" href="#" >
                                        <font-awesome-icon icon="list"></font-awesome-icon>                                
                                        <span v-show="menuOpened"> {{list}} </span>
                                    </a>
                                </md-button>
                                <md-menu-content>
                                    <md-menu-item @click="makeListMonthView" class="text-center"> <span> {{listMonth}} </span> </md-menu-item>
                                    <md-menu-item @click="makeListWeekView" class="text-center"> <span> {{listWeek}} </span> </md-menu-item>
                                    <md-menu-item @click="makeListDayView" class="text-center"> <span> {{listDay}} </span> </md-menu-item>
                                </md-menu-content>
                            </md-menu>
                        </li>
                        <li class="nav-item" id="settings" @click="isCalendar = !isCalendar">
                                <a class="nav-link" href="#">
                                  <font-awesome-icon icon="cog"></font-awesome-icon>
                                    <span v-show="menuOpened"> {{settings}} </span>
                                </a>
                            </li>
                      </ul>
        </div>
        
        <Calendar v-show="isCalendar" :filterAcc="filterAc" :filterDic="filterDe" :filterWait="filterWa" :viewName="view" />
        <Settings v-show="!isCalendar" @filterAccepted="filterA()" @filterDeclined="filterD()" @filterWaiting="filterW()" @showAccepted="showA()" @showDeclined="showD()" 
            @showWaiting="showW()"
        />
        
        <!-- <div id="calendar"></div> -->
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Calendar from './components/Calendar.vue';
import Settings from './components/Settings.vue';

export default {
    data: function(){
        return {
            appName:'App-Name',
            settings: 'Settings',
            list: 'List',
            listMonth: 'List Month',
            listWeek : 'List Week',
            listDay : 'List Day',
            monthView: 'Month',
            weekView: 'Week',
            dayView: 'Day',
            view: 'month',
            menuOpened: true,
            isCalendar : true,
            filterAc:false,
            filterDe:false,
            filterWa:false
        }
    },
    methods: {
        makeMonthView(){
            this.view = 'month';
            this.isCalendar = true;
        },
        makeDayView(){
            this.view = 'basicDay';
            this.isCalendar = true;
        },
        makeWeekView(){
            this.view = 'basicWeek';
            this.isCalendar = true;
        },
        makeListMonthView(){
            this.view = 'listMonth';
            this.isCalendar = true;
        },
        makeListWeekView(){
            this.view = 'listWeek';
            this.isCalendar = true;
        },
        makeListDayView(){
            this.view = 'listDay';
            this.isCalendar = true;
        },
        filterA(){
            this.filterAc = !this.filterAc;
        },
        filterD(){
            this.filterDe = !this.filterDe;
        },
        filterW(){
            this.filterWa = !this.filterWa;
        },
        showA(){
            this.filterAc = !this.filterAc;
        },
        showD(){
            this.filterDe = !this.filterDe;
        },
        showW(){
            this.filterWa = ! this.filterWa;
        }
    },
  name: 'app',
  components: {
      Calendar,
      Settings
    // HelloWorld
  }
}
</script>

<style >
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.md-menu{
    width: 100% !important;
}
.list_button{
    width: 100% !important;
}
.md-ripple{
    padding: 0px !important;
    justify-content: none !important;
}
.md-button-content{
    width: 100%;
}
.md-button-content>.nav-link{
    width: 100%;
}
.md-list-item-content{
    text-align: center !important;
    display: flex;
    justify-content: center !important;
}
@media only screen and (max-width: 1201px) {
    .fc-event-container  .fc-title{
        font-size: 15px !important;
    }       
}
</style>
