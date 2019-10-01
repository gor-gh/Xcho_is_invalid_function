<template>    
  <div class="calendar_cont"> 
    <full-calendar ref="fullCalendar" :config="config" :events="events" />
    <EventCloud v-show="flagForCloudVisibility" :flagVis="flagForCloudVisibility" :cloudOp="cloudOptions" @ShowCloud="showCloud"
    @HideCloud="hideCloud"/>
  </div>
</template>

<script>
import EventCloud from './EventCloud.vue';

export default {
  name: "hello",
  props: {
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
    cloudOptions: {
      eventCloudMessage: '',
      eventStartTime: '',
    },
    displayEventCloud:false,  
    count:0,
    // socket : io('localhost:8080'),
    winHeight : window.outerHeight,
        events: [
          {
            id: 0,
            groupId: 'waiting',
            className: ["fc-day-grid-event", "fc-h-event", "fc-event", "fc-start", "fc-end", "fc-draggable","show"],
            title: 'click to learn more',
            start: '2019-09-25T13:00',
            duration: '01:00',
            backgroundColor: '#F9AA0D',
            message: 'verevi dzax atami plomb piti drvi'
          },
          {
            id:1,
            groupId: 'accepted',
            className: ["fc-day-grid-event", "fc-h-event", "fc-event", "fc-start", "fc-end", "fc-draggable","show"],
            title: 'click to learn more',
            start: '2019-09-27T15:00',
            duration: '02:00',
            backgroundColor: '#25F90D',
            message: 'verevi dzax atami plomb piti drvi'

          },
          {
            id: 2,
            groupId: 'declined',
            className: ["fc-day-grid-event", "fc-h-event", "fc-event", "fc-start", "fc-end", "fc-draggable","show"],
            title: 'click to repair',
            start: '2019-09-29T17:00',
            duration: '01:30',
            backgroundColor: '#D40B1F',
            message: 'verevi dzax atami plomb piti drvi'

          },
          {
            id:3,
            groupId: 'accepted',
            className: ["fc-day-grid-event", "fc-h-event", "fc-event", "fc-start", "fc-end", "fc-draggable","show"],
            title: 'click to learn more',
            start: '2019-09-22T15:00',
            duration: '02:00',
            backgroundColor: '#25F90D',
            message: 'verevi dzax atami plomb piti drvi'

          },
          {
            id: 4,
            groupId: 'declined',
            className: ["fc-day-grid-event", "fc-h-event", "fc-event", "fc-start", "fc-end", "fc-draggable","show"],
            title: 'click to repair',
            start: '2019-09-30T17:00',
            duration: '01:30',
            backgroundColor: '#D40B1F',
            message: 'verevi dzax atami plomb piti drvi'

          },
          {
            id: 5,
            groupId: 'waiting',
            className: ["fc-day-grid-event", "fc-h-event", "fc-event", "fc-start", "fc-end", "fc-draggable","show"],
            title: 'click to learn more',
            start: '2019-09-20T13:00',
            duration: '01:00',
            backgroundColor: '#F9AA0D',
            message: 'verevi dzax atami plomb piti drvi'

          }
        ],
        config: {
          lacale: 'ru',
          selectable: false,
          droppable: false,
          editable:false,
          customButtons: {
            Add: {
              text: "add event",
              click: () => {
                // this.addEvents();
              }
            }
          },
          minTime: '00:00:00',
          maxTime: '23:59:59',
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
            this.cloudOptions.eventCloudMessage = event.message;
            this.cloudOptions.eventStartTime = event.start._i;
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
    config(){
      if(this.config.defaultView == 'month'){
        document.documentElement.style.setProperty('--calendar-view-height','100%');
      } 
      else{
        document.documentElement.style.setProperty('--calendar-view-height','100% / 6');
      }
    },
    viewName(){
      // console.log(this.viewName)
      // this.config.defaultView = this.viewName;
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
      // this.socket.on('initialEvents',(data) => {
      //   this.events = [...this.events,data];
      // });
      this.$nextTick(() => {
          window.addEventListener('resize',() => {
            //   console.log(this)
            //   this.winHeight = window.innerHeight - 15;
          })
          
      })
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
  width: 90% !important;
  height: auto !important;
}

</style>