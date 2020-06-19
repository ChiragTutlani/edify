const verificationEmail = (url) => {
  const html = `<div style="font-family: Georgia, \'Times New Roman\', Times, serif;"><h3>Verify your account at Edify to unlock all features like</h3><ul><li>Create a new post</li><li>Participate in discussions on a post</li><li>View other users profile</li><li>Report abusive content</li></ul><buttonstyle="background-color: blue;padding: 5px 10px 5px 10px;border: none;border-radius: 5px;"><a href="${url}" style="text-decoration: none; color: white;">Verify account</a></buttonstyle=></div>`;
  return html;
};

module.exports = verificationEmail;
