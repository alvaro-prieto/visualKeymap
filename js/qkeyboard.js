window.$ = window.jQuery = require('./libs/jquery-3.3.1.min.js');



/*===============================================================================
			CÓDIGO JQUERY
===============================================================================*/

var eventosTransparentes = function(){
  var t
  var setIgnoreMouseEvents = require('electron').remote.getCurrentWindow().setIgnoreMouseEvents
  window.addEventListener('mousemove', event => {
    if (event.target === document.documentElement) {
      setIgnoreMouseEvents(true, {forward: true})
      if (t) clearTimeout(t)
      t = setTimeout(function () {
        setIgnoreMouseEvents(false)
      }, 150)
    } else setIgnoreMouseEvents(false)
  })

};


$(function(){
  console.log("jQuery init");
  eventosTransparentes();
  $(".cerrar").on("click", function(){
    const remote = require('electron').remote
    let w = remote.getCurrentWindow()
    w.close();
  });

});