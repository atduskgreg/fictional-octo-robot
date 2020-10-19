const ApeECS = require('ape-ecs');
const ROT = require('rot-js');

class PathFind extends ApeECS.System {
    init(){
        this.pathfindersQuery = this.createQuery().fromAll("Position", "Destination").persist();
    }

    update(currentTick){
        let map = this.world.getEntity("GameMap");
        let pathableField = map.getOne("PathableField");

        const pathfinders = this.pathfindersQuery.execute();
        for(const pathfinder of pathfinders){
            const position = pathfinder.getOne("Position");
            const destination = pathfinder.getOne("Destination");

            var dijkstra = new ROT.Path.Dijkstra(destination.x, destination.y, function(col,row){
                return (pathableField.cells[row][col] === 1);
            }, {topology : 4});

            let pathSteps = [];

            dijkstra.compute(position.x, position.y, function(x, y) {
                pathSteps.push({x : x, y: y})
            });

            if(pathSteps.length > 1)
            {

                position.x = pathSteps[1].x;
                position.y = pathSteps[1].y;

                position.update({x : position.x, y : position.y});
            }
            
            var rooms = map.rooms;
            var currentLocation = null;
            for(var i = 0; i < rooms.length; i++)
            {
                currentLocation = Utils.getContaingRoom(position.x, position.y);
            }
            var corridors = map.corridors;

            if(currentLocation == null)
            {
                for(var i = 0; i < corridors.length; i++)
                {
                    currentLocation = Utils.getContaingRoom(position.x, position.y);
                }  
            }

            pathfinder.getOne("Log").logEvent({action : "move", location : currentLocation});
        }

    }
}

module.exports = PathFind;