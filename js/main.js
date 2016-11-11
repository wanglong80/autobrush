var manifest = {
    "inject_scripts": [{
        "js": [
            "js/pure-inject-client.js",
            "js/jquery.min.js",
            "js/jquery-xpath.min.js",
            "js/inject_script.js"
        ],
        "css": ["css/inject.css"]
    }],
    "permissions": [
        "storage"
    ],
    "storage": {
        "items": ["roles"]
    }
};

new PureInject(manifest);