$(function () {
  chat.init();
  $.notify.defaults({
    autoHide: false,
    showAnimation: 'fadeIn',
    hideAnimation: 'fadeOut'
  });
  $.notify.addStyle('sco',{
    html: "<div><div class=\"content\">\n"+
          "<h1 data-notify-text=\"title\"></h1>"+
          "<p data-notify-text=\"message\"></p>"+
          "</div></div>",
  })
});

const chat = {
  state: false,
  init: function () {
    this.cacheDom();
    if(this.chatWrap.length) this.createEvents();
  },
  cacheDom: function () {
    this.chatBt = $('.js-chat-toggle');
    this.chatWrap = $('.chat');
  },
  createEvents: function () {
    const root = this;
    this.chatBt.on('click', function (e) {
      e.preventDefault();
      if (root.state) root.closeChat();
      else root.openChat();
      $.notify({
        title: 'Could not start screensharing',
        message: 'The browser is having trouble accessing your screen.'
      }, {style: 'sco', className: 'camera'});
    });
  },
  openChat: function () {
    $('body').addClass('chat-active');
    this.chatBt.addClass('active');
    this.state = true;
  },
  closeChat: function () {
    $('body').removeClass('chat-active');
    this.chatBt.removeClass('active');
    this.state = false;
  }
};