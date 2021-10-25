//console.log("extension loaded");
browser.menus.create({
    id: "translate",
    title: "Translate To Chinese by Microsoft Translator",
    contexts:["selection"],
})
var result;

function messageTab(tabs) {
    browser.tabs.sendMessage(tabs[0].id, {
      translation: result
    });
}

function onExecuted(result) {
        var result = this.result;
        let querying = browser.tabs.query({
            active: true,
        });
        querying.then(messageTab);
    }

browser.menus.onClicked.addListener(function( info , tab ){
        if(info.menuItemId == "translate"){
            
            /*               Get the highlighted Text               */

            var sel_text = info.selectionText;
            const data = JSON.stringify([
                {
                    "Text": sel_text
                }
            ]);

            /*              Fetch the Translation                  */

            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === this.DONE) {
                    //console.log(this.responseText);

                    var subArray = JSON.parse(this.responseText)[0];
                    //console.log(subArray);
                    var tabs = browser.tabs.query({active:true});
                    result = subArray.translations[0].text;
                    console.log(result);
                    
                    /*              Show the Result                */
                    
                    
                   
                    browser.tabs.insertCSS({file:"popup-style.css"});
                    let executing = browser.tabs.executeScript({
                       file: "popup.js"
                    });
                    executing.then(onExecuted);
                    
                }
            });
            
            xhr.open("POST", "//URL");
            xhr.setRequestHeader("content-type", "application/json");
            xhr.setRequestHeader("x-rapidapi-host", "");
            xhr.setRequestHeader("x-rapidapi-key", "the key");
            
            xhr.send(data);
            

        }


    });
