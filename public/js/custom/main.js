let downIcn    = document.getElementById('link-down');
let headline   = document.getElementById('headline');
let content    = document.getElementById('content');
let mainImg    = document.getElementById('developer-image');
let blurImg    = document.getElementById('blur-dev-img');
let stickyWrap = document.getElementById('sticky-wrapper');

const COMMAND = 91;
const ENTER = 13;

var resetOffset = function(wrap) {
  wrap.style.top = "0px";
}

window.setTimeout(function() {
  className = downIcn.className
  downIcn.className = className.concat(' bounce')
}, 1000);

window.onscroll = function(e) {
  className = downIcn.className
  if (className.indexOf("bounceOut") < 0) {
    downIcn.className = className.concat(' bounceOut')
  }

  if (window.pageYOffset > 720) {
    var offset = window.pageYOffset - 720
    stickyWrap.style.top = (-offset).toString().concat('px')
  } else if (window.pageYOffset > 200) {
    resetOffset(stickyWrap);
    headline.className = "inner";
    content.className = "inner active next-step-box";
    mainImg.className = "hero-bg developer-image";
    blurImg.className = "hero-bg blur-dev-img active";
  } else {
    resetOffset(stickyWrap);
    stickyWrap.style.top = "0px";
    headline.className = "inner active";
    content.className = "inner";
    mainImg.className = "hero-bg developer-image active";
    blurImg.className = "hero-bg blur-dev-img";
  }
};

var hotKeySubmit = { 91: false, 13: false };

let textField = function(e) {
  return e.target.type == 'text';
}

let textArea = function(e) {
  return e.target.type == 'textarea';
}

let enterClickedInTextArea = function(e) {
  return (e.keyCode == 13) && textArea(e)
}

let enterAndCommandKeys =  function() {
  return hotKeySubmit[COMMAND] && hotKeySubmit[ENTER]
}

let submitFormWithHotKeys = function(e) {
  // detect command & enter;
  if (e.keyCode in hotKeySubmit) {
    hotKeySubmit[e.keyCode] = true;

    if (enterAndCommandKeys()) {
      hotKeySubmit[COMMAND] = false;
      hotKeySubmit[ENTER] = false;
      clipSubmit(e);
    }

    setTimeout(function() {
      hotKeySubmit[COMMAND] = false;
      hotKeySubmit[ENTER] = false;
    }, 1200);

    return true
  };
  return false
};

let typingInErroringField = function(e) {
  if ($(e.target).hasClass('issue')) {
    $(e.target).removeClass('issue');
    $(e.target).tooltip('dispose');
  }
};

let enterInTextArea = function(e) {
  if (enterClickedInTextArea(e)) {
    e.preventDefault();
    e.target.value = e.target.value + "\n";
  }
};

function detectHotKeys(e) {

  if (submitFormWithHotKeys(e)) { return true };

  typingInErroringField(e);
  enterInTextArea(e);
};

document.addEventListener('keydown', detectHotKeys);

$('form').submit(function(e) {
  clipSubmit(e);
})

var clipSubmit = function(e) {
  e.preventDefault();

  $('#issue-box').addClass('hidden');
  $('#thank-you').addClass('hidden');

  var formData = $('form').serialize();
  $.ajax({
    url: '/api/contacts',
    type: 'POST',
    data: formData
  }).done(function() {
    $('#thank-you').removeClass('hidden');
  }).fail(function(response, textStatus, errorThrown) {

    if (response.status >= 500) { $('#error-box').removeClass('hidden'); };

    $('#issue-box').removeClass('hidden');
    var json = response.responseJSON;
    for (i in json.errors) {
      var error = json.errors[i];
      $('.' + i).addClass('issue');
      $('.' + i).attr('title', error);
      $('.' + i).tooltip('show');
    }
  })
};

let osSetup = function() {
  if (navigator.userAgent.includes('Mac')) {
    let value = "Let's partner up (\u2318 + enter);"
    document.getElementById('submit').value = value;
  }
};
osSetup();