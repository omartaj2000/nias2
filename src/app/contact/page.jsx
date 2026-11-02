"use client";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Contact() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, message }),
      });
      if (res.ok) {
        toast.success("Email sent successfully");
        setSubject("");
        setMessage("");
      } else {
        toast.error("Error sending email");
      }
    } catch {
      toast.error("Error sending email");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container mx-auto py-4 px-4">
      <h2 className="text-4xl font-bold mb-10 mt-20">Have a question?</h2>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="mb-4">
          <label htmlFor="subject" className="block text-lg font-medium mb-2">Subject</label>
          <input
            id="subject" type="text" value={subject} onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-transparent dark:text-white" required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-lg font-medium mb-2">Message</label>
          <textarea
            id="message" value={message} onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-transparent dark:text-white" rows={6} required
          />
        </div>
        <button type="submit" disabled={sending}
          className="px-4 py-2 bg-[#8c6dfd] font-semibold text-white rounded hover:bg-[#7868b3] disabled:opacity-50">
          {sending ? "Sending…" : "Submit"}
        </button>
      </form>
    </div>
  );
}
