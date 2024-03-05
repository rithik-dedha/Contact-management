const express = require("express")
const {getContacts, updateContact, createContact, deleteContact, getContact} = require("../controllers/contactController.js")
const validateToken = require("../middleware/validateTokenHandler.js")
const router = express.Router()


router.use(validateToken) // need to validate all the routes, unline in userRoutes.js where validation is required in only one route

router.route('/').get(getContacts).post(createContact)

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact)

module.exports = router