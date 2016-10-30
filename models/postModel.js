var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var postSchema = new Schema({
	'title' : {type : String , required : [true , 'Title Field is required.']},
	'body' : {type : String , required : [true , 'Body Field is required.']},
	'author' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	},
	'status' : String,
	'created_at' : Date,
	'updated_at' : Date
});
postSchema.pre('save',function(next){
	var date = Date();
	this.updated_at = date;
	if(!this.created_at) this.created_at = date ;
	return next();
});
module.exports = mongoose.model('post', postSchema);
