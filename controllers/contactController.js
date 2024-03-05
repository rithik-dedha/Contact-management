const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel.js") 

//@desc Get all contacts
//@route GET /api/contacts
//@access PRIVATE
const getContacts = asyncHandler(async (req,res) =>{
    const contacts = await Contact.find({user_id: req.user.id})
    res.status(200).json(contacts)
})

//@desc Get a contact
//@route GET /api/contacts/:id
//@access PRIVATE
const getContact = asyncHandler(async (req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }
    res.status(200).json(contact)
})


//@desc Create contact
//@route POST /api/contacts
//@access PRIVATE
const createContact = asyncHandler(async (req,res) =>{
    // console.log("Entered information is: ", req.body)
    const {name, email, phone} = req.body
    if(!name || !email || !phone)
    {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    // if valid entry
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    })

    res.status(201).json(contact)
})


//@desc Update contact
//@route PUT /api/contacts
//@access PRIVATE
const updateContact = asyncHandler(async (req,res) =>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found bro")
    }

    if(contact.user_id.toString()!==req.user.id){
        res.status(403)
        throw new Error("Not authorized to access other user's data")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
    )

    res.status(200).json(updatedContact)
})

//@desc Delete contact
//@route DELETE /api/contacts
//@access PRIVATE
const deleteContact = asyncHandler(async (req,res) =>{
    const contact = await Contact.findByIdAndDelete(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found bitch")
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403)
        throw new Error("Not authorized to access other user's data")
    }
    res.status(200).json(contact)
})

module.exports = {getContacts, getContact, createContact, updateContact, deleteContact}