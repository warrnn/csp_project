"use client";

import GradientBlinds from "./components/GradientBlinds";

export default function Home() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
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
        <div className="flex-col space-y-8 px-4">
          <h1 className="text-5xl font-bold text-white text-center drop-shadow-lg">
            Experience the Wave of Music
          </h1>
          <p className="text-xl drop-shadow-lg font-semibold text-center">Discover amazing concerts, book tickets instantly, and create unforgettable memories</p>
        </div>
      </div>
    </section>
  );
}