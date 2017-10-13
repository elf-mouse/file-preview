<template>
  <div>
    <video controls>
      <source type="video/mp4" :src="file">
      Your browser doesn't support HTML5 video tag.
    </video>
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
    async renderVideo() {
      this.file = '/media/big_buck_bunny.mp4';
    }
  },
  mounted() {
    this.renderVideo();
  }
};
</script>
