// Angular prerendert jede Route als Verzeichnis mit index.html
// (/impressum -> /impressum/index.html). Der S3-Origin kennt nur exakte Keys,
// deshalb ergänzen wir den Dateinamen hier, bevor die Anfrage den Origin erreicht.
//
// Bewusst nur ES5-Syntax — CloudFront Functions sind kein vollwertiges Node.
function handler(event) {
  var request = event.request;
  var uri = request.uri;
  var lastSegment = uri.substring(uri.lastIndexOf('/') + 1);

  if (lastSegment === '') {
    // /blog/ -> /blog/index.html
    request.uri = uri + 'index.html';
  } else if (lastSegment.indexOf('.') === -1) {
    // /blog/mein-artikel -> /blog/mein-artikel/index.html
    // Segmente mit Punkt sind Dateien (main-ABC123.js, bild.jpg) und bleiben unberührt.
    request.uri = uri + '/index.html';
  }

  return request;
}
