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
        .import('cafe/bootstrap')
        .then(null, console.error.bind(console));
})();
