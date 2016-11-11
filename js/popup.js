document.getElementById("J_exec_action").addEventListener("click", function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {execAction: true}, function (response) {
            console.log(response);
        });
    });
});