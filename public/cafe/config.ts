/// <reference path="typings/main.d.ts"/>

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
        .import('cafe/out/bootstrap')
        .then(null, console.error.bind(console));
})();
