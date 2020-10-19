const ApeECS = require('ape-ecs');

class Position extends ApeECS.Component {
    
    constructor(){
        super();

        this.changeEvents = true;
        this.x = 0;
        this.y = 0;
    }
    init(values)
    {
        this.x = values.x;
        this.y = values.y;
        this.constructor.changeEvents = true; // this is necessary
    }

}

module.exports = Position;