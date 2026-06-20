import LabPageTemplate from "./_components/LabPageTemplate.tsx";
import type { LabPageData } from "./_components/LabPageTemplate.tsx";

const data: LabPageData = {
  id: "ai-tools-lab",
  emoji: "🛠️",
  title: "AI Tools Lab",
  tagline: "Master Every AI Tool",
  description: "Practical mastery of 100+ AI tools — ChatGPT, Midjourney, Gemini, Copilot, and more — for productivity, creativity, research, and professional applications.",
  heroImage: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?w=1400&q=80",
  gradient: "from-cyan-500/20 to-teal-500/10",
  accentColor: "bg-cyan-500/10 text-cyan-600 border border-cyan-500/20",
  ageGroup: "Grade 6–PG",
  duration: "100 hrs/year",
  overview:
    "Practical mastery of 100+ AI tools transforming every industry — from ChatGPT, Gemini, and Copilot for productivity, to Midjourney and RunwayML for creativity, ElevenLabs for voice, and Cursor for coding. Students learn not just to use these tools, but to build workflows, automate tasks, and generate real income — making AI literacy the defining skill of their generation.",
  keyFeatures: [
    {
      title: "100+ AI Tools Coverage",
      desc:
        "Comprehensive hands-on coverage of the best tools across writing, coding, design, video, audio, research, and business categories.",
      icon: "Layers",
    },
    {
      title: "Prompt Engineering",
      desc:
        "Master the art and science of crafting prompts — chain-of-thought, few-shot, role prompting, and structured output techniques.",
      icon: "MessageSquare",
    },
    {
      title: "AI for Content Creation",
      desc:
        "Create professional-grade content — blogs, videos, podcasts, social posts, and marketing materials — using AI tools end-to-end.",
      icon: "PenTool",
    },
    {
      title: "AI for Research",
      desc:
        "Use Perplexity, Elicit, Consensus, and NotebookLM to conduct deep research 10× faster with verifiable, cited results.",
      icon: "Search",
    },
    {
      title: "AI Workflows & Automation",
      desc:
        "Build no-code AI automations with Make.com, Zapier AI, and n8n to connect tools and eliminate repetitive work.",
      icon: "Zap",
    },
    {
      title: "Earn with AI",
      desc:
        "Monetize AI skills through freelancing, content creation, AI consulting, and building AI-powered micro-SaaS products.",
      icon: "TrendingUp",
    },
  ],
  curriculum: [
    {
      level: "Beginner",
      topics: [
        "Introduction to AI and large language models",
        "ChatGPT, Gemini, and Claude — core use cases",
        "Prompt basics: instructions, context, and format",
        "AI for writing: emails, essays, and summaries",
        "AI for image generation: Midjourney and DALL-E",
        "AI safety, ethics, and fact-checking",
      ],
    },
    {
      level: "Intermediate",
      topics: [
        "Advanced prompt engineering techniques",
        "AI coding assistants: GitHub Copilot and Cursor",
        "AI video tools: RunwayML, Kling, and HeyGen",
        "AI audio: ElevenLabs voice cloning and music generation",
        "AI research stack: Perplexity, Elicit, and NotebookLM",
        "Building personal AI workflows and tool stacks",
      ],
    },
    {
      level: "Advanced",
      topics: [
        "No-code AI automation with Make.com and n8n",
        "AI agent tools: GPTs, Gems, and Claude Projects",
        "Building and selling AI-powered content businesses",
        "AI consulting: auditing businesses for AI opportunities",
        "Creating AI tool reviews and educational content",
        "Capstone: launch an AI-powered side income stream",
      ],
    },
  ],
  outcomes: [
    "Proficiency in 100+ AI tools with a certified toolkit portfolio",
    "Ability to build income streams using AI content and automation",
    "Prompt engineering certification valued by top employers",
    "10× productivity advantage in academic and professional tasks",
    "Foundation for AI product management and AI consulting careers",
    "Ready for roles in AI-forward companies across every industry",
  ],
  gallery: [
    "https://images.unsplash.com/photo-1581092333322-31d2fd38a35e?w=800&q=80",
    "https://images.unsplash.com/photo-1622258415402-d6f597973b03?w=800&q=80",
    "https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?w=800&q=80",
  ],
  kitIncludes: [
    "Curated AI Tools Directory with 100+ vetted tools and use-case guides",
    "Prompt Engineering Handbook (300+ production-ready prompt templates)",
    "AI Workflow Templates Pack for Make.com and n8n",
    "Subscription Credits for Midjourney, RunwayML, and ElevenLabs",
    "AI Income Playbook: monetization strategies and client acquisition guide",
  ],
};

export default function AiToolsLabPage() {
  return <LabPageTemplate lab={data} />;
}
