const ApeECS = require('ape-ecs');

class Display extends ApeECS.Component {
    constructor(){
        super();
        this.sprite = "@";
    }

    init(values)
    {
        this.sprite = values.sprite;
    }
}

module.exports = Display;