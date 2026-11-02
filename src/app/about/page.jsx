"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function About() {
  const router = useRouter();
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
      <p className="text-lg text-center mb-8 lg:px-32 lg:text-justify">
        Our platform is a Blockchain based Crowd Funding platform, designed to overcome the challenges
        faced by traditional crowdfunding platforms like Kickstarter. Our primary focus is to
        revolutionize the funding landscape by introducing transparency, security, efficiency,
        eliminating high intermediary costs and geographical limitations.
      </p>

      <div className="relative mb-20">
        <div className="w-full lg:h-[30rem] h-64 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-[15px] flex items-center justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-white text-center max-w-3xl px-8">
            Our mission is to empower people to unite around ideas that matter to them.
          </h1>
        </div>
      </div>

      <h2 className="text-2xl sm:text-4xl font-bold text-center mb-4">Platform Innovation</h2>
      <p className="text-lg text-center mb-8">
        Our platform aims to redefine the funding landscape, providing a place where ideas can
        flourish and communities can support impactful projects worldwide.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-stretch mb-8 gap-4">
        {[
          "Products on our platform are unique — the newest tech that companies don't even know will be popular.",
          "Our platform looks for things that could be useful in everyday life. Innovation beyond what's already on the market.",
          "Our platform allows you to connect your creations with a community eager for innovation.",
        ].map((text, i) => (
          <div key={i} className="sm:w-1/3 px-4">
            <div className="rounded-xl bg-white dark:bg-[#1c1c24] p-4 shadow-sm">
              <p className="text-lg text-center">{text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full h-64 bg-gradient-to-br from-secondary-600 to-primary-600 rounded-[15px] flex items-center justify-center mb-12">
        <h1 className="text-4xl font-bold text-white">Find it first on our platform</h1>
      </div>

      <h2 className="text-2xl sm:text-4xl font-bold text-center mb-4">The Creative Independent</h2>
      <p className="text-lg text-center mb-8 lg:text-justify lg:px-32">
        Our platform's support for creative work goes beyond our platform. We publish resources to share
        advice and illuminate the many routes to living a creative life.
      </p>

      <h3 className="text-2xl sm:text-4xl font-bold text-center mb-4">Our team</h3>
      <p className="text-lg text-center lg:text-justify lg:px-32">
        We're an independent company of passionate people — developers, designers, support
        specialists, and writers — working together to build this platform.
      </p>

      <div className="flex flex-col items-center pt-20">
        <button
          className="text-white px-6 py-3 rounded-[10px] bg-[#8c6dfd] mb-14"
          onClick={() => router.push("/explore-projects")}
        >
          EXPLORE
        </button>
        <div className="flex flex-col sm:flex-row w-full mb-8 justify-center gap-8">
          <div className="w-full sm:w-1/3 text-center">
            <p className="font-semibold">LEARN MORE</p>
            <hr className="border-t-2 border-gray-300 mt-3 mb-3" />
            <Link href="/what-we-do" className="text-[#8c6dfd] text-lg font-semibold">What We Do →</Link>
          </div>
          <div className="w-full sm:w-1/3 text-center">
            <p className="font-semibold">DISCOVER</p>
            <hr className="border-t-2 border-gray-300 mt-3 mb-3" />
            <Link href="/explore-projects" className="text-[#8c6dfd] text-lg font-semibold">Explore clever things →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
