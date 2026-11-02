import Link from "next/link";

export default function LegalDetail() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">Legal</h1>
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-12">
        Legal documents governing your use of this platform.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: "Terms of Use", desc: "The full agreement between you and the platform, covering user obligations, campaign owner responsibilities, intellectual property, and more.", href: "/terms-of-use" },
          { title: "Privacy Policy", desc: "How we collect, use, and protect your personal information when you use the platform.", href: "/privacy-policy" },
          { title: "Community Guidelines", desc: "The rules of conduct that apply to all users of this platform.", href: "/community-guidelines" },
          { title: "Trust & Safety", desc: "How we maintain the safety and integrity of the platform for creators and backers.", href: "/trust-and-safety" },
        ].map(({ title, desc, href }) => (
          <Link key={title} href={href}
            className="bg-white dark:bg-[#1c1c24] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:-translate-y-1 transition-transform block">
            <h3 className="font-bold text-xl mb-2 text-[#8c6dfd]">{title} →</h3>
            <p className="text-gray-600 dark:text-gray-400">{desc}</p>
          </Link>
        ))}
      </div>
      <div className="mt-12 bg-white dark:bg-[#1c1c24] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <h2 className="text-xl font-bold mb-3">Legal Contact</h2>
        <p className="text-gray-700 dark:text-gray-300">
          For legal inquiries, please contact us at{" "}
          <a href="mailto:hello@platform.io" className="text-[#8c6dfd] underline">hello@platform.io</a>.
        </p>
      </div>
    </div>
  );
}
