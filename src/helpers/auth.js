const helpers = {};

helpers.isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg','no autorizated')
    res.redirect('/users/signin')
}

module.exports = helpers;