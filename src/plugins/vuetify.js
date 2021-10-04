//import 'material-design-icons-iconfont/dist/material-design-icons.css' 
import Vue from 'vue'
import Vuetify,
{
    VLayout
}
from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css'
//import 'vuetify/src/stylus/app.styl'


Vue.use(Vuetify)

export default new Vuetify(
{ 
    components:{
        VLayout
    },
    iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'  
}) 
