AFRAME.registerComponent("pellets", {

    init: function () {
      this.shootpellet();
    },

    setColor: function(){ 
        var letters = "0123456789ABCDEF";
        
        var color = '#';
        
        for (var i = 0; i < 6; i++){
        color += letters[(Math.floor(Math.random() * 16))];            
        }

        return color
    },
    
    shootpellet: function () {
      window.addEventListener("keyup", (e) => {
        if (e.key === "z") {
          var pellet = document.createElement("a-entity");
  
          pellet.setAttribute("geometry", {
            primitive: "sphere",
            radius: 0.1,
          });

          var elColor = this.setColor();
  
          pellet.setAttribute("material", "color", elColor);
  
          var cam = document.querySelector("#camera");
  
          pos = cam.getAttribute("position");
  
          pellet.setAttribute("position", {
            x: pos.x,
            y: pos.y,
            z: pos.z,
          });
  
          var camera = document.querySelector("#camera").object3D;
  
          //get the camera direction as Three.js Vector
          var direction = new THREE.Vector3();
          camera.getWorldDirection(direction);
  
          //set the velocity and it's direction
          pellet.setAttribute("velocity", direction.multiplyScalar(-10));
  
          var scene = document.querySelector("#scene");
  
          //set the pellet as the dynamic entity
          pellet.setAttribute("dynamic-body", {
            shape: "sphere",
            mass: "0",
          });

          scene.appendChild(pellet);  
          //add the collide event listener to the pellet
          pellet.addEventListener("collide", this.removepellet);

          this.shootSound();

          //lifetime
          var lifeTime = 100
          setInterval(()=>{
            lifeTime -= 1;
            if(lifeTime === 0){
                pellet.removeEventListener("collide", this.removepellet);
  
                //remove the pellets from the scene
                var scene = document.querySelector("#scene");
                scene.removeChild(pellet);       
            }
          },1000)


        }
      });
    },
    removepellet: function (e) {
      console.log(e)
      //pellet element
      var element = e.detail.target.el;
      var pos = element.getAttribute("position");
      pos.z -= 0.2
      console.log(pos)
  
      //element which is hit
      var elementHit = e.detail.body.el;
      console.log(elementHit.getAttribute("rotation"))

        elementHit.setAttribute("material", {
          opacity: 1,
          transparent: true,
        });
  
        //impulse and point vector
        var impulse = new CANNON.Vec3(-2, 2, 1);
        var worldPoint = new CANNON.Vec3().copy(
          elementHit.getAttribute("position")
        );
  
        elementHit.body.applyImpulse(impulse, worldPoint);
  
        //remove event listener
        element.removeEventListener("collide", this.shoot);
  
        //remove the pellets from the scene
        var scene = document.querySelector("#scene");
        scene.removeChild(element);

        var paintEl = document.createElement("a-entity");
        paintEl.setAttribute("position", pos)
        paintEl.setAttribute("material", {
          color: element.getAttribute("material").color,
          src: "./images/download.jpeg",
          repeat: "1 1 1"
        });
        paintEl.setAttribute("geometry", {primitive: "box", width: 0.5, height:0.5, depth:0.5})
        scene.appendChild(paintEl)
        console.log(paintEl.getAttribute("geometry"))
        var lifeTime = 10
        setInterval(()=>{
          lifeTime -= 1;
          if(lifeTime === 0){
              paintEl.removeEventListener("collide", this.shoot);

              //remove the pellets from the scene
              var scene = document.querySelector("#scene");
              scene.removeChild(paintEl);       
          }
        },1000)
      
    },
    shootSound: function(){
      var entity = document.querySelector("#sound1");
      entity.components.sound.playSound();
    }
  });
  
  