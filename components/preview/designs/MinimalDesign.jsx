import React from 'react';
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import Skills from "../Skills";
import DateRange from "../../utility/DateRange";
import ContactInfo from "../ContactInfo";
import Link from "next/link";

const MinimalDesign = ({ resumeData, DraggableComponents }) => {
  const { Droppable, Draggable } = DraggableComponents;

  return (
    <div className="minimal-design px-8 py-6">
      <header className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="name mb-1">{resumeData.name}</h1>
            <p className="profession mb-2">{resumeData.position}</p>
          </div>
          <ContactInfo
            mainclass="flex flex-col items-end gap-1"
            linkclass="flex items-center gap-1 text-gray-700"
            teldata={resumeData.contactInformation}
            emaildata={resumeData.email}
            addressdata={resumeData.address}
            telicon={<MdPhone className="text-gray-500" />}
            emailicon={<MdEmail className="text-gray-500" />}
            addressicon={<MdLocationOn className="text-gray-500" />}
          />
        </div>
      </header>

      {resumeData.summary && (
        <section className="mb-4">
          <p className="content text-gray-700">{resumeData.summary}</p>
        </section>
      )}

      <section className="mb-4">
        <h2 className="section-title mb-2">Experience</h2>
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
                      className="mb-3"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="content i-bold">{exp.position}</h3>
                          <p className="content">{exp.company}</p>
                        </div>
                        <DateRange
                          startYear={exp.startYear}
                          endYear={exp.endYear}
                          id={`work-date-${index}`}
                        />
                      </div>
                      <p className="content mt-1">{exp.description}</p>
                      {exp.keyAchievements && (
                        <ul className="list-disc ml-4 mt-1">
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

      <div className="grid grid-cols-2 gap-6">
        <section>
          <h2 className="section-title mb-2">Skills</h2>
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
                        className="mb-2"
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

        <section>
          <h2 className="section-title mb-2">Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="content i-bold">{edu.degree}</h3>
                  <p className="content">{edu.school}</p>
                </div>
                <DateRange
                  startYear={edu.startYear}
                  endYear={edu.endYear}
                  id={`edu-date-${index}`}
                />
              </div>
            </div>
          ))}
        </section>
      </div>

      {resumeData.projects.length > 0 && (
        <section className="mt-4">
          <h2 className="section-title mb-2">Projects</h2>
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
                        className="mb-2"
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="content i-bold">{project.name}</h3>
                          <DateRange
                            startYear={project.startYear}
                            endYear={project.endYear}
                            id={`project-date-${index}`}
                          />
                        </div>
                        {project.link && (
                          <Link href={project.link} className="content text-blue-600 hover:underline block">
                            {project.link}
                          </Link>
                        )}
                        <p className="content">{project.description}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </section>
      )}

      {resumeData.certifications && resumeData.certifications.length > 0 && (
        <section className="mt-4">
          <h2 className="section-title mb-2">Certifications</h2>
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
  );
};

export default MinimalDesign; 