$(function () {
  chat.init()
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