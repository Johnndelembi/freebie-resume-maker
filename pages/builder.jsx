'use client';

import React, { useState, createContext, useContext, useEffect } from "react";
import Language from "../components/form/Language";
import Meta from "../components/meta/Meta";
import FormCP from "../components/form/FormCP";
import LoadUnload from "../components/form/LoadUnload";
import Preview from "../components/preview/Preview";
import DefaultResumeData from "../components/utility/DefaultResumeData";
import SocialMedia from "../components/form/SocialMedia";
import WorkExperience from "../components/form/WorkExperience";
import Skill from "../components/form/Skill";
import PersonalInformation from "../components/form/PersonalInformation";
import Summary from "../components/form/Summary";
import Projects from "../components/form/Projects";
import Education from "../components/form/Education";
import dynamic from "next/dynamic";
import Certification from "../components/form/certification";
import Print from "../components/utility/WinPrint";
import { DesignProvider } from '../contexts/DesignContext';
import DesignSelector from '../components/form/DesignSelector';
import Analytics from '../utils/analytics';
import Dashboard from '../components/Dashboard';
import LoadingSpinner from '../components/LoadingSpinner';
import ChatModal from '../src/ChatModal';

const ResumeContext = createContext(DefaultResumeData);

// server side rendering false
const PrintComponent = dynamic(() => import("../components/utility/WinPrint"), {
  ssr: false,
});

// Dynamic imports for heavy components
const PreviewComponent = dynamic(() => import('../components/preview/Preview'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

const DashboardComponent = dynamic(() => import('../components/Dashboard'), {
  ssr: false
});

export default function Builder(props) {
  // resume data
  const [resumeData, setResumeData] = useState(DefaultResumeData);

  // form hide/show
  const [formClose, setFormClose] = useState(false);

  // Chat visibility state
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Track page visit when component mounts
  useEffect(() => {
    Analytics.trackPageVisit();
  }, []);

  // profile picture
  const handleProfilePicture = (e) => {
    const file = e.target.files[0];

    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeData({ ...resumeData, profilePicture: event.target.result });
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file type");
    }
  };

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
    console.log(resumeData);
  };

  // Update the print handler
  const handlePrint = () => {
    Analytics.incrementDownloadCount();
    window.print();
  };

  // Track when a resume is created (when form is filled)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    Analytics.incrementResumeCount();
    // ... your existing form submission logic
  };

  return (
    <>
      <ResumeContext.Provider
        value={{
          resumeData,
          setResumeData,
          handleProfilePicture,
          handleChange,
        }}
      >
        <DesignProvider>
          <Meta
            title="Free Resume Maker"
            description="free resume maker for humanity."
            keywords="ATS-friendly, Resume optimization, Keyword-rich resume, ATS resume builder, ATS resume templates, ATS-compliant resume, ATS-optimized CV, ATS-friendly format, ATS resume tips, Resume writing services, Career guidance, Job search in India, Resume tips for India, Professional resume builder, Cover letter writing, Interview preparation, Job interview tips, Career growth, Online job applications, resume builder, free resume builder, resume ats, best free resume builder, resume creator, resume cv, resume design, resume editor, resume maker"
          />
          <div className="f-col gap-4 md:flex-row justify-evenly max-w-full md:mx-auto md:h-screen">
            {!formClose && (
              <form className="p-4 bg-[rgb(42,167,69)] exclude-print w-full h-full md:overflow-y-scroll">
                <LoadUnload />
                <DesignSelector />
                <PersonalInformation />
                <SocialMedia />
                <Summary />
                <Education />
                <WorkExperience />
                <Projects />
                {
                  resumeData.skills.map((skill, index) => (
                    <Skill
                      title={skill.title}
                      key={index}
                    />
                  ))
                }
                <Language />
                <Certification />
              </form>
            )}
            <PreviewComponent className="w-full h-full" />
          </div>
          <FormCP formClose={formClose} setFormClose={setFormClose} />
          <Print />
          <DashboardComponent />

          {/* Chat Button positioned at the top-left corner */}
          <button 
            onClick={() => setIsChatOpen(true)} 
            className="fixed top-4 left-4 bg-white text-green p-2 rounded-xl"
          >
            Builder AI
          </button>

          {/* Chat Modal */}
          <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </DesignProvider>
      </ResumeContext.Provider>
    </>
  );
}
export { ResumeContext };
