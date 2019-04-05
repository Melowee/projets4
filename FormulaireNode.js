var min=1; // Minimum value for the range slider
var max = 1; // Maximum value for the range slider
var clients = []; // Array [{ id : x , value : x}]
var Vehiculecapacity=2; // Vehicules capacity
var solutionDetails; // When the user chooses a solution, it will be put in this variable
var solutionNbTrucks; // When the user chooses a solution, the number of trucks will be put in this variable
var valuesSlider = []; // [[valueMin,valueMax]]


// Jquery to Make the div draggable
$(function() {
	$( "#draggable" ).draggable({scroll: false })
});


// Init the client Array with [min:1;max:1]
function initArray(){
	for (var i = 1; i < jsonIssues.C + 1; i++) {
		var t = nodes[i].label;
		var cliId = {
			"id": t,
			"value": [1, 1]
		};
		valuesSlider.push([1,1]);
		clients.push(cliId);
	}
}
initArray();

function afficheInterval(){
	output = document.getElementById("valueNodeClick");
	output.innerHTML = "[" + min + ";" + max + "]";
}


// On node click display the range slider
network.on("click", function(params) {
	displaySlider(params);
	console.log(params);
});


document.getElementById("MaximalLoad").innerHTML=jsonIssues.N;
document.getElementById("ClientsNumber").innerHTML=jsonIssues.C;


// Slider Jquery for the QteMaxVehicule
$( "#QteMaxVehicule" ).slider({
  max: jsonIssues.N,
	min: 2,
	slide: function(event, count) {
		Vehiculecapacity=count.value;
		document.getElementById('QteMaxVehiculeValue').innerHTML=count.value;
		refresh();
	}
});

/*
 * Takes a number and return node's values
 * @param {number} id - node id
 * @return [min,max]
 */
function getValueNode(id) {
	return [valuesSlider[id][0],valuesSlider[id][1]];
}


/*
 * Takes an array and a id and display the slider
 * @param {Array}
 * @param {number} id client
 */
function displaySlider(params,idClient) {
	if (params.nodes[0] != "d" && params.nodes[0] != undefined  && params.nodes[0] != 0){
		$(function() {
			$('.range-slider').each(function() {
				var minValue = $(this).find('.slider-range').attr('min');
				var maxValue = $(this).find('.slider-range').attr('max');


				output = document.getElementById("valueNodeClick");
				output.innerHTML = "[" + minValue + ";" + maxValue + "]";



				min = getValueNode(params.nodes[0]-1)[0];
				max = getValueNode(params.nodes[0]-1)[1];
				afficheInterval();

				$(this).find('.slider-range').slider({
					range: true,
					min: 1,
					max: Vehiculecapacity,
					values: [min,max],
					slide: function(event, count) {
						min = count.values[0];
						max = count.values[1];
						afficheInterval();
					}
				});
			});
		});
		document.getElementById('slidecontainer').style.display = 'block';
		document.getElementById('idNodeClick').innerHTML = params.nodes;
		document.getElementById('mydivheader').innerHTML = "Demand of client " + params.nodes;
	}
}


// To change clients value compared to the slider. It call it on nodeClick
function addClientsQuantite() {
	var idNodeClickSpan = document.getElementById('idNodeClick').innerHTML;
	if (nodes[idNodeClickSpan] !== undefined)
		var labelId = nodes[idNodeClickSpan].label;
	var objIndex = clients.findIndex((obj => obj.id == labelId));

	valuesSlider[objIndex][0]=Number(min);
	valuesSlider[objIndex][1]=Number(max);

	clients[objIndex].value = [Number(min), Number(max)];
	chercheResultats();
	document.getElementById('valueNode'+(objIndex+1)).innerHTML='['+clients[objIndex].value+']';
}


// Test if tab1==tab2
function eq(tab1, tab2) {
	for (var i = 0; i < tab1.length; ++i) {
		for (var z = 0; z < tab1[i].length; ++z) {
			if (tab1[i][z] !== tab2[i][z]) return false;
		}
	}
	return true;
}

var jsonIssuesQ = [];

// Search results on JSON files "MF_A-n4-Q3.out.json" or "MF_A-n4-Q2.out.json"
function chercheResultats() {
	if (Vehiculecapacity == 3) var q = "./Resultats/MF_A-n4-Q3.out.json";
	else q = "./Resultats/MF_A-n4-Q2.out.json";

	console.log(q);

	var xmlhttp = new XMLHttpRequest();
	var url = q;
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			jsonIssuesQ = JSON.parse(this.responseText);
		}
	};
	xmlhttp.open("GET", url, false);
	xmlhttp.send();

	for (var i = 0; i < jsonIssuesQ.solutions.length; i++) {
		var tab = [];
		for (var y = 0; y < jsonIssuesQ.solutions[i].input.customers_demands.length; y++) {
			tab.push([(jsonIssuesQ.solutions[i].input.customers_demands[y].min), (jsonIssuesQ.solutions[i].input.customers_demands[y].max)]);
		}
		var cli = [];
		for (var t = 0; t < jsonIssues.C; t++) {
			cli.push(clients[t].value);
		}
		if (eq(cli, tab)) {
			solutionNbTrucks = jsonIssuesQ.solutions[i].solution.trucks_number;
			solutionDetails = jsonIssuesQ.solutions[i].solution.trucks_routing;

		}
	}
	displaySolution(); // Call displaySolution() to display the new graph with the new solution
}
