import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useResume } from "../../context/ResumeContext";

const Template23 = () => {
  const resumeRef = useRef(null);
  const { resumeData, setResumeData } = useResume();
  const [editMode, setEditMode] = useState(false);
  const [localData, setLocalData] = useState(resumeData);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    setLocalData(resumeData);
  }, [resumeData]);

  const handleFieldChange = (field, value) => {
    setLocalData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setResumeData(localData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setLocalData(resumeData);
    setEditMode(false);
  };

  const addEducation = () => {
    const updated = [...(localData.education || [])];
    updated.push({
      degree: "New Degree",
      institution: "New Institution",
      duration: "Year - Year",
    });
    handleFieldChange("education", updated);
  };

  const removeEducation = (index) => {
    const updated = [...localData.education];
    updated.splice(index, 1);
    handleFieldChange("education", updated);
  };

  const addExperience = () => {
    const updated = [...(localData.experience || [])];
    updated.push({
      title: "New Title",
      companyName: "New Company",
      date: "Year - Year",
      accomplishment: ["Achievement 1"],
    });
    handleFieldChange("experience", updated);
  };

  const removeExperience = (index) => {
    const updated = [...localData.experience];
    updated.splice(index, 1);
    handleFieldChange("experience", updated);
  };

  const addproject = () => {
    const updated = [...(localData.projects || [])];
    updated.push({
      name: "Name",
      description: "Description",
      technologies: "Tech Stack",

      github: "Github",
    });
    handleFieldChange("projects", updated);
  };

  const removeproject = (index) => {
    const updated = [...localData.projects];
    updated.splice(index, 1);
    handleFieldChange("projects", updated);
  };

  const addCertification = () => {
    const updated = [...(localData.certifications || [])];
    updated.push({
      title: "New Certification",
      issuer: "Issuer",
      date: "Year",
    });
    handleFieldChange("certifications", updated);
  };

  const removeCertification = (index) => {
    const updated = [...localData.certifications];
    updated.splice(index, 1);
    handleFieldChange("certifications", updated);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar resumeRef={resumeRef} />
        <div
          style={{
            flex: 1,
            padding: "2rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            ref={resumeRef}
            style={{
              backgroundColor: "white",
              padding: "2rem",
              width: "100%",
              maxWidth: "1000px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              borderRadius: "0.5rem",
              fontFamily: "Segoe UI, sans-serif",
              display: "grid",
              gridTemplateColumns: "300px 1fr",
              gap: "2rem",
            }}
          >
            {/* Left Column */}
            <div>
              <div style={{ textAlign: "center" }}>
                {editMode ? (
                  <label style={{ cursor: "pointer", display: "block" }}>
                    <img
                      src={profileImage || "https://via.placeholder.com/140"}
                      alt="Profile"
                      style={{
                        width: "140px",
                        height: "140px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid #e5e7eb",
                      }}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                    />
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "#2563eb",
                        marginTop: "0.25rem",
                      }}
                    >
                      Click to change
                    </p>
                  </label>
                ) : (
                  <img
                    src={
                      profileImage ||
                      "https://i.pinimg.com/originals/03/d8/db/03d8db5fa74516252ade0c0bc77aeb9e.jpg"
                    }
                    alt="Profile"
                    style={{
                      width: "140px",
                      height: "140px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid #e5e7eb",
                    }}
                  />
                )}
              </div>

              <div style={{ marginTop: "1.5rem" }}>
                <h3 style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                  Contact
                </h3>
                {["location", "phone", "email", "linkedin"].map((field) =>
                  editMode ? (
                    <input
                      key={field}
                      value={localData[field]}
                      onChange={(e) => handleFieldChange(field, e.target.value)}
                      placeholder={field}
                      style={{
                        width: "100%",
                        marginTop: "0.25rem",
                        borderBottom: "1px solid #ccc",
                      }}
                    />
                  ) : (
                    <p key={field}>{resumeData[field]}</p>
                  )
                )}
              </div>

              <hr style={{ margin: "1rem 0" }} />
              <div style={{ marginTop: "1.5rem" }}>
                <h3 style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                  Skills
                </h3>
                {editMode ? (
                  <textarea
                    value={localData.skills?.join(", ") || ""}
                    onChange={(e) =>
                      handleFieldChange(
                        "skills",
                        e.target.value.split(",").map((s) => s.trim())
                      )
                    }
                    style={{
                      width: "100%",
                      marginTop: "0.5rem",
                      padding: "0.5rem",
                    }}
                  />
                ) : (
                  <ul style={{ paddingLeft: "1.5rem" }}>
                    {resumeData.skills?.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                )}
              </div>

              <hr style={{ margin: "1rem 0" }} />
              <div>
                <h3 style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                  Projects
                </h3>
                {localData.projects?.map((proj, i) => (
                  <div key={i} style={{ marginTop: "0.75rem" }}>
                    {editMode ? (
                      <>
                        <input
                          value={proj.name}
                          onChange={(e) => {
                            const updated = [...localData.projects];
                            updated[i].name = e.target.value;
                            handleFieldChange("projects", updated);
                          }}
                          style={{ width: "100%" }}
                        />
                        <input
                          value={proj.description}
                          onChange={(e) => {
                            const updated = [...localData.projects];
                            updated[i].description = e.target.value;
                            handleFieldChange("projects", updated);
                          }}
                          style={{ width: "100%" }}
                        />
                        <input
                          value={proj.technologies}
                          onChange={(e) => {
                            const updated = [...localData.projects];
                            updated[i].technologies = e.target.value;
                            handleFieldChange("projects", updated);
                          }}
                          style={{ width: "100%" }}
                        />
                        <input
                          value={proj.github}
                          onChange={(e) => {
                            const updated = [...localData.projects];
                            updated[i].github = e.target.value;
                            handleFieldChange("projects", updated);
                          }}
                          style={{ width: "100%" }}
                        />
                        <button
                          onClick={() => removeproject(i)}
                          style={{ color: "#dc2626", fontSize: "0.75rem" }}
                        >
                          Remove
                        </button>
                      </>
                    ) : (
                      <>
                        <p>
                          <strong>{proj.name}</strong>
                          <p>{proj.description}</p>
                          <p>{proj.technologies}</p>
                          <p>{proj.github}</p>
                        </p>
                      </>
                    )}
                  </div>
                ))}
                {editMode && (
                  <button
                    onClick={addproject}
                    style={{ marginTop: "0.5rem", color: "#2563eb" }}
                  >
                    + Add Projects
                  </button>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Name & Role */}
              <div>
                {editMode ? (
                  <>
                    <input
                      value={localData.name}
                      onChange={(e) =>
                        handleFieldChange("name", e.target.value)
                      }
                      style={{
                        fontSize: "1.75rem",
                        fontWeight: "bold",
                        width: "100%",
                      }}
                    />
                    <input
                      value={localData.role}
                      onChange={(e) =>
                        handleFieldChange("role", e.target.value)
                      }
                      style={{
                        fontSize: "1rem",
                        color: "#6b7280",
                        width: "100%",
                      }}
                    />
                  </>
                ) : (
                  <>
                    <h1 style={{ fontSize: "1.75rem", fontWeight: "bold" }}>
                      {resumeData.name}
                    </h1>
                    <h2 style={{ fontSize: "1rem", color: "#6b7280" }}>
                      {resumeData.role}
                    </h2>
                  </>
                )}
              </div>

              <hr style={{ margin: "1rem 0" }} />

              {/* Summary */}
              <div>
                <h3 style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                  Summary
                </h3>
                {editMode ? (
                  <textarea
                    value={localData.summary}
                    onChange={(e) =>
                      handleFieldChange("summary", e.target.value)
                    }
                    rows={4}
                    style={{
                      width: "100%",
                      marginTop: "0.5rem",
                      padding: "0.5rem",
                    }}
                  />
                ) : (
                  <p>{resumeData.summary}</p>
                )}
              </div>

              <hr style={{ margin: "1.5rem 0" }} />

              {/* Education */}
              <div>
                <h3 style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                  Education
                </h3>
                {localData.education?.map((edu, i) => (
                  <div key={i} style={{ marginTop: "0.75rem" }}>
                    {editMode ? (
                      <>
                        <input
                          value={edu.degree}
                          onChange={(e) => {
                            const updated = [...localData.education];
                            updated[i].degree = e.target.value;
                            handleFieldChange("education", updated);
                          }}
                          style={{ width: "100%" }}
                        />
                        <input
                          value={edu.institution}
                          onChange={(e) => {
                            const updated = [...localData.education];
                            updated[i].institution = e.target.value;
                            handleFieldChange("education", updated);
                          }}
                          style={{ width: "100%" }}
                        />
                        <input
                          value={edu.duration}
                          onChange={(e) => {
                            const updated = [...localData.education];
                            updated[i].duration = e.target.value;
                            handleFieldChange("education", updated);
                          }}
                          style={{ width: "100%" }}
                        />
                        <button
                          onClick={() => removeEducation(i)}
                          style={{ color: "#dc2626", fontSize: "0.75rem" }}
                        >
                          Remove
                        </button>
                      </>
                    ) : (
                      <>
                        <p style={{ fontWeight: "600" }}>{edu.degree}</p>
                        <p>
                          {edu.institution} ({edu.duration})
                        </p>
                      </>
                    )}
                  </div>
                ))}
                {editMode && (
                  <button
                    onClick={addEducation}
                    style={{ marginTop: "0.5rem", color: "#2563eb" }}
                  >
                    + Add Education
                  </button>
                )}
              </div>

              <hr style={{ margin: "1.5rem 0" }} />

              {/* Experience */}
              <div>
                <h3 style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                  Experience
                </h3>
                {localData.experience?.map((exp, i) => (
                  <div key={i} style={{ marginTop: "0.75rem" }}>
                    {editMode ? (
                      <>
                        <input
                          value={exp.title}
                          onChange={(e) => {
                            const updated = [...localData.experience];
                            updated[i].title = e.target.value;
                            handleFieldChange("experience", updated);
                          }}
                          style={{ width: "100%" }}
                        />
                        <input
                          value={exp.companyName}
                          onChange={(e) => {
                            const updated = [...localData.experience];
                            updated[i].companyName = e.target.value;
                            handleFieldChange("experience", updated);
                          }}
                          style={{ width: "100%" }}
                        />
                        <input
                          value={exp.date}
                          onChange={(e) => {
                            const updated = [...localData.experience];
                            updated[i].date = e.target.value;
                            handleFieldChange("experience", updated);
                          }}
                          style={{ width: "100%" }}
                        />
                        <textarea
                          value={exp.accomplishment.join("\n")}
                          onChange={(e) => {
                            const updated = [...localData.experience];
                            updated[i].accomplishment = e.target.value
                              .split("\n")
                              .filter(Boolean);
                            handleFieldChange("experience", updated);
                          }}
                          rows={3}
                          style={{ width: "100%", marginTop: "0.5rem" }}
                        />
                        <button
                          onClick={() => removeExperience(i)}
                          style={{ color: "#dc2626", fontSize: "0.75rem" }}
                        >
                          Remove
                        </button>
                      </>
                    ) : (
                      <>
                        <p style={{ fontWeight: "600" }}>
                          {exp.title} at {exp.companyName}
                        </p>
                        <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>
                          {exp.date}
                        </p>
                        <ul style={{ paddingLeft: "1.5rem" }}>
                          {exp.accomplishment.map((item, j) => (
                            <li key={j}>{item}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                ))}
                {editMode && (
                  <button
                    onClick={addExperience}
                    style={{ marginTop: "0.5rem", color: "#2563eb" }}
                  >
                    + Add Experience
                  </button>
                )}
              </div>

              <hr style={{ margin: "1.5rem 0" }} />

              {/*Achievements*/}

 
              <div style={{ marginTop: "1.5rem" }}>
                <h3 style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                  Achievements
                </h3>
                {editMode ? (
                  <textarea
                    value={localData.achievements?.join(", ") || ""}
                    onChange={(e) =>
                      handleFieldChange(
                        "Achievements",
                        e.target.value.split(",").map((s) => s.trim())
                      )
                    }
                    style={{
                      width: "100%",
                      marginTop: "0.5rem",
                      padding: "0.5rem",
                    }}
                  />
                ) : (
                  <ul style={{ paddingLeft: "1.5rem" }}>
                    {resumeData.achievements?.map((achievements, i) => (
                      <li key={i}>{achievements}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Certifications */}
              <hr style={{ margin: "1.5rem 0" }} />
              <div>
                <h3 style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                  Certifications
                </h3>
                {localData.certifications?.map((cert, i) => (
                  <div key={i} style={{ marginTop: "0.75rem" }}>
                    {editMode ? (
                      <>
                        <input
                          value={cert.title}
                          onChange={(e) => {
                            const updated = [...localData.certifications];
                            updated[i].title = e.target.value;
                            handleFieldChange("certifications", updated);
                          }}
                          style={{ width: "100%" }}
                        />
                        <input
                          value={cert.issuer}
                          onChange={(e) => {
                            const updated = [...localData.certifications];
                            updated[i].issuer = e.target.value;
                            handleFieldChange("certifications", updated);
                          }}
                          style={{ width: "100%" }}
                        />
                        <input
                          value={cert.date}
                          onChange={(e) => {
                            const updated = [...localData.certifications];
                            updated[i].date = e.target.value;
                            handleFieldChange("certifications", updated);
                          }}
                          style={{ width: "100%" }}
                        />
                        <button
                          onClick={() => removeCertification(i)}
                          style={{ color: "#dc2626", fontSize: "0.75rem" }}
                        >
                          Remove
                        </button>
                      </>
                    ) : (
                      <p>
                        <strong>{cert.title}</strong> - {cert.issuer} (
                        {cert.date})
                      </p>
                    )}
                  </div>
                ))}
                {editMode && (
                  <button
                    onClick={addCertification}
                    style={{ marginTop: "0.5rem", color: "#2563eb" }}
                  >
                    + Add Certification
                  </button>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div
              className="no-print"
              style={{
                gridColumn: "1 / span 2",
                marginTop: "2rem",
                textAlign: "center",
              }}
            >
              {editMode ? (
                <>
                  <button
                    onClick={handleSave}
                    style={{
                      backgroundColor: "#16a34a",
                      color: "#fff",
                      padding: "0.5rem 1.25rem",
                      borderRadius: "0.375rem",
                      marginRight: "0.5rem",
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    style={{
                      backgroundColor: "#9ca3af",
                      color: "#fff",
                      padding: "0.5rem 1.25rem",
                      borderRadius: "0.375rem",
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  style={{
                    backgroundColor: "#2563eb",
                    color: "#fff",
                    padding: "0.5rem 1.25rem",
                    borderRadius: "0.375rem",
                  }}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template23;
