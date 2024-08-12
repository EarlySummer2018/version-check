import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.log('ServiceWorker registered: ', registration);
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('Received message from service worker:', event);
        if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
          alert('新版本可用，点击确定刷新页面');
          window.location.reload();
        }
      });
    }).catch((error) => {
      console.log('ServiceWorker registration failed: ', error);
    });
  });
}
new Vue({
  render: h => h(App),
}).$mount('#app')
