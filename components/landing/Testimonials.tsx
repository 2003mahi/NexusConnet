
import React from 'react';
import Card from '../common/Card';

const testimonials = [
  {
    name: 'Sarah K.',
    role: 'Software Engineer',
    quote: 'NexusConnect completely transformed my resume. The AI suggestions were spot on and helped me land interviews at three major tech companies.',
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    name: 'Michael B.',
    role: 'Marketing Manager',
    quote: 'I was stuck in my job search for months. After using this tool, I started getting callbacks immediately. The difference was night and day.',
    avatar: 'https://i.pravatar.cc/150?img=2'
  },
  {
    name: 'Jessica L.',
    role: 'Recent Graduate',
    quote: 'As a new grad, I had no idea how to write a good resume. NexusConnect gave me the confidence and the words to showcase my skills effectively.',
    avatar: 'https://i.pravatar.cc/150?img=3'
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Loved by Job Seekers Worldwide</h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 mt-4">
            Don't just take our word for it. Here's what our users are saying.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8">
              <p className="text-slate-600 mb-6 relative">
                <span className="absolute -top-4 -left-4 text-6xl text-slate-100 font-serif">“</span>
                {testimonial.quote}
              </p>
              <div className="flex items-center">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-bold text-slate-800">{testimonial.name}</p>
                  <p className="text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
