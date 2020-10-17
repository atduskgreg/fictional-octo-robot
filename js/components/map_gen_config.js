const ApeECS = require('ape-ecs');

class MapGenConfig extends ApeECS.Component {
    constructor()
    {
        super();
        this.pathablePercent = 0;
        this.dimension = ApeECS.EntityRef;
    }

    init(values)
    {
       this.pathablePercent = values.pathablePercent;
       this.dimension = this.entity.getOne("Dimension");
    }
}

module.exports = MapGenConfig;