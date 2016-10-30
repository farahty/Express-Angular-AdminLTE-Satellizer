var userModel = require('../models/userModel.js');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {
        userModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        userModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }
            return res.json(user);
        });
    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        var user = new userModel({
            email : req.body.email,
			password : req.body.password,
			name : req.body.name,
			auth_type : req.body.auth_type,
			auth_id : req.body.auth_id,
			auth_token : req.body.auth_token,
			avatar : req.body.avatar,
			status : req.body.status,
			created_at : req.body.created_at,
			updated_at : req.body.updated_at
        });

        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            }
            return res.status(201).json(user);
        });
    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        userModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.email = req.body.eamil ? req.body.email : user.email;
			user.password = req.body.password ? req.body.password : user.password;
			user.name = req.body.name ? req.body.name : user.name;
			user.auth_type = req.body.auth_type ? req.body.auth_type : user.auth_type;
			user.auth_id = req.body.auth_id ? req.body.auth_id : user.auth_id;
			user.auth_token = req.body.auth_token ? req.body.auth_token : user.auth_token;
			user.avatar = req.body.avatar ? req.body.avatar : user.avatar;
			user.status = req.body.status ? req.body.status : user.status;
			user.created_at = req.body.created_at ? req.body.created_at : user.created_at;
			user.updated_at = req.body.updated_at ? req.body.updated_at : user.updated_at;
			
            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        userModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
