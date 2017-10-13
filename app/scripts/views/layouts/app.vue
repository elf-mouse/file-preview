<template>
  <div class="container">
    <div class="content">
      <my-menu :items="items"></my-menu>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MyMenu from '../components/menu';

export default {
  name: 'app',
  components: {
    MyMenu
  },
  data() {
    return {
      items: []
    };
  },
  async created() {
    this.items = await this.$store.getMenu();
  }
};
</script>
