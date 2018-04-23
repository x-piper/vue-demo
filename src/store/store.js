import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    token: null,
    top_active_main: 'user', //主页面顶部导航激活
    time_type_bht: '',
    time_label_bht: '',
    time_value_bht: '',
  },
  mutations: {
    login(state, data) {
      var data = JSON.stringify(data);
      window.localStorage.setItem("token", data);
    },
    logout(state, data) {
      window.localStorage.clear();
      state.user = {};
      state.token = null;
      state.top_active_main = 'user';
    },
    top_active_main(state, data) {
      state.top_active_main = data;
    },
    time_value_bht(state, data) {
      state.time_value_bht = data;
    },
    time_label_bht(state, data) {
      state.time_label_bht = data;
    },
    time_type_bht(state, data) {
      state.time_type_bht = data;
    },
  }
});