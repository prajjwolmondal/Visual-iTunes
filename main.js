window.onload = function(){

	if (window.DOMParser) {

		parser = new DOMParser();

		var dataString;

		jQuery.get('iTunes Library 2014-05-21.xml', function(data) {

			dataString = new XMLSerializer().serializeToString(data); // XMLDocument to string

			// If the three lines below are outside the if loop, code stops working unless there is an alert(dataString) before this line, and outside this function
			xmlDoc = parser.parseFromString(dataString,"text/xml"); // parse

			//document.getElementById("someElement").innerHTML = dataString;

			var tracksDict = xmlDoc.getElementsByTagName("dict")[1]; // dict associated with key "Tracks"
			//document.getElementById("someElement").innerHTML = tracksDict;

			var tracksDictChildren = tracksDict.childNodes;

			var trackLibrary = [];

			for (i = 1; i < 100*4+1 ; i+=2) { // starts from 1, every odd number after one (eg 1, 3, 5, 7...)
				
				//document.getElementById("someElement").innerHTML += tracksDictChildren[i*2+1].textContent;
				//document.getElementById("someElement").innerHTML += "<br/>";
				
				trackChildren = tracksDictChildren[i].childNodes; // attributes of each track


				if ((i-1)/2 % 2 == 1) { // every other child (track dicts only)
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
					}

					trackLibrary.push(track);
				}



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
	
		});

	}
}