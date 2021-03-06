﻿require.config({
    paths: { "text": "durandal/amd/text" }
});

define(['durandal/app', 'durandal/viewLocator', 'durandal/viewModelBinder', 'durandal/system', 'durandal/plugins/router', 'services/logger'],
    function (app, viewLocator, viewModelBinder, system, router, logger) {

    // Enable debug message to show in the console 
    system.debug(true);

    app.start().then(function () {
        toastr.options.positionClass = 'toast-bottom-right';
        toastr.options.backgroundpositionClass = 'toast-bottom-right';

        router.handleInvalidRoute = function (route, params) {
            logger.logError('No Route Found', route, 'main', true);
        };

        // When finding a viewmodel module, replace the viewmodel string 
        // with view to find it partner view.
        router.useConvention();
        viewLocator.useConvention();
        breeze.NamingConvention.camelCase.setAsDefault();
        // Adapt to touch devices
        app.adaptToDevice();
        // allow KendoUI to distinguish its bindings as data-kendo-bind w/o conflict with KO
        kendo.ns = "kendo-"; 
        viewModelBinder.beforeBind = function (obj, view) {
            kendo.bind(view, obj.viewModel || obj);
        };
        //Show the app by setting the root view model for our application.
        app.setRoot('viewmodels/shell', 'entrance');
    });
    
        
    });