const ApeECS = require('ape-ecs');

class Name extends ApeECS.Component {
    constructor()
    {
        super();
        this.first = "";
        this.last = "";
        this.honorific = ""
    }

    init(values)
    {
        this.first = Utils.removeRand(Strings.firstNames);
        this.last = Utils.removeRand(Strings.lastNames);
        this.honorific = Utils.removeRand(Strings.honorifics);
    }

    toString()
    {
        let start = "";
        if(this.honorific.length > 0)
        {
            start = this.honorific + " " + this.first;
        }
        else
        {
            start = this.first;
        }

        return (start + " " +this.last);
    }
}

module.exports = Name;