System.register(['angular2/platform/browser', 'angular2/core', 'angular2/common', 'angular2/router', './components/app/AppComponent'], function(exports_1) {
    var browser_1, core_1, common_1, router_1, AppComponent_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (AppComponent_1_1) {
                AppComponent_1 = AppComponent_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(AppComponent_1.AppComponent, [
                router_1.ROUTER_PROVIDERS,
                common_1.CORE_DIRECTIVES,
                core_1.provide(router_1.LocationStrategy, { useClass: router_1.PathLocationStrategy })
            ]);
        }
    }
});
//# sourceMappingURL=bootstrap.js.map