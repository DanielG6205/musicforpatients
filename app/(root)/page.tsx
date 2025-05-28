"use client"
import Header from "../components/Header";   // banner + sliding navbar
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <Header />
      <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center
                      min-h-screen p-8 sm:p-20 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col items-center justify-items-center">
          <h1 className="mt-45 text-6xl font-bold mb-2">Music For Patients</h1>
          <p className="text-xl text-center sm:text-center max-w-3xl">
            At Music For Patients, we believe music can make a profound impact on the lives of hospitalized individuals.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-4 items-start">
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
              onClick={() => window.location.href = "/donate"} 
            >
              Donate
            </button>

            <button
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
              onClick={() => window.location.href = "/volunteer"}  
            >
              Volunteer
            </button>
          </div>

        </div>
        <div className="flex flex-col sm:flex-row gap-8 items-top">
          <Image src="/pic1.jpeg" alt="Logo" width={400} height={300} className="rounded-lg shadow-lg" />
          <Image src="/pic2.jpeg" alt="Logo" width={400} height={300} className="rounded-lg shadow-lg" />
        </div>
        <div>
          <p className="text-lg text-center max-w-2xl italic">
            &quot;Join us in our mission to bring the healing power of music to those who need it most.&quot; - Music For Patients Team
          </p>
          <p className="text-lg text-center max-w-2xl italic">
            &quot;i luv this group&quot; - patient x
          </p>
        </div>
        <div className="flex justify-center gap-10">
          {/* First Box: Read Testimonies */}
          <div className="w-1/2 max-w-xs bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300">
            <Link href="/testimonies">
                <h2 className="text-2xl font-semibold mb-4 text-center mt-2">Testimonies</h2>
                <div className="relative">
                  <Image 
                    src="/big-logo.png" 
                    alt="Testimonies" 
                    width={400} 
                    height={300} 
                    className="w-full h-40 object-cover rounded-md" 
                  />
                </div>
            </Link>
          </div>

          {/* Second Box: Events */}
          <div className="w-1/2 max-w-xs bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300">
            <Link href="/events">
                <h2 className="text-2xl font-semibold mb-4 text-center mt-2">Events</h2>
                <div className="relative">
                  <Image 
                    src="/big-logo.png" 
                    alt="Events" 
                    width={400} 
                    height={300} 
                    className="w-full h-40 object-cover rounded-md" 
                  />
                </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
