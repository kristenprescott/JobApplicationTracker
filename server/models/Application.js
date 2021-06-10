const { Schema, model } = require("mongoose");

const applicationSchema = new Schema({
  companyName: { type: String, required: true },
  companyType: { type: String },
  businessType: { type: String },
  jobTitle: { type: String },
  website: { type: String },
  applicationUrl: { type: String },
  applicationStatus: { type: String },
  remote: { type: Boolean },
  jobLocation: { type: String },
  applicationSent: { type: Boolean },
  dateSubmitted: { type: String },
  response: { type: Boolean },
  notes: { type: String },
  technologies: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = model("Application", applicationSchema);
/////////////////////////////////////////////////////////////
/*
MODEL EXAMPLES:
var schema = new Schema({
  name:    String,
  binary:  Buffer,
  living:  Boolean,
  updated: { type: Date, default: Date.now },
  age:     { type: Number, min: 18, max: 65 },
  mixed:   Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  decimal: Schema.Types.Decimal128,
  array: [],
  ofString: [String],
  ofNumber: [Number],
  ofDates: [Date],
  ofBuffer: [Buffer],
  ofBoolean: [Boolean],
  ofMixed: [Schema.Types.Mixed],
  ofObjectId: [Schema.Types.ObjectId],
  ofArrays: [[]],
  ofArrayOfNumbers: [[Number]],
  nested: {
    stuff: { type: String, lowercase: true, trim: true }
  },
  map: Map,
  mapOfString: {
    type: Map,
    of: String
  }
})

// example use

var Thing = mongoose.model('Thing', schema);

var m = new Thing;
m.name = 'Statue of Liberty';
m.age = 125;
m.updated = new Date;
m.binary = Buffer.alloc(0);
m.living = false;
m.mixed = { any: { thing: 'i want' } };
m.markModified('mixed');
m._someId = new mongoose.Types.ObjectId;
m.array.push(1);
m.ofString.push("strings!");
m.ofNumber.unshift(1,2,3,4);
m.ofDates.addToSet(new Date);
m.ofBuffer.pop();
m.ofMixed = [1, [], 'three', { four: 5 }];
m.nested.stuff = 'good';
m.map = new Map([['key', 'value']]);
m.save(callback);
*/
