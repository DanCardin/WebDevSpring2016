(function() {
    System.config({
        packages: {
            cafe: {
                format: 'register',
                defaultExtension: 'js'
            }
        },
        map: {
            moment: 'node_modules/moment/moment.js'
        }
    });
    System
        .import('cafe/bootstrap')
        .then(null, console.error.bind(console));
})();
