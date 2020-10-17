const ApeECS = require('ape-ecs');


class DebugDisplay extends ApeECS.System {
    init(){
        this.drawablesQuery = this.createQuery().fromAll("Display", "Position").persist();
        this.destinationQuery = this.createQuery().fromAll("Destination").persist();
    }

    update(currentTick){
        let map = this.world.getEntity("GameMap");

        
        let result = "<table cellspacing='0' cellpadding='0'>";

        let pathableField = map.getOne("PathableField");
        for(var row = 0; row < map.c.Dimension.height; row++){
            result = result + "<tr>";
            for(var col = 0; col < map.c.Dimension.width; col++){
                result = result + "<td ";
                result = result + "class='"+ (pathableField.cells[row][col] == 1 ? "floor" : "wall") +"' ";
                result = result + "id='"+col+"x"+row+"'>&nbsp;</td>";
            } 
            result = result + "</tr>";
        }
        result = result + "</table>";

        const drawables = this.drawablesQuery.execute();
        document.getElementById("display").innerHTML = result;
        for(const drawable of drawables){
            const position = drawable.getOne("Position");
            const display = drawable.getOne("Display");
            document.getElementById(position.x+"x"+position.y).innerHTML = document.getElementById(position.x+"x"+position.y).innerHTML + " " +display.sprite;
        }

        const destinations = this.destinationQuery.execute();
        for(const destination of destinations){
            const destPos = destination.getOne("Destination");
            document.getElementById(destPos.x+"x"+destPos.y).innerHTML = document.getElementById(destPos.x+"x"+destPos.y).innerHTML + "x";
        }

    }
}

module.exports = DebugDisplay;