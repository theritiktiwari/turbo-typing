import MemberModel from "@/models/Member";
import { Response } from "@/types/response";

export class MemberService {
    private static AdminCheck(context: any) {
        if (!context?.session || context?.session?.user?.role !== "ADMIN") {
            return new Response("Unauthorized Access.").error();
        }
    }

    public static async addMember(payload: { email: string }) {
        try {
            const { email } = payload;

            if (!email) {
                return new Response("Email is required.").error();
            }

            if (payload?.email && !/^\S+@\S+\.\S+$/.test(payload?.email)) {
                return new Response("Invalid email address.").error();
            }

            const existingMember = await MemberModel.findOne({ email });
            if (existingMember) {
                return new Response("Already subscribed.").error();
            }

            const newMember = new MemberModel({ email });
            await newMember.save();

            return new Response("Subscribed successfully.").success();
        } catch (error) {
            console.error("[CREATE_MEMBER]", error);
            return new Response("Something went wrong.").error();
        }
    }

    public static async getMembers(context: any) {
        try {
            const unauthorize = MemberService.AdminCheck(context);
            if (unauthorize) return unauthorize;

            const members = await MemberModel.find();
            if (!members) {
                return new Response("Members not found.").error();
            }

            return new Response("Members found.", members).data();
        } catch (error) {
            console.error("[GET_ALL_MEMBERS]", error);
            return new Response("Something went wrong.").error();
        }
    }

    public static async deleteMember(payload: { id: string }, context: any) {
        try {
            const unauthorize = MemberService.AdminCheck(context);
            if (unauthorize) return unauthorize;

            const member = await MemberModel.findByIdAndDelete(payload.id);
            if (!member) {
                return new Response("Member not found.").error();
            }

            return new Response("Member deleted successfully.").success();
        } catch (error) {
            console.error("[DELETE_MEMBER]", error);
            return new Response("Something went wrong.").error();
        }
    }
}