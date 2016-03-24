import * as bootstrap from 'bootstrap';
(function() {
    System.config({
        packages: {
            assignment: {
                format: 'register',
                defaultExtension: 'js'
            },
            rxjs: {defaultExtension: 'js'},
            'ng2-dragula': {defaultExtension: 'js'}
        },
        map: {
            rxjs: 'node_modules/rxjs',
            dragula: 'node_modules/dragula/dist/dragula.min.js',
            'ng2-dragula': 'node_modules/ng2-dragula'
        }
    });
    System
        .import('assignment/bootstrap')
        .then(null, console.error.bind(console));
})();
