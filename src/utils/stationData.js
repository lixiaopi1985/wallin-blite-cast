module.exports.filteredData = function (collection, dateInput, enddate, selectedState) {
    
    if(selectedState === "0"){

        return collection.aggregate([

            {
                $addFields :{
                    DateObj: {
                        $dateFromString: {
                            dateString: "$DateTime",
                            format: '%Y-%m-%d'
                        }
                    },
                }
            },
    
            {
                $addFields :{
                    NewDateTimes: {
                        $dateFromParts:{
                            'year': {$year: '$DateObj'},
                            'month':{$month: '$DateObj'},
                            'day':{$dayOfMonth: '$DateObj'},
                            'hour': {$toInt: "$Time"}
                        }
                    }
                }
            },
    
            {
                $match:{
                    $and: [{DateObj: {$gte: dateInput}}, {DateObj: {$lte: enddate}}]
                }
            },
    
            {
                $lookup:{
                    from: "StationInfo",
                    localField: "Sites",
                    foreignField: "siteid",
                    as: "geoFeatures"
                }
            },
            {
                $addFields: { features: {
    
    
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: [ {$arrayElemAt: ["$geoFeatures.longitude", 0]}, {$arrayElemAt: ["$geoFeatures.latitude", 0]}]
                        },
                        properties: {
                            Site: "$Sites",
                            State: "$geoFeatures.state",
                            Description: "$geoFeatures.description",
                            Date:"$DateObj",
                            Hour: "$Time",
                            DateTimes: "$NewDateTimes",
                            TU: "$TU",
                            OB: "$OB",
                            Elevation: {$arrayElemAt: ["$geoFeatures.elevation", 0]}
                        }
                    }
                }
            },
            {
                $project: {
                    features:1,
                    _id: 0
                }
            },
            {
                $group: {
                    _id: "$features.properties.Site",
                    state: {$addToSet: "$features.properties.State"},
                    elevation: {$addToSet: "$features.properties.Elevation"},
                    description: {$addToSet: "$features.properties.Description"},
                    geometry: {$addToSet: "$features.geometry"},
                    DateTimes: {$push: "$features.properties.DateTimes"},
                    TU: {$push: "$features.properties.TU"},
                    OB: {$push: "$features.properties.OB"}
            
                }
            },
    
            {
                $project: {
    
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
                }
            }
        ])
    } else {
        return collection.aggregate([

            {
                $addFields :{
                    DateObj: {
                        $dateFromString: {
                            dateString: "$DateTime",
                            format: '%Y-%m-%d'
                        }
                    },
                }
            },
    
            {
                $addFields :{
                    NewDateTimes: {
                        $dateFromParts:{
                            'year': {$year: '$DateObj'},
                            'month':{$month: '$DateObj'},
                            'day':{$dayOfMonth: '$DateObj'},
                            'hour': {$toInt: "$Time"}
                        }
                    }
                }
            },
    
            {
                $match:{
                    $and: [{DateObj: {$gte: dateInput}}, {DateObj: {$lte: enddate}}]
                }
            },
    
            {
                $lookup:{
                    from: "StationInfo",
                    localField: "Sites",
                    foreignField: "siteid",
                    as: "geoFeatures"
                }
            },
            {
                $addFields: { features: {
    
    
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: [ {$arrayElemAt: ["$geoFeatures.longitude", 0]}, {$arrayElemAt: ["$geoFeatures.latitude", 0]}]
                        },
                        properties: {
                            Site: "$Sites",
                            State: "$geoFeatures.state",
                            Description: "$geoFeatures.description",
                            Date:"$DateObj",
                            Hour: "$Time",
                            DateTimes: "$NewDateTimes",
                            TU: "$TU",
                            OB: "$OB",
                            Elevation: {$arrayElemAt: ["$geoFeatures.elevation", 0]}
                        }
                    }
                }
            },
            {
                $project: {
                    features:1,
                    _id: 0
                }
            },
            {
                $group: {
                    _id: "$features.properties.Site",
                    state: {$addToSet: "$features.properties.State"},
                    elevation: {$addToSet: "$features.properties.Elevation"},
                    description: {$addToSet: "$features.properties.Description"},
                    geometry: {$addToSet: "$features.geometry"},
                    DateTimes: {$push: "$features.properties.DateTimes"},
                    TU: {$push: "$features.properties.TU"},
                    OB: {$push: "$features.properties.OB"}
            
                }
            },
    
            {
                $project: {
    
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
                }
            },
            {
                $match: {
                    "features.properties.State": selectedState
                }
            }
        ])
    }

}
