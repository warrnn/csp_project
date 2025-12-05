"use client";

import ConcertCard from "./components/ConcertCard";
import GradientBlinds from "./components/reactbits/GradientBlinds";

export default function Home() {
  return (
    <>
      <section className="relative w-full h-[85vh] overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <GradientBlinds
            gradientColors={['#FF9FFC', '#5227FF']}
            angle={20}
            noise={0.5}
            blindCount={16}
            blindMinWidth={60}
            spotlightRadius={0.5}
            spotlightSoftness={1}
            spotlightOpacity={1}
            mouseDampening={0.2}
            distortAmount={5}
            shineDirection="left"
            mixBlendMode="lighten"
          />
        </div>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
          <div className="flex-col space-y-8 px-4 mt-12 justify-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-white text-center drop-shadow-lg" data-aos="zoom-out-down" data-aos-duration="1500">
              Experience the Wave of Music
            </h1>
            <p className="text-md sm:text-xl drop-shadow-lg font-semibold text-center" data-aos="zoom-in" data-aos-duration="1500">Discover amazing concerts, book tickets instantly, and create unforgettable memories</p>
            <div className="pt-4 px-4 w-full max-w-3xl mx-auto pointer-events-auto">
              <div className="relative">
                <input
                  type="text"
                  title="search"
                  placeholder="Search for concerts, artists, or venues..."
                  className="w-full h-14 px-6 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full h-auto py-8 px-16 flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <h2 className="font-semibold text-xl">Upcoming Concerts</h2>
          <p className="text-gray-400">Discover and book tickets for the hottest events</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ConcertCard
            id="ABCDEF-123456-HIJKLMN"
            image="https://variety.com/wp-content/uploads/2021/01/1294032168.jpg"
            venue="The O2 Arena"
            date="23 December 2023"
            time="19:00"
            location="Gelora Bung Karno"
            currentCapacity={1500}
            maxCapacity={3500}
            price={500000} />
        </div>
      </section>
    </>
  );
}