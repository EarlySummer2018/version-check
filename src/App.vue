<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios';
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted() {
    setTimeout(() => {
      this.checkVersionUpdate();
    }, 5000);
  },
  methods: {
    checkVersionUpdate() {
      axios
        .get('/index.html')
        .then(response => {
          const currentHash = this.getCurrentVersionHash();
          const indexHTML = response.data;
          const indexHash = indexHTML.match(/index\.([\w]+)\.js/);
          console.log('11111111', currentHash, indexHash);
          if (!indexHash) return;
          const newHash = indexHTML.match(/index\.([\w]+)\.js/)[1];
          console.log('22232323', currentHash, newHash);
          if (currentHash !== newHash) {
            // 弹出版本更新提醒
            const result = window.confirm('检测到新版本可用,请刷新页面以更新.');
            if (result) {
              window.location.reload();
            }
          }
        })
        .catch(error => {
          console.error('版本检查失败:', error);
        });
    },

    getCurrentVersionHash() {
      try {
        const scriptTags = document.getElementsByTagName('script');
        for (let i = 0; i < scriptTags.length; i++) {
          const src = scriptTags[i].src;
          const match = src.match(/index\.([\w]+)\.js/);
          if (match) {
            return match[1];
          }
        }
      } catch (error) {
        console.error('获取当前版本 hash 值失败:', error);
      }
      return null;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
