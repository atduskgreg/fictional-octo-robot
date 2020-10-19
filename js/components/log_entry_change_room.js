const ApeECS = require('ape-ecs');

class LogEntryChangeRoom extends ApeECS.Component{
    constructor(mover, fromRoom, toRoom)
    {
        super();
        this.fromRoom = fromRoom;
        this.toRoom = toRoom;
        this.mover = mover;
    }

    init(values)
    {
        this.fromRoom = values.fromRoom;
        this.toRoom = values.toRoom;
        this.mover = values.mover;

    }
    toString()
    {
        return this.mover.getOne("Name").toString() + " entered the " + this.toRoom;
    }
}

module.exports = LogEntryChangeRoom;