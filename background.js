/*
 * Background Script
 */
(function() {

    var someObject = {
        numericValue: 1000, 
        stringValue: "Testing 1 2 3", 
        booleanValue: true, 
        mixedArray: [
            "String 1", 
            "String 2", 
            42
        ], 
        testFunction: function() {
            console.log("testFunction call");
        }, 
        utils: {
            a: function() {
                console.log("utils.a call");
            }, 
            b: function() {
                console.log("utils.b call");
            }
        }
    };

    console.log("Background Startup");

    var someObjectServer = new ExtensionRpcServer("someObject", someObject);

})();
 /*
  * vim: ts=4 et nowrap autoindent
  */