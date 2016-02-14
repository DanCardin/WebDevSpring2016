(function() {
    System.config({
        packages: {
            app: {
                format: 'register',
                defaultExtension: 'js'
            }
        }
    });
    System
        .import('/app/release/bootstrap')
        .then(null, console.error.bind(console));
})();
