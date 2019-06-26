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
});

$(function () {
  chat.init();
  fullWidth.init();
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
      if (root.state) {
        Swal.fire({
          title: 'Sohbet kapatılsın mı?',
          text: "Sohbet penceresinin kapanmasını istiyor musunuz?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Kapat'
        }).then((result) => {
          if (result.value) {
            root.closeChat();
            $.notify({
              title: 'Sohbet Kapatildi',
              message: 'Sohbet penceresi basarili bir sekilde kapatildi.'
            }, {style: 'sco', className: 'camera'});
          }
        });
      }
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

const fullWidth = {
  className: 'full-width',
  init: function (){
    this.cacheDom();
    if(this.fullBtn.length) this.createEvents();
  },
  cacheDom: function(){
    this.fullBtn = $('.js-fullwidth-btn');
  },
  createEvents: function () {
    this.fullBtn.on('click', (e) => {
      e.preventDefault();
      this.fullScreenToggle($(e.target));
    });
  },
  fullScreenToggle: function($this, status='toggle'){
    const elem = $this.closest('.video');
    if(status === 'toggle') {
      elem.toggleClass(this.className);
      $this.toggleClass('active');
    }
    else if(status === 'open') {
      $this.addClass('active');
      elem.addClass(this.className);
    }
    else {
      $this.removeClass('active');
      elem.removeClass(this.className);
    }
  }
};
// const messageTemplate = ({ className, name, text, }) => `
//   <div class="chat-item ${className}">
//     <figure class="avatar"><img src="assets/images/avatar.svg" alt="${name} Avatar"></figure>
//     <div class="chat-item__content">
//       <span class="name">${name}</span>
//       <div class="content">
//         <div class="content--in"><span>${text}</span></div>
//       </div>
//     </div>
//   </div>`;
// // Receive a message and append it to the history
// var msgHistory = document.querySelector('#history');
// session.on('signal:msg', function signalCallback(event) {
//   let className = event.from.connectionId === session.connection.connectionId ? 'self' : 'their';
//   let message = [
//     { className: className, name: 'Mahmut', text: event.data },
//   ].map(messageTemplate).join('');
//   msgHistory.append(message);
//   msgHistory.scrollIntoView();
// });