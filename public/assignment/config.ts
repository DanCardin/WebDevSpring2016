(function() {
    System.config({
        packages: {
            assignment: {
                format: 'register',
                defaultExtension: 'js'
            }
        }
    });
    System
        .import('assignment/bootstrap')
        .then(null, console.error.bind(console));
})();
