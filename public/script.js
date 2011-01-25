$(document).ready(function () {
  var ws = new WebSocket('ws://' + document.location.host );

  //ws.onopen = function () {};

  ws.onmessage = function(msg) {
    var m = JSON.parse(msg.data);

    var s = null;
    switch(m.type) {
      case 'join':
        s = m.nick + ' joined';
        break;

      case 'message':
        s =  '<strong>' + m.nick + '</strong>: ' + m.message
        break;
    };

    $('#buffer').append('<p>' + s + '</p>');
  };

  //ws.onclose = function () { };
  //ws.onerror = function () { };

  $('#message').change(function () {
    var nick = $('#nick').val();
    var m = JSON.stringify({type: 'message', nick: nick, message: $(this).val() });
    ws.send(m);
    $(this).val("");
  });

  $('#message').focus();

});
