'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function TestComplete() {
  const router = useRouter();

  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 20, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white relative p-6">
      <div className="absolute top-0 left-0 text-black font-medium px-6 py-4">
      <img src="/logo.png" alt="Logo" className="w-[200px] h-auto" />
      </div>

      <div className="mb-2 justify-center">
        <Image
          src="/success.jpg"
          alt="Illustration"
          width={400}
          height={200}
        />
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-semibold text-black mb-3">Congratulation !</h1>

        <p className="text-md text-gray-700 mb-2">
          You've completed the personality test.
        </p>

        <p className="text-md text-gray-400 mb-6">
          You are almost there
        </p>

        <button
          onClick={() => router.push('/user')}
          className="px-12 py-2 bg-green-600 text-white rounded-full text-lg font-medium hover:bg-green-700 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
