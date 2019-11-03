<template>    
  <div class="calendar_cont"> 
    <full-calendar ref="fullCalendar" :config="config" :events="events" />
    <transition name="bounce">
      <EventCloud 
        v-show="flagForCloudVisibility" 
        @ShowCloud="showCloud"
        @HideCloud="hideCloud"
        :flagVis="flagForCloudVisibility" 
        :cloudOp="cloudOptions"
      /> 
    </transition>
  </div>
</template>

<script>
import EventCloud from './EventCloud.vue';
// import axios from 'axios';

export default {
  name: "hello",
  props: {
    apprEvId:Number,
    decEvId:Number,
    mySize:Number,
    calendarHeight:String,
    viewName: String,
    filterAcc:Boolean,
    filterDic:Boolean,
    filterWait:Boolean,
    filterPast:Boolean
  },
  data() {
    return {
    day: new Date(),
    months:[
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],      
    // calendarPlugins:[dayGridPlugin,timeGridPlugin,listPlugin],
    flagForCloudVisibility: false,
    isCloudOver:false,
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
            start: '2019-11-04T13:00',
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
            start: '2019-11-05T15:00',
            duration: '02:00',
            backgroundColor: '#25F90D',
            firstName: 'Gor',
            lastName: 'Gharagyozyan',
            message: 'verevi dzax atami plomb piti drvi'
          },
          {
            id: 2,
            groupId: 'accepted',
            className: ["fc-day-grid-event", "fc-h-event", "fc-event", "fc-start", "fc-end", "fc-draggable","show"],
            start: '2019-11-09T15:30',
            duration: '01:30',
            backgroundColor: '#25F90D',
            firstName: 'Karen',
            lastName: 'Makaryan',
            message: 'verevi dzax atami plomb piti drvi'
          },
          {
            id:3,
            groupId: 'declined',
            className: ["fc-day-grid-event", "fc-h-event", "fc-event", "fc-start", "fc-end", "fc-draggable","show"],
            start: '2019-11-03T03:01',
            duration: '02:00',
            backgroundColor: '#D40B1F',
            firstName: 'Khachatur',
            lastName: 'Ghukasyan',
            message: 'verevi dzax atami plomb piti drvi'
          },
          {
            id: 4,
            groupId: 'declined',
            className: ["fc-day-grid-event", "fc-h-event", "fc-event", "fc-start", "fc-end", "fc-draggable","show"],
            start: '2019-11-04T18:55',
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
            start: '2019-11-07T16:30',
            duration: '01:00',
            backgroundColor: '#F9AA0D',
            firstName: 'Gor',
            lastName: 'Gharagyozyan',
            message: 'verevi dzax atami plomb piti drvi'
          }

        ],
        config: {
          dayClick: function(date,jsEvent,view){
            alert('clicked on' + date.getDate());
          },
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
            setTimeout(() => {
              if( !this.isCloudOver )
                this.flagForCloudVisibility = false;
            }, 2);
          }
        }
    };
  },
  watch:{
    apprEvId(){
      // console.log(this.apprEvId);
      this.events.forEach(el => {
        if( el.id == this.apprEvId ){
          console.log('alb')
          el.groupId = 'accepted';
          el.backgroundColor = '#25F90D';
          this.notificArr.forEach(ex => {
            if( ex.indexOf(this.apprEvId) == 1 ){
              console.log('mi ban')
              this.notificArr.splice(this.notificArr.indexOf(ex),1);
            } 
          })
        }
      })
    },
    decEvId(){
      this.events.forEach(el => {
        if( el.id == this.decEvId ){
          console.log('alb')
          el.groupId = 'declined';
          el.backgroundColor = '#D40B1F';
          this.notificArr.forEach(ex => {
            if( ex.indexOf(this.decEvId) == 1 ){
              // console.log('mi ban')
              this.notificArr.splice(this.notificArr.indexOf(ex),1);
            } 
          })
        }
      })
    },
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
      console.log(this.filterWait)
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
    },
    filterPast(){
      if(this.filterPast){
        this.events.forEach(el => {
          if(el.groupId == 'past'){
            el.className.splice(el.className.indexOf('show'),1,'hide');
          }
        });
      }
      else{
        this.events.forEach(el => {
          if(el.groupId == 'past'){
            el.className.splice(el.className.indexOf('hide'),1,'show');
          }
        })
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
        if((new Date(el.start)).getTime() - date <= 60000 * this.notifyMeBefore && (new Date(el.start)).getTime() - date >= 0 && el.groupId == "accepted"){
          let counter = 0;
          el.backgroundColor = 'yellow';
          let date = new Date(el.start);
          let string = `a${el.id} ${this.messageForUpcomingEvent} that starts at \` ${(date.getHours() >= 10 ? date.getHours() : "0" + date.getHours()) + ':' + (date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes())}`;
          if( this.notificArr.indexOf(string) == -1 ){
            console.log('mtav');
            this.notificArr.push(string);
          }
        } 
        else if( (new Date(el.start)).getTime() - date < 0 ){
          el.backgroundColor = 'gray';
          el.groupId = 'past';
          if(this.filterPast){
            this.events.forEach(el => {
              if(el.groupId == 'past'){
                el.className.splice(el.className.indexOf('show'),1,'hide');
              }
            });
          }
          else{
            this.events.forEach(el => {
              if(el.groupId == 'past'){
                el.className.splice(el.className.indexOf('hide'),1,'show');
              }
            })
          }
        } 
        if(el.backgroundColor == 'gray'){
          this.notificArr.forEach(ex => {
            if( ex.indexOf(el.id) == 1 ){
              this.notificArr.splice(this.notificArr.indexOf(ex),1);
            }
          })
        }
      })            
    },1000);
    this.events.forEach(el => {
      if(el.groupId == 'waiting'){
        let date = new Date(el.start);
        let string = `b${el.id} ${el.firstName + ' ' + el.lastName} wants to register a meeting at \` ${date.getDate()} ${this.months[date.getMonth()]}, 
                      ${(date.getHours() >= 10 ? date.getHours() : "0" + date.getHours()) + ':' + (date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes())} `;
        this.notificArr.push(string)
      }
    })

  } ,
  methods: {
    showCloud(){
      if(!this.flagForCloudVisibility){
        this.flagForCloudVisibility = true;
      }
      this.isCloudOver = true;
    },
    hideCloud(){
      if(this.flagForCloudVisibility)
        this.flagForCloudVisibility = false;
      this.isCloudOver = false;
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
.fc-event{
  /* width: 10px !important;
  height: 10px !important;
  border-radius: 100% !important; */
  /* margin-top: -10px !important; */
}
.fc-event-container{
  /* display:inline-flex; */
}
.fc-time{
  display: none !important;
}
.fc-event-container  .fc-title{
  font-size: 20px !important;
}
.fc-month-view > .fc-row{
  height: calc(100% / 6) !important;
  max-height: calc(100% / 6) !important;
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
.fc-left .fc-next-button,.fc-left .fc-prev-button{
  background-color: var(--basic-text-color) !important;
  border-color: var(--basic-check-col) !important; 
  color: var(--basic-check-col) !important;
  background-image: none !important;
}
.fc-right .fc-today-button{
  background-color: var(--basic-text-color) !important;
  color: var(--basic-check-col) !important;
  background-image: none !important;
  border-color: var(--basic-check-col) !important;
}
/*animation */



.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0) translateX(-350px) translateY(200px);
    /* opacity:0; */
  }
  100% {
  
    transform: scale(1) translateX(0px) translateY(0px) ;
    /* opacity: 1; */
    /* asdas */
  }
}
</style>
