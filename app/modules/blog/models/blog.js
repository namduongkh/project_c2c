'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
import Slug from "slug";

var BlogSchema = new Schema({
  title: {
    type: String,
    trim: true,
    require: true
  },
  slug: {
    type: String,
    trim: true,
    unique: 'Slug already exists',
    require: true
  },
  category: {
    type: String,
    enum: ['blog', 'page']
  },
  type: {
    type: 'string',
    enum: ['post', 'share'],
    require: true
  },
  content: {
    type: String
  },
  url: {
    type: String
  },
  thumb: {
    type: String
  },
  summary: {
    type: String
  },
  source: {
    type: String
  },
  status: {
    type: Number,
    default: 1,
    enum: [0, 1, 2]
  }
}, {
    timestamps: true,
    collection: 'blogs'
  });

module.exports = mongoose.model('Blog', BlogSchema);