<template>    
  <div class="calendar_cont"> 
    <full-calendar ref="fullCalendar" :config="config" :events="events" />
    <EventCloud 
      v-show="flagForCloudVisibility" 
      @ShowCloud="showCloud"
      @HideCloud="hideCloud"
      :flagVis="flagForCloudVisibility" 
      :cloudOp="cloudOptions"
    /> 
  </div>
</template>

<script>
import EventCloud from './EventCloud.vue';
// import axios from 'axios';

export default {
  name: "hello",
  props: {
    mySize:Number,
    calendarHeight:String,
    viewName: String,
    filterAcc:Boolean,
    filterDic:Boolean,
    filterWait:Boolean
  },
  data() {
    return {
    day: new Date(),      
    // calendarPlugins:[dayGridPlugin,timeGridPlugin,listPlugin],
    flagForCloudVisibility: false,
    notifyMeBefore:'',
    cloudOptions: {
      eventCloudMessage: '',
      eventStartTime: '',
      eventOwnerName: '',
      eventOwnerLastName:'',
    },
    messageForUpcomingEvent: 'There is an upcoming event',
    messageForWaitingEvents: 'Click to watch full info',
    displayEventCloud:false,  
    count:0,
    notificArr:[],
    // socket : io('localhost:8080'),
    winHeight : window.outerHeight,
        events: [
          {
            id: 0,
            groupId: 'waiting',
            className: ["fc-day-grid-event", "fc-h-event", "fc-event", "fc-start", "fc-end", "fc-draggable","show"],
            title: 'click to learn more',
            start: '2019-10-28T13:00',
            duration: '01:00',
            backgroundColor: '#F9AA0D',
            firstName: 'Vahagn',
            lastName: 'Melkonyan',
            message: 'verevi dzax atami plomb piti drvi'
          },
          {
            id:1,
            groupId: 'accepted',
            className: ["fc-day-grid-event", "fc-h-event", "fc-event", "fc-start", "fc-end", "fc-draggable","show"],
            title: 'click to learn more',
            start: '2019-10-27T15:00',
            duration: '02:00',
            backgroundColor: '#25F90D',
            firstName: 'Gor',
            lastName: 'Gharagyozyan',
            message: 'verevi dzax atami plomb piti drvi'
          },
          {
            id: 2,
            groupId: 'declined',
            className: ["fc-day-grid-event", "fc-h-event", "fc-event", "fc-start", "fc-end", "fc-draggable","show"],
            title: 'click to repair',
            start: '2019-10-29T17:00',
            duration: '01:30',
            backgroundColor: '#D40B1F',
            firstName: 'Karen',
            lastName: 'Makaryan',
            message: 'verevi dzax atami plomb piti drvi'
          },
          {
            id:3,
            groupId: 'accepted',
            className: ["fc-day-grid-event", "fc-h-event", "fc-event", "fc-start", "fc-end", "fc-draggable","show"],
            title: 'click to learn more',
            start: '2019-10-25T03:01',
            duration: '02:00',
            backgroundColor: '#25F90D',
            firstName: 'Khachatur',
            lastName: 'Ghukasyan',
            message: 'verevi dzax atami plomb piti drvi'
          },
          {
            id: 4,
            groupId: 'declined',
            className: ["fc-day-grid-event", "fc-h-event", "fc-event", "fc-start", "fc-end", "fc-draggable","show"],
            title: 'click to repair',
            start: '2019-10-24T18:55',
            duration: '01:30',
            backgroundColor: '#D40B1F',
            firstName: 'Vardan',
            lastName: 'Sahakyan',
            message: 'verevi dzax atami plomb piti drvi'

          },
          {
            id: 5,
            groupId: 'waiting',
            className: ["fc-day-grid-event", "fc-h-event", "fc-event", "fc-start", "fc-end", "fc-draggable","show"],
            title: 'click to learn more',
            start: '2019-10-25T18:00',
            duration: '01:00',
            backgroundColor: '#F9AA0D',
            firstName: 'Gor',
            lastName: 'Gharagyozyan',
            message: 'verevi dzax atami plomb piti drvi'
          }
        ],
        config: {
          lacale: 'am',
          selectable: false,
          droppable: false,
          editable:false,
          defaultView: 'month',
          defaultDate: this.day,
          displayEventTime:true,
          weekNumbers:true,
          header: {
            left: "prev,next",
            center: 'title',
            right : 'today'
          },
          eventMouseover : (event,jsEvent) => {
            let topCoord,leftCoord;
            let date = new Date(event.start._i);
            this.cloudOptions.eventStartTime = 'Starts at` ' + (date.getHours() >= 10 ? date.getHours() : "0" + date.getHours()) + ':' + (date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes()) ; 
            this.cloudOptions.eventOwnerName = event.firstName + " " + event.lastName;
            this.cloudOptions.eventCloudMessage = event.message;
            topCoord = ((jsEvent.clientY + 200) > window.innerHeight) ? jsEvent.clientY - 200 : jsEvent.clientY;
            leftCoord = ((jsEvent.clientX + 350) > window.innerWidth) ? jsEvent.clientX - 350 : jsEvent.clientX; 
            document.documentElement.style.setProperty('--cloud-top',topCoord + 'px');
            document.documentElement.style.setProperty('--cloud-left',leftCoord + 'px');
            this.flagForCloudVisibility = true;
          },
          eventMouseout: () => {
            this.flagForCloudVisibility = false;
          }
        }
    };
  },
  watch:{
    notificArr(newArr){
      localStorage.notificArr = this.notificArr;
      this.$emit('update_notifications',newArr);
    },
    mySize(){
      document.getElementsByClassName('calendar_cont')[0].style.width = this.mySize + '%';
    },
    config(){
      if(this.config.defaultView == 'month'){
        document.documentElement.style.setProperty('--calendar-view-height','100%');
      } 
      else{
        document.documentElement.style.setProperty('--calendar-view-height','100% / 6');
      }
    },
    viewName(){
      this.$refs.fullCalendar.fireMethod('changeView',this.viewName)
    },
    filterAcc(){
      if(this.filterAcc){
        this.events.forEach(el => {
          if(el.groupId == 'accepted'){
            el.className.splice(el.className.indexOf('show'),1,'hide');
          }
        });
      }
      else{
        this.events.forEach(el => {
          if(el.groupId == 'accepted'){
            el.className.splice(el.className.indexOf('hide'),1,'show');
          }
        });
      }
    },
    filterDic(){
      if(this.filterDic){
        this.events.forEach(el => {
          if(el.groupId == 'declined'){
            el.className.splice(el.className.indexOf('show'),1,'hide');
          }
        });
      }
      else{
        this.events.forEach(el => {
          if(el.groupId == 'declined'){
            el.className.splice(el.className.indexOf('hide'),1,'show');
          }
        });
      }
    },
    filterWait(){
      if(this.filterWait){
        this.events.forEach(el => {
          if(el.groupId == 'waiting'){
            el.className.splice(el.className.indexOf('show'),1,'hide');
          }
        });
      }
      else{
        this.events.forEach(el => {
          if(el.groupId == 'waiting'){
            el.className.splice(el.className.indexOf('hide'),1,'show');
          }
        });
      }
    }
  },
  mounted(){
    this.notifyMeBefore = localStorage.radio;
    // if(localStorage.notificArr)
      // this.notificArr = localStorage.notificArr;
    // console.log(this.notificArr);
    setInterval(() => {
      let date = (new Date()).getTime();
      this.events.forEach(el => {
        if((new Date(el.start)).getTime() - date <= 60000 * this.notifyMeBefore && (new Date(el.start)).getTime() - date >= 0){
          let counter = 0;
          el.backgroundColor = 'yellow';
          let date = new Date(el.start);
          let string = `a${el.id} ${this.messageForUpcomingEvent} that starts at \` ${(date.getHours() >= 10 ? date.getHours() : "0" + date.getHours()) + ':' + (date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes())}`;
          if( this.notificArr.indexOf(string) == -1 ){
            this.notificArr.push(string);
          }
        } 
        else if( (new Date(el.start)).getTime() - date < 0 ){
          el.backgroundColor = 'gray';
        } 
        if(el.backgroundColor == 'gray'){
          // console.log('mtav')
          this.notificArr.forEach(ex => {
            // console.log(ex);
            // console.log(el.id);
            if( ex.indexOf(el.id) == 1 ){
              this.notificArr.splice(this.notificArr.indexOf(ex),1);
            }
          })
        }
        // if(el.backgroundColor == 'gray'){
        //   this.notificArr.forEach(ex => {
        //     if(el.id == ex.id){
        //       this.notificArr.splice()
        //     }
        //   })
        // }  
      })            
    },1000);

  } ,
  methods: {
    showCloud(){
      this.flagForCloudVisibility = true;
    },
    hideCloud(){
      this.flagForCloudVisibility = false;
    },
    nextnext(){
      this.$refs.fullCalendar.getApi().next();
    },
    setMonthView(){
      this.config.defaultView = 'month';
    },
    setDayView(){
      this.config.defaultView = 'day';
    },
    setWeekView(){
      this.config.defaultView = 'week';
    },
    setListView(){
      this.config.defaultView = 'list';
    },
    addEvents() {
      this.events.push({
				title: "event",
				id : ++this.count,
        start: "2019-09-19",
        duration: "01:00",
        backgroundColor: "yellow"
      });
    },
  },
  components:{
    EventCloud
  }
};
</script>

<style>
:root{
  --calendar-view-height: '100 % / 6';
  --cloud-top: 0;
  --cloud-left: 0;
  /* --cloud-display: none; */
}
.show{
  display: block;
}
.hide{
  display: none !important;
}
.fc-time{
  display: none !important;
}
.fc-event-container  .fc-title{
  font-size: 20px !important;
}
.fc-month-view > .fc-row{
  height: calc(100% / 6) !important;
}
.fc-basicWeek-view .fc-row{
  height: 100%;
}
.fc-basicDay-view .fc-row{
  height: 100%;
}
.fc-listMonth-view tbody{
  height: 100%;
}
.fc-day:hover:not(.fc-today){
  background-color: transparent !important;
}
.calendar_cont{
  width: 97% !important;
  height: auto !important;
}
</style>