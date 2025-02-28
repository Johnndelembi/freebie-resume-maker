import React from 'react';
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import ContactInfo from "../ContactInfo";
import DateRange from "../../utility/DateRange";
import Image from "next/image";
import Link from "next/link";

const CorporateDesign = ({ resumeData, DraggableComponents }) => {
  const { Droppable, Draggable } = DraggableComponents;

  return (
    <div className="corporate-design bg-white">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-600 text-white px-8 py-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-wide mb-2">{resumeData.name}</h1>
            <p className="text-xl text-slate-200 mb-4">{resumeData.position}</p>
            
            {/* Contact Info in a row */}
            <div className="flex flex-wrap gap-6 text-sm text-slate-200">
              <ContactInfo
                mainclass="flex gap-8"
                linkclass="flex items-center gap-2 hover:text-white transition-colors"
                teldata={resumeData.contactInformation}
                emaildata={resumeData.email}
                addressdata={resumeData.address}
                telicon={<MdPhone />}
                emailicon={<MdEmail />}
                addressicon={<MdLocationOn />}
              />
            </div>
          </div>
          
          {resumeData.profilePicture && (
            <div className="ml-6">
              <div className="w-32 h-32 rounded-lg overflow-hidden border-4 border-slate-400">
                <Image
                  src={resumeData.profilePicture}
                  alt={resumeData.name}
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Two Column Layout */}
        <div className="grid grid-cols-12 gap-8">
          {/* Main Content Column */}
          <div className="col-span-8">
            {/* Summary Section */}
            {resumeData.summary && (
              <section className="mb-8">
                <h2 className="text-lg font-bold text-slate-800 border-b-2 border-slate-800 pb-2 mb-4">
                  PROFESSIONAL SUMMARY
                </h2>
                <p className="text-slate-600 leading-relaxed">{resumeData.summary}</p>
              </section>
            )}

            {/* Experience Section */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-800 border-b-2 border-slate-800 pb-2 mb-4">
                WORK EXPERIENCE
              </h2>
              <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {resumeData.workExperience.map((exp, index) => (
                      <Draggable key={`work-${index}`} draggableId={`WORK_EXPERIENCE-${index}`} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-6"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="text-slate-800 font-bold">{exp.position}</h3>
                                <p className="text-slate-600">{exp.company}</p>
                              </div>
                              <DateRange
                                startYear={exp.startYear}
                                endYear={exp.endYear}
                                id={`work-date-${index}`}
                                className="text-sm text-slate-500"
                              />
                            </div>
                            <p className="text-slate-600 mt-2">{exp.description}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </section>

            {/* Projects Section */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-800 border-b-2 border-slate-800 pb-2 mb-4">
                KEY PROJECTS
              </h2>
              <Droppable droppableId="projects" type="PROJECTS">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {resumeData.projects.map((project, index) => (
                      <Draggable key={`project-${index}`} draggableId={`PROJECT-${index}`} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-6"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-slate-800 font-bold">{project.name}</h3>
                              <DateRange
                                startYear={project.startYear}
                                endYear={project.endYear}
                                id={`project-date-${index}`}
                                className="text-sm text-slate-500"
                              />
                            </div>
                            {project.link && (
                              <Link href={project.link} className="text-blue-600 hover:underline text-sm block mb-1">
                                {project.link}
                              </Link>
                            )}
                            <p className="text-slate-600">{project.description}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="col-span-4">
            {/* Skills Section */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-800 border-b-2 border-slate-800 pb-2 mb-4">
                SKILLS
              </h2>
              <Droppable droppableId="skills" type="SKILLS">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {resumeData.skills.map((skill, index) => (
                      <Draggable key={`skill-${index}`} draggableId={`SKILL-${index}`} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-4"
                          >
                            <h3 className="text-slate-800 font-semibold mb-1">{skill.title}</h3>
                            <p className="text-slate-600 text-sm">
                              {Array.isArray(skill.skills) ? skill.skills.join(', ') : skill.skills}
                            </p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </section>

            {/* Education Section */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-800 border-b-2 border-slate-800 pb-2 mb-4">
                EDUCATION
              </h2>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-slate-800 font-semibold">{edu.degree}</h3>
                  <p className="text-slate-600">{edu.school}</p>
                  <DateRange
                    startYear={edu.startYear}
                    endYear={edu.endYear}
                    id={`edu-date-${index}`}
                    className="text-sm text-slate-500"
                  />
                </div>
              ))}
            </section>

            {/* Certifications Section */}
            {resumeData.certifications && resumeData.certifications.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-slate-800 border-b-2 border-slate-800 pb-2 mb-4">
                  CERTIFICATIONS
                </h2>
                <ul className="list-disc list-inside">
                  {resumeData.certifications.map((cert, index) => (
                    <li key={index} className="text-slate-600 mb-2">
                      {cert}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateDesign; 