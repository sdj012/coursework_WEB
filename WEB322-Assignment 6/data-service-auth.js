var mongoose=require ('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var userSchema=new mongoose.Schema({
    "userName": {
        "type": String,
        "unique":true
    },
    "password": String,
    "email":String,
    "loginHistory": [{dateTime: Date, userAgent: String}]
});

let User;


module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {

        mongoose.connect('mongodb+srv://dbUser:abcd1234@senecaweb-vvlnp.mongodb.net/web322_a6?retryWrites=true', {useNewUrlParser: true});
        var db = mongoose.connection;

        db.on('error',(err)=>{
        reject(err) }); 

        db.once('open', ()=> {
        User = mongoose.model("users", userSchema);
        resolve();
        });
        
    });
};
        
module.exports.registerUser=function(userData){
            
    return new Promise(function (resolve, reject) {
        if(userData.password != userData.password2){reject('Passwords do not match')};
                
        if(userData.password === userData.password2) {
                    
            bcrypt.genSalt(10, function(err, salt){
                 bcrypt.hash(userData.password, salt, function(err, hash){
                     if(err){
                         reject('There was an error encrypting the password');
                     }
                    else {
                         userData.password = hash;
                                
                        var newUser = new User({userName:userData.userName, password:userData.password});
                                
                                newUser.save(function(err){
                                    if(err){
                                        if (err.code===11000) {reject("User Name already taken")}
                                        reject("There was an error creating the user:"+err);
                                    }
                                    else {resolve()};
                                });
                            }
                        })
                    })
                }
                
            })},
            
module.exports.checkUser=function(userData){
                
    return new Promise(function(resolve,reject){
                    
        User.find({userName: userData.userName})
            .exec().then(function(users){
                if(!users){
                    reject('Unable to find user: '+userData.userName);
                }
                else{
                    bcrypt.compare(userData.password, users[0].password).then(function(res){

                if(res===true){
                    users[0].loginHistory.push({dateTime: (new Date()).toString(), userAgent: userData.userAgent});
                    User.update(
                        { userName: users[0].userName },
                        { $set: {loginHistory: users[0].loginHistory }},
                        { multi: false }
                    ).exec().then((function(){
                        resolve(users[0]);
                        
                    })).catch(function(err){
                            reject("There was an error verifying the user: " + err);
                    });

                }else{
                    reject("Incorrect Password for user: " +userData.userName);
                    }
                })
             }
            }).catch(function(){
                eject('Unable to find user: '+userData.userName);
            })
    });
}
                
                
                
                
                
                