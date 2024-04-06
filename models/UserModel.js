const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, "Please enter username"],
        },
        password: {
            type: String,
            required: [true, "Please enter password"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", UserSchema);
