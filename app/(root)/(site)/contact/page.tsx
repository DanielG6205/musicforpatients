"use client";


export default function Contact() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 sm:p-20 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold mb-4">Contact Us!</h1>

      {/* Contact Form */}
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Email"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              className="w-full px-4 py-2 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={5}
              placeholder="Your Message"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Contact Information */}
      <div className="mt-8 text-center">
        <h3 className="text-2xl font-semibold mb-2">Contact Information</h3>
        <p className="text-lg">Email us at: <span className="font-bold">hello@musicforpatients.com</span></p>
        <p className="text-lg">Call us at: <span className="font-bold">+1 (443) 535-5145</span> or <span className="font-bold">+1 (410) 300-7839</span> </p>
      </div>
    </div>
  );
}