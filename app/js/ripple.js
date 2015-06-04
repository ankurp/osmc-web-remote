var $ = require('jquery');  

$('body').delegate('.ripple', 'click', function(event) {
  event.preventDefault();
  
  var $div = $('<div/>'),
      btnOffset = $(this).offset(),
      xPos = event.pageX - btnOffset.left,
      yPos = event.pageY - btnOffset.top;
    
  $div.addClass('ripple-effect');
  var $ripple = $(".ripple-effect");
  
  $ripple.css("height", $(this).height())
         .css("width", $(this).height());
  $div.css({
    top: yPos - ($ripple.height()/2),
    left: xPos - ($ripple.width()/2),
    background: $(this).data("ripple-color")
  }) .appendTo($(this));

  window.setTimeout(() => $div.remove(), 2000);
});
