<template>
  <div>
    <canvas id="preview"></canvas>
    <ui-pagination
      :recordCount="recordCount"
      :pageSize="pageSize"
      :page="page"
      showJumper
      @change="onPage">
    </ui-pagination>
  </div>
</template>

<script>
import pdfjsLib from 'pdfjs-dist';

pdfjsLib.PDFJS.workerSrc = '/js/pdf.worker.js?v=201710';

let DEFAULT_URL = '/media/ECMA-262.pdf';

export default {
  data() {
    return {
      loadingTask: null,
      recordCount: 0,
      pageSize: 1,
      page: 1
    };
  },
  methods: {
    renderPDF() {
      this.loadingTask.promise.then(pdfDocument => {
        // Request a first page
        return pdfDocument.getPage(this.page).then(pdfPage => {
          // Display page on the existing canvas with 100% scale.
          let viewport = pdfPage.getViewport(1.0);
          let canvas = document.getElementById('preview');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          let ctx = canvas.getContext('2d');
          let renderTask = pdfPage.render({
            canvasContext: ctx,
            viewport: viewport
          });
          return renderTask.promise;
        });
      }).catch(function (reason) {
        console.error('Error: ' + reason);
      });
    },
    onPage(page) {
      this.page = page;
      this.renderPDF();
    }
  },
  async mounted() {
    this.loadingTask = pdfjsLib.getDocument(DEFAULT_URL);
    this.loadingTask.then(pdfDocument => {
      this.recordCount = pdfDocument.numPages;
    });
    this.renderPDF();
  }
};
</script>
