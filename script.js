document
  .getElementById("resume-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
  });

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const profilePicture = document.getElementById("profile-picture").files[0];
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const education = document
    .getElementById("education")
    .value.split("\n")
    .filter((line) => line);
  const experience = document
    .getElementById("experience")
    .value.split("\n")
    .filter((line) => line);
  const skills = document
    .getElementById("skills")
    .value.split("\n")
    .filter((line) => line);

  if (profilePicture) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.src = e.target.result;
      img.onload = function () {
        doc.addImage(img, "PNG", 10, 10, 30, 30);
        addTextToPDF(
          doc,
          name,
          email,
          phone,
          address,
          education,
          experience,
          skills
        );
        doc.save("resume.pdf");
      };
    };
    reader.readAsDataURL(profilePicture);
  } else {
    addTextToPDF(
      doc,
      name,
      email,
      phone,
      address,
      education,
      experience,
      skills
    );
    doc.save("resume.pdf");
  }
}

function addTextToPDF(
  doc,
  name,
  email,
  phone,
  address,
  education,
  experience,
  skills
) {
  doc.text(`Name: ${name}`, 50, 20);
  doc.text(`Email: ${email}`, 50, 30);
  doc.text(`Phone: ${phone}`, 50, 40);
  doc.text(`Address: ${address}`, 50, 50);

  let yOffset = 60;

  doc.text("Education:", 10, yOffset);
  education.forEach((item, index) => {
    doc.text(`• ${item}`, 20, yOffset + 10 * (index + 1));
  });
  yOffset += 10 * education.length + 10;

  doc.text("Experience:", 10, yOffset);
  experience.forEach((item, index) => {
    doc.text(`• ${item}`, 20, yOffset + 10 * (index + 1));
  });
  yOffset += 10 * experience.length + 10;

  doc.text("Skills:", 10, yOffset);
  skills.forEach((item, index) => {
    doc.text(`• ${item}`, 20, yOffset + 10 * (index + 1));
  });
}
