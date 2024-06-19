import dbConnect from "@/lib/db";
import { MemberService } from "@/services/members";

export async function POST(request: Request) {
    await dbConnect();

    const body = await request.json();
    const response = await MemberService.addMember({ email: body.email });

    return Response.json(response);
}