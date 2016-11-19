var animationLength, l, layout, mainContent;

l = function(data) {
  return console.log(data);
};

animationLength = 200;

mainContent = $('#main-content');

var targetAmount = 10000;
var $ticker = $('#ticker');

jQuery(document).ready(function($) {

  // TICKER

  $ticker.css('width', '0%');

  $.get('https://payment.novaramedia.com/api/total', null, function(data, textStatus) {


    if (textStatus === 'success') {

      var percent = parseFloat(data) / targetAmount;

      if (percent > 1) {
        percent = 1;
      }

      $('#ticker-container').slideDown(900, function() {
        $ticker.css('width', (percent * 100) + '%');
      });

    }


  }, 'json');

  // IS LIVE

  $.getScript("http://tools.novaramedia.com/tool/novara_live/schedule.min.js", function() {
    if (isLive()) {
      $("#livenow").css({
        height: 20,
        paddingTop: 8,
        paddingBottom: 8
      });
    }
    setInterval((function() {
      if (isLive()) {
        $("#livenow").css({
          height: 20,
          paddingTop: 8,
          paddingBottom: 8
        });
      }
    }), 15000);
  });

  layout();
  $(window).resize(function() {
    return layout();
  });

  $('.js-toggle-drawer').click(function() {
    return $('#drawer-main').slideToggle(animationLength);
  });

  $('.js-toggle-tags').click(function() {
    return $('#drawer-tags').slideToggle(animationLength);
  });

  $('.masonry').each(function() {
    var t = $(this);
    return $(this).imagesLoaded(function() {
      return t.masonry();
    });
  });

  // FORMS

  $('.support-form-slider').on('input', function() {
    var target = $(this).parent().siblings('.support-form-value-holder').children('.support-form-value');
    target.html(this.value);
  });


});

layout = function() {
  var footerHeight, headerHeight, windowHeight;
  windowHeight = $(window).height();
  headerHeight = $('#header').outerHeight(true);
  footerHeight = $('#footer').outerHeight(true);
  return mainContent.css({
    'min-height': (windowHeight - headerHeight - footerHeight) + 'px'
  });

};