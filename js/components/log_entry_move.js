const ApeECS = require('ape-ecs');

const Utils = require("../utils");

class LogEntryMove extends ApeECS.Component{
    constructor(mover, fromPosition, toPosition)
    {
        super();
        this.fromX = fromPosition.x;
        this.fromY = fromPosition.y;

        this.toX = toPosition.x;
        this.toY = toPosition.y;

        this.mover = mover;

        let room = Utils.getContaingRoom(this.toX, this.toY);
        this.roomName = "hallway";
        if(room != null){ this.roomName = room.name; }

    }

    init(values)
    {
        this.fromX = values.fromPosition.x;
        this.fromY = values.fromPosition.y;

        this.toX = values.toPosition.x;
        this.toY = values.toPosition.y;

        this.mover = values.mover;
    }

    toString()
    {

        return this.mover.getOne("Name").toString() + " moved through the " + this.roomName;
    }
}

module.exports = LogEntryMove;