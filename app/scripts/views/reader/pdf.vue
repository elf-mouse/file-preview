<template>
  <div>
    <!-- <input type="file" @change="onFileChange"> -->
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

let DEFAULT_URL = '/media/ECMA-262.pdf';

pdfjsLib.PDFJS.workerSrc = '/js/pdf.worker.js?v=201710';

export default {
  data() {
    return {
      loadingTask: null,
      recordCount: 0,
      pageSize: 1,
      page: 1,
      pdfData: null
    };
  },
  methods: {
    async getPDFData() {
      let response = await this.$http.get(DEFAULT_URL, {
        responseType: 'arraybuffer'
      });
      this.pdfData = response.data;
    },
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
    },
    // onFileChange(e) {
    //   let fr = new FileReader();
    //   fr.onload = () => {
    //     this.loadingTask = pdfjsLib.getDocument({
    //       data: fr.result
    //     });
    //     this.loadingTask.then(pdfDocument => {
    //       this.recordCount = pdfDocument.numPages;
    //     });
    //     this.renderPDF();
    //   };
    //   fr.readAsArrayBuffer(e.target.files[0]);
    // }
  },
  async mounted() {
    await this.getPDFData();
    // Asynchronous download of PDF
    this.loadingTask = pdfjsLib.getDocument({
      data: this.pdfData
    });
    this.loadingTask.then(pdfDocument => {
      this.recordCount = pdfDocument.numPages;
    });
    this.renderPDF();
  }
};
</script>
