import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useResume } from "../../context/ResumeContext";

const Template24 = () => {
  const resumeRef = useRef(null);
  const { resumeData, setResumeData } = useResume();

  // safe defaults to avoid undefined errors
  const defaults = {
    name: "DONNA STROUPE",
    role: "Sales Representative",
    summary:
      "I am a Sales Representative who initializes and manages relationships with customers. I serve as their point of contact and lead from initial outreach through the making of the final purchase.",
    location: "123 Anywhere St., Any City, ST 12345",
    phone: "+123-456-7890",
    email: "hello@reallygreatsite.com",
    linkedin: "linkedin.com/in/username",
    skills: [
      "Fast-moving Consumer Goods",
      "Packaged Consumer Goods",
      "Sales",
      "Corporate account management",
      "Experience in retail",
    ],
    languages: ["English", "French"],
    education: [
      {
        degree: "BA Sales and Commerce",
        institution: "Wardiere University",
        duration: "2011 – 2015",
      },
    ],
    experience: [
      {
        title: "Consumer Goods Seller",
        companyName: "Timmerman Industries",
        date: "Aug 2018 – Present",
        accomplishment: [
          "Offer consumer goods packages to corporate and clients",
          "Meet with clients every quarter to update or renew services",
          "Train junior sales agents",
        ],
      },
      {
        title: "FMCG Sales Agent",
        companyName: "Timmerman Industries",
        date: "Jul 2015 – Aug 2018",
        accomplishment: [
          "Visited corporate client offices to offer latest products",
          "Built relationships with clients to maintain sales goals and create new opportunities",
        ],
      },
    ],
    references: [
      {
        name: "Estelle Darcy",
        title: "Wardiere Inc. / CEO",
        phone: "+123-456-7890",
        email: "hello@reallygreatsite.com",
      },
      {
        name: "Harper Russo",
        title: "Wardiere Inc. / CEO",
        phone: "+123-456-7890",
        email: "hello@reallygreatsite.com",
      },
    ],
  };

  const [editMode, setEditMode] = useState(false);
  const [localData, setLocalData] = useState(defaults);
  const [profileImage, setProfileImage] = useState(null);



  const handleFieldChange = (field, value) => {
    setLocalData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setResumeData(localData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setLocalData(defaults);
    setEditMode(false);
  };

  const addEducation = () => {
    const updated = [...(localData.education || [])];
    updated.push({ degree: "", institution: "", duration: "" });
    handleFieldChange("education", updated);
  };

  const removeEducation = (i) => {
    const updated = [...(localData.education || [])];
    updated.splice(i, 1);
    handleFieldChange("education", updated);
  };

  const addExperience = () => {
    const updated = [...(localData.experience || [])];
    updated.push({
      title: "",
      companyName: "",
      date: "",
      accomplishment: [],
    });
    handleFieldChange("experience", updated);
  };

  const removeExperience = (i) => {
    const updated = [...(localData.experience || [])];
    updated.splice(i, 1);
    handleFieldChange("experience", updated);
  };

  const handleImageUpload = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setLocalData((prev)=>({...prev, profileImage: reader.result}));
    reader.readAsDataURL(f);
  };

  // colors matched to the image
  const colors = {
    pageBg: "#F3F5F8",
    sidebarBg: "#E8EDF3",
    bannerBg: "#E1E7EF",
    text: "#111827",
    subText: "#6B7280",
    line: "#D1D5DB",
    bullet: "#1F2937",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: colors.pageBg }}>
      {/* optional top nav from your app */}
      <Navbar />

      <div style={{ display: "flex" }}>
        {/* your app's sidebar with print to PDF etc. */}
        <Sidebar resumeRef={resumeRef} />

        {/* Canvas */}
        <div style={{ flex: 1, padding: "24px", display: "flex", justifyContent: "center" }}>
          {/* PRINT AREA */}
          <div
            ref={resumeRef}
            style={{
              background: "#fff",
              width: "100%",
              maxWidth: 980,
              borderRadius: 12,
              boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
              overflow: "hidden",
              fontFamily: "Inter, Segoe UI, system-ui, Arial, sans-serif",
              color: colors.text,
            }}
          >
            {/* Top strip spacing like image */}
            <div style={{ height: 28, background: "#fff" }} />

            {/* Inner padding */}
            <div style={{ padding: "0 24px 28px 24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 24 }}>
                {/* LEFT SIDEBAR */}
                <div
                  style={{
                    background: colors.sidebarBg,
                    borderRadius: 20,
                    padding: 20,
                  }}
                >
                  {/* Photo */}
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                    {editMode ? (
                      <label style={{ cursor: "pointer", textAlign: "center" }}>
                        <img
                          src={
                            localData.profileImage ||
                            "https://www.shutterstock.com/image-photo/young-woman-ready-job-business-600nw-2250947327.jpg"
                          }
                          alt="profile"
                          style={{
                            width: 140,
                            height: 140,
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                        <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                        <div style={{ fontSize: 12, color: "#2563eb", marginTop: 6 }}>Change photo</div>
                      </label>
                    ) : (
                      <img
                        src={
                          localData.profileImage ||
                          "https://www.shutterstock.com/image-photo/young-woman-ready-job-business-600nw-2250947327.jpg"
                        }
                        alt="profile"
                        style={{
                          width: 140,
                          height: 140,
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>


                  {/* CONTACT */}
                  <SectionTitle title="CONTACT" />
                  <div style={{ fontSize: 14, color: colors.subText, lineHeight: 1.6 }}>
                    {["phone", "email", "location", "linkedin"].map((field, idx) =>
                      editMode ? (
                        <input
                          key={idx}
                          value={localData[field] || ""}
                          onChange={(e) => handleFieldChange(field, e.target.value)}
                          placeholder={field}
                          style={inputLineStyle}
                        />
                      ) : (
                        <div key={idx} style={{ margin: "6px 0" }}>
                          {localData[field]}
                        </div>
                      )
                    )}
                  </div>

                  <hr style={{ border: "1px solid #D1D5DB", margin: "16px 0" }} />


                  {/* EDUCATION */}
                  <SectionTitle title="EDUCATION" />
                  <div>
                    {(localData.education || []).map((edu, i) => (
                      <div key={i} style={{ marginBottom: 12 }}>
                        {editMode ? (
                          <>
                            <input
                              value={edu.degree}
                              onChange={(e) => {
                                const u = [...localData.education];
                                u[i].degree = e.target.value;
                                handleFieldChange("education", u);
                              }}
                              style={inputTight}
                              placeholder="Degree"
                            />
                            <input
                              value={edu.institution}
                              onChange={(e) => {
                                const u = [...localData.education];
                                u[i].institution = e.target.value;
                                handleFieldChange("education", u);
                              }}
                              style={inputTight}
                              placeholder="Institution"
                            />
                            <input
                              value={edu.duration}
                              onChange={(e) => {
                                const u = [...localData.education];
                                u[i].duration = e.target.value;
                                handleFieldChange("education", u);
                              }}
                              style={inputTight}
                              placeholder="Year – Year"
                            />
                            <button onClick={() => removeEducation(i)} style={removeBtn}>
                              Remove
                            </button>
                          </>
                        ) : (
                          <>
                            <div style={{ fontWeight: 600 }}>{edu.degree}</div>
                            <div style={{ color: colors.subText, fontSize: 14 }}>
                              {edu.institution} • {edu.duration}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                    {editMode && (
                      <button onClick={addEducation} style={addBtn}>
                        + Add Education
                      </button>
                    )}
                  </div>

                  <hr style={{ border: "1px solid #D1D5DB", margin: "16px 0" }} />


                  {/* SKILLS */}
                  <SectionTitle title="SKILLS" />
                  {editMode ? (
                    <textarea
                      rows={4}
                      value={(localData.skills || []).join(", ")}
                      onChange={(e) =>
                        handleFieldChange(
                          "skills",
                          e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean)
                        )
                      }
                      style={textareaStyle}
                      placeholder="Comma separated"
                    />
                  ) : (
                    <ul style={{ paddingLeft: 18, margin: 0 }}>
                      {(localData.skills || []).map((s, i) => (
                        <li key={i} style={{ margin: "4px 0", color: colors.bullet }}>
                          <span style={{ color: colors.text }}>{s}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <hr style={{ border: "1px solid #D1D5DB", margin: "16px 0" }} />


                  {/* LANGUAGES */}
                  <SectionTitle title="LANGUAGE" />
                  {editMode ? (
                    <textarea
                      rows={2}
                      value={(localData.languages || []).join(", ")}
                      onChange={(e) =>
                        handleFieldChange(
                          "languages",
                          e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean)
                        )
                      }
                      style={textareaStyle}
                      placeholder="English, French"
                    />
                  ) : (
                    <div style={{ color: colors.text }}>{(localData.languages || []).join("\n")}</div>
                  )}
                </div>

                {/* RIGHT SIDE */}
                <div>
                  {/* NAME BANNER (centered like the image) */}
                  <div
                    style={{
                      background: colors.bannerBg,
                      borderRadius: 28,
                      padding: "22px 28px",
                      marginBottom: 22,
                    }}
                  >
                    {editMode ? (
                      <>
                        <input
                          value={localData.name}
                          onChange={(e) => handleFieldChange("name", e.target.value)}
                          style={{
                            ...inputBare,
                            textAlign: "center",
                            fontSize: 32,
                            fontWeight: 800,
                            letterSpacing: 2,
                            textTransform: "uppercase",
                          }}
                        />
                        <input
                          value={localData.role}
                          onChange={(e) => handleFieldChange("role", e.target.value)}
                          style={{ ...inputBare, textAlign: "center", color: colors.subText }}
                        />
                      </>
                    ) : (
                      <>
                        <div
                          style={{
                            textAlign: "center",
                            fontSize: 32,
                            fontWeight: 800,
                            letterSpacing: 2,
                            textTransform: "uppercase",
                          }}
                        >
                          {localData.name}
                        </div>
                        <div style={{ textAlign: "center", color: colors.subText, marginTop: 4 }}>
                          {localData.role}
                        </div>
                      </>
                    )}
                  </div>

                  {/* ABOUT */}
                  <RightSectionHeader title="About Me" lineColor={colors.line} />
                  {editMode ? (
                    <textarea
                      rows={5}
                      value={localData.summary || ""}
                      onChange={(e) => handleFieldChange("summary", e.target.value)}
                      style={textareaStyle}
                    />
                  ) : (
                    <p style={{ color: colors.text, lineHeight: 1.6 }}>{localData.summary}</p>
                  )}

                  {/* EXPERIENCE */}
                  <RightSectionHeader title="Work Experience" lineColor={colors.line} />
                  <div>
                    {(localData.experience || []).map((exp, idx) => (
                      <div key={idx} style={{ marginBottom: 18 }}>
                        {editMode ? (
                          <>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                              <input
                                value={exp.title}
                                onChange={(e) => {
                                  const u = [...localData.experience];
                                  u[idx].title = e.target.value;
                                  handleFieldChange("experience", u);
                                }}
                                style={inputTight}
                                placeholder="Title"
                              />
                              <input
                                value={exp.companyName}
                                onChange={(e) => {
                                  const u = [...localData.experience];
                                  u[idx].companyName = e.target.value;
                                  handleFieldChange("experience", u);
                                }}
                                style={inputTight}
                                placeholder="Company"
                              />
                            </div>
                            <input
                              value={exp.date}
                              onChange={(e) => {
                                const u = [...localData.experience];
                                u[idx].date = e.target.value;
                                handleFieldChange("experience", u);
                              }}
                              style={inputTight}
                              placeholder="Aug 2018 – Present"
                            />
                            <textarea
                              rows={3}
                              value={(exp.accomplishment || []).join("\n")}
                              onChange={(e) => {
                                const u = [...localData.experience];
                                u[idx].accomplishment = e.target
                                  .value.split("\n")
                                  .map((l) => l.trim())
                                  .filter(Boolean);
                                handleFieldChange("experience", u);
                              }}
                              style={textareaStyle}
                              placeholder="• Bullet 1"
                            />
                            <button onClick={() => removeExperience(idx)} style={removeBtn}>
                              Remove
                            </button>
                          </>
                        ) : (
                          <>
                            <div style={{ display: "flex", gap: 12, alignItems: "baseline", flexWrap: "wrap" }}>
                              <div style={{ fontWeight: 700 }}>{exp.title}</div>
                              <div style={{ color: colors.subText }}>{exp.companyName}</div>
                            </div>
                            <div style={{ fontSize: 13, color: colors.subText, marginTop: 2 }}>{exp.date}</div>
                            <ul style={{ paddingLeft: 18, marginTop: 8 }}>
                              {(exp.accomplishment || []).map((a, j) => (
                                <li key={j} style={{ margin: "4px 0" }}>
                                  {a}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    ))}
                    {editMode && (
                      <button onClick={addExperience} style={addBtn}>
                        + Add Experience
                      </button>
                    )}
                  </div>

                  {/* REFERENCES */}
                  <RightSectionHeader title="References" lineColor={colors.line} />
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                    }}
                  >
                    {(localData.references || []).map((r, i) => (
                      <div key={i} style={{ borderTop: `1px solid ${colors.line}`, paddingTop: 8 }}>
                        {editMode ? (
                          <>
                            <input
                              value={r.name || ""}
                              onChange={(e) => {
                                const u = [...(localData.references || [])];
                                u[i] = { ...u[i], name: e.target.value };
                                handleFieldChange("references", u);
                              }}
                              style={inputTight}
                              placeholder="Name"
                            />
                            <input
                              value={r.title || ""}
                              onChange={(e) => {
                                const u = [...(localData.references || [])];
                                u[i] = { ...u[i], title: e.target.value };
                                handleFieldChange("references", u);
                              }}
                              style={inputTight}
                              placeholder="Title"
                            />
                            <input
                              value={r.phone || ""}
                              onChange={(e) => {
                                const u = [...(localData.references || [])];
                                u[i] = { ...u[i], phone: e.target.value };
                                handleFieldChange("references", u);
                              }}
                              style={inputTight}
                              placeholder="Phone"
                            />
                            <input
                              value={r.email || ""}
                              onChange={(e) => {
                                const u = [...(localData.references || [])];
                                u[i] = { ...u[i], email: e.target.value };
                                handleFieldChange("references", u);
                              }}
                              style={inputTight}
                              placeholder="Email"
                            />
                          </>
                        ) : (
                          <>
                            <div style={{ fontWeight: 700 }}>{r.name}</div>
                            <div style={{ color: colors.subText }}>{r.title}</div>
                            <div style={{ marginTop: 8, fontSize: 14 }}>
                              <div>
                                <strong>Phone:</strong> {r.phone}
                              </div>
                              <div>
                                <strong>Email:</strong> {r.email}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS (outside print area + hidden on print) */}
        
        </div>
        
      </div>
        <div className="no-print" style={{ marginTop: 10, textAlign: "center", marginBottom: 10, marginLeft: 230}}>
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                style={btnPrimary}
              >
                Edit
              </button>
            ) : (
              <>
                <button onClick={handleSave} style={btnSuccess}>
                  Save
                </button>
                <button onClick={handleCancel} style={btnMuted}>
                  Cancel
                </button>
              </>
            )}
          </div>

      {/* print helper styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
        /* Reset input look inside template */
        input, textarea { outline: none; }
      `}</style>
    </div>
  );
};

/* --- Small presentational helpers --- */
const SectionTitle = ({ title }) => (
  <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 1, marginTop: 6, marginBottom: 8 }}>{title}</div>
);

const RightSectionHeader = ({ title, lineColor }) => (
  <div style={{ margin: "18px 0 10px" }}>
    <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: 0.5, marginBottom: 6 }}>{title}</div>
    <div style={{ height: 1, background: lineColor }} />
  </div>
);

const inputLineStyle = {
  width: "100%",
  border: "none",
  borderBottom: "1px solid #D1D5DB",
  padding: "6px 2px",
  background: "transparent",
  margin: "4px 0",
  fontSize: 14,
};

const inputTight = {
  width: "100%",
  border: "1px solid #E5E7EB",
  borderRadius: 8,
  padding: "8px 10px",
  background: "#fff",
  margin: "6px 0",
  fontSize: 14,
};

const textareaStyle = {
  width: "100%",
  border: "1px solid #E5E7EB",
  borderRadius: 8,
  padding: "10px 12px",
  resize: "vertical",
  fontSize: 14,
  background: "#fff",
};

const inputBare = {
  width: "100%",
  border: "none",
  background: "transparent",
  padding: 6,
};

const btnPrimary = {
  backgroundColor: "#2563EB",
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: 8,
  cursor: "pointer",
  margin: "0 6px",
  fontWeight: 600,
};

const btnSuccess = {
  ...btnPrimary,
  backgroundColor: "#16A34A",
};

const btnMuted = {
  ...btnPrimary,
  backgroundColor: "#9CA3AF",
};

const removeBtn = {
  background: "transparent",
  color: "#DC2626",
  border: "none",
  fontSize: 12,
  cursor: "pointer",
  marginTop: 4,
};

const addBtn = {
  background: "transparent",
  color: "#2563EB",
  border: "none",
  fontSize: 13,
  cursor: "pointer",
  marginTop: 4,
};

export default Template24;
