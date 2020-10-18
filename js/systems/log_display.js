const ApeECS = require('ape-ecs');

class LogDisplay extends ApeECS.System {
    init(){
        this.logQuery = this.createQuery().fromAll("Log").persist();
    }

    update(currentTick)
    {
        const loggables = this.logQuery.execute();
        let prevRoom = "";
        document.getElementById("log").innerHTML = "";
        for(const loggable of loggables){
            let logHTML = "<div class='log'><h2>The Account of " + loggable.c.Name.toString() + "</h2>";
            let entries = [];

            let firstEvent = true;
            for(const logEvent of loggable.c.Log.events)
            {
                // TODO: check for lack of movement between turns
                if(logEvent.location != null) // TODO: these are passageways
                {
                    let locationString = ""
                    if(logEvent.location.constructor.name == "Room")
                    {
                        locationString = "the " + logEvent.location.name
                    }
                    else
                    {
                        locationString = "a " + logEvent.location.name
                    }

                    let destinationString = "";
                    if(firstEvent == true)
                    {
                        var room = Utils.getContaingRoom(loggable.c.Destination.x, loggable.c.Destination.y);

                        if(room)
                        {
                            destinationString = " on their way to the " + room.name;
                        }
                        firstEvent = false;
                    }

                    if(logEvent.location.name != prevRoom)
                    {

                        var msg = loggable.c.Name.toString() + " entered " + locationString + destinationString + ".";

                        var roomContents = Utils.getRoomContents(logEvent.location);
                        
                        for(var i = 0; i < roomContents.length; i++)
                        {   if(roomContents[i] != loggable)
                            {
                            
                                entries.push("They see " + roomContents[i].c.Name.toString() + ".");

                            }
                        }
                        entries.push(msg);

                    }
                    else
                    {
                        entries.push(loggable.c.Name.toString() + " moved through " + locationString + destinationString);

                    }
                    prevRoom = logEvent.location.name;
                }
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