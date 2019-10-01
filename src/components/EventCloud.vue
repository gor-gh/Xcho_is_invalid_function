<template>
    <div class="cloud_cont" @mouseover="showCloud" @mouseout="hideCloud">
        <div class="event_cloud" >
            <ul id="cloud_messages">
                <li v-for="(el,index) in cloudOp" :key="index" class="cloud_message_items"> {{el}} </li>
            </ul>
        </div>
    </div> 
</template>
<script>
    export default {
        props:{
            cloudOp:Object,
            flagVis:Boolean
        },
        methods:{
            showCloud(){
                this.$emit('ShowCloud');
            },
            hideCloud(){
                this.$emit('HideCloud');
            }
        }
    }
</script>

<style >
.event_cloud{
  position: relative;
  width: 350px;
  height: 200px;
  border-radius: 15px;  
  background-color: #C1B9BA;
}
#cloud_messages{
  list-style-type: none;
}
.cloud_message_items{
  padding-top: 10px !important;
}
.cloud_cont{
  width: 350px;
  height: 200px;
  position: absolute;
  top: var(--cloud-top);
  left: var(--cloud-left);
  z-index: 5;
}
</style>