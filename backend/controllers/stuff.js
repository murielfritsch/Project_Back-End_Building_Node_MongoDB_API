const Thing = require("../models/Thing");
// gives access to functions that can modify file system, including deleting files
const fs = require('fs');


exports.createThing = (req, res, next) => {
    // extract JSON object from thing
    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id;
    const thing = new Thing( {
        ...thingObject,
        imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    // save object to DB with mongoose
    thing.save()
        .then(() => res.status(201).json({message:"object saved in DB!"}))
        .catch( error => res.status(400).json( {error } ));
};

exports.modifyThing = (req, res, next) => {
    const thingObject = req.file ? {
        ...JSON.parse(req.body.thing),
        imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
    Thing.updateOne( { _id: req.params.id}, {...thingObject, _id:req.params.id} )
        .then( () => res.status(200).json( {message:"Object modified!"} ))
        .catch( error => res.status(400).json( { error } ));
};


exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id:req.params.id })
        .then(
            (thing) => {
                if(!thing){
                    return res.status(404).json({
                        error:new Error('Object not found')
                    });
                }
                if(thing.userId !== req.auth.userId){
                    return res.status(401).json({
                        error: new Error("Unauthorized request")
                    });
                }
                const filename = thing.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Thing.deleteOne( {_id:req.params.id } )
                // only if obj has same userId than the one present in the token userId == req.body.userId
            
                .then( () => res.status(200).json( {message:"Object deleted!"} ))
                .catch( error => res.status(500).json( {error} ));
                })
                ;
            }
        )
};


exports.getAllThings = (req, res, next) => {
    Thing.find()
        .then( things => res.status(200).json(things))
        .catch( error => res.status(404).json( { error } ));
};

exports.getOneThing = (req, res, next) => {
    Thing.findOne( {_id: req.params.id } )
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json( {error} ));
};