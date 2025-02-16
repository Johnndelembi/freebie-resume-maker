import React from 'react';
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import Skills from "../Skills";
import DateRange from "../../utility/DateRange";
import ContactInfo from "../ContactInfo";
import Image from "next/image";
import Link from "next/link";

const ElegantDesign = ({ resumeData, DraggableComponents }) => {
  const { Droppable, Draggable } = DraggableComponents;

  const icons = [
    { name: "github", icon: <FaGithub /> },
    { name: "linkedin", icon: <FaLinkedin /> },
    { name: "twitter", icon: <FaTwitter /> },
    { name: "facebook", icon: <FaFacebook /> },
    { name: "instagram", icon: <FaInstagram /> },
    { name: "youtube", icon: <FaYoutube /> },
    { name: "website", icon: <CgWebsite /> },
  ];

  return (
    <div className="elegant-design">
      <header className="border-b-2 border-gray-800 pb-6 mb-8">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h1 className="name tracking-wide">{resumeData.name}</h1>
            <p className="profession italic">{resumeData.position}</p>
          </div>
          {resumeData.profilePicture && (
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-800">
              <Image
                src={resumeData.profilePicture}
                alt={resumeData.name}
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-between items-start">
          <ContactInfo
            mainclass="flex flex-col gap-2"
            linkclass="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
            teldata={resumeData.contactInformation}
            emaildata={resumeData.email}
            addressdata={resumeData.address}
            telicon={<MdPhone className="text-gray-500" />}
            emailicon={<MdEmail className="text-gray-500" />}
            addressicon={<MdLocationOn className="text-gray-500" />}
          />
          <div className="flex gap-3">
            {resumeData.socialMedia.map((social, index) => (
              <a
                key={index}
                href={`https://${social.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {icons.find(icon => icon.name === social.socialMedia.toLowerCase())?.icon}
              </a>
            ))}
          </div>
        </div>
      </header>

      {resumeData.summary && (
        <section className="mb-8">
          <h2 className="section-title">Professional Summary</h2>
          <p className="content leading-relaxed mt-3">{resumeData.summary}</p>
        </section>
      )}

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <section className="mb-8">
            <h2 className="section-title">Experience</h2>
            <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="mt-4 space-y-6">
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
                          className="experience-item"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="content i-bold text-lg">{exp.position}</h3>
                              <p className="content italic">{exp.company}</p>
                            </div>
                            <DateRange
                              startYear={exp.startYear}
                              endYear={exp.endYear}
                              id={`work-date-${index}`}
                              className="text-gray-600"
                            />
                          </div>
                          <p className="content leading-relaxed">{exp.description}</p>
                          {exp.keyAchievements && (
                            <ul className="list-disc ml-6 mt-2 space-y-1">
                              {exp.keyAchievements.split('\n').map((achievement, i) => (
                                <li key={i} className="content">{achievement}</li>
                              ))}
                            </ul>
                          )}
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
            <h2 className="section-title">Projects</h2>
            <Droppable droppableId="projects" type="PROJECTS">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="mt-4 space-y-6">
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
                          className="project-item"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="content i-bold text-lg">{project.name}</h3>
                            <DateRange
                              startYear={project.startYear}
                              endYear={project.endYear}
                              id={`project-date-${index}`}
                              className="text-gray-600"
                            />
                          </div>
                          {project.link && (
                            <Link 
                              href={project.link}
                              className="content text-gray-600 hover:text-gray-900 transition-colors block mb-2"
                            >
                              {project.link}
                            </Link>
                          )}
                          <p className="content leading-relaxed">{project.description}</p>
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

        <div className="col-span-1 space-y-8">
          <section>
            <h2 className="section-title">Skills</h2>
            <Droppable droppableId="skills" type="SKILLS">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="mt-4 space-y-4">
                  {resumeData.skills.map((skill, index) => (
                    <Draggable
                      key={`skill-${index}`}
                      draggableId={`SKILL-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="skill-item"
                        >
                          <h3 className="content i-bold mb-2">{skill.title}</h3>
                          <p className="content leading-relaxed">
                            {Array.isArray(skill.skills) 
                              ? skill.skills.join(', ')
                              : typeof skill.skills === 'string'
                                ? skill.skills
                                : ''
                            }
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

          <section>
            <h2 className="section-title">Education</h2>
            <div className="mt-4 space-y-4">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="education-item">
                  <h3 className="content i-bold">{edu.degree}</h3>
                  <p className="content italic">{edu.school}</p>
                  <DateRange
                    startYear={edu.startYear}
                    endYear={edu.endYear}
                    id={`edu-date-${index}`}
                    className="text-gray-600"
                  />
                </div>
              ))}
            </div>
          </section>

          {resumeData.certifications && resumeData.certifications.length > 0 && (
            <section>
              <h2 className="section-title">Certifications</h2>
              <ul className="mt-4 list-disc ml-6 space-y-2">
                {resumeData.certifications.map((certification, index) => (
                  <li key={index} className="content leading-relaxed">
                    {certification}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElegantDesign; 