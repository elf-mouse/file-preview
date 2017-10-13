<template>
  <div>
    <audio controls>
      <source type="audio/mpeg" :src="file">
      Your browser doesn't support HTML5 audio tag.
    </audio>
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
    async renderAudio() {
      this.file = '/media/Canon.mp3';
    }
  },
  mounted() {
    this.renderAudio();
  }
};
</script>
