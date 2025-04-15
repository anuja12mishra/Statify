const isAuthorized = async (req, res) => {
    try {
        const token = req.cookies.statiyUserToken || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                error: "You are not Authorizeed",
                isAuthenticated: false
            });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode.id).select('-password');

        res.status(200).json({success:true,message:"You are Authorizeed"})

    } catch (err) {
        res.json({
            success:false,
            error: "internal server error"
        });
    }
}

module.exports = {
    isAuthorized
};