(function() {
    System.config({
        packages: {
            cafe: {
                format: 'register',
                defaultExtension: 'js'
            }
        }
    });
    System
        .import('cafe/bootstrap')
        .then(null, console.error.bind(console));
})();
