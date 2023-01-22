# DJS


## Overview

Distributable Doodle.JS


## Usage

```
  :
<div id="djs_main">
</div>
  :

<script src="https://dotnsf.github.io/djs/djs.js"></script>
<script>
var djs = $('#djs_main').doodlejs({});
//djs.__proto__.__sendImage = sendImage;        //. sendImage を上書き
//djs.__proto__.__submitCanvas = submitCanvas;  //. submitCanvas を上書き

function sendImage(){
  :
}

function submitCanvas(){
  :
}
</script>

```


## Extra Dialog

```
  :
<div id="djs_main">
</div>
  :

<script src="https://dotnsf.github.io/djs/djs.js"></script>
<script>
//. extra パラメータを付けて実行する（値は true であればなんでもよい）と、
//. 画面右上にボタンが追加され、タップすると __extraModal ダイアログが表示される
var djs = $('#djs_main').doodlejs({ extra: comment });
</script>

<!-- 表示される __extraModal ダイアログのサンプル -->
<div class="modal bd-example-modal-lg fade" id="__extraModal" tabindex="-1" role="dialog" aria-labbelledby="extraModal" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="__extraModalLabel">Comment</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" id="__extramodal-body">
        <textarea class="form-control" id="comment" value=""></textarea>
      </div>
      <div class="modal-footer btn-center">
        <button type="button" class="btn btn-primary modal_button" data-dismiss="modal">OK</button>
      </div>
    </div>
  </div>
</div>

```



## Licensing

This code is licensed under MIT.


## Copyright

2023  [K.Kimura @ Juge.Me](https://github.com/dotnsf) all rights reserved.
