const { Schema, model } = require("mongoose");

const applicationSchema = new Schema({
  companyName: { type: String, required: true },
  companyType: { type: String },
  businessType: { type: String },
  jobTitle: { type: String },
  jobLocation: { type: String },
  applicationStatus: { type: String },
  applicationUrl: { type: String },
  dateSubmitted: { type: String },
  applicationSent: { type: Boolean },
  response: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model("Application", applicationSchema);
