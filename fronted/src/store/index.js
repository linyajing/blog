import Vue from 'vue';
import Vuex from "vuex";
import {actions} from "./action";
Vue.use(Vuex);
const state = {
	userInfo:{
		id:'',
		username:'',
		isAdmin:false
	}
}

const mutations = {
	SETUSERINFO(state,data) {
		console.log('vuex',data)
		state.userInfo = data;
	},
}
const getters = {
	userInfo:state => {return state.userInfo}
}


export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
});


/*使用
import { mapGetters } from 'vuex'
export default {
  	computed: {
    // 使用对象扩展操作符把 getter 混入到 computed 中
    ...mapGetters([
      'uerInfo',
    ])
  }
}

import { mapActions } from 'vuex'
export default {
    ...mapActions([
      add: 'increment' // map this.add() to this.$store.dispatch('increment')
    ])
  }
}
*/