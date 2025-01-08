import User from './models/userModel.js';

const testUser = new User({
    username: "testuser",
    password: "Password1"
});

testUser.save()
    .then(() => console.log("Usuario creado exitosamente"))
    .catch(err => console.error("Error:", err.message));