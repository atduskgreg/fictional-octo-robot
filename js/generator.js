/*
var tracery = require('tracery-grammar');
var grammar = tracery.createGrammar(require('./data/rooms.json'));
grammar.addModifiers(tracery.baseEngModifiers);
module.exports = grammar;
*/
const Utils = require('./utils');


Strings = {
    roomNames : ["Parlor", "Dining Room", "Library", "Kitchen", "Master Bedroom", "Pantry", "Lounge", "Family Room", "Bathroom"],
    firstNames : ["John", "Emily", "Kat", "Reginald", "Martin", "George", "Elizabeth"],
    lastNames : ["Longbottom", "Smith", "Winters"],
    honorifics : ["", "", "", "", "Mr.", "Mrs.", "Count", "Sir", "Officer"]
}

var Plot = {};

class Character {
    constructor(){
        this.first = Utils.removeRand(Strings.firstNames);
        this.id = Math.random();
      //  this.last = Utils.getRand(Strings.lastNames);
      //  this.honorific = Utils.removeRand(Strings.honorifics);
    }

    toString()
    {
        return this.first;
    }

    /*toString()
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
    }*/
}

var numCharacters = 6;

// create character placeholders

Plot.characters = [];
for(var i = 0; i < numCharacters; i++)
{
    Plot.characters.push(new Character());
}


// list of relationship types
let relationships = [
    {
        type : "spouse",
        assignToTarget : "spouse"
    },
    {
        type : "lover",
        assignToTarget : "lover",
        exclusions : ["spouse"]
    },
    {
        type : "child",
        assignToTarget : "parent",
        exclusions : ["spouse"]
    },
    {
        type : "business partner",
        assignToTarget : "business partner",
        exclusions : ["employee", "employer"]
    },
    {
        type : "employee",
        assignToTarget : "employer",
        exclusions : ["business partner"]
    },
    
]

let relationshipInverses = {};
relationships.forEach(rel => {
    relationshipInverses[rel.type] = rel.assignToTarget;
    relationshipInverses[rel.assignToTarget] = rel.type;

});

let relationshipTypes = relationships.map(rel => rel.type);

class Relationship
{
    constructor(fromChar, toChar, relType)
    {
        this.from = fromChar;
        this.to = toChar;
        this.type = relType;
    }
}

// assign relationships to characters
// every character should have at least one relationship

Plot.addCharacterRelationship = function(char1, char2, relationship)
{
    if(Plot.relationships[char1.first] == null)
    {
        Plot.relationships[char1.first] = []; 
    }

    if(Plot.relationships[char2.first] == null)
    {
        Plot.relationships[char2.first] = []; 
    }

    let existingRelationships = Plot.relationships[char1.first].filter(rel => {
        return (rel.to == char2) && (rel.type == relationship.type);
    });

    if(existingRelationships.length < 1)
    {
        Plot.relationships[char1.first].push(new Relationship(char1, char2, relationship.type));
        Plot.relationships[char2.first].push(new Relationship(char2, char1, relationship.assignToTarget));
    }
    
}

Plot.relationships = {};

// make the starting relationship between the killer and victim


// translate kller-victim relationship into motives


// TODO: description should link into a Tracery grammar
// there's room for
Motives = {
    "child" : [
        {
            description : "because they learned they'd been cut out of the will",
            requiredRelationships : [
            {
                from : "victim",
                type : "parent",
                toCriteria : [{not : "killer"}]
                // could we add a modifier to this relationship to indicate that this was the favorite/inheriting child?
            }]
        },
        {
            description: "after enduring years of abuse",
            requiredRelationships : []
        }
    ],
    "parent" : [
        {
            description : "out of fear their incest would be discovered",
            requiredRelationships : [
                {
                    from : "killer",
                    type : "lover",
                    toCriteria : [{is : "victim"}]
                }
            ]
        },
    ],
    "business partner" : [
        {
            description : "to hide their embezzlement",
            requiredRelationships : []
        },
        {
            description : "after discovering they were having an affair with their wife",
            requiredRelationships : [
                {
                    from : "victim",
                    type : "lover",
                    toCriteria : [{ spouse : "killer"}]
                }
            ]
        }
    ],
    "employee" : [
        {
            description : "to hide their embezzlement",
            requiredRelationships : []
        }
    ],
    "employer" : [
        {
            description : "after being fed up with years of broken promises of promotion",
            requiredRelationships : []
        }
    ],
    "spouse" : [
        {
            description : "after discovering their spouse was cheating",
            requiredRelationships : [
                {
                    from : "victim",
                    type : "lover",
                    toCriteria : [{not : "killer"}]
                },
                {
                    from : "killer",
                    type : "spouse",
                    toCriteria : [{is : "victim"}]
                }
            ]
        }
    ],
    "lover" : [
        {
            description : "after discovering their secret marriage",
            requiredRelationships : [
                {
                    from : "victim",
                    type : "spouse",
                    toCriteria : [{not : "killer"}]
                }
            ]
        }
    ]
}

Plot.findRelationship = function(from, type, toCriteria)
{
    console.log("looking for type: " + type);
    let existingRelationships = Plot.relationships[from.first];
    let matches = existingRelationships.filter(relationship => {
        console.log("relationship.type: " + relationship.type);
        if(relationship.type != type)
        {
            return false;
        }
        else {
            console.log("type exists");
            let matchesAll = true;
            if(toCriteria != null)
            {
                console.log("toCriteria");
                console.log(toCriteria);
                toCriteria.forEach(criterion => {
                    console.log(criterion);
                    if(criterion.not != null){
                        console.log("not");
                        console.log(criterion);
                        matchesAll = matchesAll && (relationship.to != criterion.not);
                    }
        
                    if(criterion.is != null){
                        console.log("is");
                        console.log(criterion);
                        matchesAll = matchesAll && (relationship.to == criterion.is);
                    }

                    relationshipTypes.forEach(relType => {
                        if(criterion[relType] != null){
                            console.log("{is: criterion[relType]}");
                            console.log(criterion[relType]);

                            var relToRelationships = Plot.findRelationship(relationship.to, relType, [{is: criterion[relType]}]);
                            matchesAll = matchesAll && (relToRelationships && relToRelationships.length > 0);
                        }
                    });
                });
            }
            return matchesAll;   
        }
    });

    return matches;

}

Plot.subCharacter = function(roleName, killer, victim)
{
    if(roleName == "killer"){
        return killer;
    }
    else if(roleName == "victim"){
        return victim;
    }
    else {
        return false;
    }
}








// how to generate a motive

// stop generating so many relationships
// just generate one
// that will be the relationship between the killer and the victim
let killer = Utils.getRand(Plot.characters);
let victim = Utils.getRandNot(Plot.characters, killer);
var rel = Utils.getRand(relationships);

Plot.addCharacterRelationship(killer, victim, rel);

let murderousRelationship = Plot.relationships[killer.first][0];
// look up the available motives for the killer's relationship to the victim
// pick one at random
let motiveData = Utils.getRand(Motives[murderousRelationship.type]);

console.log(killer.toString() + " killed " + victim.toString() + ", their " + relationshipInverses[murderousRelationship.type] + ", " + motiveData.description);
//console.log(motiveData);
// a relationship looks like:
/*
    {
        from : "victim",
        type : "spouse",
        toCriteria : [{not : "killer"}]
    }
 */
// this is saying that this motive requires the victim to have a spouse who is not the killer
// another example:
/*
    {
        from : "victim",
        type : "lover",
        toCriteria : [{ spouse : "killer"}]
    }
*/
// this is saying that this motive requires the victim to have a lover whose spouse is the killer
motiveData.requiredRelationships.forEach(reqRelationship => {
    reqRelationship.from = Plot.subCharacter(reqRelationship.from, killer, victim);

    var targetForRelationship = null;
    if(reqRelationship.toCriteria != null)
    {
        // create any needed foundational relationships
        reqRelationship.toCriteria.forEach(criterion =>{ 
            
            relationshipTypes.forEach(relType => {
                if(criterion[relType] != null){
                  criterion[relType] = Plot.subCharacter(criterion[relType], killer, victim);

                  // now create a character and given them  a relType relationship 
                  // with criterion[relType] (eg. the named participant)
                  var newChar = new Character();
                  targetForRelationship = newChar;

                  Plot.characters.push(newChar);
                  Plot.addCharacterRelationship(criterion[relType], newChar, {type : relType, assignToTarget : relationshipInverses[relType]});
                }
            })

            if(criterion.not != null)
            {
                // create a relationship for reqRelationship.from 
                //                   of type reqRelationship.type
                //    with anyone other than criterion.not
                
                criterion.not = Plot.subCharacter(criterion.not, killer, victim)
                
                var relationshipTarget = Plot.characters.filter(c => { return (c != criterion.not && c != reqRelationship.from) })[0];

                if(relationshipTarget == undefined)
                {
                    relationshipTarget = new Character();
                    Plot.characters.push(relationshipTarget);
                }
                
                Plot.addCharacterRelationship(reqRelationship.from, relationshipTarget, {type : reqRelationship.type, assignToTarget : relationshipInverses[reqRelationship.type]});
            }

            if(criterion.is != null)
            {
                // create a relationship for reqRelationship.from 
                //                   of type reqRelationship.type
                //            with than criterion.is
                criterion.is = Plot.subCharacter(criterion.is, killer, victim)
                Plot.addCharacterRelationship(reqRelationship.from, criterion.is, {type : reqRelationship.type, assignToTarget : relationshipInverses[reqRelationship.type]})
            }
        });

        if(targetForRelationship != null)
        {
            Plot.addCharacterRelationship(reqRelationship.from, targetForRelationship, {type : reqRelationship.type, assignToTarget : relationshipInverses[reqRelationship.type]});
        }
    }
});
// we need to first resolve the "victim" and "killer" pointers to be the real characters
// now we can treat this as a work ticket for one or more relationships that we'll need to create
// first check the criteria
// for each of its keys that are other than are relationship types
//  - create a relationship of that type between the resolved character and a 
//    random other character (that is neither them not their killer/victim counterpart)
// now create the root relationship, using the toCritera as search terms


// then create some additional relationships that are compatible 
// with those that already exist

// TODO: go in and assign last names based on relationships


for(const name in Plot.relationships)
{
    var rels = Plot.relationships[name];
    rels.forEach(rel => {
        console.log(rel.from.first + " is the " + rel.type + " of " + rel.to.first);
    })
}


// spit out a summary of the characters and their relationships in text

// give each other character a goal:
// - character they are trying to find and why (similar to motive - based on their relationships)
// - match symmetrical goals between characters and summarizes them as one (a and b are planning to meet in order to X)
// FUTURE TODO: characters have object-based goals not just character-based goals

module.exports = Plot;