const ApeECS = require('ape-ecs');
const ROT = require('rot-js');

class MapGenerator extends ApeECS.System {
    init(){
    }

    update(){
        let map = this.world.getEntity("GameMap");

        let generatedMap = new ROT.Map.Uniform(map.c.Dimension.width, 
                                       map.c.Dimension.height, 
                                       {roomDugPercentage : map.c.MapGenConfig.pathablePercent});

        let pathableField = map.getOne("PathableField");
        generatedMap.create(function(x, y, wall) {
            pathableField.cells[y][x] = (wall ? 0 : 1);
            if(x == generatedMap._width-1 && y == generatedMap._height-1)
            {
                map.rooms = generatedMap.getRooms();
                for(var i = 0; i < map.rooms.length; i++){
                    var room = map.rooms[i];
                    room.name = Utils.removeRand(Strings.roomNames);
                }
                map.corridors = generatedMap.getCorridors();
                for(var i = 0; i < map.corridors.length; i++){
                    var corridor = map.corridors[i];
                    corridor.name = "hallway";
                }
            }
            
        });

    }
}

module.exports = MapGenerator;