<template>
    <table id='all_cont'>
        <thead>
            <h1><span class="header">Settings</span></h1>    
        </thead>
        <tbody>
            <tr class="settings_menu">
                <td>Dark Mode is <strong><b>{{ boolean ? 'on' : 'off' }}</b></strong></td>
                <td>
                    <div id="dark_mode">
                        <md-switch v-model="boolean" class="md-primary"> </md-switch>
                    </div>
                </td>
            </tr>
            <tr class="settings_menu">
                <td><span id="filter_text">Show Events:</span></td>
                <td>
                    <span id="filter">
                        <md-checkbox v-model="showAccepted" checked >Accepted</md-checkbox>
                        <md-checkbox v-model="showDeclined" checked >Declined</md-checkbox>
                        <md-checkbox v-model="showWaiting" checked >Waiting</md-checkbox>
                    </span>
                </td>
            </tr>
            <tr class="settings_menu">
                <td>Notify Me Before:</td>
                <td>
                    <md-radio v-model="radio" value="quarter" name='quarter'>15 min</md-radio>
                    <md-radio v-model="radio" value="half" name='half'>30 min</md-radio>
                    <md-radio v-model="radio" value="hour" name='hour'>1 hour</md-radio>    
                </td>
            </tr>
            <tr>
                <td>Download History as PDF</td>
                <td>
                    <md-button href="../../public/img/apple.png" class="download_button" download>Download</md-button>
                </td>
            </tr>
        </tbody>
        
    </table>
</template>


<script>
export default {
    data(){
        return{
            radio:'quarter',
            boolean: false,
            showAccepted:true,
            showDeclined:true,
            showWaiting:true
        }
    },
    watch: {
        boolean(){
            if(this.boolean){
                document.documentElement.style.setProperty('--basic-text-color','#C1B9BA');
                document.documentElement.style.setProperty('--basic-background-color','#212121');
                document.documentElement.style.setProperty('--basic-check-col','#212121')
            }
            else{
                document.documentElement.style.setProperty('--basic-text-color','#212529');
                document.documentElement.style.setProperty('--basic-background-color','#ffffff');
                document.documentElement.style.setProperty('--basic-check-col','#C1B9BA');
            }
        },
        showAccepted(){
            if(!this.showAccepted){
                this.$emit('filterAccepted')
            }
            else{
                this.$emit('showAccepted')
            }
        },
        showDeclined(){
            if(!this.showDeclined){
                this.$emit('filterDeclined')
            }
            else{
                this.$emit('showDeclined')
            }
        },
        showWaiting(){
            if(!this.showWaiting){
                this.$emit('filterWaiting')
            }
            else{
                this.$emit('showWaiting')
            }
        }
    }
}
</script>

<style >
:root{
    --basic-text-color: #212529;
    --basic-background-color: #ffffff;
    --basic-check-col: #C1B9BA;
}
    body{
        background-color: var(--basic-background-color) !important;
        color: var(--basic-text-color) !important;
    }
    #all_cont{
        /* background-color: blue; */
        color:var(--basic-text-color);
        width:84%;
        height: 100vh; 
        margin: 0 auto;
        margin-top: 20px;
    }
    #dark_mode{
        /* border-bottom-style: solid;
        border-width: 0.3px;
        border-color: var(--basic-text-color); */
    }
    .md-switch-thumb{
        /* display:flex; */
        background-color: var(--basic-text-color) !important;
    }
    .md-switch-container{
        background-color: #C1B9BA !important;
    }
    .header{
        font-size: 40px !important;
        /* width: 100% !important; */
        /* border-bottom-style: solid;
        border-width: 2px;
        border-color: var(--basic-text-color); */
    }
    #filters{
        margin-top: 10px;
        /* border-bottom-style: solid; */
        /* border-width: 1px; */
        /* border-color: var(--basic-text-color); */
        display: flex;
        justify-content: space-around;
    }
    #filter_text{
        width: 20%;
        line-height: 100%;
    }
    #filter{
        width: 80%;
    }
    .md-checkbox-container{
        background-color: var(--basic-text-color) !important;
        border:1px solid var(--basic-text-color) !important;
    }
    .settings_menu>td:first-child{
        width: 20% !important  ;
    }
    .settings_menu{
        border-bottom-style: solid;
        border-width: 1px;
        border-color: var(--basic-text-color);
    }
    .md-radio-container{
        background-color:var(--basic-text-color);
    }
    .md-radio-container{
        border:1px solid var(--basic-check-col) !important;
    }
    .md-radio-container:after{
        background-color: var(--basic-check-col) !important;
    }
    .md-checkbox-container> .md-ripple{
        /* border-color: var(--basic-check-col); */
    }
    .download_button{
        background-color: var(--basic-text-color) !important;
        color: var(--basic-check-col) !important;
        width: 20% !important;
    }
    .md-button{
        width: 20% !important;
    }
    
</style> 