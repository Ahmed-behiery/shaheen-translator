const customerService = require("../service/customerService");
const constants = require("../constants");

// create customer
module.exports.createCustomer = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerService.createCustomer(req);
    response.status = 200;
    response.message = constants.customerMessage.CUSTOMER_CREATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: createCustomer:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

// get all customers
module.exports.getAllCustomers = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerService.getAllCustomers(
      req.query
    );
    response.status = 200;
    response.message = constants.customerMessage.CUSTOMER_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getAllCustomers:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getCustomerById = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerService.getCustomerById(
      req.params
    );
    response.status = 200;
    response.message = constants.customerMessage.CUSTOMER_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getCustomerById:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.updateCustomer = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const customer = await customerService.getCustomerById(req.params);
    req.body.image = customer.image;
    const responseFromService = await customerService.updateCustomer({
      id: req.params.id,
      request: req,
    });
    response.status = 200;
    response.message = constants.customerMessage.CUSTOMER_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: updateCustomer:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.deleteCustomer = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerService.deleteCustomer(
      req.params
    );
    response.status = 200;
    response.message = constants.customerMessage.CUSTOMER_DELETED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: deleteCustomer:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};
