import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import user, { User } from "./_models/user";
import dbConnect from "@/lib/dbConnect";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(req: NextRequest) {
  await dbConnect();

  const { name, password, phone, nick, tagline } = await req.json();

  let newUser: Partial<User> = {
    name,
    password,
    phone,
    nick,
    tagline,
    xp: 0,
  };

  const createdUser = await user.create(newUser);

  if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
    return Response.json({
      status: 400,
      message: "Error creating user",
    });
  }

  const accessToken = jwt.sign(
    { ...createdUser },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30d" }
  );

  delete createdUser.password;

  const data = {
    status: 201,
    response: { ...createdUser._doc, token: accessToken },
  };

  return Response.json(data);
}


export async function GET(req: NextRequest) {
  await dbConnect();

  const users = await user.find({});

  const data = {
    status: 200,
    response: users,
  };

  return Response.json(data);
}
