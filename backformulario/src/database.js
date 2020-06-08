const mongoose = require ('mongoose');

const URI = 'mongodb://localhost/form-mongo';

mongoose.connect(URI)
.then(db => console.log('Db Connect'))
.catch(err => console.log(err));

module.EXPORTS = mongoose;