"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Edit, Globe, Instagram, Linkedin, Twitter } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { UpdateAccountModal } from "@/components/shared/modals/account-update-modal";
import { Toast } from "../ui/toast";
import { UpdateUser } from "@/services/users";

interface AccountDetailsProps {
    user: any;
    experience: number;
    tests: number;
    timing: string;
}

export const AccountDetails = ({ user, experience, tests, timing }: AccountDetailsProps) => {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        instagramUsername: user?.instagramUsername ?? "",
        linkedinUsername: user?.linkedinUsername ?? "",
        twitterUsername: user?.twitterUsername ?? "",
        website: user?.website ?? "",
    });

    const updateProfile = async () => {
        try {
            setLoading(true);

            if (!data.instagramUsername && !data.linkedinUsername && !data.twitterUsername && !data.website) {
                return Toast({ success: false, message: "Please fill in the fields!" });
            }

            const response = await UpdateUser({ id: user?._id, ...data });
            Toast(response);
            if (response.success) {
                setOpen(false);
                router.refresh();
            }
        } catch (error: any) {
            Toast({ success: false, message: error.message ?? "Something went wrong!" });
        } finally {
            setLoading(false);
        }
    };

    return (<>
        <UpdateAccountModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={updateProfile}
            loading={loading}
            data={data}
            setData={setData}
        />
        <div className="account__top-box">
            <div className="flex flex-col gap-3 min-w-[300px]">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl">{user?.username}</h1>
                    <p className="description-text">{`Joined ${format(new Date(user?.createdAt), "MMMM dd, yyyy")}`}</p>
                </div>

                <div className="flex-around gap-2">
                    <span>{user?.level}</span>
                    <Progress value={experience} />
                    <span>{`${user?.experience}/${user?.level * 200}`}</span>
                </div>
            </div>

            <div className="flex-between md:flex-around gap-10">
                <div className="flex-center flex-col gap-2">
                    <p className="description-text">Total Tests</p>
                    <h1 className="text-2xl">{tests}</h1>
                </div>

                <div className="flex-center flex-col gap-2">
                    <p className="description-text">Typing Timing</p>
                    <h1 className="text-2xl">{timing}</h1>
                </div>
            </div>

            <div className="flex-between md:flex-around gap-5">
                <div className={`social-link-icons ${!user?.instagramUsername && "pointer-events-none"}`}>
                    <Link href={`https://www.instagram.com/${user?.instagramUsername}`} target="_blank">
                        <Instagram />
                    </Link>
                </div>
                <div className={`social-link-icons ${!user?.linkedinUsername && "pointer-events-none"}`}>
                    <Link href={`https://www.linkedin.com/in/${user?.linkedinUsername}`} target="_blank">
                        <Linkedin />
                    </Link>
                </div>
                <div className={`social-link-icons ${!user?.twitterUsername && "pointer-events-none"}`}>
                    <Link href={`https://www.twitter.com/${user?.twitterUsername}`} target="_blank">
                        <Twitter />
                    </Link>
                </div>
                <div className={`social-link-icons ${!user?.website && "pointer-events-none"}`}>
                    <Link href={`${user?.website}`} target="_blank">
                        <Globe />
                    </Link>
                </div>
                <div className={`ml-5 social-link-icons`}>
                    <Edit onClick={() => setOpen(true)} />
                </div>
            </div>
        </div>
    </>)
}