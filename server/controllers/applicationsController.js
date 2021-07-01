// imports
const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
/*
|----------------------------------------------------------
| Application Routes
|----------------------------------------------------------
| [Method] | [Route]             | [Function]
| GET      | /applications       | Get all applications
| GET      | /applications       | Get all applications(sorted by createdAt date)
| POST     | /applications/new   | Add new application
| GET      | /applications/:id   | Fetch a specific application
| POST     | /applications/:id   | Toggle applicationSent status
| POST     | /applications/:id   | Toggle response status
| PATCH    | /applications/:id   | Modify an application      
| PUT      | /applications/:id   | Update an application
| DELETE   | /applications/:id   | Delete an application
| 
*/

// METHOD  : GET
// ROUTE   : /
// FUNCTION: Get all applications
router.get("/", async (req, res) => {
  let filters;
  if (Object.keys(req.query).length > 0) {
    filters = { ...req.query };
  }
  try {
    if (!filters) {
      const foundApplications = await Application.find({});
      res.status(200).json(foundApplications);
    } else {
      const foundApplications = await Application.find({ ...filters });
      res.status(200).json(foundApplications);
    }
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

// METHOD  : POST
// ROUTE   : /
// FUNCTION: Create application
router.post("/", async (req, res) => {
  try {
    const createdApplication = await Application.create(req.body);
    res.status(200).json(createdApplication);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

// METHOD  : GET
// ROUTE   : /:id
// FUNCTION: Fetch a specific application
router.get("/:id", async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    res.send(application);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

// METHOD  : POST
// ROUTE   : /:id
// FUNCTION: Toggle applicationSent status
router.post("/applicationsent/:id", async (req, res) => {
  try {
    const applicationRef = await Application.findById(req.params.id);
    const application = await Application.findOneAndUpdate(
      { _id: req.params.id },
      { applicationSent: !applicationRef.applicationSent }
    );

    await application.save();
    res.send(application);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

// METHOD  : POST
// ROUTE   : /:id
// FUNCTION: Toggle response status
router.post("/response/:id", async (req, res) => {
  try {
    const responseRef = await Application.findById(req.params.id);
    const application = await Application.findOneAndUpdate(
      { _id: req.params.id },
      { response: !responseRef.response }
    );

    await application.save();
    res.send(application);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

// METHOD  : PATCH
// ROUTE   : /:id
// FUNCTION: Modify the application
router.patch("/:id", async (req, res) => {
  try {
    const application = await Application.findOneAndUpdate(
      { _id: req.params.id },
      { companyName: req.body.companyName }
    );
    await application.save();

    res.send(application);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

// METHOD  : PUT
// ROUTE   : /:id
// FUNCTION: Update the application
router.put("/:id", async (req, res) => {
  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

// METHOD  : DELETE
// ROUTE   : /:id
// FUNCTION: Delete the application
router.delete("/:id", async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);

    res.send(application);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

module.exports = router;
/*////////////////////////////////////////////////////////////////////////////////////*/
// NOTE: POST/PUT/PATCH:                                                              //
// ---------------------------------------------------------------------------------- //
//  * POST : always for creating a resource (does not matter if it was duplicated)    //
//      - If the client sends data without any identifier, then we will store the     //
//      data and assign/generate a new identifier.                                    //
//      - If the client again sends the same data without any identifier, then we     //
//      will store the data and assign/generate a new identifier.                     //
//      - *NOTE* Duplication is allowed here.                                         //
//  * PUT : for checking if a resource exsists, then updating; else, create a new     //
//      resource (Update & overwrite)                                                 //
//      - If the client sends data with an identifier, then we will check whether     //
//      that identifier exists. If the identifier exists, we will update the          //
//      resource with the data, else we will create a resource with the data          //
//      and assign/generate a new identifier.                                         //
//   * PATCH : always for updating a resource                                         //
//     - If the client sends data with an identifier, then we will check whether      //
//     that identifier exists. If the identifier exists, we will update the resource  //
//     with the data, else we will throw an exception.                                //
/*////////////////////////////////////////////////////////////////////////////////////*/
