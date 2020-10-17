const ApeECS = require('ape-ecs');

class Spawner extends ApeECS.System {
    init(){
        this.spawnableQuery = this.createQuery().fromAll("Spawnable", "Position").persist();
    }

    update(){
        let map = this.world.getEntity("GameMap");
        let pathableField = map.getOne("PathableField");

        let candidateCells = [];
        for(var row = 0 ; row < pathableField.height; row++)
        {
            for(var col = 0 ; col < pathableField.width; col++)
            {
                if(pathableField.cells[row][col] == 1)
                {
                    candidateCells.push({col : col, row: row});
                }
            } 
        }

        const spawnables = this.spawnableQuery.execute();
        for(const spawnable of spawnables){
            let position = spawnable.getOne("Position");
            let spawnCell = candidateCells[Math.floor(Math.random() * candidateCells.length)];
            position.x = spawnCell.col;
            position.y = spawnCell.row;

            let destination = spawnable.getOne("Destination");
            let destinationCell = candidateCells[Math.floor(Math.random() * candidateCells.length)];
            destination.x = destinationCell.col;
            destination.y = destinationCell.row;
        }
    }
}

module.exports = Spawner;