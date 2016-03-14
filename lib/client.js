define([], function() {

    var init = function(panel, socket) {
        socket.on('event', function(tweet) {
            // render
        });
    };

    return init;
});
