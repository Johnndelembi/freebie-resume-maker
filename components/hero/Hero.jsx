import Link from "next/link";
import { Typewriter } from 'react-simple-typewriter';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaWhatsapp, FaWhatsappSquare } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { BsArrowDownCircle } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Add a constant for the app name to ensure consistency
const APP_NAME = "ResumeCanvas";

export default function Hero() {
    const messages = [
        'Create your professional resume in minutes with our easy-to-use builder.',
        'ATS-friendly templates designed to land you more interviews.',
        'Ignite Your Career in Minutes',
        'Paint Your Professional Story'
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % messages.length);
        }, 4000); // Change message every 4 seconds

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            {/* Navigation Bar */}
            <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="text-2xl font-bold text-gray-800">
                            {APP_NAME}
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
                        backgroundImage: "url('/assets/resume-example2.jpeg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                <div className="relative z-10 container mx-auto px-6 pt-32">
                    <div className="flex flex-col justify-center items-center h-[80vh] text-center">
                        <h1 className="text-5xl font-bold text-white mb-6">
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
                        {/* <p className="text-xl text-gray-200 mb-8 max-w-2xl">
                            Create your professional resume in minutes with our easy-to-use builder. 
                            ATS-friendly templates designed to land you more interviews.
                        </p> */}
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={currentIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="text-xl text-gray-200 mb-0 max-w-2xl h-20" // Fixed height to prevent layout shift
                            >
                                {messages[currentIndex]}
                            </motion.p>
                        </AnimatePresence>
                        <Link 
                            href="/builder" 
                            className="inline-block bg-[rgb(42,167,69)] text-white px-8 py-4 rounded-lg font-bold text-lg transition duration-200 hover:bg-[rgb(42,167,69)]/90 transform hover:scale-105"
                        >
                            Create My Resume Now
                        </Link>

                        {/* Added Stats Section */}
                        <div className="grid grid-cols-3 gap-8 mt-12 text-white">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-center"
                            >
                                <h3 className="text-4xl font-bold">5k+</h3>
                                <p className="text-gray-300">Resumes Created</p>
                            </motion.div>
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-center"
                            >
                                <h3 className="text-4xl font-bold">98%</h3>
                                <p className="text-gray-300">Success Rate</p>
                            </motion.div>
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="text-center"
                            >
                                <h3 className="text-4xl font-bold">24/7</h3>
                                <p className="text-gray-300">Support</p>
                            </motion.div>
                        </div>

                        {/* Scroll Indicator */}
                        <motion.div 
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="absolute bottom-10"
                        >
                            <BsArrowDownCircle className="text-white text-3xl" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* New Templates Preview Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-4">Professional Templates</h2>
                    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        Choose from our collection of professionally designed templates, 
                        each optimized for ATS and crafted to help you stand out.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        {['Modern', 'Creative', 'Corporate'].map((style) => (
                            <motion.div 
                                key={style}
                                whileHover={{ scale: 1.05 }}
                                className="relative group"
                            >
                                <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
                                    <Image
                                        src={`/assets/template-${style.toLowerCase()}.PNG`}
                                        alt={`${style} template`}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Link 
                                            href="/builder" 
                                            className="bg-[rgb(42,167,69)] text-white px-6 py-3 rounded-lg"
                                        >
                                            Use This Template
                                        </Link>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mt-4 text-center">{style}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* New Testimonials Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12">What Our Users Say</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-white p-6 rounded-lg shadow-lg"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <AiFillStar key={i} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                                <div className="flex items-center">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                                        <Image
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">{testimonial.name}</h4>
                                        <p className="text-gray-500 text-sm">{testimonial.position}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* New How It Works Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-[rgb(42,167,69)] text-white text-2xl flex items-center justify-center mx-auto mb-4">
                                    {index + 1}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            {/* <section id="features" className="py-20 bg-gray-50">
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
            </section> */}

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12">Tech Support.</h2>
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
                            <h3 className="text-xl font-bold mb-4">{APP_NAME}</h3>
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
                        <p>© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
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

// Data for testimonials and steps
const testimonials = [
    {
        name: "Aman Mgonja",
        position: "Software Engineer",
        text: "This resume builder helped me build a concrete and a detailed CV, helped me land my very first job. The ATS-friendly templates really made a difference.",
        avatar: "/assets/aman1.jpeg"
    },
    {
        name: "Vivian Kaaya",
        position: "Marketing Manager",
        text: "The templates are professional and the builder is so easy to use. Highly recommended!",
        avatar: "/assets/vivian.jpeg"
    },
    {
        name: "Gift Edward",
        position: "Content Creation Head of Department",
        text: "Got three interview calls within a week of using my new resume. Thank you!",
        avatar: "/assets/gift.jpeg"
    }
];

const steps = [
    {
        title: "Choose Template",
        description: "Select from our professionally designed, ATS-optimized templates."
    },
    {
        title: "Fill Details",
        description: "Enter your information with our easy-to-use form builder."
    },
    {
        title: "Customize Design",
        description: "Personalize colors, fonts, and layout to match your style."
    },
    {
        title: "Download & Apply",
        description: "Get your polished resume in PDF format, ready to help you land interviews."
    }
];
