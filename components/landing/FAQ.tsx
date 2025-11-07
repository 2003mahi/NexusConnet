
import React, { useState } from 'react';

const faqData = [
  {
    question: 'How does the AI analysis work?',
    answer: 'Our AI is trained on thousands of successful resumes and job descriptions across various industries. It uses Natural Language Processing (NLP) to analyze your resume for key criteria that recruiters and hiring managers look for, providing you with targeted feedback.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We take your privacy seriously. Your resume data is encrypted and is never shared with third parties. You have full control to delete your data from our servers at any time.'
  },
  {
    question: 'What happens when I run out of free analyses?',
    answer: 'Once you use your 3 free analyses, you will be prompted to upgrade to our Pro plan to continue using the service. The Pro plan offers unlimited analyses and access to all our advanced features.'
  },
  {
    question: 'Can I cancel my subscription at any time?',
    answer: 'Yes, you can cancel your Pro subscription at any time. You will retain access to Pro features until the end of your current billing period. There are no long-term contracts or hidden fees.'
  }
];

interface FAQItemProps {
  item: { question: string, answer: string };
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-slate-200 py-4">
      <button
        className="w-full flex justify-between items-center text-left text-lg font-medium text-slate-800"
        onClick={onClick}
      >
        <span>{item.question}</span>
        <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
        <p className="text-slate-600">{item.answer}</p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-slate-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <p className="text-lg text-slate-600 mt-4">
            Have questions? We've got answers.
          </p>
        </div>
        <div>
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
