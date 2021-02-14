// $(function() {
//   console.log('Hello World');
// });


// $("p").hover(function(){
//   $(this).css("background-color", "yellow");
// }, function(){
//   $(this).css("background-color", "pink");
// });

// addHover = function() {
//   $('#onlyCommentsAdd').hover(function () {
//     $(this).css("color", "yellow");
//   }, function () {
//     $(this).css("color", "pink");
//   });
// };

// $("p:contains('Chrome')").html(function(_, html) {
//   return html.replace(/(Chrome)/g, '<span class="tooltip">Chrome<span class="tooltiptext">Check it bitch</span></span>');
// });

// addHover();

/**
 * Gets text that is selected on a web page
 * @returns {*}
 */
function getSelectedText() {
  var selectedText;
  if (window.getSelection) {  // all browsers, except IE before version 9
    var range = window.getSelection ();
    // alert (range.toString ());
    selectedText = range.toString();
  }
  else {
    if (document.selection.createRange) { // Internet Explorer
      var range = document.selection.createRange ();
      // alert (range.text);
      selectedText = range.text;
    }
  }

  return selectedText
}

/**
 * Adds a Tool tip onto a string on a webpage
 * @param textToFind
 */
addToolTip = function(textToFind) {
  console.log("enter addTooltip for " +textToFind)
  let pContains = $("p:contains('" + textToFind + "')");
  console.log(pContains.html())

  if(pContains.html()) {
    pContains.html(function(_, html) {
      return html.replace(textToFind, '<span class="tooltip">'+ textToFind + '<span class="tooltiptext">Check it bitch</span></span>');
    });
  } else {
    let divContains = $("div:contains('" + textToFind + "')");
    console.log(divContains)
    divContains.html(function(_, html) {
      return html.replace(textToFind, '<span class="tooltip">'+ textToFind + '<span class="tooltiptext">Check it bitch</span></span>');
    });
  }



}

/** Does not work with sentences that DON'T end in a period :( **/
// function getSelectedSentence(wholeParagraphText) {
//   let selectedText = getSelectedText();
//   let indexOfSelectedText = wholeParagraphText.indexOf(selectedText)
//   let firstHalfOfPara = wholeParagraphText.substring(0, indexOfSelectedText)
//   let secondHalfOfPara = wholeParagraphText.substring(indexOfSelectedText)
//   let firstPeriod = firstHalfOfPara.indexOf('.')
//   let secondPeriod = indexOfSelectedText + secondHalfOfPara.indexOf('.')
//   if (firstPeriod == -1) // This means first sentence since no period was found
//   {
//     return wholeParagraphText.substring(0, secondPeriod)
//   } else { // This means sentence in middle of paragraph
//     return wholeParagraphText.substring(firstPeriod + 1, secondPeriod)
//   }
// }

/**
 * Callback function for double click
 * @param e
 */
f=function(e){
  let wholeParagraphText = window.getSelection().focusNode.wholeText;
  // let selectedSentence = wholeParagraphText.substring(0, wholeParagraphText.indexOf('.'))
  var selectedSentence = getSelectedText()

  // console.log('sentence with selected text is ' + selectedSentence)
  // console.log(wholeParagraphText);
  // console.log(selectedSentence);
  addToolTip(selectedSentence)
}
document.body.addEventListener('dblclick',f);
