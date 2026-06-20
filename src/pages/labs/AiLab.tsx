import LabPageTemplate from "./_components/LabPageTemplate.tsx";
import type { LabPageData } from "./_components/LabPageTemplate.tsx";

const data: LabPageData = {
  id: "ai-lab",
  emoji: "🤖",
  title: "AI Lab",
  tagline: "Intelligence Unleashed",
  description:
    "A fully equipped Artificial Intelligence lab that takes students from AI fundamentals all the way to building their own models, chatbots, and computer vision applications.",
  heroImage: "https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?w=1400&q=80",
  gradient: "from-blue-500/20 to-cyan-500/10",
  accentColor: "bg-blue-500/10 text-blue-600 border border-blue-500/20",
  overview:
    "The NITAI AI Lab is designed to make Artificial Intelligence accessible, engaging, and deeply practical for students at every level. Using a blend of visual tools, Python programming, and real-world datasets, students progress from understanding what AI is to building their own intelligent systems — including image classifiers, chatbots, voice assistants, and predictive models. The lab is curriculum-aligned and comes with teacher guides, student workbooks, and automated assessment tools.",
  keyFeatures: [
    { icon: "🧠", title: "ML Model Builder", desc: "Drag-and-drop interface to train machine learning models on real datasets without any code." },
    { icon: "👁️", title: "Computer Vision Studio", desc: "Use webcams and image datasets to build face recognition, object detection, and gesture control projects." },
    { icon: "💬", title: "NLP & Chatbot Builder", desc: "Build AI chatbots and sentiment analyzers using natural language processing toolkits." },
    { icon: "📊", title: "Data Science Dashboard", desc: "Interactive tools for data exploration, visualization, and statistical analysis." },
    { icon: "🎓", title: "Structured Curriculum", desc: "300+ hours of structured content from beginner to advanced levels with teacher resources." },
    { icon: "🏆", title: "AI Competitions", desc: "Monthly inter-school AI competitions and challenges with certificates and prizes." },
  ],
  curriculum: [
    {
      level: "Beginner (Grade 5–7)",
      topics: ["What is AI?", "AI in everyday life", "How machines learn", "Simple sorting algorithms", "Intro to Teachable Machine"],
    },
    {
      level: "Intermediate (Grade 8–10)",
      topics: ["Python fundamentals", "Data types and datasets", "Training ML models", "Image classification", "AI ethics and bias"],
    },
    {
      level: "Advanced (Grade 11–12 / College)",
      topics: ["Deep learning concepts", "Neural networks", "NLP and text models", "Computer vision projects", "Capstone AI project"],
    },
  ],
  outcomes: [
    "Understand core AI and machine learning concepts",
    "Train and deploy simple ML models",
    "Build computer vision applications",
    "Create NLP-powered chatbots",
    "Apply AI ethics and responsible AI principles",
    "Complete a portfolio-worthy AI capstone project",
    "Earn NITAI AI Certification",
  ],
  gallery: [
    "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?w=400&q=80",
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80",
    "https://images.unsplash.com/photo-1737644467636-6b0053476bb2?w=400&q=80",
  ],
  ageGroup: "Ages 10–22",
  duration: "Academic Year",
  kitIncludes: ["AI Lab Software License", "Dataset Library", "GPU Cloud Credits", "Teacher Training", "Student Workbooks (Digital)", "Assessment Portal", "Completion Certificates", "Annual Support"],
};

export default function AiLabPage() {
  return <LabPageTemplate lab={data} />;
}
