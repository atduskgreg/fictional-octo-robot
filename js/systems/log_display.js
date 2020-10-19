const ApeECS = require('ape-ecs');

class LogDisplay extends ApeECS.System {
    init(){
        this.logQuery = this.createQuery().fromAll("Log").persist();
    }

    update(currentTick)
    {
        const loggables = this.logQuery.execute();

        document.getElementById("log").innerHTML = "";
        for(const loggable of loggables){
            let logHTML = "<div class='log'><h2>The Account of " + loggable.c.Name.toString() + "</h2>";
            let entries = [];

            for(const logEvent of loggable.c.Log.events){
                entries.push(logEvent.toString());
            }

            logHTML = logHTML + "<ul>";
            for(var i = 0; i < entries.length; i++)
            {
                logHTML = logHTML + "<li>" + entries[i]  + "</li>";
            }
            logHTML = logHTML + "</ul>";
            logHTML = logHTML + "</div>";
            document.getElementById("log").innerHTML = document.getElementById("log").innerHTML + logHTML;
        }
    }
}

module.exports = LogDisplay;