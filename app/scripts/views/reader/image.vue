<template>
  <div>
    <img :src="file" alt="">
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: ''
    };
  },
  methods: {
    async renderImage() {
      this.file = '/media/cr-20win-cp.jpg';
    }
  },
  mounted() {
    this.renderImage();
  }
};
</script>
