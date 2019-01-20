/*
 * Background Script
 */
(function() {

    var someObject = {
        numericValue: 1000, 
        stringValue: "Testing 1 2 3", 
        booleanValue: true, 
        testFunction: function() {
            console.log("testFunction call");
        }
    };

    console.log("Background Startup");

    var someObjectServer = new ExtensionRpcServer("someObject", someObject);

})();
 /*
  * vim: ts=4 et nowrap autoindent
  */