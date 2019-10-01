import Vue from 'vue'
import './plugins/fontawesome'
import BootstrapVue from 'bootstrap-vue'
import VueMaterial from 'vue-material'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "fullcalendar/dist/fullcalendar.min.css"
import FullCalendar from "vue-full-calendar"
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(FullCalendar);
Vue.use(VueMaterial);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
