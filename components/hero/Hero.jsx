import Link from "next/link";

import { Typewriter } from 'react-simple-typewriter'

export default function Hero() {
    return (
        <>
        
            <section className="bg-gray-100 ">
                <div
                    style={{
                        backgroundImage: "url('/assets/resume-example1.jpeg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "100vh",
                    }}
                >
                   
                    <div className="flex flex-col justify-center items-center h-full text-center">
                        <h1 className="text-6xl font-bold text-white mb-2">
                            Free Resume Maker <br />
                            <span className="text-[rgb(12,17,19)]">
                                <Typewriter
                                    words={['Optimized', 'Perfect', 'Professional', 'ATS-friendly']}
                                    loop={0}
                                    cursor
                                    cursorStyle='_'
                                    typeSpeed={100}
                                    deleteSpeed={50}
                                    delaySpeed={1000}
                                />
                            </span>
                            <br />
                            Resume.
                        </h1>
                       
                        <br></br>
                        <Link 
                            href="/builder" 
                            className="inline-block bg-neutral-500 text-white-600 px-6 py-3 rounded-lg font-bold text-lg transition duration-200 hover:bg-[rgb(5,234,250)] hover:text-gray-800 transform hover:shadow-lg"
                        >
                            Make My Resume
                        </Link>
                    </div>
                </div>
            </section>
           
        </>
    );
}
