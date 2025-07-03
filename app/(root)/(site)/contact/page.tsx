"use client";
import { useState } from "react";
import FadeUp from "@/app/components/FadeUp";

const ACCESS_KEY = "3032fac9-f9c4-4d81-a0b7-899cea6d65eb";

export default function Contact() {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("");
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message sent successfully!");
        form.reset();
      } else {
        setResult("Something went wrong. Please try again.");
      }
    } catch (error) {
      setResult("Something went wrong. Please try again.");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FadeUp>
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 sm:p-20 pb-20 gap-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold mb-4">Contact Us!</h1>
      
      {/* Contact Form */}
      <div className="container mx-auto">
        <div className="max-w-lg mx-auto my-6 bg-white p-5 rounded-md shadow-sm">
          <div className="text-center">
            <p className="text-gray-400">
              Fill out the form below to send us a message.
            </p>
          </div>
          <div className="m-7">
            <form onSubmit={onSubmit} id="form">
              <input type="hidden" name="subject" value="New Submission from Web3Forms" />
              <input type="checkbox" name="botcheck" id="botcheck" style={{ display: "none" }} />
              
              <div className="mb-6">
                <label htmlFor="name" className="block mb-2 text-sm text-gray-600">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  placeholder="John Doe" 
                  required 
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300" 
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm text-gray-600">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  placeholder="you@company.com" 
                  required 
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300" 
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="phone" className="block mb-2 text-sm text-gray-600">Phone Number</label>
                <input 
                  type="text" 
                  name="phone" 
                  id="phone" 
                  placeholder="+1 (555) 1234-567" 
                  required 
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300" 
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 text-sm text-gray-600">Your Message</label>
                <textarea 
                  rows={5}
                  name="message" 
                  id="message" 
                  placeholder="Your Message" 
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300" 
                  required
                />
              </div>
              
              <div className="mb-6">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none disabled:bg-indigo-300"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
              
              {result && (
                <p className={`text-base text-center mt-4 ${result.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                  {result}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mt-4 text-center">
        <h3 className="text-2xl font-semibold mb-2">Contact Information</h3>
        <p className="text-lg">Email us at: <span className="font-bold">hello@musicforpatients.com</span></p>
        <p className="text-lg">Call us at: <span className="font-bold">+1 (443) 535-5145</span> or <span className="font-bold">+1 (410) 300-7839</span> </p>
      </div>
    </div>
    </FadeUp>
  );
}