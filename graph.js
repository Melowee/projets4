var nodes = []; // Nodes Array
var edges = []; // Edges Array
var jsonIssues = []; // JSON Array from "../parametre_fixes.json"
var data = {
	nodes: nodes,
	edges: edges
};

// Choose the graph options
var options = {
	nodes: {
		color: {
			border: '#0f9854',
			background: '#17af97'
		},
		font: {
			color: 'white',
			size: 20
		}
	},
	interaction: {
		dragNodes: false,
		zoomView: false
	},
	edges: {
		arrows: {
			to: {
				enabled: true,
				scaleFactor: 1,
				type: 'arrow'
			},
		}
	}
};

// Parametre_fixes into js array (jsonIssues)
var xmlhttp = new XMLHttpRequest();
var url = "parametre_fixes.json";
xmlhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		jsonIssues = JSON.parse(this.responseText);
	}
};
xmlhttp.open("GET", url, false);
xmlhttp.send();


// Add nodes according to the JSON file.
function addNodes() {
	nodes.push({
		id: String(0),
		label: "dépôt",
		x: 150,
		y: 150,
	});
	for (var i = 1; i < jsonIssues.C + 1; i++) {
		nodes.push({
			id: String(i),
			label: "d_" + `${i}`,
			x: 500,
			y: 300
		});
	}
}

// Init the default graph (without edges)
function init() {
	afficheTable();
	addNodes();
	var container = document.getElementById('network');
	network = new vis.Network(container, data, options);
}

init();

function afficherModal(name){
	document.getElementById(name).style.display='block';
	document.getElementById('slidecontainer').style.display = 'none';
}

function afficheTable(){
	var element = document.getElementById("NodeName");
	var element2 = document.getElementById("NodeValues");

	for (var i = 1; i < jsonIssues.C + 1; i++) {

		var para = document.createElement("th");
		var node = document.createTextNode("d_" + `${i}`);

		var para2 = document.createElement("th");
		var node2 = document.createElement("span");

		var node2Text = document.createTextNode("[1;1]");

		node2.id= "valueNode" + `${i}`;

		para.appendChild(node);
		element.appendChild(para);

		para2.appendChild(node2);
		node2.appendChild(node2Text)
		element2.appendChild(para2);

	}
}
