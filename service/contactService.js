const Contact = require("../database/models/contactModel");
const { formatMongoData, checkObjectId } = require("../helper/dbHelper");
const constants = require("../constants");

const ITEMS_PER_PAGE = 20;
// create contact
module.exports.createContact = async (serviceData) => {
  try {
    let contact = new Contact({ ...serviceData });
    let result = await contact.save();
    return formatMongoData(result);
  } catch (error) {
    console.log("Something went wrong: Service: createContact:", error);
    throw new Error(error);
  }
};

module.exports.getAllContacts = async (query) => {
  try {
    const page = +query.page || 1;
    let contactData = {};

    let totalItems = await Contact.find().countDocuments();

    let contacts = await Contact.find({})
      .sort({ createdAt: "desc" })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    contactData = {
      contacts,
      totalItems,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
    };

    return contactData;
  } catch (error) {
    console.log("Something went wrong: Service: getAllContacts:", error);
    throw new Error(error);
  }
};

module.exports.getContactById = async ({ id }) => {
  try {
    checkObjectId(id);
    let contact = await Contact.findById(id);
    if (!contact) {
      throw new Error(constants.contactMessage.CONTACT_NOT_FOUND);
    }
    return formatMongoData(contact);
  } catch (error) {
    console.log("Something went wrong: Service: getContactById:", error);
    throw new Error(error);
  }
};

module.exports.updateContact = async ({ id, updateInfo }) => {
  try {
    checkObjectId(id);
    let contact = await Contact.findOneAndUpdate({ _id: id }, updateInfo, {
      new: true,
    });
    if (!contact) {
      throw new Error(constants.contactMessage.CONTACT_NOT_FOUND);
    }
    return formatMongoData(contact);
  } catch (error) {
    console.log("Something went wrong: Service: updateContact:", error);
    throw new Error(error);
  }
};

module.exports.deleteContact = async ({ id }) => {
  try {
    checkObjectId(id);
    let contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      throw new Error(constants.contactMessage.CONTACT_NOT_FOUND);
    }
    return formatMongoData(contact);
  } catch (error) {
    console.log("Something went wrong: Service: deleteContact:", error);
    throw new Error(error);
  }
};
