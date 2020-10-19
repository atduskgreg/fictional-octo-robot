const ApeECS = require('ape-ecs');

class Position extends ApeECS.Component {
    
    constructor(){
        super();
 
        this.changeEvents = true; // this doesn't do anything
        this.x = 0;
        this.y = 0;
        this.prevX = 0;
        this.prevY = 0;
    }
    init(values)
    {
        this.x = values.x;
        this.y = values.y;
        this.prevX = this.x;
        this.prevY = this.y;
        this.constructor.changeEvents = true; // this is necessary
    }

    move(newPosition)
    {
        this.prevX = this.x;
        this.prevY = this.y;
        this.x = newPosition.x;
        this.y = newPosition.y;
        this.update(newPosition);
    }

}

module.exports = Position;