var ConnectRoles = require('connect-roles');

module.exports = function (app) {
    var user = new ConnectRoles({
        failureHandler: function (req, res, action) {
            var accept = req.headers.accept || '';
            res.status(403).send({
                error: true,
                message: 'Access Denied - You don\'t have permission to: ' + action
            });
        }
    });
    app.use(user.middleware());

    user.use(function (req, action) {
        return action === 'manage.posts';
    })

    return user;
}