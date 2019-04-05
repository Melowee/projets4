function tuto() {
  document.getElementById('slidecontainer').style.display = 'none';
  document.getElementById('mydivheader').innerHTML = 'Click on a client to edit his demande';
  for (var i = 1; i < jsonIssues.C + 1; i++) {
  	document.getElementById('valueNode'+(i)).innerHTML='[1,1]';
  }
  data.edges = [];
  var container = document.getElementById('network');
  network = new vis.Network(container, data, options);
  network.on("click", function(params) {
  	displaySlider(params);
  });

  $(function(){
    var introguide = introJs();
    introguide.setOptions({
    steps: [
        {
          element: '#draggable',
          intro: 'You should read and click on next.',
          position: 'bottom'
        },
        {
          element: '#network',
          intro: 'Just click on a node different then depôt.Then click on next',
          position: 'bottom'
        },
        {
          element: '#draggable',
          intro: 'If you want, you can change the value of the slider and click on validate. ',
          position: 'bottom'
        },
        {
          element: '#resultats',
          intro: 'The values of the clicked node have just changed.',
          position: 'bottom'
        },
        {
          element: '#network',
          intro: 'And the graph just changed !',
          position: 'bottom'
        },
        {
          element: '#infoParametres',
          intro: 'If you want you can retry with an other vehicles capacity !',
          position: 'bottom'
        }
    ],
    showProgress:true,
    showBullets: false
  });
  introguide.start();
  });
}
