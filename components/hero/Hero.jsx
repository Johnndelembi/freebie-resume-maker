import Link from "next/link";
import { Typewriter } from 'react-simple-typewriter';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaWhatsapp, FaWhatsappSquare } from 'react-icons/fa';

export default function Hero() {
    return (
        <>
            {/* Navigation Bar */}
            <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="text-2xl font-bold text-gray-800">
                            Free Resume Maker
                        </Link>
                        <div className="flex items-center gap-6">
                            <Link 
                                href="/builder" 
                                className="bg-[rgb(42,167,69)] text-white px-4 py-2 rounded-lg hover:bg-[rgb(42,167,69)]/90"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen">
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: "url('/assets/resume-example1.jpeg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                <div className="relative z-10 container mx-auto px-6 pt-32">
                    <div className="flex flex-col justify-center items-center h-[80vh] text-center">
                        <h1 className="text-6xl font-bold text-white mb-6">
                            Free Resume Maker <br />
                            <span className="text-[rgb(42,167,69)]">
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
                        <p className="text-xl text-gray-200 mb-8 max-w-2xl">
                            Create your professional resume in minutes with our easy-to-use builder. 
                            ATS-friendly templates designed to land you more interviews.
                        </p>
                        <Link 
                            href="/builder" 
                            className="inline-block bg-[rgb(42,167,69)] text-white px-8 py-4 rounded-lg font-bold text-lg transition duration-200 hover:bg-[rgb(42,167,69)]/90 transform hover:scale-105"
                        >
                            Create My Resume Now
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard 
                            title="ATS-Friendly Templates"
                            description="Our resumes are optimized for Applicant Tracking Systems, increasing your chances of getting noticed."
                            icon="🎯"
                        />
                        <FeatureCard 
                            title="Easy to Use"
                            description="Intuitive interface that makes resume creation a breeze. No design skills needed."
                            icon="💻"
                        />
                        <FeatureCard 
                            title="Multiple Designs"
                            description="Choose from various professional templates to match your style and industry."
                            icon="🎨"
                        />
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12">Get in Touch</h2>
                    <div className="flex flex-col items-center">
                        <div className="flex gap-6 mb-8">
                            <SocialLink href="https://github.com/Johnndelembi/freebie-resume-maker" icon={<FaGithub />} />
                            <SocialLink href="https://linkedin.com" icon={<FaLinkedin />} />
                            <SocialLink href="https://x.com/Johnwills171" icon={<FaTwitter />} />
                            <SocialLink href="mailto:williamjohnie61@gmail.com" icon={<FaEnvelope />} />
                            <SocialLink href="https://wa.link/3wlzbx" icon={<FaWhatsappSquare />} />
                        </div>
                        <p className="text-gray-600 text-center max-w-2xl">
                            Have questions? Need help? We're here to support you in creating the perfect resume.
                            Reach out to us through any of our social channels or email us directly.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">Free Resume Maker</h3>
                            <p className="text-gray-400">
                                Creating professional resumes made easy and accessible for everyone.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><Link href="#features" className="text-gray-400 hover:text-white">Features</Link></li>
                                <li><Link href="#templates" className="text-gray-400 hover:text-white">Templates</Link></li>
                                <li><Link href="#contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Resources</h4>
                            <ul className="space-y-2">
                                <li><Link href="/" className="text-gray-400 hover:text-white">Blog</Link></li>
                                <li><Link href="/" className="text-gray-400 hover:text-white">Resume Tips</Link></li>
                                <li><Link href="/" className="text-gray-400 hover:text-white">FAQ</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2">
                                <li><Link href="/" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                                <li><Link href="/" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>© {new Date().getFullYear()} Free Resume Maker. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}

// Helper Components
const FeatureCard = ({ title, description, icon }) => (
    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const SocialLink = ({ href, icon }) => (
    <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-2xl text-gray-600 hover:text-[rgb(42,167,69)] transition-colors"
    >
        {icon}
    </a>
);
