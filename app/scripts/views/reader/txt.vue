<template>
  <div>
    <pre>{{ content }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: ''
    };
  },
  methods: {
    async renderTxt() {
      let response = await this.$http.get('/media/test.txt');
      this.content = response.data;
    }
  },
  mounted() {
    this.renderTxt();
  }
};
</script>
