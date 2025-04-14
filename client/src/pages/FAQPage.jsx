import { useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Statify?",
      answer: "Statify is a secure task management application that helps you organize your daily activities, set priorities, track progress, and boost your productivity. With Statify, you can create, edit, and manage tasks while keeping your data encrypted and secure."
    },
    {
      question: "How do I create an account?",
      answer: "To create an account, click on the 'Register' button on the top right corner of the homepage. Fill in your details including name, email address, and password. After submitting, you'll receive a verification email to activate your account."
    },
    {
      question: "Why do I need to verify my email?",
      answer: "Email verification ensures that you have access to the email account you registered with and helps prevent unauthorized account creation. It also allows us to communicate important information about your account and recover your password if needed."
    },
    {
      question: "How do I add a new task?",
      answer: "After logging in, navigate to your dashboard and click the '+ Add Task' button. Fill in the task details such as title, description, due date, and priority level. Click 'Save' to add the task to your list."
    },
    {
      question: "Can I edit or delete tasks?",
      answer: "Yes, you can edit or delete any task you've created. To edit a task, click on the edit icon (pencil) next to the task. To delete, click on the delete icon (trash bin). You can modify any details of your tasks at any time."
    },
    {
      question: "How secure is my data on Statify?",
      answer: "At Statify, we take data security seriously. All your task data and personal information are encrypted using industry-standard encryption algorithms before being stored in our database. We implement secure authentication practices and regularly update our security measures to protect your information."
    },
    {
      question: "What happens when I log out?",
      answer: "When you log out, your session is terminated and you'll need to log in again to access your account. Your data remains securely stored in our encrypted database and will be available when you log back in."
    },
    {
      question: "Is Statify available on mobile devices?",
      answer: "Yes, Statify is designed with a responsive interface that works seamlessly across desktop computers, tablets, and mobile phones. You can access all features from any device with a web browser."
    },
    {
      question: "How can I change my password?",
      answer: "To change your password, go to your Profile page and select the 'Change Password' option. You'll need to enter your current password and then create a new one. For security reasons, we recommend using a strong password with a mix of letters, numbers, and special characters."
    },
    {
      question: "Can I set reminders for my tasks?",
      answer: "Yes, you can set reminders for your tasks. When creating or editing a task, you can enable notifications and specify when you'd like to be reminded. Reminders can be sent via email or browser notifications based on your preferences in Settings."
    },
    {
      question: "How do I delete my account?",
      answer: "To delete your account, go to your Profile page and select 'Settings'. Scroll down to the 'Data & Privacy' section and click on 'Delete Account'. You'll be asked to confirm this action. Please note that account deletion is permanent and all your data will be removed from our systems."
    },
    {
      question: "What if I forget my password?",
      answer: "If you forget your password, click on the 'Forgot Password' link on the login page. Enter your email address, and we'll send you instructions to reset your password. For security reasons, the reset link expires after 24 hours."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex-grow px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h1>
            <p className="text-gray-600 mb-8">Find answers to the most common questions about Statify and how to use it effectively.</p>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition flex justify-between items-center"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="font-medium text-gray-800">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  {activeIndex === index && (
                    <div className="px-6 py-4 bg-white">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-4">If you couldnt find the answer to your question, feel free to reach out to our support team.</p>
            <Link to="/contact-us" className="inline-block px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition">
              Contact Support
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default FAQ;