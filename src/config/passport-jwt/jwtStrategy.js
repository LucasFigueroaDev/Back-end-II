import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import "dotenv/config";

const verifyToken = async (jwt_payload, done) => {
    if(!jwt_payload) return done(null, false, {message: 'Invalid token'});
    return done(null, jwt_payload);
};

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['token'];
    }
    return token;
};

const strategyConfig = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use('jwt-cookies', new Strategy(strategyConfig, verifyToken));

