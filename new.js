<html><head>
  
  <script src="three.js"></script>
  <script src="https://www.cs.uaf.edu/2015/spring/cs482/demo/pixanvil_2015_01/pixanvil.js"></script>
  <script src="https://www.cs.uaf.edu/2015/spring/cs482/demo/pixanvil_2015_01/gpu1D.js"></script>
  <script src="https://www.cs.uaf.edu/2015/spring/cs482/demo/pixanvil_2015_01/gpu2D.js"></script>
  <link rel="stylesheet" href="https://www.cs.uaf.edu/2015/spring/cs482/demo/pixanvil_2015_01/pixanvil.css">
</head>
<body onload="PixAnvil.create(['Loop','Setup','UI',])">
<H1>PixAnvil/Three.js demo</H1>
<table class="pixanvil" id="draggable_outer">
<tr>
	<td id="draggable_left" style="width:40%">
<p id="#errors" style="color:red;">Er, JavaScript or <a href="http://get.webgl.org/">WebGL</a> doesn't seem to be running, so basically all you're going to see is the bare code...</p>

<table class="tabbed" style="width:100%;height:100%">
<tr><td>
	<p id="tabHeaders">
</td></tr>
<tr><td height="99%">
<textarea class="tabBox" id="tab_Loop" rows="25" cols="30">
// Loop over particles, and animate them
for (var i=0;i<sim.nparticles;i+=2) {
  var P=sim.particles.vertices[i];

  // Newtonian physics:
  P.V.z+=-0.4*lib.dt; // accelerate downwards
  P.V.x+=0.02*lib.dt; // wind force
  P.add(P.V.t(lib.dt)); // P += V * dt
  
  if (P.z<=0.0) { // hit the ground
    // teleport to top of volcano
    P.rand(0.1);  P.z=1.0;

    // make new velocity
    var activity=1.0+Math.sin(lib.time);
    P.V.randSphere(activity);
    P.V.z+=activity;
  }

  // Also update shadow's location
  P.shadow.x=P.x; P.shadow.y=P.y; P.shadow.z=0.0;
  if (P.shadow.length()<1.05) { // climb cinder cone
     P.shadow.z=1.05-P.shadow.length();
  } 
}

// Update the vertex buffer object (VBO)
sim.particles.verticesNeedUpdate = true;


</textarea>


<textarea class="tabBox" id="tab_Setup" rows="25" cols="30">
// create the particle variables
sim.particles = new THREE.Geometry();
sim.nparticles = 20000;

// now create the individual particles
for (var i = 0; i < sim.nparticles; i+=2) {
   var P = new vec3; // P for particle or position
   P.x=P.y=0; P.z=1;
   P.V=(new vec3).randSphere(0.5); // initial random velocity
   P.shadow=new vec3(0,0,0); // location of shadow

  // add it to the geometry
  sim.particles.vertices.push(P); // particle
  sim.particles.vertices.push(P.shadow); // shadow

  // Pick a random color
  var color=0xffFFff*Math.random();
  color = color & 0xf08020; // bitwise mask
  sim.particles.colors.push(new THREE.Color(color));
  sim.particles.colors.push(new THREE.Color(0x000000)); // shadow
}

// create the particle system
sim.particleSystem = new THREE.PointCloud(
    sim.particles,
    new THREE.PointCloudMaterial({
      // color: 0xFFFFFF, // for fixed color
      vertexColors: THREE.VertexColors,
      size: 0.03, // size of dots, in meters
      //blending: THREE.AdditiveBlending,
      //transparent: true
}));

// Z-sort particles before drawing (for transparency)
// sim.particleSystem.sortParticles = true;

// add it to the scene
scene.add(sim.particleSystem);
// Particle system code is adapted from http://aerotwist.com/tutorials/creating-particles-with-three-js/


// Make an emitter cone

// Ground
// var groundTex=THREE.ImageUtils.loadTexture("https://www.cs.uaf.edu/2015/spring/cs482/demo/pixanvil_2013/checkerboard_noisy.jpg" );
// groundTex.wrapS=groundTex.wrapT=THREE.RepeatWrapping;
// groundTex.repeat=new vec2(25.0,25.0);

// sim.ground = new THREE.Mesh(
  // new THREE.BoxGeometry(50,50,0.0001),
  // new THREE.MeshLambertMaterial( {
     // color: 0xaaccff, opacity: 1, // map:groundTex
  // })
// );
// sim.ground.position.z=0;  /* ground is at Z=0 */
// sim.ground.receiveShadow=true;
// scene.add(sim.ground);

// Sun-like spotlight (shadows help you see depth)
// var l=new THREE.SpotLight();
// sim.light = l;
// l.position.set( -50, -100, 100 );
// l.castShadow=true;
// l.shadowCameraNear = 50; 
// l.shadowCameraFar = 500; 
// l.shadowCameraFov = 10; // degrees field of view
// scene.add(l);

//camera.lookAt(scene.position);






</textarea>


<textarea class="tabBox" id="tab_UI" rows="25" cols="30">  

</textarea>


<div class="tabDiv" id="tab_Save" ></div>
<div class="tabDiv" id="tab_Stats" > </div>

</td></tr>
<tr><td>
<p id="timeControl">
</td></tr>
</table>

	</td>
	<td id="draggable_thumb"> </td>
	<td id="draggable_right">  <div id="renderer" style="width:99%;" /> </td>
</tr>
</table>

</body>
</html>
