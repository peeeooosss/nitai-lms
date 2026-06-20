import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Priya Sharma",
    role: "Principal, Delhi Public School",
    country: "India",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    text: "NITAI AI Lab transformed our school's approach to STEM. Students who once struggled with traditional subjects are now building robots and AI models. The curriculum is exceptional.",
    rating: 5,
  },
  {
    name: "Prof. James Okafor",
    role: "Dean of Engineering, Lagos Tech University",
    country: "Nigeria",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    text: "The IoT and AI labs gave our engineering students real-world skills they couldn't learn from textbooks. NITAI's support team is outstanding and always available.",
    rating: 5,
  },
  {
    name: "Ms. Sarah Thompson",
    role: "Head of Technology, Riverside Academy",
    country: "UK",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    text: "The AR/VR Lab is remarkable. Students are learning history, biology, and physics through immersive experiences. Parent engagement has skyrocketed since installation.",
    rating: 5,
  },
  {
    name: "Dr. Ahmed Al-Rashid",
    role: "Director of Curriculum, Dubai Schools Authority",
    country: "UAE",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    text: "We deployed NITAI's complete 8-lab solution across 12 campuses. The centralized NITAI LMS makes management seamless. Our students' innovation index improved by 40%.",
    rating: 5,
  },
  {
    name: "Ms. Li Wei",
    role: "STEM Coordinator, Shanghai International School",
    country: "China",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    text: "NITAI Picto Lab has made coding accessible to our youngest learners. The teacher training program was comprehensive and my staff feels completely confident.",
    rating: 5,
  },
  {
    name: "Mr. Carlos Rivera",
    role: "Technology Director, UNAM Mexico",
    country: "Mexico",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    text: "The NITAI Python Lab integration with physical robotics kits is brilliant. Students go from code editor to seeing their robot move in minutes. Incredible learning engagement.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            Trusted Worldwide
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Loved by Educators Globally
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thousands of educators and institutions across the globe trust NITAI to inspire the next generation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="bg-card border border-border rounded-2xl p-6 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-0.5">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <Quote className="w-6 h-6 text-primary/30" />
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">
        {`"${testimonial.text}"`}
      </p>
      <div className="flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="text-sm font-semibold text-foreground">{testimonial.name}</div>
          <div className="text-xs text-muted-foreground">{testimonial.role}</div>
          <div className="text-xs text-primary font-medium">{testimonial.country}</div>
        </div>
      </div>
    </motion.div>
  );
}
