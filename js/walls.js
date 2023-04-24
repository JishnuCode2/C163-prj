AFRAME.registerComponent("walls", {
    schema: {
      height: {type: "number", default:5},
      width:{type: "number", default:10},
      depth: {type: "number", default:1},
    },

    setColor: function(){
        var letters = "0123456789ABCDEF";
        
        var color = '#';
        
        for (var i = 0; i < 6; i++){
        color += letters[(Math.floor(Math.random() * 16))];            
        }

        return color
    },

    genRandInt: function(min, max, int){
        var min = Math.ceil(min);
        var max = Math.floor(max);
        var rotation = (Math.floor(Math.random() * (max - min) + min))*int; 
        return rotation    
    },
 
    init: function(){
    
     //keep the loop counter very less if the scene is not loading
     for(var i=0; i<10 ;i++){
       var box = document.createElement("a-entity");
 
       box.setAttribute("id", "wall" + i);
 
       posX = this.genRandInt((-35), 35, 1);
       posY = 1.5;
       posZ = this.genRandInt((-60), (-10), 1)
       
       var rotationY = this.genRandInt(0, 3, 90)
  
       position = {x: posX, y:posY, z:posZ};
       box.setAttribute("position", position);
 
       box.setAttribute("geometry",{
         primitive: "box",
         height: this.data.height,
         width: this.data.width,
         depth: this.data.depth
       });

       var elColor= this.setColor()
 
       box.setAttribute("material",{
         color: elColor,

       });

       box.setAttribute("rotation", {x:0, y:rotationY, z:0})
 
       box.setAttribute("static-body", {});
 
       var sceneEl = document.querySelector("#scene");
       sceneEl.appendChild(box)
     }
    }
})