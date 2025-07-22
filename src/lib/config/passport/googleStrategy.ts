// src/lib/config/strategies/google.strategy.ts

import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { envConfig } from "../environment.config";
import UserModel from "../../../users/users.model";
import { createJWT } from "../../utils/token.util";
import { IUser } from "../../../users/interfaces/user.interface";

export function setupGoogleStrategy() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: envConfig.GOOGLE_CLIENT_ID,
        clientSecret: envConfig.GOOGLE_CLIENT_SECRET,
        callbackURL: `${envConfig.BACKEND_URL}/api/v1/auth/google/callback`,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          let user = (await UserModel.findOne({
            googleId: profile.id,
          })) as any as IUser;
          if (user) {
            return done(null, user);
          }
          if (!user) {
            user = (await UserModel.create({
              email: profile.emails?.[0].value,
              username: profile.displayName.toLocaleLowerCase(),
              googleId: profile.id,
              image: profile.photos?.[0]?.value,
            })) as any as IUser;
          }

          const token = createJWT({ id: user._id!, role: user.role });
          done(null, { token, user });
        } catch (error) {
          done(error);
        }
      }
    )
  );
}
