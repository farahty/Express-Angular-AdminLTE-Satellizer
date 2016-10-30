var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new Schema({
	'email' : {type : String , required : [true , 'The Email is required.'] , unique: true},
	'password' : {type : String , bcrypt : true , required : [true , 'The password is required.']},
	'name' : String,
	'auth_type' : String,
	'auth_id' : String,
	'auth_token' : String,
	'avatar' : String,
	'status' : String,
	'created_at' : Date,
	'updated_at' : Date
});
userSchema.plugin(require('mongoose-bcrypt'));
userSchema.plugin(uniqueValidator,{message : 'The {VALUE} already in use .'});
userSchema.pre('save',function(next){
	var date = Date();
	this.updated_at = date;
	if(!this.created_at) this.created_at = date ;
	return next();
});

module.exports = mongoose.model('user', userSchema);
