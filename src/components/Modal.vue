<template>
    <div class="event_modal_background" @click.self="closeModal">
        <div class="event_modal">
            <div class="header_container">
                <div class="hidden_element"></div>
                <div class="header">
                    <div class="for_text">Events on this day</div>  
                </div>
                <div class="close_item" @click="closeModal">
                    <div>
                        <font-awesome-icon icon="times" ></font-awesome-icon>
                    </div>
                </div>
            </div>
            <div class="body_container">
                <div v-show="filArr.length == 0" class="no_text_container">
                    <div class="no_event">
                        <div class="no_event_text">
                            There is no event to show
                            <font-awesome-icon icon="smile"></font-awesome-icon>                    
                        </div>
                    </div>
                </div>
                <div class="modal_left_block" v-show="filArr.length != 0">
                    <ul class="event_list">
                        <li v-for="(el,index) in filArr" :key="index" :style="{ backgroundColor: el.backgroundColor }" class="event_list_info_item" @click="showEventInfo(index)">
                            {{el.firstName + " " + el.lastName + " " + el.startTime }}
                        </li>
                    </ul>
                </div>
                <div class="modal_right_block" v-show="filArr.length != 0">
                    <ul class="event_info" v-show="showEvInfo">
                        <li>Event's owner ` {{selectedEvent.firstName + " " + selectedEvent.lastName}} </li>
                        <li>Phone number ` {{selectedEvent.phone}} </li>
                        <li>Event's start time` {{selectedEvent.startTime}} </li>
                        <li>Event's duration ` {{selectedEvent.duration}} </li>
                        <li>More information ` {{selectedEvent.message}} </li>
                    </ul>
                    <div v-if="selectedEvent.groupId == 'waiting' && showEvInfo" class="button_container">
                        <button class="approve_btn butn" @click="appr(selectedEvent.id)">Approve</button>
                        <button class="decline_btn butn" @click="decl(selectedEvent.id)">Decline</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        filArr:Array
    },
    data() {
        return{
           selectedEvent : {},
           showEvInfo : false
        }
    },
    watch: {
        filArr(){
            this.filArr.forEach(el => {
                let date = new Date(el.start);
                el.startTime = (date.getHours() >= 10 ? date.getHours() : "0" + date.getHours()) + ':' + (date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes());
            });
        }
    },
    methods: {
        closeModal(){
            this.$emit('closeModal');
            this.showEvInfo = false;
        },
        showEventInfo(index){
            this.selectedEvent = this.filArr[index];
            this.showEvInfo = true;
        },
        appr(id){
            this.$emit('apprEvent',id);
        },
        decl(evId){
            this.$emit('declEvent',evId);
        }
    }
}
</script>

<style lang="css">
    .event_modal_background{
        width: 100%;
        position: absolute;
        margin: 0 auto;
        /* margin-top: 200px; */
        top: 0px;
        left: 0;
        z-index: 20;
        background-color: rgba(0, 0, 0, 0.4);
        
        height: 100%;
    }    
    .event_modal{
        width: 60%;
        height: 70%;
        background-color: var(--basic-text-color);
        margin: 0 auto;
        margin-top: 100px;
        border-radius: 12px;
        color: var(--basic-background-color);
    }
    .header_container{
        width: 100%;
        height: 10%;
        display: flex;
        justify-content: space-between;
        border-bottom-style: solid;
        border-color: var(--basic-background-color);
        border-width: 1px;
    }
    .hidden_element, .close_item{
        width: 50px;
        /* background-color: red; */
    }
    .close_item{
        height: 100%;
        cursor: pointer;
    }
    .close_item>div{
        height: 100%;
        line-height: 100%;
        padding: 30%;
    }
    .header{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .body_container{
        width: 100%;
        height: 90%;
        display: flex;
        justify-content: space-between;
    }
    .no_text_container{
        height: 90%;
        width: 100%;
    }
    .no_event{
        width: 60%;

        margin: 0 auto;
        font-size: 25px;
        margin-top: 50px; 
    }
    
    .modal_left_block{
        width: 50%;
        height: 100%;
        /* background-color: red; */
        display: inline-block;
        border-right-style: solid;
        border-color: var(--basic-background-color);
        border-width: 1px;
    }
    .modal_right_block{
        width: 50%;
        height: 100%;
        /* background-color: blue; */
        display: inline-block;
        overflow-y: auto;
        overflow-x: auto;

    }
    .event_list{
        list-style-type: none;
        width: 80%;
        margin: 0 auto;
        /* display: flex; */
        justify-content: center;
    }
    .event_list>li{
        height: 30px;
        border-radius: 10px;
        width: 100%;
        margin: 10px 0px;
        line-height: 30px;
        font-size: 16px !important;
        cursor: pointer;
    }
    .event_info{
        width: 90%;
        margin: 0 auto;
        list-style-type: none;
        margin-top: 20px;
        height: auto;
    }
    .event_info > li{
        height: auto;
        margin: 10px 0px;
    }
    .butn{
        font-size: 18px !important;
        border-radius: 8px;
        padding: 5px;
        border: none;
        color: var(--basic-background-color);
    }
    .approve_btn{
        background-color: green;
    }
    .decline_btn{
        background-color: red;
    }
    .button_container{
        width: 100%;
        display:flex;
        justify-content: space-around;
    }
</style>