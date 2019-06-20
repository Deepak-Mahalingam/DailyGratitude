try{
    var cacheName = 'sw_v1';
    var cacheFiles = [
      '/',
      'index.html',
      'index.css',
      'main.js'
    ]
    
    self.addEventListener('install', event => {
      caches.open(cacheName)
        .then(function (cache) {
          console.log(cacheFiles);
          return cache.addAll(cacheFiles);
        })
        .catch((e)=>console.log(e));
      console.log('Installing service worker')
    })
    
    self.addEventListener('fetch', function (e) {
      e.respondWith(
        caches.match(e.request).then(function (r) {
          return r || fetch(e.request).then(function (response) {
            return caches.open(cacheName).then(function (cache) {
              cache.put(e.request, response.clone());
              return response;
            }).catch((e)=>console.log(e));
          }).catch((e)=>console.log(e));
        }).catch((e)=>console.log(e))
      );
    });
    
    
    self.addEventListener('activate', event => {
      console.log('Activating the service worker');
    });
    }
    catch(e){
      console.log(e.stack);
    }