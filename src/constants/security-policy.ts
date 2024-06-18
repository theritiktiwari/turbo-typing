const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "<SUPPORT_EMAIL>";

export const securityPolicy = [
    {
        heading: "Section 1: Disclosure of Security Vulnerabilities",
        content: [
            `For vulnerabilities that affect the confidentiality, integrity, and availability of our services, please send your disclosure via email at ${SUPPORT_EMAIL}.`,
        ]
    },
    {
        heading: "Section 2: Other Security Vulnerabilities",
        content: [
            `For the other bugs that do not affect the confidentiality, integrity, and availability of our services, please follow our bug submission guidelines. To ensure reproducibility, include as much detail as possible. At a minimum, vulnerability disclosures should contain:`,
            [
                `Description of the vulnerability`,
                `Proof of the concept`,
                `Impact of the vulnerability`,
                `Screenshots or Proof of the vulnerability`,
            ],
        ]
    },
    {
        heading: "Section 3: Guidelines",
        content: [
            `Please avoid engaging in activities that could cause denial of service, create significant strains on critical resources, or negatively impact users of the site outside of test accounts.`,
        ]
    },
    {
        heading: "Section 4: Questions and Contact Information",
        content: [
            `If you have any questions about our security policy, please do not hesitate to contact us at ${SUPPORT_EMAIL}`
        ]
    },
];
