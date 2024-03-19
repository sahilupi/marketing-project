const mongoose = require('mongoose');

const devENV = require('../devenv');

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_URI || devENV.LOCAL_MONGODB_URI, { useUnifiedTopology: true }, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});

require('./user.model');
require('./order.model');
require('./contact-detail.model');
require('./currency.model');