## TODO

* Convert over to event system for other people detection, etc.
* Get tracery installed and setup
* Generate room descriptions
* Divide rooms up into regions (or place furniture) and use proximity to this in log

* Generate characters and relationships
    * Character goal
        * look for item (with expected item room)
        * meet other character
        * visit every room (eg. clean)
    * character name
    * relationships with other characters
* Generate murder details
    * select murderer, victim, and motive
    * how long ago did the murder happen
    * murder plot examples
        * A and B are partners in a venture, A kills B
        * A, B, and C have claims on a fortune, A kills B and C
            * inheritance
            * secret treasure
        * A and B have a romantic relationship gone bad, A kills B
        * A knows a secret about B. B kills A to keep it
            * It's political. B had an affair/secret business dealing with a famous politician. 
        * A wants object X. B kills A to keep it
            * A and B both want object X. They fight and A is killed
    * markup language:
        * rel(A,B, "siblings", symmetric=true), rel(B,C, "siblings", symmetric=true), rel(A,C, "siblings", symmetric=true)

* Narrative structure
    * Each character describes their relationships with the others as they move through the rooms
        * their relationship with an item
        * Their relationship with the house
        * through an item in each room


    