// Generates the edges according to the solution
function addEdges() {
	let from;
	let to;
	var idTruck = 1;
	for (let i = 0; i < solutionDetails.length; i++) {
		for (let j = 0; j < solutionDetails[i].length - 1; j++) {
			data.edges.push({
				from: String(solutionDetails[i][j]),
				label: `${idTruck}`,
				to: String(solutionDetails[i][j + 1])
			});
		}
		idTruck++;
	}
}


// Displays a new graph with the edges
function displaySolution() {
	data.edges = [];
	addEdges();
	var container = document.getElementById('network');
	network = new vis.Network(container, data, options);
	network.on("click", function(params) {
		displaySlider(params);
	});
}

// Refresh the graph after every change on QteMaxVehicule
function refresh() {
	if (Vehiculecapacity!=max){
		document.getElementById('slidecontainer').style.display = 'none';
		document.getElementById('mydivheader').innerHTML = 'Click on a client to edit his demande';
		for (var i = 0; i < jsonIssues.C ; i++) {
			document.getElementById('valueNode'+(i+1)).innerHTML='[1,1]';
			clients[i].value = [1,1];
			valuesSlider[i] = [1,1];
		}
		data.edges = [];
		var container = document.getElementById('network');
		network = new vis.Network(container, data, options);
		network.on("click", function(params) {
			displaySlider(params);
		});
	}
}
