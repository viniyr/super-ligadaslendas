import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import user, { User } from "../_models/user";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  const response = await user.findOneAndUpdate(
    { _id: params.id },
    { $inc: { xp: 1 } },
    { new: true }
  );

  const data = {
    status: 200,
    response,
  };

  return Response.json(data);
}
