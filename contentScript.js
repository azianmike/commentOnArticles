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
  // console.log("enter addTooltip for " +textToFind)
  let pContains = $("p:contains('" + textToFind + "')");
  // console.log(pContains.html())

  if(pContains.html()) {
    pContains.html(function(_, html) {
      return html.replace(textToFind, '<span class="tooltip">'+ textToFind + '<span class="tooltiptext">Check it bitch</span></span>');
    });
  } else {
    let divContains = $("div:contains('" + textToFind + "')");
    // console.log(divContains)
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
doubleClickListener=function(e){
  let wholeParagraphText = window.getSelection().focusNode.wholeText;
  // let selectedSentence = wholeParagraphText.substring(0, wholeParagraphText.indexOf('.'))
  var selectedSentence = getSelectedText()

  // console.log('sentence with selected text is ' + selectedSentence)
  // console.log(wholeParagraphText);
  // console.log(selectedSentence);
  addToolTip(selectedSentence)
}

/**
 * Callback function for mouseup
 */
mouseupListener = function(){
  console.log("mouseup called")
  var selectedSentence = getSelectedText()
  // addToolTip(selectedSentence)
}


// document.body.addEventListener('dblclick',doubleClickListener);
// document.body.addEventListener('mouseup',mouseupListener);


//////

$(document).ready(function () {
  function commentButtonClick() {
    console.log("tweet button clicked")
    let selectedText = document.getSelection().toString();
    window.open(
      "https://twitter.com/intent/tweet?text=" +
        selectedText
    );
    // console.log("This is your selected text: ",selectedText);
  }

  function checkForSelectedText() {
    // console.log("enter mouseup")
    let textu = document.getSelection().toString();
    let matchu = /\r|\n/.exec(textu);
    if (textu.length && !matchu) {
      // console.log('enter if')
      let range = document.getSelection().getRangeAt(0);
      rect = range.getBoundingClientRect();
      scrollPosition = $(window).scrollTop();
      containerTop = scrollPosition + rect.top - 50 + "px";
      containerLeft = rect.left + rect.width / 2 - 50 + "px";
      textSelectionTooltipContainer.style.transform =
          "translate3d(" + containerLeft + "," + containerTop + "," + "0px)";
      bodyElement.appendChild(textSelectionTooltipContainer);
      $("body").off("mouseup");
      // unbind to remove all previous event listeners. otherwise opens twitter multiple times
      $("#commentBtn").unbind().on("click", commentButtonClick);
      console.log('remove body click listener')
    }
  }

  const textSelectionTooltipContainer = document.createElement("div");
  textSelectionTooltipContainer.setAttribute(
      "id",
      "textSelectionTooltipContainer"
  );
  textSelectionTooltipContainer.innerHTML = `<button id="commentBtn">Comment</button>`;
  const bodyElement = document.getElementsByTagName("BODY")[0];

  /**
   * Removes the tooltip if nothing is selected
   */
  bodyElement.addEventListener("mouseup", function (e) {
    var textu = document.getSelection().toString();
    if (!textu.length) {
      textSelectionTooltipContainer.remove();
      $("#commentBtn").off();
      $("body").on("mouseup", checkForSelectedText);
      console.log('add body click listener')
    }
  });

  console.log('add body click listener')
  $("body").on("mouseup", checkForSelectedText);

});
