const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/] },
        password: { type: String, required: true, trim: true },
        phone: { type: Number, required: true, trim: true },
        role: { type: String, enum: ["admin", "user"], default: "user" },
        image: { type: String, default: "../../assets/avatar.png" },
        padelMatches: [{ type: mongoose.Types.ObjectId, ref: "padelMatches" }]
    },
    {
        timestamps: true,
        collection: "users"
    }
);

userSchema.pre("save", function () {
    this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model("users", userSchema, "users");

module.exports = User;
