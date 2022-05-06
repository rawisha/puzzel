self.addEventListener('fetch', evt => {
    console.log("service worker has been installed", evt);
})