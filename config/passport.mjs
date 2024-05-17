import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import Teacher from '../models/teacher.mjs';

const LocalStrategy = passportLocal.Strategy;

export default passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
        console.log("h i from passport")
      const user = await Teacher.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
     
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return done(null, false, { message: 'Incorrect password' });
      }
     
      return done(null, user);
      
    } catch (error) {
     
      return done(error);
    }
  })
);
