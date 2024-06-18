import React from 'react'
import { termsOfService } from "@/constants/terms-of-service";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service",
};

const Page = () => {
    const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Turbo Typing";

    return (
        <>
            <div className="space-y-3">
                <h1 className='page-heading text-left'>Terms of Service - {APP_NAME} </h1>
            </div>

            <div className="space-y-3">
                <h1 className='page-heading'>Introduction</h1>
                <p className='page-description'>These Terms of Service govern your use of our website and services. By accessing or using our services, you agree to be bound by these terms.</p>
            </div>

            <div className="space-y-3">
                {termsOfService?.map((term, index) => (
                    <div key={index} className="space-y-3">
                        <h2 className='page-subheading'>{term.heading}</h2>
                        {term.content.map((content, index) => (
                            Array.isArray(content) ? <ul key={index} className='space-y-2'>
                                {content.map((subContent, contentIndex) => (
                                    <li className="page-list-item" key={contentIndex}>{subContent}</li>
                                ))}
                            </ul> : <p key={index}>{content}</p>
                        ))}
                    </div>
                ))}
            </div>

            <div className="space-y-3">
                <p className='page-description'>These terms of service were last updated on June 18, 2024.</p>
            </div>
        </>
    )
}

export default Page