import dotenv from "dotenv";
import passport from "passport";
import GithubStrategy from "passport-github";
import kakaoStrategy from "passport-kakao";
import { kakaoLoginCallback, githubLoginCallback } from './controllers/userController';
import User from "./models/User";
import routes from "./routes";

dotenv.config();

/* GitHub Authentication 
1. submit username, password in post way
2. mongoose automatically check
3. passport createe cookie
4. User move github website (auth)
5. move /auth/github/callback (callback Url)
6. call passport function → githubLoginCallback (profile) => return cb function
7. cookie -> make -> save -> send
*/

passport.use(User.createStrategy())

passport.use(new GithubStrategy(
  {
  clientID: process.env.GH_ID,
  clientSecret: process.env.GH_SECRET,
  redirect_uri: `http://localhost:4000${routes.githubCallback}`
  }, 
  githubLoginCallback
  )
);

passport.use(new kakaoStrategy(
  {
  clientID: process.env.FB_ID,
  clientSecret: process.env.FB_SECRET,
  callbackURL: `http://localhost:4000${routes.kakaoCallback}`
  },
  kakaoLoginCallback
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
  done(err, user);
  });
  });