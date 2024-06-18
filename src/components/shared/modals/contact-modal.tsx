"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bug, CircleHelp, CircleUserRound, Handshake, ListCollapse, MessageCircleMore } from "lucide-react";
import { Modal } from "@/components/ui/modal";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
    isOpen,
    onClose,
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Turbo Typing";
    const contactEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "<ADD_EMAIL>";

    const data = [
        {
            subject: `Feedback on ${APP_NAME}`,
            icon: <MessageCircleMore />,
            text: "Feedback",
        },
        {
            subject: `Question about ${APP_NAME}`,
            icon: <CircleHelp />,
            text: "Question",
        },
        {
            subject: `Report bug on ${APP_NAME}`,
            icon: <Bug />,
            text: "Report Bug",
        },
        {
            subject: `Help for User Account on ${APP_NAME}`,
            icon: <CircleUserRound />,
            text: "Account Query",
        },
        {
            subject: `Business Query about ${APP_NAME}`,
            icon: <Handshake />,
            text: "Business Queries",
        },
        {
            subject: `Other query about ${APP_NAME}`,
            icon: <ListCollapse />,
            text: "Other",
        },
    ];

    return (
        <Modal
            title={"Contact Us"}
            description={`Feel free to send an email to ${contactEmail} for any queries or feedback. We will get back to you as soon as possible.`}
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="grid md:grid-cols-2 gap-4 py-4">
                {data?.map((item, index) => (
                    <Link
                        key={index}
                        href={`mailto:${contactEmail}?subject=${item.subject}`}
                        className="bg-secondary p-4 rounded-lg"
                    >
                        <div className="flex items-center justify-start gap-2">
                            {item.icon} {item.text}
                        </div>
                    </Link>
                ))}
            </div>
        </Modal>
    );
};