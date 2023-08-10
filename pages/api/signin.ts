import { comparePasswords } from "@/lib";
import { createJWT } from "@/lib";
import { db } from "@/lib";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const user = await db.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    const isUser = await comparePasswords(req.body.password, user?.password);

    if (isUser) {
      const jwt = await createJWT(user);
      res.setHeader(
        "Set-Cookie",
        serialize(process.env.COOKIE_NAME, jwt, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        })
      );

      res.status(201);
      res.end();
    }
  }
}