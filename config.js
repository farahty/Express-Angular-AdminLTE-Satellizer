module.exports = {
    secret: 'ekjfgwegiucgegc87egwcg8wegc8gewcieiwhci3h9820h3c0h2308ch802n3c8',
    database: 'mongodb://localhost/satellizer',
    facebook: {
        clientID: '351188991889075',
        clientSecret: '078ca49fd67707f32d7f4c62fb204b62',
        callbackURL: 'http://localhost:3000/auth/facebook/callback/#',
        profileFields : ['id', 'displayName', 'photos', 'email', 'first_name', 'last_name',
            'age_range', 'link', 'gender', 'locale', 'timezone', 'updated_time', 'verified'
        ]
    },
    github: {
        clientID: '81c2b18ec7a755be3fea',
        clientSecret: '101b44b8784c720b2e7719f0b7053e3ba74a49e3',
        callbackURL: 'http://localhost:3000/auth/github/callback/'
    },
    local: {
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    }

};