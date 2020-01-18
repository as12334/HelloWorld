var heartBeatTime = null;
if (heartBeatTime) {
    clearInterval(heartBeatTime);
}
heartBeatTime = setInterval("heartbeat()", 30000);
function heartbeat() {
    $.ajax({
        type: "POST", url: "/totaldata/action.ashx", data: { __: "heartbeat", t: _t.toUpperCase() }, success: function () {

        }
    });
}