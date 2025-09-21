
import { useState } from 'react';
import { Star, ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type Review = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  department: string;
  yearsAtCompany: string;
};

const reviews: Review[] = [
  {
    id: 'review1',
    name: 'Dr. Rajesh Kumar',
    role: 'Senior Research Scientist',
    avatar: '/lovable-uploads/0e40f082-6659-4768-beb3-475d5e7a3e2b.png',
    content: "Joining CORTEX Medical was the best career decision I've made. The collaborative research environment and state-of-the-art facilities have allowed me to contribute to groundbreaking pharmaceutical formulations while continuing to grow professionally.",
    rating: 5,
    department: 'R&D',
    yearsAtCompany: '4 years'
  },
  {
    id: 'review2',
    name: 'Priya Sharma',
    role: 'Quality Control Manager',
    avatar: '/lovable-uploads/0e40f082-6659-4768-beb3-475d5e7a3e2b.png',
    content: "What sets CORTEX apart is their unwavering commitment to quality and compliance. As a QC professional, I appreciate how the company invests in advanced testing equipment and continuous training to ensure we maintain the highest standards in everything we produce.",
    rating: 5,
    department: 'Quality Control',
    yearsAtCompany: '3 years'
  },
  {
    id: 'review3',
    name: 'Amit Patel',
    role: 'Production Supervisor',
    avatar: '/lovable-uploads/0e40f082-6659-4768-beb3-475d5e7a3e2b.png',
    content: "The work culture at CORTEX encourages innovation and efficiency. Management listens to our suggestions for process improvements, and there's a real sense that we're all working together toward a common goal of pharmaceutical excellence.",
    rating: 4,
    department: 'Manufacturing',
    yearsAtCompany: '5 years'
  },
  {
    id: 'review4',
    name: 'Neha Gupta',
    role: 'Regulatory Affairs Specialist',
    avatar: '/lovable-uploads/0e40f082-6659-4768-beb3-475d5e7a3e2b.png',
    content: "The professional growth opportunities at CORTEX are exceptional. I started in an entry-level position and have been able to advance my career through mentorship programs and sponsored certifications. The company truly invests in its people.",
    rating: 5,
    department: 'Regulatory Affairs',
    yearsAtCompany: '6 years'
  }
];

const EmployeeReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  
  const visibleReviews = () => {
    const start = currentIndex;
    const end = Math.min(currentIndex + (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1), reviews.length);
    return reviews.slice(start, end);
  };
  
  const handleNext = () => {
    if (currentIndex < reviews.length - 1 && !animating) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex(prev => Math.min(prev + 1, reviews.length - 1));
        setAnimating(false);
      }, 300);
    }
  };
  
  const handlePrev = () => {
    if (currentIndex > 0 && !animating) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
        setAnimating(false);
      }, 300);
    }
  };
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
      />
    ));
  };
  
  return (
    <section className="py-20 bg-cortex-gray/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-cortex-darkBlue mb-4">
            What Our <span className="text-cortex-blue">Team</span> Says
          </h2>
          <p className="text-gray-700">
            Hear directly from our employees about their experiences working at CORTEX Medical.
          </p>
        </div>
        
        <div className="relative">
          <div className="flex justify-between items-center mb-8">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handlePrev} 
              disabled={currentIndex === 0}
              className="border-cortex-blue text-cortex-blue hover:bg-cortex-blue hover:text-white transition-colors duration-300"
            >
              <ArrowLeft size={20} />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleNext} 
              disabled={currentIndex >= reviews.length - (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1)}
              className="border-cortex-blue text-cortex-blue hover:bg-cortex-blue hover:text-white transition-colors duration-300"
            >
              <ArrowRight size={20} />
            </Button>
          </div>
          
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-300 ${animating ? 'opacity-50' : 'opacity-100'}`}>
            {visibleReviews().map((review) => (
              <Card key={review.id} className="h-full bg-white border-cortex-blue/10 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 flex flex-col h-full">
                  <Quote size={40} className="text-cortex-blue/20 mb-4" />
                  
                  <p className="text-gray-700 mb-6 flex-grow italic text-sm md:text-base">
                    "{review.content}"
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-12 w-12 border-2 border-cortex-blue/20">
                        <AvatarImage src={review.avatar} alt={review.name} />
                        <AvatarFallback className="bg-cortex-blue/10 text-cortex-darkBlue">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h4 className="font-semibold text-cortex-darkBlue">{review.name}</h4>
                        <p className="text-sm text-gray-600">{review.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1">
                        {renderStars(review.rating)}
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        {review.yearsAtCompany}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeeReviews;
