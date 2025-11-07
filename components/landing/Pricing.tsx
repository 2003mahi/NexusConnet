
import React from 'react';
import Button from '../common/Button';
import Card from '../common/Card';
import CheckIcon from '../icons/CheckIcon';
import { useAuth } from '../../hooks/useAuth';

const Pricing: React.FC = () => {
  const { login } = useAuth();
  
  const tiers = [
    {
      name: 'Free',
      price: '$0',
      description: 'Get a taste of AI power.',
      features: [
        '3 resume analyses',
        'Basic feedback',
        'Action verb suggestions'
      ],
      cta: 'Get Started for Free',
      popular: false
    },
    {
      name: 'Pro',
      price: '$19',
      priceSuffix: '/ month',
      description: 'Unlock your full potential.',
      features: [
        'Unlimited resume analyses',
        'In-depth AI feedback',
        'Content rewriting',
        'ATS compatibility check',
        'Priority support'
      ],
      cta: 'Upgrade to Pro',
      popular: true
    }
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Find the Perfect Plan</h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 mt-4">
            Start for free, and upgrade when you're ready to take your career to the next level.
          </p>
        </div>
        <div className="flex justify-center items-center flex-wrap gap-8">
          {tiers.map((tier) => (
            <Card key={tier.name} className={`w-full max-w-sm p-8 flex flex-col ${tier.popular ? 'border-2 border-sky-600' : ''}`}>
              {tier.popular && <span className="bg-sky-600 text-white text-xs font-bold px-3 py-1 rounded-full absolute -top-3 right-8">POPULAR</span>}
              <h3 className="text-2xl font-bold text-slate-800">{tier.name}</h3>
              <p className="text-slate-500 mt-2 mb-6">{tier.description}</p>
              <div className="mb-8">
                <span className="text-5xl font-extrabold text-slate-900">{tier.price}</span>
                {tier.priceSuffix && <span className="text-xl font-medium text-slate-500">{tier.priceSuffix}</span>}
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <CheckIcon className="w-6 h-6 text-sky-500 mr-3" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
              {/* In a real app, these buttons would link to a Stripe Checkout session */}
              <Button onClick={login} variant={tier.popular ? 'primary' : 'outline'} className="w-full">
                {tier.cta}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
