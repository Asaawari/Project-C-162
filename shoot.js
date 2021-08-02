AFRAME.registerComponent("balls", {
  init: function () {
    this.shootBall();
    this.removeBall();
  },
  shootBall: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var ball = document.createElement("a-entity");

        ball.setAttribute("gltf-model", "#ball");

        var cam = document.querySelector("#camera");

        pos = cam.getAttribute("position");

        ball.setAttribute("position", {
          x: pos.x,
          y: pos.y,
          z: pos.z,
        });

        ball.setAttribute("scale", {
          x: 2.5, y:2.5, z:2.5
        });

        var camera = document.querySelector("#camera").object3D;

        //get the camera direction as Three.js Vector
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        //set the velocity and it's direction
        ball.setAttribute("velocity", direction.multiplyScalar(-10));

        var scene = document.querySelector("#scene");

        ball.setAttribute("dynamic-body", {
          shape: "sphere",
          mass: "10",
        });

        scene.appendChild(ball);
      }
    });
  },
  removeBall: function(e){
    var element = e.detail.target.el
    var elementHit = e.detail.body.el
    if(elementHit.id.includes("pin")){
       
    var impulse = new CANNON.Vec3(-10, 10, 5)
    var worldPoint = new CANNON.Vec3().copy(
      elementHit.getAttribute("position"));

      elementHit.body.applyImpulse(impulse, worldPoint)

    element.removeEventListener("collide", this.removeBall)

    var scene = document.querySelector("#scene")

    scene.removeChild(element)
  }}
});


