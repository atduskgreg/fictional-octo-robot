const ApeECS = require('ape-ecs');

class Log extends ApeECS.Component{
    constructor()
    {
        super();
        this.events = [];
    }

    init(values)
    {

    }

    logEvent(eventData){
        this.events.push(eventData);
    }
}

module.exports = Log;