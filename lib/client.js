define([], function() {

    var cx = function(arg) {
        var keep = [];

        for( var key in arg ) {
            if( arg[key] ) {
                keep.push(key);
            }
        }

        return keep.join(' ');
    };

    var init = function(panel, socket) {
        socket.on('monitors', function(monitors) {
            /*
                statuses
                0 - paused
                1 - not checked yet
                2 - up
                8 - seems down
                9 - down
            */

            //console.log(monitors);

            var html = '';

            for (var i = 0; i < monitors.length; i++) {
                var monitor = monitors[i]

                var indicatorClasses = cx({
                    'fa-circle-o': ( monitor.status == '1' ),
                    'fa-circle': ( monitor.status != '1' ),
                    'blue': ( monitor.status == '0' ),
                    'gray': ( monitor.status == '1' ),
                    'green': ( monitor.status == '2' ),
                    'yellow': ( monitor.status == '8' ),
                    'red': ( monitor.status == '9' ),
                });

                var pulseClasses = cx({
                    'pulse': ( monitor.status == '2' ),
                    'hide': ( monitor.status != '2' ),
                });

                html += '<div class="text-center monitor ma6">' + monitor.friendlyname + '<span class="fa-stack"><i class="fa fa-fw fa-stack-1x fa-circle-o ' + pulseClasses + '"></i><i class="fa fa-fw fa-stack-1x ' + indicatorClasses + '"></i></span></div>';
            }

            panel.innerHTML = html;
        });
    };

    return init;
});
