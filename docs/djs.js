//. djs.js

//. Language resources
var __r = {
  'ja': {
    'color_transparent': '透明',
    'color_black': '黒',
    'color_white': '白',
    'color_red': '赤',
    'color_blue': '青',
    'color_green': '緑',
    'color_yellowgreen': '黄緑',
    'color_yellow': '黄',
    'color_orange': '橙',
    'color_cyan': '空色',
    'color_magenta': '紫',
    'color_gray': 'グレー',
    'color_pink': 'ピンク',
    'color_beige': '肌',
    'color_brown': '茶',
    'color_custom': 'カスタム',

    'btn_setbg': '背景',
    'btn_reset': 'リセット',
    'btn_submit': '保存',

    'dialog_comment_title': 'コメント',
    'dialog_color_title': '色選択',
    'dialog_qrcode_title': 'QRコード',

    'dummy': 'ダミー'
  },
  'en': {
    'color_transparent': 'Transparent',
    'color_black': 'Black',
    'color_white': 'White',
    'color_red': 'Red',
    'color_blue': 'Blue',
    'color_green': 'Green',
    'color_yellowgreen': 'YellowGreen',
    'color_yellow': 'Yellow',
    'color_orange': 'Orange',
    'color_cyan': 'Cyan',
    'color_magenta': 'Magenta',
    'color_gray': 'Gray',
    'color_pink': 'Pink',
    'color_beige': 'Beige',
    'color_brown': 'Brown',
    'color_custom': 'Custom',

    'btn_setbg': 'BG',
    'btn_reset': 'Reset',
    'btn_submit': 'Submit',

    'dialog_comment_title': 'Comment',
    'dialog_color_title': 'Custom Color',
    'dialog_qrcode_title': 'QR Code',

    'dummy': 'Dummy'
  }
};

//$('#div').doodlejs({});

var __THIS = null;
var __OPTION = null;

var __base_url = location.origin + '/';
var __undos = [];
var __redos = [];
var __stroke = null; //. { color: color, width: width, xys: [] }
var __backgroundcolor = null;
var __custom_color = '#000000';

$.fn.doodlejs = function( option ){
  __THIS = this;
  __OPTION = option;

  //. lang
  if( !__OPTION || !__OPTION.lang ){ __OPTION.lang = 'ja'; }

  //. uuid
  if( !__OPTION || !__OPTION.uuid ){ __OPTION.uuid = __generateUUID(); }

  __init();

  return __THIS;
};

function __init(){
  //. UI
  var __ui = '<select id="__select_color">'
    + '<option style="color:black;" value="transparent">' + __r[__OPTION.lang].color_transparent + '</option>'
    + '<option style="color:black;" value="black" selected="selected">' + __r[__OPTION.lang].color_black + '</option>'
    + '<option style="color:lightgray;" value="white">' + __r[__OPTION.lang].color_white + '</option>'
    + '<option style="color:red;" value="red">' + __r[__OPTION.lang].color_red + '</option>'
    + '<option style="color:blue;" value="blue">' + __r[__OPTION.lang].color_blue + '</option>'
    + '<option style="color:green;" value="green">' + __r[__OPTION.lang].color_green + '</option>'
    + '<option style="color:#88cc00;" value="#88cc00">' + __r[__OPTION.lang].color_yellowgreen + '</option>'
    + '<option style="color:yellow;" value="yellow">' + __r[__OPTION.lang].color_yellow + '</option>'
    + '<option style="color:#ffa500;" value="#ffa500">' + __r[__OPTION.lang].color_orange + '</option>'
    + '<option style="color:cyan;" value="cyan">' + __r[__OPTION.lang].color_cyan + '</option>'
    + '<option style="color:magenta;" value="magenta">' + __r[__OPTION.lang].color_magenta + '</option>'
    + '<option style="color:gray;" value="gray">' + __r[__OPTION.lang].color_gray + '</option>'
    + '<option style="color:#ef8f9c;" value="#ef8f9c">' + __r[__OPTION.lang].color_pink + '</option>'
    + '<option style="color:#ead2ad;" value="#ead2ad">' + __r[__OPTION.lang].color_beige + '</option>'
    + '<option style="color:#7c6035;" value="#7c6035">' + __r[__OPTION.lang].color_brown + '</option>'
    + '<option style="color:black;" value="custom">' + __r[__OPTION.lang].color_custom + '</option>'
    + '</select>'

    + '<select id="__select_linewidth">'
    + '<option value="1">1</option>'
    + '<option value="2">2</option>'
    + '<option value="3">3</option>'
    + '<option value="4">4</option>'
    + '<option value="5" selected="selected">5</option>'
    + '<option value="6">6</option>'
    + '<option value="7">7</option>'
    + '<option value="8">8</option>'
    + '<option value="9">9</option>'
    + '<option value="10">10</option>'
    + '<option value="11">11</option>'
    + '<option value="12">12</option>'
    + '<option value="13">13</option>'
    + '<option value="14">14</option>'
    + '<option value="15">15</option>'
    + '<option value="16">16</option>'
    + '<option value="17">17</option>'
    + '<option value="18">18</option>'
    + '<option value="19">19</option>'
    + '<option value="20">20</option>'
    + '</select>'

    + '<input type="button" class="btn btn-xs btn-secondary p-0" id="__setbg_btn" value="' + __r[__OPTION.lang].btn_setbg + '" onClick="__setBG();"/>'

    + ( __OPTION && __OPTION.comment ? '<a href="#" class="btn btn-xs btn-secondary p-0" data-toggle="modal" data-target="#__commentModal" id="__comment_btn"><i class="fas fa-comment-dots"></i></a>' : '' )

    + ( __OPTION && __OPTION.qrcode ? '<a href="#" class="btn btn-xs btn-secondary p-0" data-toggle="modal" data-target="#__commentModal" id="__comment_btn"><i class="fas fa-comment-dots"></i></a>' : '' )

    + '<div id="__canvas_div">'
    + '<div id="__cdiv"><canvas width="80%" height="50%" id="__mycanvas"></canvas></div>'
    + '<input type="button" class="btn btn-xs" id="__undo_btn" value="<" onClick="__undo();" disabled="disabled"/>'
    + '<input type="button" class="btn btn-xs btn-warning" value="' + __r[__OPTION.lang].btn_reset + '" onClick="__resetCanvas();"/>'
    + '<input type="button" class="btn btn-xs btn-primary" value="' + __r[__OPTION.lang].btn_submit + '" onClick="__THIS.__submitCanvas();"/>'
    + '<input type="button" class="btn btn-xs" id="__redo_btn" value=">" onClick="__redo();" disabled="disabled"/>'
    + '</div>'

    + '<div class="modal bd-example-modal-lg fade" id="__colorModal" tabindex="-1" role="dialog" aria-labbelledby="colorModal" aria-hidden="true">'
    + '<div class="modal-dialog modal-dialog-centered modal-lg">'
    + '<div class="modal-content">'
    + '<div class="modal-header">'
    + '<h4 class="modal-title" id="__colorModalLabel">' + __r[__OPTION.lang].dialog_color_title + '</h4>'
    + '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'
    + '<span aria-hidden="true">&times;</span>'
    + '</button>'
    + '</div>'
    + '<div class="modal-body" id="__colormodal-body">'
    + '<input type="color" class="form-control" id="__color-picker" value="#000000"/>'
    + '</div>'
    + '<div class="modal-footer btn-center">'
    + '<button type="button" class="btn" data-toggle="modal" onClick="__closeColorModal();">OK</button>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '</div>'

    + '<div class="modal bd-example-modal-lg fade" id="__commentModal" tabindex="-1" role="dialog" aria-labbelledby="commentModal" aria-hidden="true">'
    + '<div class="modal-dialog modal-dialog-centered modal-lg">'
    + '<div class="modal-content">'
    + '<div class="modal-header">'
    + '<h4 class="modal-title" id="__commentModalLabel">' + __r[__OPTION.lang].dialog_comment_title + '</h4>'
    + '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'
    + '<span aria-hidden="true">&times;</span>'
    + '</button>'
    + '</div>'
    + '<div class="modal-body" id="__commentmodal-body">'
    + '<textarea class="form-control" id="__comment" value=""></textarea>'
    + '</div>'
    + '<div class="modal-footer btn-center">'
    + '<button type="button" class="btn btn-primary modal_button" data-dismiss="modal">OK</button>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '</div>'

    + '<div class="modal bd-example-modal-lg fade" id="__qrcodeModal" tabindex="-1" role="dialog" aria-labbelledby="__qrcodeModal" aria-hidden="true">'
    + '  <div class="modal-dialog modal-dialog-centered modal-lg">'
    + '    <div class="modal-content">'
    + '      <div class="modal-header">'
    + '        <h4 class="modal-title" id="__qrcodeModalLabel">' + __r[__OPTION.lang].dialog_qrcode_title + '</h4>'
    + '        <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
    + '          <span aria-hidden="true">&times;</span>'
    + '        </button>'
    + '      </div>'
    + '      <div class="modal-body" id="__qrcodemodal-body">'
    + '        <img id="__qrcode_img" width="90%"/>'
    + '        <div id="__qrcode_img_" width="100%"></div>'
    + '      </div>'
    + '      <div class="modal-footer btn-center">'
    + '      </div>'
    + '    </div>'
    + '  </div>'
    + '</div>'

    + '<div class="hide">'
    + '  <canvas id="__canvas" width="32" height="32"></canvas>'
    + '</div>';
  __THIS.html( __ui );

  //. CSS after <canvas> creation
  $('html').css( 'text-align', 'center' );
  $('html').css( 'background-color', '#fafafa' );
  $('html').css( 'font-size', '20px' );
  $('html').css( 'color', '#333' );
  $('body').css( 'text-align', 'center' );
  $('body').css( 'background-color', '#fafafa' );
  $('body').css( 'font-size', '20px' );
  $('body').css( 'color', '#333' );
  $('#__mycanvas').css( 'border', '1px solid #333' );

  var __canvas = document.getElementById( '__mycanvas' );
  if( !__canvas || !__canvas.getContext ){
    return false;
  }
  var __ctx = __canvas.getContext( '2d' );
  //. マウスの座標を取得
  var __mouse = {
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    color: "black",
    isDrawing: false
  };
  var __borderWidth = 1;
  __canvas.addEventListener( "mousemove", function( e ){
    //. マウスが動いたら座標値を取得
    var __rect = e.target.getBoundingClientRect();
    __mouse.x = e.clientX - __rect.left - __borderWidth;
    __mouse.y = e.clientY - __rect.top - __borderWidth;

    //. isDrawがtrueのとき描画
    if( __mouse.isDrawing ){
      var __color = $('#__select_color').val();
      if( __color == 'custom' ){
        __color = __custom_color;
      }
      if( __color == 'transparent' ){
        __ctx.globalCompositeOperation = 'destination-out';
      }else{
        __ctx.globalCompositeOperation = 'source-over';
      }

      __ctx.beginPath();
      __ctx.lineWidth = parseInt( $('#__select_linewidth').val() );
      __ctx.lineCap = 'round';
      __ctx.moveTo( __mouse.startX, __mouse.startY );
      __ctx.lineTo( __mouse.x, __mouse.y );
      if( __color != 'transparent' ){
        __ctx.strokeStyle = __color;
      }
      __ctx.stroke();
      __mouse.startX = __mouse.x;
      __mouse.startY = __mouse.y;

      if( __stroke ){
        __stroke.xys.push( [ __mouse.x, __mouse.y ] );
      }
    }
  });
  //. マウスを押したら、描画OK(myDrawをtrue)
  __canvas.addEventListener( "mousedown", function( e ){
    __mouse.isDrawing = true;
    __mouse.startX = __mouse.x;
    __mouse.startY = __mouse.y;

    __stroke = {};
    __stroke.color = $('#__select_color').val();
    if( __stroke.color == 'custom' ){
      __stroke.color = __custom_color;
    }
    __stroke.width = parseInt( $('#__select_linewidth').val() );
    __stroke.xys = [ [ __mouse.x, __mouse.y ] ];
  });
  //. マウスを上げたら、描画禁止(myDrawをfalse)
  __canvas.addEventListener( "mouseup", function( e ){
    __mouse.isDrawing = false;
    if( typeof __THIS.__sendImage != 'undefined' ){
      __THIS.__sendImage();
    }

    if( __stroke ){
      __undos.push( __stroke );
      $('#__undo_btn').prop( 'disabled', false );
      __stroke = null;
      __redos = [];
      $('#__redo_btn').prop( 'disabled', true );
    }
  });
  __canvas.addEventListener( 'mouseleave', function( e ){
    __mouse.isDrawing = false;

    if( __stroke ){
      __undos.push( __stroke );
      $('#__undo_btn').prop( 'disabled', false );
      __stroke = null;
      __redos = [];
      $('#__redo_btn').prop( 'disabled', true );
    }
  });

  __canvas.addEventListener( "touchmove", function( e ){
    //. タッチが動いたら座標値を取得
    var __t = e.changedTouches[0];
    var __rect = e.target.getBoundingClientRect();
    __mouse.x = ( __isAndroid() ? __t.pageX : e.pageX ) - __rect.left - __borderWidth;
    __mouse.y = ( __isAndroid() ? __t.pageY : e.pageY ) - __rect.top - __borderWidth;

    //. isDrawがtrueのとき描画
    if( __mouse.isDrawing ){
      var __color = $('#__select_color').val();
      if( __color == 'custom' ){
        __color = __custom_color;
      }
      if( __color == 'transparent' ){
        __ctx.globalCompositeOperation = 'destination-out';
      }else{
        __ctx.globalCompositeOperation = 'source-over';
      }

      __ctx.beginPath();
      __ctx.lineWidth = parseInt( $('#__select_linewidth').val() );
      __ctx.lineCap = 'round';
      __ctx.moveTo( __mouse.startX, __mouse.startY );
      __ctx.lineTo( __mouse.x, __mouse.y );
      if( __color != 'transparent' ){
        __ctx.strokeStyle = __color;
      }
      __ctx.stroke();
      __mouse.startX = __mouse.x;
      __mouse.startY = __mouse.y;

      if( __stroke ){
        __stroke.xys.push( [ __mouse.x, __mouse.y ] );
      }
    }
  });
  //. タッチしたら、描画OK(myDrawをtrue)
  __canvas.addEventListener( "touchstart", function( e ){
    var __t = e.changedTouches[0];
    var __rect = __t.target.getBoundingClientRect();
    __mouse.isDrawing = true;
    __mouse.startX = __t.pageX - __rect.left - __borderWidth;
    __mouse.startY = __t.pageY - __rect.top - __borderWidth;

    __stroke = {};
    __stroke.color = $('#__select_color').val();
    if( __stroke.color == 'custom' ){
      __stroke.color = __custom_color;
    }
    __stroke.width = parseInt( $('#__select_linewidth').val() );
    __stroke.xys = [ [ __mouse.startX, __mouse.startY ] ];
  });
  //. タッチを上げたら、描画禁止(myDrawをfalse)
  __canvas.addEventListener( "touchend", function( e ){
    __mouse.isDrawing = false;
    if( typeof __THIS.__sendImage != 'undefined' ){
      __THIS.__sendImage();
    }

    if( __stroke ){
      __undos.push( __stroke );
      $('#__undo_btn').prop( 'disabled', false );
      __stroke = null;
      __redos = [];
      $('#__redo_btn').prop( 'disabled', true );
    }
  });
  __canvas.addEventListener( 'touchcancel', function( e ){
    __mouse.isDrawing = false;
    if( typeof __THIS.__sendImage != 'undefined' ){
      __THIS.__sendImage();
    }

    if( __stroke ){
      __undos.push( __stroke );
      $('#__undo_btn').prop( 'disabled', false );
      __stroke = null;
      __redos = [];
      $('#__redo_btn').prop( 'display', true );
    }
  });

  //. Pointer Events
  __canvas.addEventListener( "pointermove", function( e ){
    //. ポインターが動いたら座標値を取得
    var __t = e; //e.changedTouches[0];
    var __rect = e.target.getBoundingClientRect();
    __mouse.x = ( __isAndroid() ? __t.pageX : e.pageX ) - __rect.left - __borderWidth;
    __mouse.y = ( __isAndroid() ? __t.pageY : e.pageY ) - __rect.top - __borderWidth;

    //. isDrawがtrueのとき描画
    if( __mouse.isDrawing ){
      var __color = $('#__select_color').val();
      if( __color == 'custom' ){
        __color = __custom_color;
      }
      if( __color == 'transparent' ){
        __ctx.globalCompositeOperation = 'destination-out';
      }else{
        __ctx.globalCompositeOperation = 'source-over';
      }

      __ctx.beginPath();
      __ctx.lineWidth = parseInt( $('#__select_linewidth').val() );
      __ctx.lineCap = 'round';
      __ctx.moveTo( __mouse.startX, __mouse.startY );
      __ctx.lineTo( __mouse.x, __mouse.y );
      if( __color != 'transparent' ){
        __ctx.strokeStyle = __color;
      }
      __ctx.stroke();
      __mouse.startX = __mouse.x;
      __mouse.startY = __mouse.y;

      if( __stroke ){
        __stroke.xys.push( [ __mouse.x, __mouse.y ] );
      }
    }
  });
  //. ポインターにタッチしたら、描画OK(myDrawをtrue)
  __canvas.addEventListener( "pointerdown", function( e ){
    var __t = e; //e.changedTouches[0];
    var __rect = __t.target.getBoundingClientRect();
    __mouse.isDrawing = true;
    __mouse.startX = __t.pageX - __rect.left - __borderWidth;
    __mouse.startY = __t.pageY - __rect.top - __borderWidth;

    __stroke = {};
    __stroke.color = $('#__select_color').val();
    if( __stroke.color == 'custom' ){
      __stroke.color = __custom_color;
    }
    __stroke.width = parseInt( $('#__select_linewidth').val() );
    __stroke.xys = [ [ __mouse.startX, __mouse.startY ] ];
  });
  //. ポインターを上げたら、描画禁止(myDrawをfalse)
  __canvas.addEventListener( "pointerup", function( e ){
    __mouse.isDrawing = false;
    if( typeof __THIS.__sendImage != 'undefined' ){
      __THIS.__sendImage();
    }

    if( __stroke ){
      __undos.push( __stroke );
      $('#__undo_btn').prop( 'disabled', false );
      __stroke = null;
      __redos = [];
      $('#__redo_btn').prop( 'disabled', true );
    }
  });

  //. 内部処理
  $('#__select_color').change( function(){
    var __color = $(this).val();
    if( __color == 'custom' ){
      __openColorModal();
    }else{
      if( __color == 'white' ){
        __color = 'lightgray';
      }else if( __color == 'transparent' ){
        __color = 'black';
      }
      $(this).css( { 'color': __color } );
      $('#__select_linewidth').css( { 'color': __color } );
      $('#__setbg_btn').css( { 'background': __color } );
    }
  });

  //. リサイズ時に Canvas サイズを変更する
  $(window).on( 'load resize', function(){
    __super_resized();
  });

  //. スクロール禁止
  var __movefun = function( event ){
    event.preventDefault();
  }
  window.addEventListener( 'touchmove', __movefun, { passive: false } );


  __definePrototype();
}


function __definePrototype(){
  //. プロトタイプ関数

  //. プロトタイプのデフォルト関数
  __THIS.__proto__.__resized = function(){
    __super_resized();
  };

  __THIS.__proto__.__sendImage = function(){
    //. デフォルトでは何もしない
    //console.log( '__sendImage()' );
  };

  __THIS.__proto__.__submitCanvas = function(){
    var __img = __getImage();

    /* その画像をダウンロードさせる */
    var __filename = ( __OPTION.uuid ) + '.png';
    if( window.navigator.msSaveBlob ){
      window.navigator.msSaveBlob( __img, __filename );
      window.navigator.msSaveOrOpenBlob( __img, __filename );
    }else{
      try{
        var __image_url = window.URL.createObjectURL( __img );
        var __link = document.createElement( 'a' );
        __link.href = __image_url;
        __link.download = __filename;
        document.body.appendChild( __link );
        __link.click();
        document.body.removeChild( __link );
      }catch( e ){
        throw new Error( `${e}` );
      }
    }
  };
};

//. 内部関数
function __getImage(){
  var __canvas = document.getElementById( '__mycanvas' );
  if( !__canvas || !__canvas.getContext ){
    return false;
  }
  //var __ctx = __canvas.getContext( '2d' );

  //. 画像データ
  var __png = __canvas.toDataURL( 'image/png' );
  __png = __png.replace( /^.*,/, '' );

  //. バイナリ変換
  var __bin = atob( __png );
  var __buffer = new Uint8Array( __bin.length );
  for( var __i = 0; __i < __bin.length; __i ++ ){
    __buffer[__i] = __bin.charCodeAt( __i );
  }
  var __blob = new Blob( [__buffer.buffer], {
    type: 'image/png'
  });

  return __blob;
};

function __super_resized(){
  var __browserWidth = window.innerWidth;
  var __browserHeight = window.innerHeight;
  var __canvas = document.getElementById( '__mycanvas' );
  if( __canvas && __canvas.getContext ){
    __canvas.width = __browserWidth * 0.8;
    __canvas.height = __browserHeight * 0.6;
  }
};

function __resetCanvas( __no_reset_unredo ){
  //__init();
  __super_resized();

  if( !__no_reset_unredo ){
    __undos = [];
    __redos = [];
    __backgroundcolor = null;

    //. リセットを通知
    if( typeof __THIS.__sendImage != 'undefined' ){
      __THIS.__sendImage();
    }
  }
};

function __isAndroid(){
  return ( navigator.userAgent.indexOf( 'Android' ) > 0 );
};

function __undo(){
  if( __undos && __undos.length > 0 ){
    var __last_stroke = __undos.pop();
    if( __undos.length == 0 ){
      $('#__undo_btn').prop( 'disabled', true );
    }
    __redos.push( __last_stroke );
    $('#__redo_btn').prop( 'disabled', false );

    __redrawCanvas();
  }
};

function __redo(){
  if( __redos && __redos.length > 0 ){
    var __last_stroke = __redos.pop();
    if( __redos.length == 0 ){
      $('#__redo_btn').prop( 'disabled', true );
    }
    __undos.push( __last_stroke );
    $('#__undo_btn').prop( 'disabled', false );

    __redrawCanvas();
  }
};

function __setBG(){
  var __color = $('#__select_color').val();
  if( __color ){
    if( __color == 'custom' ){
      __color = __custom_color;
    }
    if( __color != 'transparent' ){
      __backgroundcolor = __color;
    }else{
      __backgroundcolor = null;
    }
    __redrawCanvas();
  }
};

function __redrawCanvas(){
  if( __undos && __undos.length >= 0 ){
    __resetCanvas( true );

    if( __backgroundcolor ){
      var __canvas = document.getElementById( '__mycanvas' );
      if( !__canvas || !__canvas.getContext ){
        return false;
      }
      var __ctx = __canvas.getContext( '2d' );

      //. 全体をベタ塗り
      __ctx.beginPath();
      __ctx.fillStyle = __backgroundcolor; //"rgb( 255, 255, 255 )";
      __ctx.fillRect( 0, 0, __canvas.width, __canvas.height );
      __ctx.stroke();
    }

    for( var __i = 0; __i < __undos.length; __i ++ ){
      var __stroke = __undos[__i];

      for( var __j = 1; __j < __stroke.xys.length; __j ++ ){
        var __canvas = document.getElementById( '__mycanvas' );
        if( !__canvas || !__canvas.getContext ){
          return false;
        }
        var __ctx = __canvas.getContext( '2d' );

        var __color = __stroke.color;
        if( __color == 'transparent' ){
          __ctx.globalCompositeOperation = 'destination-out';
        }else{
          __ctx.globalCompositeOperation = 'source-over';
        }

        __ctx.beginPath();
        __ctx.lineWidth = __stroke.width;
        __ctx.lineCap = 'round';
        __ctx.moveTo( __stroke.xys[__j-1][0], __stroke.xys[__j-1][1] );
        __ctx.lineTo( __stroke.xys[__j][0], __stroke.xys[__j][1] );
        if( __color != 'transparent' ){
          __ctx.strokeStyle = __color;
        }
        __ctx.stroke();
      }
    }
  }

  if( typeof __THIS.__sendImage != 'undefined' ){
    __THIS.__sendImage();
  }
};

function __changeColor( __c ){
  $('#__select_color').css( 'color', __c );
  $('#__select_color').val( 'custom' );
  __custom_color = __c;

  $('#__select_linewidth').css( { 'color': __c } );
  $('#__setbg_btn').css( { 'background': __c } );
};

function __openColorModal(){
  $('#__colorModal').modal( 'show' );
};

function __closeColorModal(){
  $('#__colorModal').modal( 'hide' );
  var __c = $('#__color-picker').val();
  __changeColor( __c );
};

function __timestamp2datetime( __ts ){
  if( __ts ){
    var __dt = new Date( __ts );
    var __yyyy = __dt.getFullYear();
    var __mm = __dt.getMonth() + 1;
    var __dd = __dt.getDate();
    var __hh = __dt.getHours();
    var __nn = __dt.getMinutes();
    var __ss = __dt.getSeconds();
    var __datetime = __yyyy + '-' + ( __mm < 10 ? '0' : '' ) + __mm + '-' + ( __dd < 10 ? '0' : '' ) + __dd
      + ' ' + ( __hh < 10 ? '0' : '' ) + __hh + ':' + ( __nn < 10 ? '0' : '' ) + __nn + ':' + ( __ss < 10 ? '0' : '' ) + __ss;
    return __datetime;
  }else{
    return "";
  }
};

function __generateUUID(){
  //. Cookie の値を調べて、有効ならその値で、空だった場合は生成する
  var __did = null;
  __cookies = document.cookie.split(";");
  for( var __i = 0; __i < __cookies.length; __i ++ ){
    var __str = __cookies[__i].split("=");
    if( unescape( __str[0] ) == " deviceid" ){
      __did = unescape( unescape( __str[1] ) );
    }
  }

  if( __did == null ){
    var __s = 1000;
    __did = ( new Date().getTime().toString(16) ) + Math.floor( __s * Math.random() ).toString(16);
  }
  var __maxage = 60 * 60 * 24 * 365 * 100; //. 100years
  document.cookie = ( "deviceid=" + __did + '; max-age=' + __maxage );

  return __did;
};

function __qrCode( canvas_id ){
  var __canvas = document.getElementById( canvas_id );  //. 絵が描かれている 32x32 canvas の id(__canvas)
  if( !__canvas || !__canvas.getContext ){
    return false;
  }
  var __ctx = __canvas.getContext( '2d' );

  //. タイトル
  var __title = $('#__comment').val();

  //. 作者
  var __author = 'MyDoodles';

  //. Town
  var __town = 'My Town';

  //. カラーパレット
  var __color_palette = [
    146,  //. transparent #eeeeee(#cccccc)
    159,  //. black       #000000
    145,  //. white       #ffffff
    5,    //. red         #ff0000
    86,   //. blue        #0000ff
    95,   //. green       #00ff00
    68,   //. yellow      #ffff00
    122,  //. cyan        #00ffff
    41,   //. magenta     #ff00ff
    153,  //. gray        #808080
    47,   //. pink        #ef8f9c
    30,   //. beige       #ead2ad
    59,   //. brown       #7c6035
    111,  //. dummy
    112   //. dummy
  ];

  //. カラーパレット変換テーブル
  var __color_palette_table = [];
  for( var i = 0; i < 16; i ++ ){
    for( var j = 0; j < 9; j ++ ){
      var __v = 16 * i + j;
      __color_palette_table.push( __v );
    }
  }
  for( var i = 0; i < 15; i ++ ){
    var __v = 16 * i + 15;
    __color_palette_table.push( __v );
  }

  //. 画像データ
  var __imgdata = [];
  var __imagedata = __ctx.getImageData( 0, 0, 32, 32 );
  for( var i = 0; i < __imagedata.height; i ++ ){
    for( var j = 0; j < __imagedata.width; j += 2 ){
      var __idx = ( j + i * __imagedata.width ) * 4;

  		var __r1 = __imagedata.data[__idx];
  		var __g1 = __imagedata.data[__idx+1];
      var __b1 = __imagedata.data[__idx+2];
      var __a1 = __imagedata.data[__idx+3];
      var __color_index1 = __getColorIndex( __r1, __g1, __b1, __a1 );

  		var __r2 = __imagedata.data[__idx+4];
  		var __g2 = __imagedata.data[__idx+5];
      var __b2 = __imagedata.data[__idx+6];
      var __a2 = __imagedata.data[__idx+7];
      var __color_index2 = __getColorIndex( __r2, __g2, __b2, __a2 );

      __idx = __color_index2 * 16 + __color_index1;
      __imgdata.push( __idx );
    }
  }

  if( __color_palette && __imgdata ){
    var __data = [];

    //. Title
    var __titlearray = __str2bytearray( __title );
    for( var i = 0; i < __titlearray.length || i < 42; i ++ ){
      if( i < 42 ){
        if( i < __titlearray.length ){
          var __c = __titlearray[i];
          __data.push( __c );
        }else{
          __data.push( 0 );
        }
      }
    }

    //. *1, *2
    __data.push( 23 );
    __data.push( 146 );

    //. Author
    for( var i = 0; i < __author.length || i < 9; i ++ ){
      if( i < 9 ){
        if( i < __author.length ){
          var __c = __author.charCodeAt( i );
          __data.push( __c );
        }else{
          __data.push( 0 );
        }
        __data.push( 0 );
      }
    }

    //. *12, *13, *3, *4
    __data.push( 1 );
    __data.push( 0 );
    __data.push( 216 );
    __data.push( 144 );

    //. Town
    for( var i = 0; i < __town.length || i < 9; i ++ ){
      if( i < 9 ){
        if( i < __town.length ){
          var __c = __town.charCodeAt( i );
          __data.push( __c );
        }else{
          __data.push( 0 );
        }
        __data.push( 0 );
      }
    }

    //. *14, *15, *5, *6
    __data.push( 0 );
    __data.push( 0 );
    __data.push( 1 );
    __data.push( 2 );

    //. Color Pallete
    for( var i = 0; i < __color_palette.length; i ++ ){
      __data.push( __color_palette_table[__color_palette[i]-1] );
    }

    //. *7, *8, *9, *10, *11
    __data.push( 198 );
    __data.push( 0 );
    __data.push( 9 );
    __data.push( 0 );
    __data.push( 0 );

    //. Palette data
    for( var i = 0; i < __imgdata.length; i ++ ){
      __data.push( __imgdata[i] );
    }

    //. #23
    var __bindata = new Uint8Array( __data );

    //. どっちでやっても「QRコードの形式が正しくありません」エラー
    var __q = new QRCode( __data );

    $('#__qrcode_img_').html( __q );
    $('#__qrcodeModal').modal();
  }
};
