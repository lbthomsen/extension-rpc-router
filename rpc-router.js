/*
 * Extension RPC Router
 */

/**
 * Recursively traverses object and build a descriptor
 * @param {*} name 
 * @param {*} object 
 */
function traverse(name, object) { 
    var objectType = typeof object;
    console.log((name || "Root") + " object type: ", objectType);

    var descriptor;

    if (objectType === "object" && Array.isArray(object)) {
        descriptor = {type: "array", value: []};
        Object.keys(object).forEach(function(key) {
            var subDescriptor = traverse(key, object[key]);
            descriptor.value[key] = subDescriptor;
        });
    } else if (objectType === "object") {
        descriptor = {type: "object", value: {}};
        Object.keys(object).forEach(function(key) {
            var subDescriptor = traverse(key, object[key]);
            descriptor.value[key] = subDescriptor;
        });
    } else {
        descriptor = {
            type: objectType, 
            value: object
        };
    }

    console.log((name || "Root") + " returning: ", descriptor);

    return descriptor;

}

function ExtensionRpcServer(id, object) {
    var that = this;
    that.id = id;
    that.object = object;

    that.descriptor = traverse("", object);

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            console.log("Got message: ", request);
            if (request.name && request.name === that.id) {
                if (request.type === "init") {
                    sendResponse(that.descriptor);
                } else {
                    console.log("Ignoring message of type ", request.type);
                }
            } else {
                console.log("Ignoring message from ", sender);
            }
        }
    );

}

function ExtensionRpcClient(id) {

    var that = this;
    that.id = id;

    chrome.runtime.sendMessage({name: that.id, type: "init"}, function(response) {
        console.log("Got response ", response);
        that.descriptor = response.value;
        Object.keys(that.descriptor).forEach(function(key) {
            console.log(key + " is of type " + that.descriptor[key].type);
        });
    });

}

/*
 * vim: ts=4 et nowrap autoindent
 */