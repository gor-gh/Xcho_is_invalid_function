<template>
    <div id="app">
        <LeftMenu   
            @toggleSettings="toggleSet" 
            @toggleSearch="toggleSearchPanel"
            @toggleNotifications="toggleNotif"
            @listMonthView="makeListMonthView" 
            @listWeekView="makeListWeekView" 
            @listDayView="makeListDayView" 
            @dayView="makeDayView"
            @weekView="makeWeekView" 
            @monthView="makeMonthView" 
            @toggleMenu="menuOpened = !menuOpened"
            @openMenu="menuOpened = true"
            @closeMenu="menuOpened = false"
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
            :menuOp="menuOpened" 
            :settings="settings"
            :search="search"
            :notific="notifText"
            :notificArr="notif"
        />
        <Calendar 
            v-show="whatToShow == 'calendar'" 
            @update_notifications="updateNotif"
            :filterAcc="filterAc" 
            :filterDic="filterDe" 
            :filterWait="filterWa" 
            :viewName="view" 
            :mySize="calWidth"
        />
        <Settings 
            v-show="whatToShow == 'settings'" 
            @filterAccepted="filterA" 
            @filterDeclined="filterD" 
            @filterWaiting="filterW" 
            @showAccepted="showA" 
            @showDeclined="showD" 
            @showWaiting="showW"
        />
        <Notifications 
            v-show="whatToShow == 'notifications'"
            :notifications="notif"
        />
        <Search v-show="whatToShow == 'searchPanel'" />
    </div>
</template>

<script>
import Calendar from './components/Calendar.vue';
import Settings from './components/Settings.vue';
import LeftMenu from './components/LeftMenu.vue';
import Search from './components/Search.vue';
import Notifications from './components/Notifications.vue';

export default {
    data: function(){
        return {
            calWidth: 85,
            appName:'App-Name',
            settings: 'Settings',
            search:'Search',
            notifText: 'Notifications',
            list: 'List',
            listMonth: 'List Month',
            listWeek : 'List Week',
            listDay : 'List Day',
            monthView: 'Month',
            weekView: 'Week',
            dayView: 'Day',
            view: 'month',
            menuOpened: false,
            whatToShow:'calendar',
            filterAc:false,
            filterDe:false,
            filterWa:false,
            notif:[]    
        }
    },
    methods: {
        updateNotif(arr){
            this.notif = [...arr];
        },
        changeCalWidth(width){
            this.calWidth = width;
        },
        toggleSearchPanel(){
            this.whatToShow = 'searchPanel';
        },
        toggleSet(){
            this.whatToShow = 'settings';
        },
        toggleNotif(){
            this.whatToShow = 'notifications';
        },
        makeMonthView(){
            this.view = 'month';
            this.whatToShow = 'calendar';
        },
        makeDayView(){
            this.view = 'basicDay';
            this.whatToShow = 'calendar';
        },
        makeWeekView(){
            this.view = 'basicWeek';
            this.whatToShow = 'calendar';
        },
        makeListMonthView(){
            this.view = 'listMonth';
            this.whatToShow = 'calendar';
        },
        makeListWeekView(){
            this.view = 'listWeek';
            this.whatToShow = 'calendar';        
        },
        makeListDayView(){
            this.view = 'listDay';
            this.whatToShow = 'calendar';
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
        Settings,
        LeftMenu,
        Search,
        Notifications
    }
}
</script>
<style >
#app{
    display:flex;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
