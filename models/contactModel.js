const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
    user_id:{ // updated schema to included validation of user
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name:{
        type: String,
        required: [true, "Please add the contact name"],
    },
    email:{
        type: String,
        required: [true, "Please add the contact email"],
    },
    phone:{
        type: String,
        required: [true, "Please add the contact phone number"],
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model("Contact", contactSchema)