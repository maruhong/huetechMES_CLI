import Vue from 'vue'
import Vuex from 'vuex'
import loginInfo from './module/loginInfo'
import empInfo from './module/empInfo'
import projectInfo from './module/projectInfo'
import materialInfo from './module/materialInfo'
import customerInfo from './module/customerInfo'
import equipmentInfo from './module/equipmentInfo'
import partInfo from './module/partInfo'
import camInfo from './module/camInfo'
import cadInfo from './module/cadInfo'
import workInfo from './module/workInfo'
import cavityInfo from './module/cavityInfo'
//import { state } from 'fs';

Vue.use(Vuex);

export default new Vuex.Store({
  modules : {
    loginInfo,
    empInfo,
    projectInfo,
    materialInfo,
    customerInfo,
    equipmentInfo,
    partInfo,
    camInfo,
    cadInfo,
    workInfo,
    cavityInfo
  }
})
