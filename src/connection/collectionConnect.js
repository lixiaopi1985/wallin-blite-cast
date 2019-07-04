require('./DBconnect');
const mongoose = require('mongoose');
const collect1 = 'InstantData';
// const stationInfo = 'StationInfo';

const instantData = mongoose.connection.collection(collect1);
// const station = mongoose.connection.collection(stationInfo);

module.exports = instantData;


