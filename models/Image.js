const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemas = require("./schemas/schemas");



mongoose.model('Image', schemas.ImageSchema);
module.exports = mongoose.model('Image');