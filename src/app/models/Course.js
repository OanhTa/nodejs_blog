const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    _id: {type: Number},
    name:{ type: String, maxLength: 255, require: true},
    desc: { type: String},
    img: { type: String},
    videoID: { type: String},
    level: { type: String},
    slug: { type: String, slug: 'name', unique: true}
    // createAt: { type: Date, default: Date.now },
    // updateAt: { type: Date, default: Date.now },tự động bên dưới
  }, {
    _id: false,
    timestamps: true,
  });

  mongoose.plugin(slug);
  CourseSchema.plugin(AutoIncrement);
  CourseSchema.plugin(mongooseDelete, { 
    deletedAt : true,
    overrideMethods: 'all' 
  });

  module.exports = mongoose.model('Course', CourseSchema);