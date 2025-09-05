'use client'

const stats = [
  { value: "500+", label: "Offer Letters Generated" },
  { value: "99.9%", label: "Accuracy Rate" },
  { value: "24/7", label: "Support Availability" },
];

const MissionSection = () => {
  return (
    <section className="bg-white text-gray-800 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side: Mission Content */}
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Our goal is to make offer letter generation fast, accurate, and stress-free for salon companies. 
              With our platform, you can create fully customized letters in minutes, ensuring professionalism 
              and consistency for every candidate.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Whether you're hiring full-time employees, interns, or contractors, our tool adapts to your needs. 
              Save time, avoid manual errors, and impress your new hires with beautifully designed offer letters.
            </p>
          </div>

          {/* Right Side: Stats */}
          <div className="space-y-8">
            {stats.map((stat, index) => (
              <div key={index}>
                <h3 className="text-4xl font-bold">{stat.value}</h3>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
