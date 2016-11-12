var stream = new EventSource("/sse");

var IsLoggedIn1 = "true";

stream.onopen = function() {
  log('Opened connection');
};

stream.onerror = function (event) {
  log('Error: ' + JSON.stringify(event));
};

stream.onmessage = function (event) {
  var obj = JSON.parse(event.data);
  var myArray = ["Good Shot","Missed to field","Classic Text Book Shot","Hat trick","Classical Sot","Unbelievable miss","Very good catch by mid-on player"]; 
  var text= myArray[Math.floor(Math.random() * myArray.length)];
  
  var comment="Good";
  
  if(obj.runs==4 || obj.runs==6 )
      comment=text+"&#x270C";
 
  if(IsLoggedIn1 && (obj.score!=null || obj.over!=null || obj.runs!=null) )
      log(' <b>Total Score: ' + obj.score+" runs - "+obj.over+" Over</b><br> Current runs: "+obj.runs+" <br> Commentator: "+comment); 
};

document.querySelector('#close').addEventListener('click', function(event) {
  IsLoggedIn1=false;
    //stream.close();
    log('Closed connection!!!');
});

var list = document.getElementById('log');
var log = function(text) {
  list.innerHTML = text;
}

window.addEventListener('beforeunload', function() {
  stream.close();
});

// can still push to the server as usual with good old ajax

document.querySelector('#send').addEventListener('click', function(event) {
  IsLoggedIn1=true;
  var json = JSON.stringify({ status: 'Connecting' });
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/api', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(json);

  log('Sent: ' + json);
});
