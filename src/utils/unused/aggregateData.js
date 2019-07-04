module.exports.aggData = function(aggregateCursor){

     return aggregateCursor.group({
        _id: "$features.properties.Site",
        state: {$addToSet: "$features.properties.State"},
        elevation: {$addToSet: "$features.properties.Elevation"},
        description: {$addToSet: "$features.properties.Description"},
        geometry: {$addToSet: "$features.geometry"},
        DateTimes: {$push: "$features.properties.DateTimes"},
        TU: {$push: "$features.properties.TU"},
        OB: {$push: "$features.properties.OB"}

    }).project({

        _id:0,
        features: {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: {$arrayElemAt: ["$geometry.coordinates", 0]}
            },
            properties: {
                Site: "$_id",
                State: {$arrayElemAt: [{$arrayElemAt: ["$state", 0]}, 0]},
                Elevation: {$arrayElemAt: ["$elevation", 0]},
                Description: {$arrayElemAt: [{$arrayElemAt: ["$description", 0]}, 0]},
                DateTimes: {$map: {input:"$DateTimes", as: "dateStrings", in:{
                    $dateToString: { date: "$$dateStrings"}}}},
                TU90: {
                    $map: {
                    input: "$TU", 
                    as: "tu",
                    in: {$gte:["$$tu", 90]}
                }},
                TU: "$TU",
                OB: "$OB"

            }
        }
    })

}