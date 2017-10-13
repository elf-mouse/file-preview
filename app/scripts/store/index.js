import Vue from 'vue';
import event from './event';
import API from '../api';

const store = {
  debug: true,
  state: {
    menu: []
  },
  setMenu(data) {
    if (this.debug) {
      console.log('setMenu', data);
    }
    this.state.menu = data;
    // For async
    event.$emit('SET_MENU', data);
  },
  async getMenu() {
    if (!this.state.menu.length) {
      let menu = await API.getMenu();
      this.setMenu(menu);
    }

    return this.state.menu;
  }
};

Vue.prototype.$store = store;
Vue.prototype.$event = event;
