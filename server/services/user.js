const register=eq,res)=>{
    try {
        const {username,gmail,password} = req.body;
        console.log(username,gmail,password);
    } catch (error) {
        console.log(error);
    }
}

module.export={register};