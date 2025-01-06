import users from "../models/userModel.js";

export const registerUser = (user,pas) =>{
    try
    {
        const newUsername = new users({
            username: user,
            password: pas
        })
        newUsername.save()
            .then(()=>{
                console.log("Se registro el usuario correctamente");
            })
            .catch(()=>{
                console.error("Mamita querida, incumpliste una validación");
            })
    }
    catch (e)
    {
        console.error("Se incumplio alguna validación");
    }
}
