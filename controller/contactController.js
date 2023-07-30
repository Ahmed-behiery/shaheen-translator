const contactService = require("../service/contactService");
const constants = require("../constants");

// create contact
module.exports.createContact = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await contactService.createContact(req.body);
    response.status = 200;
    response.message = constants.contactMessage.CONTACT_CREATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: createContact:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getAllContacts = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await contactService.getAllContacts(req.query);
    response.status = 200;
    response.message = constants.contactMessage.CONTACT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getAllContacts:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getContactById = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await contactService.getContactById(req.params);
    response.status = 200;
    response.message = constants.contactMessage.CONTACT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getAllContacts:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.updateContact = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await contactService.updateContact({
      id: req.params.id,
      updateInfo: req.body,
    });
    response.status = 200;
    response.message = constants.contactMessage.CONTACT_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: updateContact:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.deleteContact = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await contactService.deleteContact(req.params);
    response.status = 200;
    response.message = constants.contactMessage.CONTACT_DELETED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: deleteContact:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};
