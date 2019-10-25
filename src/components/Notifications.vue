<template>
    <div id="notification">
        <h1 class="header_text">Notifications</h1>
        <ul class="notif_list">
            <li v-for="(notif,index) in notifications" :key="index">
                {{notif.slice(2)}} 
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        notifications:Array
    },
    data(){
        return{
            
        }
    }
}
</script>
<style>
#notification{
    width: 97%;
    color: var(--basic-text-color)!important;
}
.header_text{
    text-align: center;
    font-size: 40px !important;
}
.notif_list{
    list-style-type: none;
}
</style>