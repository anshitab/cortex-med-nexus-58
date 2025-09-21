
import { Activity, Users, HeartHandshake, Lightbulb, Dumbbell, GraduationCap } from 'lucide-react';

const cultureItems = [
  {
    id: 'innovation',
    title: 'Innovation',
    description: 'We foster a culture of continuous innovation and creative problem-solving',
    icon: Lightbulb,
    color: 'bg-amber-100 text-amber-600 border-amber-200'
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    description: 'Cross-functional teams work together to achieve exceptional results',
    icon: Users,
    color: 'bg-blue-100 text-blue-600 border-blue-200'
  },
  {
    id: 'integrity',
    title: 'Integrity',
    description: 'We maintain the highest ethical standards in everything we do',
    icon: HeartHandshake,
    color: 'bg-green-100 text-green-600 border-green-200'
  },
  {
    id: 'wellness',
    title: 'Wellness',
    description: 'We promote work-life balance and overall employee wellbeing',
    icon: Dumbbell,
    color: 'bg-purple-100 text-purple-600 border-purple-200'
  },
  {
    id: 'growth',
    title: 'Growth',
    description: 'Continuous learning and development opportunities for every employee',
    icon: GraduationCap,
    color: 'bg-red-100 text-red-600 border-red-200'
  },
  {
    id: 'agility',
    title: 'Agility',
    description: 'We adapt quickly to industry changes and evolving market needs',
    icon: Activity,
    color: 'bg-teal-100 text-teal-600 border-teal-200'
  }
];

const InteractiveWorkCulture = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cortex-blue/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cortex-red/5 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-cortex-darkBlue mb-4">
            Our <span className="text-cortex-blue">Culture</span>
          </h2>
          <p className="text-gray-700">
            Discover what makes working at CORTEX Medical a unique and rewarding experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cultureItems.map(item => (
            <div 
              key={item.id}
              className="bg-white rounded-xl shadow-lg border border-cortex-blue/10 p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto ${item.color}`}>
                <item.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-cortex-darkBlue mb-3 text-center">{item.title}</h3>
              <p className="text-gray-700 text-center">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveWorkCulture;
