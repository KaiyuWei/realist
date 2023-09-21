/**
 * the file that defines models used for auth based on mongoose Schema
 */
import {model, Schema, ObjectId} from "mongoose";

const schema = new Schema({
    // the username will be auto-generated
    username: {
        type: String,
        trim: true,  // remove all write spaces
        required: true,  // a required field
        unique: true,  // the user name must be unique values
        lowercase: true,  // all usernames are stored in lowercase
    },
    name: {
        type: String,
        trim: true,
        default: "",
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase:true,
    },
    password: {
        type: String,
        required: true,
        maxlength: 256,
    },
    address: {
        type: String,
        default: "",
    },
    company: {
        type: String,
        default: "",
    },
    phone: {
        type: String,
        default: "",
    },
    photo: {},
    role: {
        type: [String],  // each user can have multiple roles. array of Strings
        default: ["Buyer"],
        enum: ["Buyer", "Seller", "Admin"],  // optional values for 'role'
    },
    // the id of properties the user previously enquired.
    // this field refers to the "Ad" model objects.
    enquiredProperties: [{type: ObjectId, ref: "Ad"}],
    wishlist: [{type: ObjectId, ref: "Ad"}],
    resetCode: "",  // the code generated for resetting the password
},
// need timestamps
{timestamps: true}
);

// export the schema with the name "User"
export default model('User', schema);