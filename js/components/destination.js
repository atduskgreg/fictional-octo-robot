const ApeECS = require('ape-ecs');

class Destination extends ApeECS.Component {
    constructor(){
        super();
        this.x = 0;
        this.y = 0;
    }

    init(values)
    {
        this.x = values.x;
        this.y = values.y;
    }
}

module.exports = Destination;