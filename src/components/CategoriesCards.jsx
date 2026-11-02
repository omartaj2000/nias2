"use client";

import { useRouter } from "next/navigation";

const CARDS = [
  { img: "/images/Education.png",   name: "Education",                desc: "Projects focused on learning and education.",             route: "/education-campaigns" },
  { img: "/images/fitness.png",     name: "Health & Fitness",         desc: "Projects focused on improving health and fitness.",       route: "/health-and-fitness" },
  { img: "/images/sport.png",       name: "Sport",                    desc: "Projects focused on innovative sports technology.",       route: "/sports" },
  { img: "/images/film.png",        name: "Social Impact",            desc: "Projects with a positive social impact.",                route: "/social-impact" },
  { img: "/images/audio.png",       name: "Arts & Culture",           desc: "Creative and artistic projects.",                        route: "/arts-and-culture" },
  { img: "/images/bag.png",         name: "Travel & Outdoors",        desc: "Projects related to travel and outdoor activities.",     route: "/travel-and-outdoors" },
  { img: "/images/creative.png",    name: "Creative Services",        desc: "Projects offering innovative and artistic services.",    route: "/creative-services" },
  { img: "/images/fulfillment.png", name: "Fulfillment",              desc: "Projects dedicated to providing essential services.",    route: "/fulfillment" },
  { img: "/images/prototype.png",   name: "Prototyping & Production", desc: "Projects focused on prototypes and final products.",     route: "/prototyping-and-production" },
];

const Card = ({ img, name, desc, route }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(route)}
      className="w-64 rounded-[15px] overflow-hidden shadow-md bg-white dark:bg-[#1c1c24] m-4 hover:-translate-y-1 cursor-pointer transition-transform border border-gray-100 dark:border-gray-800"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img}
        alt={name}
        className="w-full h-32 object-contain mx-auto p-2"
      />
      <div className="px-4 py-4 text-center">
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
        <p className="text-[#8c6dfd] text-sm pt-2 font-medium">View All</p>
      </div>
    </div>
  );
};

const CategoriesCards = () => (
  <div className="container mx-auto">
    <div className="flex flex-wrap justify-center">
      {CARDS.map((card) => (
        <Card key={card.name} {...card} />
      ))}
    </div>
  </div>
);

export default CategoriesCards;
