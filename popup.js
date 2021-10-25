function messageReceiver(request, sender, sendResponse) {
    console.log("receive Message:" +request.translation);
    var popup = document.createElement('div');
    popup.setAttribute("class","modal");
    popup.setAttribute("id","myModal");
    var content = document.createElement('div')
    content.setAttribute("class","modal-content")
    var header = document.createElement('div');
    header.setAttribute("class","modal-header");
    header.textContent="Translation";
    var main = document.createElement('div');
    main.setAttribute("class","modal-body");
    main.textContent=request.translation;
    console.log("p1");
    popup.appendChild(content);
    content.appendChild(header);
    content.appendChild(main);
    request="";
    
    document.body.appendChild(popup);
    popup="";
    var modal = document.getElementById("myModal");
    modal.style.display = "block";

window.onclick = function(event) {
    if (event.target == modal) {
        modal.remove();
        modal.style.display = "none";
        browser.runtime.onMessage.removeListener(messageReceiver);
    }
  }
}
browser.runtime.onMessage.addListener(messageReceiver);