"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Do you buy cards?",
    answer:
      "Yes! We buy singles, lots, and collections of all sizes. Bring your cards in store during business hours and we will make you an offer on the spot.",
  },
  {
    question: "Do you offer grading submissions?",
    answer:
      "Yes! We offer grading submission services through PSA, BGS, and SGC. Bring your cards in store and we will handle the entire submission process for you.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, Apple Pay, Google Pay, and cash in store.",
  },
  {
    question: "Do you ship orders?",
    answer:
      "Yes! We ship orders nationwide. Shipping rates are calculated at checkout.",
  },
  {
    question: "Can I return a product?",
    answer:
      "Sealed products may be returned within 7 days of purchase if unopened and in original condition. Singles and opened products are final sale.",
  },
  {
    question: "Do you do live breaks?",
    answer:
      "Yes! We do regular live box breaks and pack openings on Facebook and Whatnot. Follow us on social media to get notified about upcoming breaks.",
  },
  {
    question: "How do gift cards work?",
    answer:
      "Gift cards can be purchased online or in store and used for any purchase at On The Marq. They never expire.",
  },
  {
    question: "Do you have a loyalty program?",
    answer:
      "We are working on a loyalty program! Sign up for our newsletter to be the first to know when it launches.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="bg-white min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-black text-3xl font-bold mb-2 border-l-4 border-red-600 pl-4">
          FAQ
        </h1>
        <div className="border-t border-red-600 pt-8 mt-4">
          <p className="text-red-600 text-sm mb-8">
            Have questions? We have answers. If you don't find what you're
            looking for, feel free to contact us.
          </p>
          <div className="flex flex-col gap-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded overflow-hidden hover:border-red-600 transition-colors group"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <p className="text-black text-sm font-medium">
                    {faq.question}
                  </p>
                  <span className="text-red-600 text-lg ml-4">
                    {openIndex === i ? "−" : "+"}
                  </span>
                </button>
                {openIndex === i && (
                  <div className="px-6 py-4 border-t border-gray-200 group-hover:border-red-600 transition-colors">
                    <p className="text-red-600 text-sm">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="border border-gray-200 p-6 rounded mt-8 text-center hover:border-red-600 transition-colors">
            <p className="text-black text-sm font-bold mb-2">
              Still have questions?
            </p>
            <p className="text-red-600 text-sm mb-4">
              Contact us and we'll get back to you as soon as possible.
            </p>
            <a
              href="mailto:onthemarq2018@gmail.com"
              className="inline-block bg-red-600 text-white font-bold px-6 py-3 border border-red-600 hover:bg-white hover:text-red-600 transition-colors rounded-lg"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
