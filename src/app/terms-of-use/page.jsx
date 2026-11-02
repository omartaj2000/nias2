"use client";
import Link from "next/link";

const TOC = [
  [1,  "What is this Platform?"],
  [2,  "User Obligations"],
  [3,  "Campaign Owner Obligations"],
  [4,  "Our Role"],
  [5,  "Our Intellectual Property"],
  [6,  "Your Intellectual Property"],
  [7,  "How to Report Copyright Issues"],
  [8,  "Payment Services"],
  [9,  "System Outages and Maintenance"],
  [10, "Unsolicited Idea Submissions"],
  [11, "Indemnity"],
  [12, "Severability"],
  [13, "Definitions"],
  [14, "Full Agreement"],
  [15, "Miscellaneous"],
];

const SECTIONS = [
  { id: 1,  title: "What is this Platform?",            body: "This is an online crowdfunding platform that brings users together to support campaigns featuring innovative products and inspired ventures. It allows users to launch and seek to raise funds for their own campaigns and to contribute to the campaigns of others." },
  { id: 2,  title: "All User Obligations",              body: "We grant you a limited, non-exclusive, non-transferable, and revocable licence to use our Services. You must be 18 or older, follow all applicable laws and our policies, be truthful, respect the rights of others, avoid spam, and not interfere with the functioning of the Site." },
  { id: 3,  title: "Campaign Owner Obligations",        body: "Campaign owners must accurately represent their projects, comply with all laws, maintain transparency, communicate with backers, fulfil rewards as described, conduct themselves ethically, and manage funds responsibly." },
  { id: 4,  title: "Our Role",                          body: "The platform serves as a facilitator for crowdfunding campaigns. We leverage blockchain technology for transparency, use smart contracts to automate fund disbursement, foster community engagement, and provide dispute resolution mechanisms." },
  { id: 5,  title: "Our Intellectual Property",         body: "The platform's Services, Content and Marks are legally protected. You agree not to reproduce, redistribute, or create derivative works of the Services or Content without express written permission." },
  { id: 6,  title: "Your Intellectual Property",        body: "Your User Content remains your property. By submitting content, you grant the platform a worldwide, non-exclusive, perpetual, royalty-free licence to use and exploit that content in connection with the Services." },
  { id: 7,  title: "How to Report Copyright Issues",    body: "We take intellectual property rights very seriously and comply with the DMCA. To submit a claim of copyright infringement, please contact us via our support page. We reserve the right to delete infringing content and terminate repeat infringer accounts." },
  { id: 8,  title: "Payment Services",                  body: "The platform accepts electronic wallets and cryptocurrencies including Ethereum. Transaction fees will be disclosed before completing a transaction. Funds are disbursed via smart contract when predefined milestones are met." },
  { id: 9,  title: "System Outages and Maintenance",    body: "The Site or Services may be unavailable for scheduled maintenance and other reasons. We are not responsible if the Site is unavailable or if you lose any data for any reason." },
  { id: 10, title: "Unsolicited Idea Submissions",      body: "If you send us an unsolicited idea, all such submissions are non-confidential and non-proprietary. You grant the platform a perpetual, irrevocable, worldwide, royalty-free licence to use such submissions without obligation or accounting." },
  { id: 11, title: "Indemnity",                         body: "You agree to defend, indemnify, and hold harmless the platform and its officers, directors, employees, and agents from any claims, damages, or expenses arising from your use of the Services, your User Content, or your violation of these Terms." },
  { id: 12, title: "Severability",                      body: "If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect." },
  { id: 13, title: "Definitions",                       body: "\"Services\" means all products, services, content, features, and other items offered by the platform. \"User Content\" means any content submitted to the platform by users. \"Campaign\" means a fundraising project created on the platform." },
  { id: 14, title: "Full Agreement",                    body: "These Terms, together with the Additional Policies, constitute the entire agreement between you and the platform regarding the use of the Services and supersede all prior agreements." },
  { id: 15, title: "Miscellaneous",                     body: "These Terms are governed by applicable law. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights." },
];

export default function TermsOfUse() {
  const scroll = (id) =>
    document.getElementById(String(id))?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="px-4 py-12 lg:px-24 max-w-5xl mx-auto">
      <h1 className="text-4xl font-semibold text-center mb-8">Terms of Use</h1>
      <p className="text-lg text-justify mb-8">
        Welcome! By using this Site and the Services, you agree to be bound by these Terms.
      </p>

      {/* Table of contents */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Contents</h3>
        <ol className="list-decimal text-xl ml-5 space-y-2">
          {TOC.map(([n, label]) => (
            <li key={n}>
              <button
                onClick={() => scroll(n)}
                className="text-[#808191] hover:text-[#8c6dfd] transition-colors text-left"
              >
                {label}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <p className="font-bold text-lg mb-4">
        IMPORTANT: BY AGREEING TO THESE TERMS, USERS AGREE TO RESOLVE DISPUTES WITH THE PLATFORM
        THROUGH BINDING ARBITRATION AND WAIVE CERTAIN RIGHTS TO PARTICIPATE IN CLASS ACTIONS.
      </p>

      {/* Additional policies */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Additional Policies</h3>
        <ol className="list-decimal text-xl ml-5 space-y-2">
          {[
            ["Help Center",          "/help-and-support"],
            ["Community Guidelines", "/community-guidelines"],
            ["Privacy Policy",       "/privacy-policy"],
          ].map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="text-[#808191] hover:text-[#8c6dfd]">
                {label}
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {SECTIONS.map(({ id, title, body }) => (
        <div
          key={id}
          id={String(id)}
          className="py-8 border-t border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-semibold mb-4">{title}</h2>
          <p className="text-lg text-justify text-gray-800 dark:text-gray-200">{body}</p>
        </div>
      ))}
    </div>
  );
}
