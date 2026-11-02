"use client";
import Link from "next/link";

export default function HowItWorks() {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 pt-12">
        <h1 className="text-2xl lg:text-3xl font-semibold text-center mb-1">Dream it. Fund it. Make it. Ship it.</h1>
        <h1 className="text-2xl lg:text-3xl font-semibold text-center">We help at every step from concept to market.</h1>
      </div>

      <div className="w-full h-64 lg:h-96 bg-gradient-to-br from-primary-600 to-secondary-700 rounded-[15px] mt-10 flex items-center justify-center mb-8">
        <h1 className="text-4xl font-bold text-white">How It Works?</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center my-4 max-w-5xl mx-auto mt-20 gap-8">
        <div className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-4xl flex-shrink-0">🌍</div>
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold pb-3 text-[#8c6dfd]">FLEXIBILITY &amp; WORLDWIDE REACH</h2>
          <p className="text-3xl font-bold pb-3">Freedom to raise funding for anything and from everywhere</p>
        </div>
      </div>

      <div className="text-center my-8 max-w-3xl mx-auto">
        <p className="text-justify text-lg pb-8">
        This platform embodies flexibility and global reach, granting creators the freedom to raise funds for any project
          from anywhere in the world. Whether you're launching a local initiative or targeting a global audience, our
          platform empowers you to harness the power of crowdfunding without limitations. With seamless access to a
          diverse pool of backers and a borderless approach to fundraising, this platform enables you to realize your
          vision on a truly international scale.
        </p>
      </div>

      <div className="bg-white dark:bg-[#2c2f32] shadow-lg rounded-lg mb-20 px-4 sm:px-6 lg:px-48 py-12">
        <h1 className="text-2xl lg:text-3xl font-semibold text-center mb-4">Ready to Go?</h1>
        <p className="text-center text-lg mb-10">
          You're only a step away from kicking off your entrepreneurial adventure on this platform.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { step: "1", title: "Create Your Campaign", desc: "Set your goal, tell your story, and upload images for your project." },
            { step: "2", title: "Share & Promote", desc: "Spread the word to your network and attract backers from around the world." },
            { step: "3", title: "Get Funded", desc: "Receive funds directly via smart contract — no intermediaries, 100% to you." },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-2xl font-bold">{step}</div>
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Link href="/create-campaign" className="bg-[#8c6dfd] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#7868b3] transition-colors">
            Start Your Campaign
          </Link>
        </div>
      </div>
    </>
  );
}
