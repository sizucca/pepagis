;(function(){
  $(function(){
    //------------------------------------------------------------
    // 擬似要素をコピペ出来るようにする
    //------------------------------------------------------------
    // 擬似要素を抜き出してDOM実態にする
    var pseudoElements = document.getElementsByClassName('js-pepagis-pseudo');
    for(var i = 0, lng = pseudoElements.length; i < lng ; i++){
      var beforeContent = getComputedStyle(pseudoElements[i], '::before').content;
      var afterContent = getComputedStyle(pseudoElements[i], '::after').content;
      pseudoElements[i].innerHTML  = beforeContent.substr(1, (beforeContent.length - 2));
      pseudoElements[i].innerHTML += '<br>';
      pseudoElements[i].innerHTML += afterContent.substr(1, (afterContent.length - 7));
      pseudoElements[i].innerHTML += ')';
    }
    // 擬似要素を非表示にする
    var beforePseudoElementsStyle = '.js-pepagis-pseudo::before{display:none}';
    var afterPseudoElementsStyle  = '.js-pepagis-pseudo::after{display:none}';
    var addStyle = document.createElement('style');
    addStyle.appendChild(document.createTextNode(beforePseudoElementsStyle));
    addStyle.appendChild(document.createTextNode(afterPseudoElementsStyle));
    document.head.appendChild(addStyle);
  });
}());
