const ApeECS = require('ape-ecs');
const ROT = require('rot-js');

const Utils = require('./utils');

const Log = require('./components/log');
const Name = require('./components/name');
const Spawnable = require('./components/spawnable');
const Position = require('./components/position');
const Destination = require('./components/destination');
const Dimension = require('./components/dimension');
const MapGenConfig = require('./components/map_gen_config');
const PathableField = require('./components/pathable_field');
const Display = require('./components/display');

const Spawner = require('./systems/spawner');
const PathFind = require('./systems/path_find');
const MapGenerator = require('./systems/map_generator');
const LogDisplay = require('./systems/log_display');
const DebugDisplay = require('./systems/debug_display');

const OnMoveEventHandler = require('./systems/on_move_event_handler');

Strings = {
    roomNames : ["Parlor", "Dining Room", "Library", "Kitchen", "Master Bedroom", "Pantry", "Lounge", "Family Room", "Bathroom"],
    firstNames : ["John", "Emily", "Cat", "Reginald"],
    lastNames : ["Longbottom", "Smith", "Winters"],
    honorifics : ["", "", "", "", "Mr.", "Mrs.", "Count", "Sir", "Officer"]
}

const world = new ApeECS.World();

world.registerComponent(Position);
world.registerComponent(Destination);
world.registerComponent(Dimension);
world.registerComponent(Display);
world.registerComponent(MapGenConfig);
world.registerComponent(PathableField);
world.registerComponent(Spawnable);
world.registerComponent(Log);
world.registerComponent(Name);

world.registerSystem("pathfinder", PathFind);
world.registerSystem("debugDisplay", DebugDisplay);
world.registerSystem("mapGenerator", MapGenerator);
world.registerSystem("spawner", Spawner);
world.registerSystem("logDisplay", LogDisplay);
world.registerSystem("onMoveEventHandler", OnMoveEventHandler);



const GameMap = world.createEntity({
    id : 'GameMap',
    c : {
        Dimension : {
            width : 20,
            height : 20
        },
        MapGenConfig : {
            pathablePercent : 0.9
        },
        PathableField : {
            width : 20,
            height : 20
        }
    }
});

let numMovers = 3;
for(var i = 0; i < numMovers; i++)
{
    world.createEntity({
        c : {
            Position : {},
            Destination : {},
            Spawnable : {},
            Display : {
                sprite : "👨"
            },
            Log : {},
            Name : {}
        }
    });
}

Game = {
    init : function(){
        world.runSystems("mapGenerator");
        world.runSystems("spawner");        
    },
    
    update : function()
    {
        // actions
        world.runSystems("pathfinder");

        // events
        world.runSystems("onMoveEventHandler");

        // display
        world.runSystems("debugDisplay");
        world.runSystems("logDisplay");

    },
    world : world
}

module.exports.Game = Game;