import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'What file formats do you accept?',
    answer: 'We accept all major 3D file formats including STL, OBJ, STEP, 3MF, and IGES. If you have a different format, contact us and we\'ll help you convert it.',
  },
  {
    question: 'What is the typical delivery time?',
    answer: 'Standard delivery is 3-5 business days for most orders. We also offer express delivery (24-48 hours) for urgent projects at an additional cost.',
  },
  {
    question: 'What materials are available?',
    answer: 'We offer a wide range of materials including PLA, ABS, PETG, TPU, Nylon, and various resin types. Each material has different properties suited for specific applications.',
  },
  {
    question: 'Do you offer design assistance?',
    answer: 'Yes! We provide free design corrections and optimization to ensure your model prints perfectly. Our team can also create custom 3D designs from scratch.',
  },
  {
    question: 'What are your payment options?',
    answer: 'We accept all major payment methods including UPI, credit/debit cards, net banking, and bank transfers. Payment is required before we begin printing.',
  },
  {
    question: 'Can I see my model before printing?',
    answer: 'Absolutely! After you upload your file, we\'ll review it and share a preview along with the quote. You can request modifications before we proceed.',
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Currently, we ship across India. For international orders, please contact us directly to discuss shipping options and costs.',
  },
  {
    question: 'What is your minimum order quantity?',
    answer: 'We have no minimum order quantity. Whether you need a single prototype or bulk production of 1000+ units, we\'re here to help.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container01 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our services
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg text-gray-900 pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-blue-600 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-48' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 text-gray-600">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
