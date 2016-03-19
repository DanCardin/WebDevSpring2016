(function() {
    System.config({
        packages: {
            assignment: {
                format: 'register',
                defaultExtension: 'js'
            },
            rxjs: {defaultExtension: 'js'}
        },
        map: {
            'rxjs': 'node_modules/rxjs'
        }
    });
    System
        .import('assignment/bootstrap')
        .then(null, console.error.bind(console));
})();
