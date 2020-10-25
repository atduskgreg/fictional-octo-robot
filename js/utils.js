Utils = function(){ return {
    rectContains : function(x,y, startX, startY, endX, endY){
        let result = false;
        if(x >= startX && x <= endX){
            if(y >= startY && y <= endY)
            {
                result = true; 
            }
        }
        return result;
    },

    getContaingRoom : function(x, y)
    {
        let map = Game.world.getEntity("GameMap");
        let rooms = map.rooms;
        let result = null;
        for(var i = 0; i < rooms.length; i++)
            {
                var room = rooms[i];
                var inRoom = Utils.rectContains(x, y, room.getLeft(), room.getTop(), room.getRight(), room.getBottom());
                if(inRoom == true)
                {
                    result = room;
                }
        }

        return result;
    },

    getRoomContents : function(room){
        var positionQuery = Game.world.createQuery().fromAll("Position");
        var positionedThings = positionQuery.execute();

        var result = [];
        for(const thing of positionedThings)
        {
            var thingRoom = Utils.getContaingRoom(thing.c.Position.x, thing.c.Position.y);
            if(thingRoom != null && thingRoom.name == room.name)
            {
                result.push(thing);
            }

        }

        return result;
    },

    removeRand : function(arr) {
        var idx = Math.floor(Math.random() * arr.length);
        return arr.splice(idx, 1)[0];
    },

    getRand : function(arr) {
        var idx = Math.floor(Math.random() * arr.length);
        return arr[idx];
    },

    getRandNot : function(arr, target){
        var filtered = arr.filter(function(a){ return a != target });
        return Utils.getRand(filtered);
    }
}}();

module.exports = Utils;