var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var async = require('async');
var colors = require('colors');
var mongoose = require('mongoose');
var request = require('request');
var jwt = require('jwt-simple');
var moment = require('moment');
var qs = require('querystring');
var config = require('./config');

var routes = require('./routes/index');
var usersRoutes = require('./routes/users');
var postsRoutes = require('./routes/posts')
var User = require('./models/userModel');


mongoose.connect(config.database);

mongoose.connection.on('open', function (err) {
  console.log('Connetion to MongoDB is ready ..... have fun'.green);
});

mongoose.connection.on('error', function (err) {
  console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var user = require('./authorize')(app);
app.get('/', function (req, res, next) {
  res.render('index');
});

app.use('/api/', routes);
app.use('/api/users', ensureAuthenticated, usersRoutes);
app.use('/api/posts', ensureAuthenticated,user.can('manage.posts') ,postsRoutes);




/*
 |--------------------------------------------------------------------------
 | Login Required Middleware
 |--------------------------------------------------------------------------
 */
function ensureAuthenticated(req, res, next) {
  if (!req.header('Authorization')) {
    return res.status(401).send({
      message: 'Please make sure your request has an Authorization header'
    });
  }
  var token = req.header('Authorization').split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, config.secret);
  } catch (err) {
    return res.status(401).send({
      message: err.message
    });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({
      message: 'Token has expired'
    });
  }
  req.user = payload.sub;
  req.isAuthenticated = function(){
    return true;
  }
  next();
}
 
/*
 |--------------------------------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */
function createJWT(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(1, 'h').unix()
  };
  return jwt.encode(payload, config.secret);
}

/*
 |--------------------------------------------------------------------------
 | Login By Email
 |--------------------------------------------------------------------------
 */
app.post('/auth/login', function (req, res) {
  process.nextTick(function () {
    if (!req.body.email || !req.body.password)
      return res.status(401).send({
        error: true,
        message: 'username and password is required.'
      });
    User.findOne({
      email: req.body.email
    }, function (error, user) {
      if (error) {
        res.status(401).send({
          error: true,
          message: 'Error while retriving data.'
        });
      } else if (!user) {
        res.status(401).send({
          error: true,
          message: 'Username not available.'
        });
      } else if (!user.verifyPasswordSync(req.body.password)) {
        res.status(401).send({
          error: true,
          message: 'Invalid Password.'
        });
      } else {
        user.password = null;
        res.json({
          error: false,
          message: 'Token Created Successfully.',
          user: user,
          token: createJWT(user)
        });
      }
    });
  });
});


/*
 |--------------------------------------------------------------------------
 | Login with GitHub
 |--------------------------------------------------------------------------
 */
app.post('/auth/github', function (req, res) {
  var accessTokenUrl = 'https://github.com/login/oauth/access_token';
  var userApiUrl = 'https://api.github.com/user';
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: config.github.clientSecret,
    redirect_uri: req.body.redirectUri
  };

  request.get({
    url: accessTokenUrl,
    qs: params
  }, function (err, response, accessToken) {
    accessToken = qs.parse(accessToken);
    var headers = {
      'User-Agent': 'Satellizer'
    };

    request.get({
      url: userApiUrl,
      qs: accessToken,
      headers: headers,
      json: true
    }, function (err, response, profile) {
      process.nextTick(function () {
        User.findOne({
          email: profile.email
        }, function (error, user) {
          if (error) {
            res.status(401).send({
              error: true,
              message: 'Error while retriving data.'
            });
          } else if (!user) {
            var user = new User();
            user.auth_type = 'github';
            user.auth_id = profile.id;
            user.auth_token = accessToken.access_token;
            user.avatar = profile.avatar_url;
            user.name = profile.name;
            user.email = profile.email;
            user.password = 'nimer';
            user.save(function (error, user) {
              user.password = null;
              res.send({
                error: false,
                message: 'Token Created Successfully.',
                user: user,
                token: createJWT(user)
              });
            });
          } else {
            user.auth_type = 'github';
            user.auth_id = profile.id;
            user.auth_token = accessToken.access_token;
            user.avatar = profile.avatar_url;
            user.name = profile.name;
            user.save(function (error, user) {
              if (error) {
                console.log(error)
                res.status(401).send({
                  error: true,
                  message: 'Error while retriving data.'
                });
              } else {
                user.password = null;
                res.send({
                  error: false,
                  message: 'Token Created Successfully.',
                  user: user,
                  token: createJWT(user)
                });
              }
            });

          }
        });
      });

    });
  });
});


/*
 |--------------------------------------------------------------------------
 | Login with Facebook
 |--------------------------------------------------------------------------
 */
app.post('/auth/facebook', function (req, res) {
  var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
  var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
  var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: config.facebook.clientSecret,
    redirect_uri: req.body.redirectUri
  };

  // Step 1. Exchange authorization code for access token.
  request.get({
    url: accessTokenUrl,
    qs: params,
    json: true
  }, function (err, response, accessToken) {
    if (response.statusCode !== 200) {
      return res.status(500).send({
        message: accessToken.error.message
      });
    }

    // Step 2. Retrieve profile information about the current user.
    request.get({
      url: graphApiUrl,
      qs: accessToken,
      json: true
    }, function (err, response, profile) {
      if (response.statusCode !== 200) {
        return res.status(500).send({
          message: profile.error.message
        });
      }
      process.nextTick(function () {
        User.findOne({
          email: profile.email
        }, function (error, user) {
          if (error) {
            res.status(401).send({
              error: true,
              message: 'Error while retriving data.'
            });
          } else if (!user) {
            var user = new User();
            user.auth_type = 'facebook';
            user.auth_id = profile.id;
            user.auth_token = accessToken.access_token;
            user.avatar = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
            user.name = profile.name;
            user.email = profile.email;
            user.password = 'nimer';
            user.save(function (error, user) {
              user.password = null;
              res.send({
                error: false,
                message: 'Token Created Successfully.',
                user: user,
                token: createJWT(user)
              });
            });
          } else {
            user.auth_type = 'facebook';
            user.auth_id = profile.id;
            user.auth_token = accessToken.access_token;
            user.avatar = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
            user.name = profile.name;
            user.save(function (error, user) {
              if (error) {
                console.log(error)
                res.status(401).send({
                  error: true,
                  message: 'Error while retriving data.'
                });
              } else {
                user.password = null;
                res.send({
                  error: false,
                  message: 'Token Created Successfully.',
                  user: user,
                  token: createJWT(user)
                });
              }
            });

          }
        });
      });
    });
  });
});











// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send();
  ({
    message: err.message,
    error: {}
  });
});


module.exports = app;