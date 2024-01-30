import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import user from "../../user/_models/user";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(req: NextRequest) {
  await dbConnect();

  const { nick, password } = await req.json();

  const [userEntity] = await user.find({ nick });

  if (!userEntity) {
    return Response.json(
      {
        status: 404,
        message: "Not found",
      },
      { status: 404 }
    );
  }

  if (!(await bcrypt.compare(password, userEntity.password))) {
    return Response.json(
      {
        status: 401,
        message: "Invalid password",
      },
      { status: 401 }
    );
  }

  if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
    return Response.json(
      {
        status: 400,
        message: "Internal error",
      },
      { status: 400 }
    );
  }

  const accessToken = jwt.sign(
    { ...userEntity },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30d" }
  );

  delete userEntity._doc.password;
  delete userEntity._doc.createdAt;
  delete userEntity._doc.updatedAt;

  return Response.json({
    status: 200,
    response: { ...userEntity._doc, token: accessToken },
  });
}
