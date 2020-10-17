const ApeECS = require('ape-ecs');

class Dimension extends ApeECS.Component {
    constructor(){
        super();
        this.width = 0;
        this.height = 0;
    }

    init(values)
    {
        this.width = values.width;
        this.height = values.height;
    }
}

module.exports = Dimension;