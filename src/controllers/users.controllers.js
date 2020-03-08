const usersCtrl = {};
const User = require('../models/User')
const passport = require('passport')

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
}

usersCtrl.signup = async (req, res) => {
    const errors = [];
    const { name, email, password, confirm_password } = req.body;
    console.log(req.body);
    if (password != confirm_password) {
        errors.push({ text: 'Passwords do not match' });
    }
    if (password.length < 4) {
        errors.push({ text: 'Passwords must be a least 4 characters' });
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors, name, email, password, confirm_password

        })
    } else {
        const emailUser = await User.findOne({ email: email });
        console.log(emailUser);
        if (emailUser) {
            console.log("users/signup");
            req.flash("error_msg", "The email is already in use");
            res.redirect('/users/signup');

            // errors.push({ text: 'The email is already in use' })
            // res.render('users/signup', {errors, name, email, password, confirm_password});
        } else {
            console.log("/users/signin");
            const newUser = new User({ name, email, password });
            newUser.password = await newUser.encrypPassword(password);
            await newUser.save();
            req.flash('success_msg', 'You are resgister')
            res.redirect('/users/signin');
        }
    }
}

usersCtrl.renderSignInForm = (req, res) => {
    res.render('users/signin');

}
usersCtrl.signin = passport.authenticate('local',{
    failureRedirect:"/users/signin",
    successRedirect:'/notes',
    failureFlash:true
}) 
usersCtrl.logout = (req, res) => {
   req.logout();
   req.flash('success_msg','You are logged out now.')
   res.redirect('/users/signin')
}

module.exports = usersCtrl;