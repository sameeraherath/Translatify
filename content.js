//Add event listener to detect when the user selects text on a webpage
document.addEventListener('mouseup',function(event){

    
    let selectedText = window.getSelection().toString().trim(); //Get the selected text
    if (selectedText){

        translateText(selectedText,event.pageX,event.pageY); // Call function to translate and display
    }

});

//Function to translate the selected text using a free API
function translateText(text,x,y){

    const API_KEY = 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM';
    const URL =  `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|si`;
    //Fetch API response

    fetch(URL)
          .then(response => response.json()) // Parse the JSON response
          .then(data => {

            const translation = data.responseData.translatedText;
            showTooltip(translation,x,y);  // Call function to display the translation
          })
          .catch(error => console.error('Error',error));

}

//Function to display the translation
function showTooltip(text,x,y){
    let toolTip = document.createElement('div')
    toolTip.className = 'translation-tooltip';
    toolTip.textContent = text;
    document.body.appendChild(toolTip);

    // Position the tooltip near the cursor
    toolTip.style.left = `${x}px`;
    toolTip.style.top = `${y}px`;

    // Remove the tooltip after 1 seconds
    setTimeout(() => {
        toolTip.remove();
    }, 5000);

}