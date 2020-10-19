const ApeECS = require('ape-ecs');
const Utils = require('../utils');
const LogEntryMove = require('../components/log_entry_move');
const LogEntryChangeRoom = require('../components/log_entry_change_room');

class OnMoveEventHandler extends ApeECS.System {
    init(){
        this.subscribe("Position");
    }

    update(){
        this.changes.forEach(change => {
            let entity = this.world.getEntity(change.entity);
            let prevRoom = Utils.getContaingRoom(entity.c.Position.prevX, entity.c.Position.prevY);
            let currentRoom = Utils.getContaingRoom(entity.c.Position.x, entity.c.Position.y);
            
            let log = entity.getOne("Log");

            if(currentRoom != prevRoom)
            {
                var currentRoomName = "hallway";
                if(currentRoom){ currentRoomName = currentRoom.name }

                var prevRoomName = "hallway";
                if(prevRoom){ prevRoomName = prevRoom.name }

                log.logEvent(new LogEntryChangeRoom(entity, prevRoomName, currentRoomName));
            }
            else
            {
                var prevPoint = {x: entity.c.Position.prevX, y: entity.c.Position.prevY}
                var currPoint = {x: entity.c.Position.x, y: entity.c.Position.prevY}

                log.logEvent(new LogEntryMove(entity, prevPoint, currPoint));
            }
            
        });
    }
}

module.exports = OnMoveEventHandler;