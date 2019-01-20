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
        descriptor = [];
        Object.keys(object).forEach(function(key) {
            var subDescriptor = traverse(key, object[key]);
            descriptor[key] = subDescriptor;
        });
    } else if (objectType === "object") {
        descriptor = {};
        Object.keys(object).forEach(function(key) {
            var subDescriptor = traverse(key, object[key]);
            descriptor[key] = subDescriptor;
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
    this.id = id;
    this.object = object;

    this.descriptor = traverse("", object);

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.name && request.name === id) {
                if (request.type === "init") {
                    sendResponse(this.descriptor);
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
    this.id = id;

    chrome.runtime.sendMessage({name: id, type: "init"}, function(response) {
        console.log("Response: ", response);
    });

}

/*
 * vim: ts=4 et nowrap autoindent
 */