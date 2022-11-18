const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            },
            message: (prop) => `invalid email: ${prop.value}`
        }
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "password is too short"]
    },
    roles: {
        type: [String],
        required: true,
        default: ["STUDENT"]
    },
    accountStatus: {
        type: String,
        required: true,
        enum: ["PENDING", "ACTIVE", "REJCTED"],
        default: "PENDING",
    }
});

const User = model("User", userSchema);

module.exports = User;























