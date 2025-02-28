import React from 'react';
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import ContactInfo from "../ContactInfo";
import DateRange from "../../utility/DateRange";
import Image from "next/image";
import Link from "next/link";

const MinimalistDesign = ({ resumeData, DraggableComponents }) => {
  const { Droppable, Draggable } = DraggableComponents;

  return (
    <div className="minimalist-design max-w-5xl mx-auto p-8 bg-white">
      {/* Left Sidebar */}
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1 bg-gray-50 p-6 rounded-lg">
          {resumeData.profilePicture && (
            <div className="mb-6">
              <Image
                src={resumeData.profilePicture}
                alt={resumeData.name}
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>
          )}
          
          <div className="space-y-6">
            <div>
              <h2 className="text-sm uppercase tracking-wider text-gray-600 mb-3">Contact</h2>
              <ContactInfo
                mainclass="space-y-2"
                linkclass="text-sm flex items-center gap-2 text-gray-700 hover:text-black"
                teldata={resumeData.contactInformation}
                emaildata={resumeData.email}
                addressdata={resumeData.address}
                telicon={<MdPhone className="text-gray-500" />}
                emailicon={<MdEmail className="text-gray-500" />}
                addressicon={<MdLocationOn className="text-gray-500" />}
              />
            </div>

            <div>
              <h2 className="text-sm uppercase tracking-wider text-gray-600 mb-3">Skills</h2>
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
                            <h3 className="text-sm font-medium">{skill.title}</h3>
                            <p className="text-sm text-gray-600">
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
            </div>

            {resumeData.certifications && resumeData.certifications.length > 0 && (
              <div>
                <h2 className="text-sm uppercase tracking-wider text-gray-600 mb-3">Certifications</h2>
                <ul className="text-sm space-y-2">
                  {resumeData.certifications.map((cert, index) => (
                    <li key={index} className="text-gray-700">{cert}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-2">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{resumeData.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{resumeData.position}</p>
            {resumeData.summary && (
              <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
            )}
          </header>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Experience</h2>
            <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
                  {resumeData.workExperience.map((exp, index) => (
                    <Draggable
                      key={`work-${index}`}
                      draggableId={`WORK_EXPERIENCE-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="border-l-2 border-gray-200 pl-4"
                        >
                          <h3 className="font-medium text-gray-800">{exp.position}</h3>
                          <p className="text-gray-600">{exp.company}</p>
                          <DateRange
                            startYear={exp.startYear}
                            endYear={exp.endYear}
                            id={`work-date-${index}`}
                            className="text-sm text-gray-500"
                          />
                          <p className="mt-2 text-gray-700">{exp.description}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Projects</h2>
            <Droppable droppableId="projects" type="PROJECTS">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
                  {resumeData.projects.map((project, index) => (
                    <Draggable
                      key={`project-${index}`}
                      draggableId={`PROJECT-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="border-l-2 border-gray-200 pl-4"
                        >
                          <h3 className="font-medium text-gray-800">{project.name}</h3>
                          <DateRange
                            startYear={project.startYear}
                            endYear={project.endYear}
                            id={`project-date-${index}`}
                            className="text-sm text-gray-500"
                          />
                          {project.link && (
                            <Link href={project.link} className="text-blue-600 hover:underline text-sm">
                              {project.link}
                            </Link>
                          )}
                          <p className="mt-2 text-gray-700">{project.description}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Education</h2>
            <div className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-4">
                  <h3 className="font-medium text-gray-800">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.school}</p>
                  <DateRange
                    startYear={edu.startYear}
                    endYear={edu.endYear}
                    id={`edu-date-${index}`}
                    className="text-sm text-gray-500"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MinimalistDesign;