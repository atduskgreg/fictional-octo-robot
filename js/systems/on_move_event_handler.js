const ApeECS = require('ape-ecs');

class OnMoveEventHandler extends ApeECS.System {
    init(){
        this.subscribe("Position");
    }

    update(){
        console.log(this.changes); // this has 3 adds the first time
                                   // then is always [] after
    }
}

module.exports = OnMoveEventHandler;