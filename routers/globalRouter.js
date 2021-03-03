import express from "express";
import routes from "../routes";
import passport from "passport";
import { home, search } from '../controllers/videoController';
import { getJoin, getLogin, postLogin, logout, postJoin, githubLogin, postGithubLogin, kakaoLogin, postKakaoLogin } from '../controllers/userController';
import { onlyPublic, onlyPrivate } from "../middleware";


const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.github, githubLogin);

globalRouter.get(
  routes.githubCallBack,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogin
);

globalRouter.get(routes.kakao, kakaoLogin);
globalRouter.get(
  routes.kakaoCallback,
  passport.authenticate("kakao", { failureRedirect: "/login"}),
  postKakaoLogin
);

export default globalRouter;