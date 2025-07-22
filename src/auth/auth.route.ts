import passport from "passport";
import { AuthController } from "./auth.controller";
import { Router } from "express";
import { envConfig } from "../lib/config/environment.config";
import { UserRole } from "../users/enums/user-role.enum";

const router = Router();

const authController = new AuthController();

router.post("/login", (req, res) => authController.login(req, res));
router.post("/signup", (req, res) => authController.signup(req, res));
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req: any, res) => {
    const { token, user } = req.user;
    console.log("token");
    console.log(token);

    res.cookie("token", token, {
      expires: new Date(
        Date.now() + envConfig.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: envConfig.NODE_ENV === "production",
    });
    if (user?.role === UserRole.ADMIN) {
      res.redirect(`${envConfig.FRONTEND_URL}/dashboard`);
    }
    res.redirect(envConfig.FRONTEND_URL);
  }
);
router.post("/forgot-password", (req, res) =>
  authController.forgotPassword(req, res)
);
router.post("/reset-password/:resetToken", (req, res) =>
  authController.resetPassword(req, res)
);

// protected routes
router.use((req, res, next) => authController.protect(req, res, next));

router.post("/logout", (req, res) => authController.logout(req, res));
router.post("/update-my-password", (req, res) =>
  authController.updateMyPassword(req, res)
);

export const authRoutes = router;
