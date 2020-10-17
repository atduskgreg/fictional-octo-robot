const ApeECS = require('ape-ecs');

class PathableField extends ApeECS.Component {
    constructor(){
        super();
        this.cells = [];
        this.width = 0;
        this.height = 0;
    }

    init(values)
    {  
        this.width = values.width;
        this.height = values.height;
        for(let row = 0; row < this.height; row++)
        {
            this.cells[row] = [];
            for(let col = 0; col < this.width; col++)
            {
                this.cells[row][col] = 0;
            }
        }
    }
}

module.exports = PathableField;