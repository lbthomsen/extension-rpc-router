/*
 * Content Script
 */
(function() {

    console.log("Content Startup");

    var someObjectClient = new ExtensionRpcClient("someObject");

    console.log("someObjectClient = %o", someObjectClient);

})();
 /*
  * vim: ts=4 et nowrap autoindent
  */