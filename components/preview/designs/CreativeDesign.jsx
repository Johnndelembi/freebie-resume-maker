import React from 'react';
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import ContactInfo from "../ContactInfo";
import DateRange from "../../utility/DateRange";
import Image from "next/image";
import Link from "next/link";

const CreativeDesign = ({ resumeData, DraggableComponents }) => {
  const { Droppable, Draggable } = DraggableComponents;

  return (
    <div className="creative-design relative bg-white">
      {/* Diagonal Background */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-indigo-600 transform -skew-y-6 origin-top-left -z-1"></div>

      {/* Header Section */}
      <div className="relative z-10 px-8 pt-12 pb-6 text-white">
        <div className="flex items-start gap-8">
          {resumeData.profilePicture && (
            <div className="flex-shrink-0">
              <Image
                src={resumeData.profilePicture}
                alt={resumeData.name}
                width={150}
                height={150}
                className="rounded-full border-4 border-white shadow-lg"
              />
            </div>
          )}
          <div className="flex-grow">
            <h1 className="text-4xl font-bold mb-2">{resumeData.name}</h1>
            <p className="text-xl mb-4 text-indigo-100">{resumeData.position}</p>
            <div className="flex flex-wrap gap-4 mb-4">
              <ContactInfo
                mainclass="flex gap-6"
                linkclass="flex items-center gap-2 text-indigo-100 hover:text-white transition-colors"
                teldata={resumeData.contactInformation}
                emaildata={resumeData.email}
                addressdata={resumeData.address}
                telicon={<MdPhone className="text-indigo-200" />}
                emailicon={<MdEmail className="text-indigo-200" />}
                addressicon={<MdLocationOn className="text-indigo-200" />}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        {/* Summary */}
        {resumeData.summary && (
          <div className="mb-8 bg-indigo-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-indigo-600 mb-3">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="col-span-2">
            {/* Experience */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-indigo-600 mb-6 pb-2 border-b-2 border-indigo-200">
                Experience
              </h2>
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
                            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                          >
                            <h3 className="text-xl font-semibold text-gray-800">{exp.position}</h3>
                            <p className="text-indigo-600 font-medium">{exp.company}</p>
                            <DateRange
                              startYear={exp.startYear}
                              endYear={exp.endYear}
                              id={`work-date-${index}`}
                              className="text-sm text-gray-500 mb-2"
                            />
                            <p className="text-gray-600">{exp.description}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </section>

            {/* Projects */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-indigo-600 mb-6 pb-2 border-b-2 border-indigo-200">
                Projects
              </h2>
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
                            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                          >
                            <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
                            <DateRange
                              startYear={project.startYear}
                              endYear={project.endYear}
                              id={`project-date-${index}`}
                              className="text-sm text-gray-500 mb-2"
                            />
                            {project.link && (
                              <Link 
                                href={project.link}
                                className="text-indigo-600 hover:text-indigo-800 text-sm mb-2 block"
                              >
                                {project.link}
                              </Link>
                            )}
                            <p className="text-gray-600">{project.description}</p>
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

          {/* Right Column */}
          <div className="col-span-1">
            {/* Skills */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-indigo-600 mb-6 pb-2 border-b-2 border-indigo-200">
                Skills
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
                            className="mb-4 p-3 bg-indigo-50 rounded-lg"
                          >
                            <h3 className="font-semibold text-indigo-700">{skill.title}</h3>
                            <p className="text-gray-600 text-sm">
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

            {/* Education */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-indigo-600 mb-6 pb-2 border-b-2 border-indigo-200">
                Education
              </h2>
              <div className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="p-3 bg-indigo-50 rounded-lg">
                    <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                    <p className="text-indigo-600">{edu.school}</p>
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

            {/* Certifications */}
            {resumeData.certifications && resumeData.certifications.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-indigo-600 mb-6 pb-2 border-b-2 border-indigo-200">
                  Certifications
                </h2>
                <ul className="space-y-2">
                  {resumeData.certifications.map((cert, index) => (
                    <li 
                      key={index}
                      className="p-3 bg-indigo-50 rounded-lg text-gray-700"
                    >
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

export default CreativeDesign; 