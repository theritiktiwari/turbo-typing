const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "<SUPPORT_EMAIL>";

export const privacyPolicy = [
    {
        heading: "Section 1: What information do we collect ?",
        content: [
            `We collect the following information from you:`,
            [
                `Email address`,
                `Username`,
                `Your social media links`,
                `Information about each typing test you take`,
                `Your currently active settings`,
                `How many typing tests you've started and completed`,
                `How long you've been typing on the website`,
            ],
        ]
    },
    {
        heading: "Section 2: How do we collect the information ?",
        content: [
            `You directly provide most of the information we collect. We collect the information when you:`,
            [
                `Create an account`,
                `Complete a typing test`,
                `Change settings on the website`
            ]
        ]
    },
    {
        heading: "Section 3: How do we use your information ?",
        content: [
            `We collect your information so that we can`,
            [
                `Remember your settings`,
                `Allow you to view result history of previous tests you completed`,
                `Save results from tests you take and show you statistics based on them`,
            ]
        ]
    },
    {
        heading: "Section 4: Cookies",
        content: [
            `We use cookies to maintain session of the user. It is not used to personally identify you on other websites. We use them to improve your experience on our website, including:`,
            [
                `Keeping you signed in`,
                `Understanding how you use our website`,
                `Traffic analysis`,
                `Advertisements purposes`,
                `Remembering your settings`
            ],
        ]
    },
    {
        heading: "Section 5: Security",
        content: [
            `To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.`
        ]
    },
    {
        heading: "Section 6: Disclosure",
        content: [
            `We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.`
        ]
    },
    {
        heading: "Section 7: Age of Consent",
        content: [
            `By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.`
        ]
    },
    {
        heading: "Section 8: Changes to our Privacy Policy",
        content: [
            `We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use or disclose it. If our store is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.`
        ]
    },
    {
        heading: "Section 9: Questions and Contact Information",
        content: [
            `If you would like to: access, correct, amend or delete any personal information we have about you, register a complaint, or simply want more information contact us at ${SUPPORT_EMAIL}.`
        ]
    },
];
