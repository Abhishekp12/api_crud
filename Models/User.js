import mongoose from"mongoose"; //imports Mongoose, a library that helps you interact with MongoDB easily using models and schemas.

const userSchema = new mongoose.Schema({
    name:{type:String, require:true},
        email:{type:String, require:true},
    password:{type:String, require:true},
    CreatedAt:{type:Date, default:Date.now},
})

// ✅ This defines the structure of your User data — i.e., how each "user" document will look in the MongoDB users collection.
// Field	Type	Required?	Description
// name	String	Yes	User's name
// email	String	Yes	User's email
// password	String	Yes	Hashed password
// CreatedAt	Date	No (default used)	Auto sets to current date when a user is created

export const User = mongoose.model("user", userSchema);
// ✅ This creates a Mongoose model called User using the schema.
// "user" is the collection name (Mongoose will convert it to "users" automatically).
// userSchema tells MongoDB what structure and rules each document (user) should follow.