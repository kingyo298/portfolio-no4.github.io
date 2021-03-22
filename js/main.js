'use strict';
{
  const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    loop: true,
    slidesPerView: 1.5, // １度に表示するスライド数
    centeredSlides: true, //現在のスライドを中央に表示
    spaceBetween: 20, // スライド同士の余白
  
    // 自動再生
    autoplay: {
      delay: 5000 // 次のスライドに切り替わる時間の設定（ミリ秒:1000=1秒）
    },

    breakpoints: {
      1001: {
        slidesPerView: 3.75, // １度に表示するスライド数
        spaceBetween: 56, // スライド同士の余白
      } 
    },
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // spのsafariにおける100vh表示の調整
  const setFillHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  window.addEventListener('resize', setFillHeight);

  setFillHeight();
}

$(function(){
  // ハンバーガーメニュー
  $(".white-mask").hide();
  $(".menu-trigger, .menu-list, .menu-item a").click(function(){
    $(".white-mask").fadeToggle(300);
    $(".menu-list, .menu-trigger").toggleClass('open');
    $("body").toggleClass("noscroll");
  });
  // アコーディオン
  $(".faq-item:not(:first-child) dd").hide();
  $(".faq-list dl").on("click", function(e){
    $('dd',this).slideToggle('fast');
  });

  // contactページの、必須項目及びプライバシーポリシーのチェックがないと送信ボタンが押せない
  const $submitBtn = $("#js-submit");
  $('.alert').hide();
  $("#form input, #form textarea").on("change", function(){
    if(
      $('#form input[type="text"]').val() !== "" &&
      $('#form input[type="email"]').val() !== "" &&
      $('#form textarea').val() !== "" &&
      $('#form #confirmation').prop('checked') === true
    ){
      $submitBtn.prop('disabled', false);
    }else{
      $submitBtn.prop('disabled', true);
    }
  });

  // スムーススクロールの実装
  var windowWidth = $(window).width();
  var headerHeight = 94;
  $("a[href^='#']").click(function(){
    var speed = 500;
    var href = $(this).attr("href");
    var target = $(href=="#" || href==""?"html":href);
    var position = target.offset().top - headerHeight;
    $("body,html").animate({scrollTop:position}, speed, "swing");
    return false;
  });


  // お問い合わせ完了メッセージを出す。
  $('#form').submit(function (event) {
    var formData = $('#form').serialize();
    $.ajax({
      url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSctxZQG2d5ZCgn5VEJJ8mRzGSQM0xDmROILq_X0cHmUgUY-4A/formResponse",
      data: formData,
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function () {
          $("#js-submit").fadeOut();
          // window.location.href = "thanks.html";
        },
        200: function () {
          $(".false-message").slideDown();
        }
      }
    });
    event.preventDefault();
  });
});

AOS.init({

})

