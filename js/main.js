window.onload = function(){

}

function parse() {

	document.getElementById("someElement").innerHTML = ""; // clear

	var file = document.getElementById('fileupload').files[0];
	if (file) {
        alert("Name: " + file.name + "\n" + "Last Modified Date :" + file.lastModifiedDate);
	}

	var fr = new FileReader();

	fr.readAsText(file);

	fr.onload = function(e) {
    // e.target.result contains text of file
		var fileText = e.target.result;

		if (window.DOMParser) {

			parser = new DOMParser();

			// If the three lines below are outside the if loop, code stops working unless there is an alert(dataString) before this line, and outside this function
			xmlDoc = parser.parseFromString(fileText,"text/xml"); // parse

			var tracksDict = xmlDoc.getElementsByTagName("dict")[1]; // dict associated with key "Tracks"

			var tracksDictChildren = tracksDict.childNodes;

			var trackLibrary = [];

			for (i = 0; i < tracksDictChildren.length && i < 100*4; i+=1) { // starts from 1, every odd number after one (eg 1, 3, 5, 7...)
				
				//document.getElementById("someElement").innerHTML += tracksDictChildren[i*2+1].textContent;
				//document.getElementById("someElement").innerHTML += "<br/>";
				
				trackChildren = tracksDictChildren[i*2+1].childNodes; // attributes of each track


				//if ((i-1)/2 % 2 == 1) { // every other child (track dicts only)
					var track = {};

					for (j = 0; j < trackChildren.length; j++) {

						if (trackChildren[j].textContent == "Artist") {
							//alerttrackChildren[j+1].textContent;
							track["Artist"] = trackChildren[j+1].textContent;
						}
						else if (trackChildren[j].textContent == "Album") {
							//alerttrackChildren[j+1].textContent;
							track["Album"] = trackChildren[j+1].textContent;
						}
						else if (trackChildren[j].textContent == "Name") {
							//alerttrackChildren[j+1].textContent;
							track["Name"] = trackChildren[j+1].textContent;
						}
						else if (trackChildren[j].textContent == "Year") {
							//alerttrackChildren[j+1].textContent;
							track["Year"] = trackChildren[j+1].textContent;
						}
						else if (trackChildren[j].textContent == "Play Count") {
							//alerttrackChildren[j+1].textContent;
							track["Play Count"] = trackChildren[j+1].textContent;
						}		
						else if (trackChildren[j].textContent == "Genre") {
							//alerttrackChildren[j+1].textContent;
							track["Genre"] = trackChildren[j+1].textContent;
						}				
						else if (trackChildren[j].textContent == "Total Time") {
							//alerttrackChildren[j+1].textContent;
							track["Total Time"] = trackChildren[j+1].textContent;
						}				
					}

					trackLibrary.push(track);
				//}



			}
	
			// print all elements
			for(i = 1; i < trackLibrary.length; i+=1) {

			    var curTrack = trackLibrary[i];

			    document.getElementById("someElement").innerHTML += i + ".<br/>";

				for(var key in curTrack) {
				    document.getElementById("someElement").innerHTML += key + ": " + curTrack[key] + "<br/>";
				}

				document.getElementById("someElement").innerHTML += "<br/>";
			}
		}
	};
}