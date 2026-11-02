export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Information We Collect",
      content: "As we use blockchain technology, some information such as your wallet address, transaction amounts, and timestamps is publicly available on-chain. We also collect usage data including IP address, browser type, operating system, pages viewed, and time spent on each page.",
    },
    {
      title: "How We Use Your Information",
      items: [
        "To provide and improve our services — operating and maintaining the platform.",
        "For security and fraud prevention — detecting and responding to security incidents.",
        "To comply with legal obligations — applicable laws and regulations.",
      ],
    },
    {
      title: "Your Rights and Choices",
      content: "Depending on your jurisdiction, you may have certain rights regarding your information, including the right to access, update, and request deletion of your data.",
    },
    {
      title: "Data Security",
      content: "We implement appropriate technical and organisational measures to protect your personal information from unauthorised access, disclosure, alteration, or destruction.",
    },
    {
      title: "Children's Privacy",
      content: "This platform is not intended for children under the age of 18. We do not knowingly collect personal information from children. If we discover we have collected information from a child under 18, we will delete it immediately.",
    },
    {
      title: "Changes to This Privacy Policy",
      content: "We may update this Privacy Policy from time to time. When we do, we will notify you by posting a notice on our website. Please review this policy periodically for any changes.",
    },
    {
      title: "Contact Us",
      content: null,
      contactLink: true,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 min-h-screen">
      <div className="bg-white dark:bg-[#1c1c24] shadow-md rounded-lg p-8 w-full mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Privacy Policy</h1>
        {sections.map(({ title, content, items, contactLink }) => (
          <section key={title} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            {content && <p className="mb-4 text-lg text-justify text-gray-800 dark:text-gray-200">{content}</p>}
            {items && (
              <ul className="list-disc pl-6 mb-4 text-lg text-gray-800 dark:text-gray-200 space-y-2">
                {items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
            {contactLink && (
              <p className="text-gray-800 dark:text-gray-200">
                If you have any questions or need assistance, we are{" "}
                <a href="/contact" className="text-[#8c6dfd] underline">here</a> to help.
              </p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
