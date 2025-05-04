import Link from 'next/link';
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
     <Image
        src="/404.gif"
        alt="404 Not Found"
        width={500}
        height={500}
        className="mb-4"
        />
 {/*<Link 
        href="/" 
        className="mt-6 px-4 py-2 bg-orange-500 text-white rounded-3xl hover:bg-orange-400"
      >
        Go back to Home
      </Link>*/}
    </div>
  );
}