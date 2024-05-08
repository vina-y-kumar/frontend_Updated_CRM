import axios from 'axios';

// Function to set token in local storage
const setTokenInLocalStorage = (token) => {
  localStorage.setItem("customTokenName", token);
};

// Function to retrieve token from local storage
const getTokenFromLocalStorage = () => {
  return localStorage.getItem("customTokenName");
};

export const sendEmail = async (email, columnTitle) => {
  try {
    // Retrieve token from local storage
    const token = getTokenFromLocalStorage();

    // Check if token is provided
    if (!token) {
      console.error('Error: Token not found in local storage');
      return;
    }

    // Sample email content
    const emailContent = `To: ${email}\r\nSubject: Change in Kanban Board\r\n\r\nHello,\n\nWe noticed that you moved your lead to the "${columnTitle}" column. Is there any problem? Please let us know if we can assist you.\n\nBest regards,\nThe Kanban Team`;

    // Encode the email message in base64
    const base64EncodedEmail = btoa(emailContent);

    // Send email using Gmail API
    await axios.post(
      'https://www.googleapis.com/gmail/v1/users/anonymous.99.is.back@gmail.com/messages/send',
      {
        raw: base64EncodedEmail
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      }
    );

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
