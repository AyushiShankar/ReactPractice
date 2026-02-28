import { useState } from "react";
function ContactForm() {
  const [form, setForm] = useState({ name: "", message: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [submittedName, setSubmittedName] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is Required";
    if (!form.message.trim()) newErrors.message = "Message is Required";
    if (!form.email.trim()) newErrors.email = "Email is Required";
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email.trim())) {
      newErrors.email = "Email is incorrect";
    }
    return newErrors;
  };

  function handleInput(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const validateErrors = validate();
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
    } else {
      setSubmittedName(form.name);
      setSubmitted(true);
      setErrors({});
      setForm({ name: "", message: "", email: "" });
    }
  }

  return (
    <div
      style={{
        maxWidth: "400px",
        padding: "16px",
        margin: "32px auto",
        border: "1px black solid",
        borderRadius: "8px",
      }}
    >
      {submitted ? (
        <p style={{textAlign : "center"}}>Thankyou! , {submittedName}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div
            style={{
              marginBottom: "16px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="name" style={{ width: "100%", padding: "5px" }}>
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleInput}
              style={{ padding: "5px" }}
            />
            {errors.name && <p style={{color:"red", fontWeight:"500",margin: "0"}}>{errors.name}</p>}
          </div>
          <div
            style={{
              marginBottom: "16px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="email" style={{ width: "100%", padding: "5px" }}>
              Email:
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={form.email}
              onChange={handleInput}
              style={{ padding: "5px" }}
            />
            {errors.email && <p style={{color:"red", fontWeight:"500",margin: "0"}}>{errors.email}</p>}
          </div>
          <div
            style={{
              marginBottom: "16px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="message" style={{ width: "100%", padding: "5px" }}>
              Message:
            </label>
            <textarea
              name="message"
              id="message"
              value={form.message}
              onChange={handleInput}
              style={{ padding: "5px" }}
            />
            {errors.message && <p style={{color:"red", fontWeight:"500",margin: "0"}}>{errors.message}</p>}
            <button
              type="submit"
              style={{
                padding: "8px",
                marginTop: "24px",
                backgroundColor: "#007bff",
                color: "white",
                border:"none",
                borderRadius:"4px",
                cursor:"pointer"
              }}
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ContactForm;
