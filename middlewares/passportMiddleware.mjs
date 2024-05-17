import passport from '../config/passport.mjs';

export function passAuthenticate(req, res, next) {
    passport.authenticate('local', { session: false })(req, res, next);
}
