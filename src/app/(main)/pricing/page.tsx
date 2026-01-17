"use client"
import React, { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';

const pricingPlans = [
  {
    name: "Starter",
    price: { monthly: "Free", yearly: "Free" },
    description: "Get started for free with Docy",
    buttonText: "Start for free",
    buttonStyle: "bg-[#1a1a1a] text-white hover:bg-[#333]",
    featured: false,
    features: [
      "3 projects per month",
      "Basic documentation generation",
      "Markdown export only",
      "Community support",
      "7-day history retention",
    ],
  },
  {
    name: "Pro",
    price: { monthly: "$19", yearly: "$15" },
    description: "Get started for Pro Docy",
    buttonText: "Start 14-day free",
    buttonStyle: "bg-white text-[#1a1a1a] hover:bg-gray-100",
    featured: true,
    badge: "Most popular",
    features: [
      "Unlimited projects",
      "Advanced AST analysis",
      "Multiple export formats (MD, HTML, PDF)",
      "API documentation generation",
      "Priority email support",
      "30-day history retention",
    ],
  },
  {
    name: "Team",
    price: { monthly: "$49", yearly: "$39" },
    description: "Get started for Team Docy",
    buttonText: "Start 14-day free",
    buttonStyle: "bg-[#1a1a1a] text-white hover:bg-[#333]",
    featured: false,
    features: [
      "Everything in Pro",
      "5 team members included",
      "Collaborative editing",
      "Custom branding",
      "Dedicated support",
      "Unlimited history retention",
    ],
  },
];

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <div className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose the plan that fits your documentation needs. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
            Billed monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative w-14 h-7 bg-gray-200 rounded-full transition-colors duration-200"
          >
            <div
              className={`absolute top-1 w-5 h-5 bg-[#fa5028] rounded-full transition-transform duration-200 ${
                isYearly ? 'translate-x-8' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${isYearly ? 'text-[#fa5028]' : 'text-gray-500'}`}>
            Billed yearly
          </span>
          {isYearly && (
            <span className="bg-[#fff0eb] text-[#fa5028] text-xs font-medium px-2 py-1 rounded-full">
              Save 20%
            </span>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 ${
                plan.featured
                  ? 'bg-[#1a1a1a] text-white'
                  : 'bg-white border border-gray-200'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute top-6 right-6">
                  <span className="inline-flex items-center gap-1 bg-[#333] text-white text-xs font-medium px-3 py-1.5 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <p className={`text-sm font-medium mb-4 ${plan.featured ? 'text-gray-400' : 'text-gray-600'}`}>
                {plan.name}
              </p>

              {/* Price */}
              <h3 className="text-5xl font-bold mb-2">
                {isYearly ? plan.price.yearly : plan.price.monthly}
                {plan.price.monthly !== "Free" && (
                  <span className={`text-lg font-normal ${plan.featured ? 'text-gray-400' : 'text-gray-500'}`}>
                    /mo
                  </span>
                )}
              </h3>

              {/* Description */}
              <p className={`text-sm mb-6 ${plan.featured ? 'text-gray-400' : 'text-gray-600'}`}>
                {plan.description}
              </p>

              {/* CTA Button */}
              <button
                className={`w-full py-4 px-6 rounded-xl font-medium transition-colors duration-200 mb-8 ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </button>

              {/* Features Divider */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`flex-1 h-px ${plan.featured ? 'bg-gray-700' : 'bg-gray-200'}`} />
                <span className={`text-sm ${plan.featured ? 'text-gray-400' : 'text-gray-500'}`}>
                  Main features
                </span>
                <div className={`flex-1 h-px ${plan.featured ? 'bg-gray-700' : 'bg-gray-200'}`} />
              </div>

              {/* Features List */}
              <ul className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check
                      className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        plan.featured ? 'text-gray-400' : 'text-gray-400'
                      }`}
                    />
                    <span className={`text-sm ${plan.featured ? 'text-gray-300' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-gray-500 text-sm mt-12">
          All plans include SSL encryption, 99.9% uptime SLA, and GDPR compliance.
        </p>
      </div>
    </div>
  );
}