import React from 'react';
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import Skills from "../Skills";
import DateRange from "../../utility/DateRange";
import ContactInfo from "../ContactInfo";
import Image from "next/image";
import Link from "next/link";

const ModernDesign = ({ resumeData, DraggableComponents }) => {
  const { Droppable, Draggable } = DraggableComponents;

  console.log("Certifications data:", resumeData.certifications);

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
    <div className="modern-design">
      <header className="text-center mb-6">
        {resumeData.profilePicture && (
          <div className="mx-auto w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-gray-200">
            <Image
              src={resumeData.profilePicture}
              alt={resumeData.name}
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
        )}
        <h1 className="name text-4xl font-bold mb-2">{resumeData.name}</h1>
        <p className="profession text-xl text-gray-600 mb-4">{resumeData.position}</p>
        
        <ContactInfo
          mainclass="flex flex-row justify-center gap-4 mb-4"
          linkclass="flex items-center gap-1 text-gray-600 hover:text-gray-800"
          teldata={resumeData.contactInformation}
          emaildata={resumeData.email}
          addressdata={resumeData.address}
          telicon={<MdPhone />}
          emailicon={<MdEmail />}
          addressicon={<MdLocationOn />}
        />

        <div className="flex flex-wrap justify-center gap-4">
          {resumeData.socialMedia.map((social, index) => (
            <a
              key={index}
              href={`https://${social.link}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              {icons.find(icon => icon.name === social.socialMedia.toLowerCase())?.icon}
              <span className="text-sm">{social.link}</span>
            </a>
          ))}
        </div>
      </header>

      {resumeData.summary && (
        <section className="mb-6">
          <h2 className="section-title border-b-2 border-gray-300 mb-3">Professional Summary</h2>
          <p className="content leading-relaxed">{resumeData.summary}</p>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <section className="mb-6">
            <h2 className="section-title border-b-2 border-gray-300 mb-3">Experience</h2>
            <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
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
                          className="mb-4"
                        >
                          <h3 className="content i-bold text-lg">{exp.position}</h3>
                          <p className="content text-gray-600">{exp.company}</p>
                          <DateRange
                            startYear={exp.startYear}
                            endYear={exp.endYear}
                            id={`work-date-${index}`}
                          />
                          <p className="content mt-2">{exp.description}</p>
                          {exp.keyAchievements && (
                            <ul className="list-disc ml-4 mt-2">
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

          <section className="mb-6">
            <h2 className="section-title border-b-2 border-gray-300 mb-3">Projects</h2>
            <Droppable droppableId="projects" type="PROJECTS">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
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
                          className="mb-4"
                        >
                          <h3 className="content i-bold text-lg">{project.name}</h3>
                          <DateRange
                            startYear={project.startYear}
                            endYear={project.endYear}
                            id={`project-date-${index}`}
                          />
                          {project.link && (
                            <Link href={project.link} className="content text-blue-600 hover:underline">
                              {project.link}
                            </Link>
                          )}
                          <p className="content mt-2">{project.description}</p>
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

        <div>
          <section className="mb-6">
            <h2 className="section-title border-b-2 border-gray-300 mb-3">Skills</h2>
            <Droppable droppableId="skills" type="SKILLS">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
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
                          className="mb-3"
                        >
                          <h3 className="content i-bold">{skill.title}</h3>
                          <p className="content">
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

          <section className="mb-6">
            <h2 className="section-title border-b-2 border-gray-300 mb-3">Education</h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="mb-3">
                <h3 className="content i-bold">{edu.degree}</h3>
                <p className="content">{edu.school}</p>
                <DateRange
                  startYear={edu.startYear}
                  endYear={edu.endYear}
                  id={`edu-date-${index}`}
                />
              </div>
            ))}
          </section>

          {resumeData.certifications && resumeData.certifications.length > 0 && (
            <section className="mb-6">
              <h2 className="section-title border-b-2 border-gray-300 mb-3">Certifications</h2>
              <ul className="list-disc ml-4 space-y-1">
                {resumeData.certifications.map((certification, index) => (
                  <li key={index} className="content">
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

export default ModernDesign; 