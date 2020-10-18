const ApeECS = require('ape-ecs');

class Position extends ApeECS.Component {
    
    constructor(){
        super();
        this.x = 0;
        this.y = 0;
        this.changeEvents = true;
    }
    init(values)
    {
        this.x = values.x;
        this.y = values.y;
    }

    update(values)
    {
        console.log("Position#update");
        this.x = values.x;
        this.y = values.y;
    }
}

module.exports = Position;