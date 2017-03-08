<template>
  <div class="videos">
    <div id="app">
      <div class="container">
        <my-video :sources="video.sources" :options="video.options"></my-video>
      </div>
    </div>
  </div>
</template>

<script>
  import myVideo from 'vue-video';
  export default {
    data () {
      return {
        video: {
          sources: [{
            src: 'http://v.cctv.com/flash/mp4video6/TMS/2011/01/05/cf752b1c12ce452b3040cab2f90bc265_h264818000nero_aac32-1.mp4',
            type: 'video/mp4'
          }],
          options: {
            autoplay: false,
            volume: 0.6,
            poster: 'http://covteam.u.qiniudn.com/poster.png'
          }
        }
      };
    },
    components: {
      myVideo
    }
  };
</script>

<style>
.videos{
  position: absolute;
  top:0;
  left:0;
  height:7.5rem;
}
  #app{
    height:7.5rem;
  }
  .container{
    height:7.5rem;
  }
.__cov-video-container {
  position: relative;
  width: 100%;
  background-color: #000;
  height: 100%;
}
.__cov-contrl-play-btn-icon {
  position: absolute;
  height: 0.5rem;
  width: 0.5rem;
  top: 50%;
  left: 50%;
  margin-top: -.2rem;
}
.__cov-contrl-vol-slider {
  position: relative;
  display: inline-block;
  width: 2rem;
  height: 2rem !important;
  overflow: hidden;
  -webkit-transition: all .2s ease-in;
  transition: all .2s ease-in;
}
</style>
