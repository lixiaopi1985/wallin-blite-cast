const { getPeriods, getParams, getPeriodDate, accumScore }  = require('../utils/periodFunc');


// const weatherData = {
//         "features": {
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -118.34111000000001,
//                     47.855270000000004
//                 ]
//             },
//             "properties": {
//                 "Site": "sbmw",
//                 "State": "WA",
//                 "Elevation": 417.58,
//                 "Description": "Seven Bays Marina, Washington AgriMet Weather Station",
//                 "DateTimes": [
//                     "2019-05-01T00:00:00.000Z",
//                     "2019-05-01T01:00:00.000Z",
//                     "2019-05-01T02:00:00.000Z",
//                     "2019-05-01T03:00:00.000Z",
//                     "2019-05-01T04:00:00.000Z",
//                     "2019-05-01T05:00:00.000Z",
//                     "2019-05-01T06:00:00.000Z",
//                     "2019-05-01T07:00:00.000Z",
//                     "2019-05-01T08:00:00.000Z",
//                     "2019-05-01T09:00:00.000Z",
//                     "2019-05-01T10:00:00.000Z",
//                     "2019-05-01T11:00:00.000Z",
//                     "2019-05-01T12:00:00.000Z",
//                     "2019-05-01T13:00:00.000Z",
//                     "2019-05-01T14:00:00.000Z",
//                     "2019-05-01T15:00:00.000Z",
//                     "2019-05-01T16:00:00.000Z",
//                     "2019-05-01T17:00:00.000Z",
//                     "2019-05-01T18:00:00.000Z",
//                     "2019-05-01T19:00:00.000Z",
//                     "2019-05-01T20:00:00.000Z",
//                     "2019-05-01T21:00:00.000Z",
//                     "2019-05-01T22:00:00.000Z",
//                     "2019-05-01T23:00:00.000Z",
//                     "2019-05-02T00:00:00.000Z",
//                     "2019-05-02T01:00:00.000Z",
//                     "2019-05-02T02:00:00.000Z",
//                     "2019-05-02T03:00:00.000Z",
//                     "2019-05-02T04:00:00.000Z",
//                     "2019-05-02T05:00:00.000Z",
//                     "2019-05-02T06:00:00.000Z",
//                     "2019-05-02T07:00:00.000Z",
//                     "2019-05-02T08:00:00.000Z",
//                     "2019-05-02T09:00:00.000Z",
//                     "2019-05-02T10:00:00.000Z",
//                     "2019-05-02T11:00:00.000Z",
//                     "2019-05-02T12:00:00.000Z",
//                     "2019-05-02T13:00:00.000Z",
//                     "2019-05-02T14:00:00.000Z",
//                     "2019-05-02T15:00:00.000Z",
//                     "2019-05-02T16:00:00.000Z",
//                     "2019-05-02T17:00:00.000Z",
//                     "2019-05-02T18:00:00.000Z",
//                     "2019-05-02T19:00:00.000Z",
//                     "2019-05-02T20:00:00.000Z",
//                     "2019-05-02T21:00:00.000Z",
//                     "2019-05-02T22:00:00.000Z",
//                     "2019-05-02T23:00:00.000Z",
//                     "2019-05-03T00:00:00.000Z",
//                     "2019-05-03T01:00:00.000Z",
//                     "2019-05-03T02:00:00.000Z",
//                     "2019-05-03T03:00:00.000Z",
//                     "2019-05-03T04:00:00.000Z",
//                     "2019-05-03T05:00:00.000Z",
//                     "2019-05-03T06:00:00.000Z",
//                     "2019-05-03T07:00:00.000Z",
//                     "2019-05-03T08:00:00.000Z",
//                     "2019-05-03T09:00:00.000Z",
//                     "2019-05-03T10:00:00.000Z",
//                     "2019-05-03T11:00:00.000Z",
//                     "2019-05-03T12:00:00.000Z",
//                     "2019-05-03T13:00:00.000Z",
//                     "2019-05-03T14:00:00.000Z",
//                     "2019-05-03T15:00:00.000Z",
//                     "2019-05-03T16:00:00.000Z",
//                     "2019-05-03T17:00:00.000Z",
//                     "2019-05-03T18:00:00.000Z",
//                     "2019-05-03T19:00:00.000Z",
//                     "2019-05-03T20:00:00.000Z",
//                     "2019-05-03T21:00:00.000Z",
//                     "2019-05-03T22:00:00.000Z",
//                     "2019-05-03T23:00:00.000Z",
//                     "2019-05-04T00:00:00.000Z",
//                     "2019-05-04T01:00:00.000Z",
//                     "2019-05-04T02:00:00.000Z",
//                     "2019-05-04T03:00:00.000Z",
//                     "2019-05-04T04:00:00.000Z",
//                     "2019-05-04T05:00:00.000Z",
//                     "2019-05-04T06:00:00.000Z",
//                     "2019-05-04T07:00:00.000Z",
//                     "2019-05-04T08:00:00.000Z",
//                     "2019-05-04T09:00:00.000Z",
//                     "2019-05-04T10:00:00.000Z",
//                     "2019-05-04T11:00:00.000Z",
//                     "2019-05-04T12:00:00.000Z",
//                     "2019-05-04T13:00:00.000Z",
//                     "2019-05-04T14:00:00.000Z",
//                     "2019-05-04T15:00:00.000Z",
//                     "2019-05-04T16:00:00.000Z",
//                     "2019-05-04T17:00:00.000Z",
//                     "2019-05-04T18:00:00.000Z",
//                     "2019-05-04T19:00:00.000Z",
//                     "2019-05-04T20:00:00.000Z",
//                     "2019-05-04T21:00:00.000Z",
//                     "2019-05-04T22:00:00.000Z",
//                     "2019-05-04T23:00:00.000Z",
//                     "2019-05-05T00:00:00.000Z",
//                     "2019-05-05T01:00:00.000Z",
//                     "2019-05-05T02:00:00.000Z",
//                     "2019-05-05T03:00:00.000Z",
//                     "2019-05-05T04:00:00.000Z",
//                     "2019-05-05T05:00:00.000Z",
//                     "2019-05-05T06:00:00.000Z",
//                     "2019-05-05T07:00:00.000Z",
//                     "2019-05-05T08:00:00.000Z",
//                     "2019-05-05T09:00:00.000Z",
//                     "2019-05-05T10:00:00.000Z",
//                     "2019-05-05T11:00:00.000Z",
//                     "2019-05-05T12:00:00.000Z",
//                     "2019-05-05T13:00:00.000Z",
//                     "2019-05-05T14:00:00.000Z",
//                     "2019-05-05T15:00:00.000Z",
//                     "2019-05-05T16:00:00.000Z",
//                     "2019-05-05T17:00:00.000Z",
//                     "2019-05-05T18:00:00.000Z",
//                     "2019-05-05T19:00:00.000Z",
//                     "2019-05-05T20:00:00.000Z",
//                     "2019-05-05T21:00:00.000Z",
//                     "2019-05-05T22:00:00.000Z",
//                     "2019-05-05T23:00:00.000Z",
//                     "2019-05-06T00:00:00.000Z",
//                     "2019-05-06T01:00:00.000Z",
//                     "2019-05-06T02:00:00.000Z",
//                     "2019-05-06T03:00:00.000Z",
//                     "2019-05-06T04:00:00.000Z",
//                     "2019-05-06T05:00:00.000Z",
//                     "2019-05-06T06:00:00.000Z",
//                     "2019-05-06T07:00:00.000Z",
//                     "2019-05-06T08:00:00.000Z",
//                     "2019-05-06T09:00:00.000Z",
//                     "2019-05-06T10:00:00.000Z",
//                     "2019-05-06T11:00:00.000Z",
//                     "2019-05-06T12:00:00.000Z",
//                     "2019-05-06T13:00:00.000Z",
//                     "2019-05-06T14:00:00.000Z",
//                     "2019-05-06T15:00:00.000Z",
//                     "2019-05-06T16:00:00.000Z",
//                     "2019-05-06T17:00:00.000Z",
//                     "2019-05-06T18:00:00.000Z",
//                     "2019-05-06T19:00:00.000Z",
//                     "2019-05-06T20:00:00.000Z",
//                     "2019-05-06T21:00:00.000Z",
//                     "2019-05-06T22:00:00.000Z",
//                     "2019-05-06T23:00:00.000Z",
//                     "2019-05-07T00:00:00.000Z",
//                     "2019-05-07T01:00:00.000Z",
//                     "2019-05-07T02:00:00.000Z",
//                     "2019-05-07T03:00:00.000Z",
//                     "2019-05-07T04:00:00.000Z",
//                     "2019-05-07T05:00:00.000Z",
//                     "2019-05-07T06:00:00.000Z",
//                     "2019-05-07T07:00:00.000Z",
//                     "2019-05-07T08:00:00.000Z",
//                     "2019-05-07T09:00:00.000Z",
//                     "2019-05-07T10:00:00.000Z",
//                     "2019-05-07T11:00:00.000Z",
//                     "2019-05-07T12:00:00.000Z",
//                     "2019-05-07T13:00:00.000Z",
//                     "2019-05-07T14:00:00.000Z",
//                     "2019-05-07T15:00:00.000Z",
//                     "2019-05-07T16:00:00.000Z",
//                     "2019-05-07T17:00:00.000Z",
//                     "2019-05-07T18:00:00.000Z",
//                     "2019-05-07T19:00:00.000Z"
//                 ],
//                 "TU90": [
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false,
//                     false
//                 ],
//                 "TU": [
//                     53.355000000000004,
//                     56.462500000000006,
//                     59.365,
//                     60.87,
//                     65.6525,
//                     70.11,
//                     69.6425,
//                     65.6225,
//                     58.517500000000005,
//                     48.195,
//                     43.7675,
//                     32.67,
//                     24.47,
//                     21.244999999999997,
//                     22.77,
//                     22.729999999999997,
//                     22.87,
//                     24.095,
//                     24.707499999999996,
//                     22.275,
//                     23.7925,
//                     32.9525,
//                     39.6725,
//                     41.545,
//                     47.4025,
//                     59.2375,
//                     64.9675,
//                     68.125,
//                     70.545,
//                     72.435,
//                     71.2425,
//                     70.39,
//                     64.385,
//                     44.752500000000005,
//                     33.292500000000004,
//                     26.915,
//                     23.5275,
//                     22.365000000000002,
//                     25.855,
//                     23.7425,
//                     24.525,
//                     26.105,
//                     29.2125,
//                     28.484999999999996,
//                     30.817499999999995,
//                     32.2,
//                     33.035,
//                     40.0325,
//                     46.212500000000006,
//                     49.965,
//                     54.932500000000005,
//                     61.01,
//                     67.58,
//                     73.4475,
//                     77.1375,
//                     68.585,
//                     64.5125,
//                     53.4375,
//                     50.1325,
//                     44.1225,
//                     42.0525,
//                     33.395,
//                     29.8675,
//                     27.9125,
//                     27.3125,
//                     27.1075,
//                     25.78,
//                     27.112500000000004,
//                     35.167500000000004,
//                     45.5975,
//                     54.11749999999999,
//                     61.72,
//                     66.805,
//                     72.1125,
//                     75.095,
//                     79.265,
//                     83.125,
//                     84.975,
//                     86.7,
//                     78.97500000000001,
//                     70.9725,
//                     64.2075,
//                     61.1575,
//                     49.087500000000006,
//                     32.587500000000006,
//                     27.155,
//                     26.982499999999998,
//                     27.475,
//                     25.589999999999996,
//                     26.227500000000003,
//                     25.067500000000003,
//                     27.3375,
//                     35.4025,
//                     29.965000000000003,
//                     37.18,
//                     45.6125,
//                     52.3275,
//                     58.559999999999995,
//                     61.8525,
//                     63.269999999999996,
//                     67.29249999999999,
//                     68.535,
//                     65.80250000000001,
//                     63.5325,
//                     56.735,
//                     45.302499999999995,
//                     30.1725,
//                     22.822499999999998,
//                     19.33,
//                     18.0925,
//                     18.6,
//                     17.275,
//                     16.73,
//                     18.707500000000003,
//                     20.597499999999997,
//                     23.365000000000002,
//                     30.314999999999998,
//                     36.137499999999996,
//                     46.302499999999995,
//                     51.2525,
//                     51.4025,
//                     51.8,
//                     60.052499999999995,
//                     64.4425,
//                     58.21,
//                     63.135,
//                     66.465,
//                     60.635000000000005,
//                     56.9825,
//                     52.225,
//                     44.3425,
//                     32.8575,
//                     21.895000000000003,
//                     19.1625,
//                     17.5075,
//                     17.2875,
//                     18.3775,
//                     19.095,
//                     21.1775,
//                     27.54,
//                     31.950000000000003,
//                     35.602500000000006,
//                     44.3275,
//                     57.839999999999996,
//                     60.3875,
//                     63.7925,
//                     68.3125,
//                     73.91749999999999,
//                     77.605,
//                     82.3,
//                     81.64999999999999,
//                     76.6575,
//                     74.8475,
//                     69.04249999999999,
//                     50.04750000000001,
//                     24.105,
//                     20.43,
//                     20.8525,
//                     18.905,
//                     17.8825,
//                     19.087500000000002,
//                     17.9525,
//                     14.98,
//                     15.18
//                 ],
//                 "OB": [
//                     43.125,
//                     41.87,
//                     40.375,
//                     39.4975,
//                     39.245,
//                     38.317499999999995,
//                     39.2325,
//                     41.7725,
//                     44.555,
//                     48.1425,
//                     52.3,
//                     56.942499999999995,
//                     61.102500000000006,
//                     60.9025,
//                     60.765,
//                     62.4025,
//                     60.84,
//                     60.902499999999996,
//                     61.402499999999996,
//                     60.2325,
//                     56.78,
//                     53.2,
//                     49.004999999999995,
//                     46.185,
//                     43.68,
//                     42.114999999999995,
//                     40.42,
//                     39.405,
//                     38.5475,
//                     38.277499999999996,
//                     39.0525,
//                     41.7,
//                     45.24,
//                     53.3225,
//                     58.692499999999995,
//                     60.7025,
//                     63.472500000000004,
//                     65.2125,
//                     64.89,
//                     67.3475,
//                     66.3425,
//                     65.5025,
//                     64.065,
//                     63.15,
//                     61.045,
//                     59.277499999999996,
//                     57.43,
//                     53.697500000000005,
//                     50.075,
//                     48.025,
//                     45.745,
//                     42.79,
//                     40.47,
//                     38.317499999999995,
//                     38.0325,
//                     41.754999999999995,
//                     45.3525,
//                     48.8075,
//                     52.1075,
//                     57.2525,
//                     60.0275,
//                     64.49,
//                     66.22,
//                     67.7875,
//                     68.9075,
//                     69.19,
//                     68.7375,
//                     66.5075,
//                     60.81,
//                     55.86749999999999,
//                     52.9725,
//                     49.95,
//                     47.480000000000004,
//                     46.2225,
//                     45.29,
//                     43.8925,
//                     42.14,
//                     41.87,
//                     41.655,
//                     45.7625,
//                     48.852500000000006,
//                     51.7625,
//                     55.0125,
//                     61.8475,
//                     68.975,
//                     71.6875,
//                     73.8675,
//                     73.93,
//                     73.385,
//                     72.4625,
//                     71.2475,
//                     69.6625,
//                     65.185,
//                     67.2,
//                     62.42,
//                     57.324999999999996,
//                     54.544999999999995,
//                     52.38250000000001,
//                     51.5325,
//                     51.93,
//                     50.2675,
//                     50.0775,
//                     51.0775,
//                     54.4375,
//                     58.68000000000001,
//                     61.1475,
//                     66.36250000000001,
//                     69.4475,
//                     72.14,
//                     73.3175,
//                     75.1925,
//                     75.3225,
//                     76.05,
//                     74.185,
//                     72.89,
//                     72.2775,
//                     64.6375,
//                     59.167500000000004,
//                     55.6475,
//                     53.1525,
//                     51.875,
//                     49.53,
//                     47.5875,
//                     46.645,
//                     46.535,
//                     44.372499999999995,
//                     44.2825,
//                     48.3575,
//                     51.2975,
//                     55.5375,
//                     58.9725,
//                     67.3775,
//                     72.22749999999999,
//                     75.16250000000001,
//                     76.33999999999999,
//                     77.915,
//                     77.9975,
//                     76.11,
//                     76,
//                     70.85000000000001,
//                     66.5425,
//                     65.41499999999999,
//                     63.2975,
//                     60.747499999999995,
//                     59.692499999999995,
//                     58.53,
//                     56.472500000000004,
//                     53.8275,
//                     51.769999999999996,
//                     49.545,
//                     49.807500000000005,
//                     52.815,
//                     53.8675,
//                     58.57749999999999,
//                     65.10249999999999,
//                     72.6225,
//                     74.0075,
//                     75.475,
//                     77.9475,
//                     78.43,
//                     76.97,
//                     78.605,
//                     77.3125,
//                     76.2
//                 ]
//             }
//         }
// }





// logical unit for modelling


// count number of hours and get average temperature where RH > 90%
// assign severity value

// N < 10 & temp between [60-80] --- 0
// N < 13 & temp between [54-59] --- 0
// N < 16 & temp between [45-53] --- 0
// N >= 16 ---- ((N - 1)/3) - 4


// temp range: 45-80
// -------------------
//                N
// severity 1: 10-18
// severity 2: 13-21
// severity 3: 16-24
// severity 4: 19-27
// severity 5: 22-30
// severity 6: 25-33


// simplified version --- see UCdavis

async function assignScore(avgTemp, hourCount, version="simple"){

    let score;

    if(version == "simple"){
        if(avgTemp < 45){
            score = 0;
        } else if(avgTemp <= 53 && avgTemp >= 45){
            if(hourCount <= 15){
                score = 0;
            } else if (hourCount <= 18 && hourCount > 15){
                score = 1;
            }else if (hourCount <= 21 && hourCount > 18){
                score = 2;
            }else if (hourCount <= 24 && hourCount > 21){
                score = 3;
            }else if (hourCount > 24){
                score = 4
            } else {
                score = -4 + Math.round((hourCount - 1)/3);
            }
        } else if(avgTemp <= 59 && avgTemp > 53){
            if(hourCount <= 12){
                score = 0;
            } else if (hourCount <= 15 && hourCount > 13){
                score = 1;
            }else if (hourCount <= 18 && hourCount > 15){
                score = 2;
            }else if (hourCount <= 21 && hourCount > 18){
                score = 3;
            }else if(hourCount > 21){
                score = 4
            }else {
                score = -3 + Math.round((hourCount - 1)/3);
            }
        } else if(avgTemp <= 80 && avgTemp > 59){
            if(hourCount <= 9){
                score = 0;
            } else if (hourCount <= 12 && hourCount > 9){
                score = 1;
            }else if (hourCount <= 15 && hourCount > 12){
                score = 2;
            }else if (hourCount <= 18 && hourCount > 15){
                score = 3;
            }else if (hourCount > 18){
                score = 4
            }else {
                score = -2 + Math.round((hourCount - 1)/3);
            }}
    } else if (version == "original"){
        if(avgTemp < 45){
            score = 0;
        } else if(avgTemp <= 53 && avgTemp >= 45){
            if(hourCount <= 15){
                score = 0;
            } else if (hourCount <= 18 && hourCount > 15){
                score = 1;
            }else if (hourCount <= 21 && hourCount > 18){
                score = 2;
            }else if (hourCount <= 24 && hourCount > 21){
                score = 3;
            }else if (hourCount <= 27 && hourCount > 24){
                score = 4;
            } else if (hourCount <= 30 && hourCount > 27){
                score = 5;
            }else if (hourCount <= 33 && hourCount > 30){
                score = 6;
            }else {
                score = -4 + Math.round((hourCount - 1)/3);
            }
        } else if(avgTemp <= 59 && avgTemp > 53){
            if(hourCount <= 12){
                score = 0;
            } else if (hourCount <= 15 && hourCount > 12){
                score = 1;
            }else if (hourCount <= 18 && hourCount > 15){
                score = 2;
            }else if (hourCount <= 21 && hourCount > 18){
                score = 3;
            }else if (hourCount <= 24 && hourCount > 21){
                score = 4;
            }else if (hourCount <= 27 && hourCount > 24){
                score = 5;
            } else if (hourCount <= 30 && hourCount > 27){
                score = 6;
            }else {
                score = -3 + Math.round((hourCount - 1)/3);
            }
        } else if(avgTemp <= 80 && avgTemp > 59){
            if(hourCount <= 9){
                score = 0;
            } else if (hourCount <= 12 && hourCount > 9){
                score = 1;
            }else if (hourCount <= 15 && hourCount > 12){
                score = 2;
            }else if (hourCount <= 18 && hourCount > 15){
                score = 3;
            }else if (hourCount <= 21 && hourCount > 18){
                score = 4;
            }else if (hourCount <= 24 && hourCount > 21){
                score = 5;
            }else if (hourCount <= 27 && hourCount > 24){
                score = 6;
            }else {
                score = -2 + Math.round((hourCount - 1)/3);
            }
        }
    }


    return score;
}




async function calcDSV(featuresJSON){

        // featuresJSON  
        const periodSV = [];
        const displayDSV =[];
        const displayDate =[];
        const tuEval = featuresJSON.features.properties.TU90; // array of bealeans
        const obArr = featuresJSON.features.properties.OB; // array
        const periodObj = await getPeriods(tuEval);// get period position returns {periodStarts, periodEnds}
        const paramObj = await getParams(periodObj, obArr); // get parameters returns {avgTemps, hourCount}
        const periodDate =  await getPeriodDate(featuresJSON, periodObj); // returns { beginDate, endDate}
        const selectedDateString = featuresJSON.features.properties.DateTimes.map(x=>x.split('T')[0])



        
    
        if(!periodDate.beginDate.includes(undefined)){

            const removeTime =  periodDate.beginDate.map(x=>x.split('T')[0]);
            let hourly = paramObj.hourCounts;
            let avgTemps = paramObj.avgTemps;
                    
            for(let i = 0;i<hourly.length; i++){
        
                let score = await assignScore(avgTemps[i], hourly[i]);
                periodSV.push(score);
        
            }
        
            // output sv score for date
        
            
            const aggreScore = await accumScore(removeTime, periodSV); // returns {Date, DSV} accumulate period DSV value in a day
        
        
            aggreScore.DSVdate = aggreScore.Date.map(x=>new Date(x));

            selectedDateString.forEach((daily)=>{
                if(!displayDate.includes(daily)){
                    displayDate.push(daily)
                }
            })
            
            for(let i=0;i<displayDate.length;i++){

                let eachDay = displayDate[i];

                if(aggreScore.Date.includes(eachDay)){
                    const index = aggreScore.Date.findIndex(x=>x===eachDay);
                    displayDSV.push(aggreScore.DSV[index])
                } else {
                    displayDSV.push(0)
                }
            }            

            
            
            // add to featureJSON new properties
            featuresJSON.features.properties.periodStartDate = periodDate.beginDate
            featuresJSON.features.properties.periodEndDate = periodDate.endDate
            featuresJSON.features.properties.periodSV = periodSV;
            featuresJSON.features.properties.periodHours = hourly;
            featuresJSON.features.properties.periodAvgTemperature = avgTemps;
            featuresJSON.features.properties.DSVDateTime = aggreScore.DSVdate;
            featuresJSON.features.properties.DSVDate = aggreScore.Date;
            featuresJSON.features.properties.dailyDSV = aggreScore.DSV;
            featuresJSON.features.properties.datesWithDSV = displayDate;
            featuresJSON.features.properties.DSVs = displayDSV;

        } else {

            // if startdate is undefined means that all the TU90 are false, no period observed
            displayDate.forEach((daily)=>{
                displayDSV.push(0)
            })

            featuresJSON.features.properties.datesWithDSV = displayDate;
            featuresJSON.features.properties.DSVs = displayDSV;
        }

        featuresJSON.features.properties.totalDSV = displayDSV.reduce((a,b)=>a+b, 0);


        return  Promise.resolve(featuresJSON);
}




module.exports.calcDSV = calcDSV;
