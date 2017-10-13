const PdfReader = () => import('../views/reader/pdf');
const TxtReader = () => import('../views/reader/txt');
const ImageReader = () => import('../views/reader/image');
const AudioReader = () => import('../views/reader/audio');
const VideoReader = () => import('../views/reader/video');

let readerRoutes = [{
  path: '/pdf',
  name: 'pdf',
  component: PdfReader
}, {
  path: '/txt',
  name: 'txt',
  component: TxtReader
}, {
  path: '/image',
  name: 'image',
  component: ImageReader
}, {
  path: '/audio',
  name: 'audio',
  component: AudioReader
}, {
  path: '/video',
  name: 'video',
  component: VideoReader
}];

export default readerRoutes;
