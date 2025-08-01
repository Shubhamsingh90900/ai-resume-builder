import React, { useState, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useResume } from "../../context/ResumeContext";

const Template22 = () => {
  const { resumeData, setResumeData } = useResume();
  const [editMode, setEditMode] = useState(false);
  const resumeRef = useRef();

  const handleFieldChange = (field, value, index = null, subfield = null) => {
    const updatedData = { ...resumeData };
    if (index !== null && subfield) {
      updatedData[field][index][subfield] = value;
    } else if (index !== null) {
      updatedData[field][index] = value;
    } else {
      updatedData[field] = value;
    }
    setResumeData(updatedData);
  };

  const addExperience = () => {
    const newExp = {
      title: "",
      companyName: "",
      companyLocation: "",
      date: "",
      accomplishment: [],
    };
    setResumeData({
      ...resumeData,
      experience: [...(resumeData.experience || []), newExp],
    });
  };

  const addEducation = () => {
    const newEdu = {
      degree: "",
      institution: "",
    };
    setResumeData({
      ...resumeData,
      education: [...(resumeData.education || []), newEdu],
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar resumeRef={resumeRef} />
        <div className="flex-grow p-8 overflow-y-auto" ref={resumeRef}>
          <div className="bg-white text-gray-900 shadow-lg rounded-xl p-10 max-w-5xl mx-auto space-y-6">

            {/* Edit Button */}
            <div className="text-right">
              <button
                onClick={() => setEditMode(!editMode)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-sm"
              >
                {editMode ? "Preview" : "Edit"}
              </button>
            </div>

            {/* Header */}
            <div>
              {editMode ? (
                <>
                  <input
                    type="text"
                    className="text-4xl font-bold w-full border-b mb-2"
                    value={resumeData.name}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                  />
                  <input
                    type="text"
                    className="text-xl text-gray-600 w-full border-b"
                    value={resumeData.role}
                    onChange={(e) => handleFieldChange("role", e.target.value)}
                  />
                </>
              ) : (
                <>
                  <h1 className="text-4xl font-bold">{resumeData.name}</h1>
                  <p className="text-xl text-gray-600">{resumeData.role}</p>
                </>
              )}
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              {["phone", "email", "linkedin", "location"].map((field) => (
                <div key={field}>
                  {editMode ? (
                    <input
                      type="text"
                      className="w-full border-b"
                      value={resumeData[field]}
                      onChange={(e) => handleFieldChange(field, e.target.value)}
                    />
                  ) : (
                    <p>
                      <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>{" "}
                      {resumeData[field]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Summary */}
            <div>
              <h2 className="text-lg font-semibold border-b mb-1">Summary</h2>
              {editMode ? (
                <textarea
                  className="w-full border rounded p-2"
                  rows="3"
                  value={resumeData.summary}
                  onChange={(e) => handleFieldChange("summary", e.target.value)}
                />
              ) : (
                <p className="text-sm text-gray-800">{resumeData.summary}</p>
              )}
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-lg font-semibold border-b mb-1">Skills</h2>
              {editMode ? (
                <input
                  type="text"
                  className="w-full border-b"
                  value={resumeData.skills?.join(", ")}
                  onChange={(e) =>
                    handleFieldChange(
                      "skills",
                      e.target.value.split(",").map((s) => s.trim())
                    )
                  }
                />
              ) : (
                <ul className="list-disc list-inside text-sm text-gray-800">
                  {resumeData.skills?.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-lg font-semibold border-b mb-1">Experience</h2>
              {resumeData.experience?.map((exp, index) => (
                <div key={index} className="mb-4">
                  {editMode ? (
                    <>
                      <input
                        type="text"
                        className="w-full font-semibold border-b mb-1"
                        value={exp.title}
                        onChange={(e) =>
                          handleFieldChange("experience", e.target.value, index, "title")
                        }
                      />
                      <input
                        type="text"
                        className="w-full text-sm border-b mb-1"
                        value={exp.companyName}
                        onChange={(e) =>
                          handleFieldChange("experience", e.target.value, index, "companyName")
                        }
                      />
                      <input
                        type="text"
                        className="w-full text-sm border-b mb-1"
                        value={exp.date}
                        onChange={(e) =>
                          handleFieldChange("experience", e.target.value, index, "date")
                        }
                      />
                      <input
                        type="text"
                        className="w-full text-sm border-b mb-1"
                        value={exp.companyLocation}
                        onChange={(e) =>
                          handleFieldChange("experience", e.target.value, index, "companyLocation")
                        }
                      />
                      <textarea
                        className="w-full text-sm border rounded p-2"
                        value={exp.accomplishment?.join(", ")}
                        onChange={(e) =>
                          handleFieldChange(
                            "experience",
                            e.target.value.split(",").map((x) => x.trim()),
                            index,
                            "accomplishment"
                          )
                        }
                      />
                    </>
                  ) : (
                    <>
                      <p className="font-semibold">{exp.title}</p>
                      <p className="text-sm">
                        {exp.companyName} - {exp.companyLocation}
                      </p>
                      <p className="text-sm italic text-gray-500">{exp.date}</p>
                      <ul className="list-disc list-inside text-sm text-gray-800">
                        {exp.accomplishment?.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              ))}

              {/* Add Experience Button */}
              {editMode && (
                <button
                  onClick={addExperience}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                >
                  + Add Experience
                </button>
              )}
            </div>

            {/* Education */}
            <div>
              <h2 className="text-lg font-semibold border-b mb-1">Education</h2>
              {resumeData.education?.map((edu, index) => (
                <div key={index}>
                  {editMode ? (
                    <>
                      <input
                        type="text"
                        className="w-full border-b mb-1"
                        value={edu.degree}
                        onChange={(e) =>
                          handleFieldChange("education", e.target.value, index, "degree")
                        }
                      />
                      <input
                        type="text"
                        className="w-full border-b"
                        value={edu.institution}
                        onChange={(e) =>
                          handleFieldChange("education", e.target.value, index, "institution")
                        }
                      />
                    </>
                  ) : (
                    <p className="text-sm">
                      <strong>{edu.degree}</strong> - {edu.institution}
                    </p>
                  )}
                </div>
              ))}

              {/* Add Education Button */}
              {editMode && (
                <button
                  onClick={addEducation}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm mt-2"
                >
                  + Add Education
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template22;
