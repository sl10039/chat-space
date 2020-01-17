$(function(){ 

  function buildHTML(message){
   if (message.image) {
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
   } else {
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
   };
 }
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
  })
 });