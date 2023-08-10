import { createNewProject } from "./../../lib/api";
import { cookies } from "next/headers";
import { validateJWT } from "../../lib/auth";
import React from "react";
import { db } from "../../lib/db";

const handler = async (req, res) => {
  const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);
  await db.project.create({
    data: {
      name: req.body.name,
      ownerId: user?.id,
    },
  });

  res.json({ data: { message: "hi" } });
};

export default handler;
