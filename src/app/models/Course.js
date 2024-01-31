const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Course = new Schema({
    name:{ type: String, maxLength: 255, require: true},
    desc: { type: String},
    img: { type: String},
    videoID: { type: String},
    level: { type: String},
    slug: { type: String, slug: 'name', unique: true}
    // createAt: { type: Date, default: Date.now },
    // updateAt: { type: Date, default: Date.now },tự động bên dưới
  }, {
    timestamps: true,
  });

  module.exports = mongoose.model('Course', Course);