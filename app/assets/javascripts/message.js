$(function(){ 
  
  function buildHTML(message){
    if ( message.image && message.content) {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="upside-message">
           <div class="message.user.name">
             ${message.user_name}
           </div>
           <div class="message-date">
             ${message.created_at}
           </div>
         </div>
         <div class="downside-message">
           <p class="message-content">
             ${message.content}
           </p>
         </div>
         <img class="downside-message-image" src=${message.image} >
       </div>`
     return html;
   } else if(message.content) {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="upside-message">
           <div class="message.user.name">
             ${message.user_name}
           </div>
           <div class="message-date">
             ${message.created_at}
           </div>
         </div>
         <div class="downside-message">
           <p class="message-content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
    } else if(message.image) {
      var html =
       `<div class="message" data-message-id=${message.id}>
          <div class="upside-message">
            <div class="message.user.name">
              ${message.user_name}
            </div>
            <div class="message-date">
              ${message.created_at}
            </div>
          </div>
          <div class="downside-message">
           <img class="downside-message-image" src=${message.image} >
          </div>
        </div>`
      return html;
   };
 };
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.messages').append(html);
    $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});   
    $('form')[0].reset();
  })
  .fail(function(){
    alert('error');
  })
  .always(() =>{
    $(".form__submit").removeAttr("disabled");
   });
 });

 var reloadMessages = function() {
  //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  last_message_id = $('.message:last').data("message-id");
  $.ajax({
    //ルーティングで設定した通りのURLを指定
    url: "api/messages",
    //ルーティングで設定した通りhttpメソッドをgetに指定
    type: 'get',
    dataType: 'json',
    //dataオプションでリクエストに値を含める
    data: {id: last_message_id}
  })
  .done(function(messages) {
    if (messages.length !== 0) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
      $('.messages').append(insertHTML);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      $("#new_message")[0].reset();
      $(".form__submit").prop("disabled", false);
    }
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
    });
  };

if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 7000);
} 
});