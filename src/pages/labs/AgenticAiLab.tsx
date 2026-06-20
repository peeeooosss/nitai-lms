import LabPageTemplate from "./_components/LabPageTemplate.tsx";
import type { LabPageData } from "./_components/LabPageTemplate.tsx";

const data: LabPageData = {
  id: "agentic-ai-lab",
  emoji: "🧠",
  title: "Agentic AI Lab",
  tagline: "Build Thinking Machines",
  description: "Build real AI agents using LangChain, AutoGPT, and CrewAI. Deploy multi-agent pipelines that automate complex real-world workflows — the most cutting-edge AI education available today.",
  heroImage: "https://images.unsplash.com/photo-1744640326166-433469d102f2?w=1400&q=80",
  gradient: "from-blue-500/20 to-indigo-500/10",
  accentColor: "bg-blue-500/10 text-blue-600 border border-blue-500/20",
  ageGroup: "Grade 10–PG",
  duration: "150 hrs/year",
  overview:
    "The most cutting-edge AI education available in schools and colleges today. This lab dives deep into autonomous AI agents — systems that plan, reason, use tools, and execute multi-step tasks without human intervention. Students build real agents using LangChain, LangGraph, AutoGPT, and CrewAI, and deploy multi-agent pipelines that automate complex real-world workflows across research, business, and engineering domains.",
  keyFeatures: [
    {
      title: "LangChain & LangGraph",
      desc:
        "Build sophisticated AI chains, retrieval-augmented generation (RAG) systems, and stateful agent graphs using the industry-standard frameworks.",
      icon: "Link",
    },
    {
      title: "AutoGPT & CrewAI",
      desc:
        "Deploy autonomous agents that browse the web, write code, create files, and complete long-horizon tasks with minimal human oversight.",
      icon: "Bot",
    },
    {
      title: "Multi-Agent Systems",
      desc:
        "Design collaborative agent teams where specialized AI roles work together — researcher, writer, critic, coder — to solve complex problems.",
      icon: "Network",
    },
    {
      title: "AI Memory & Tools",
      desc:
        "Implement short-term, long-term, and episodic memory systems, and equip agents with tools: web search, code execution, and APIs.",
      icon: "Database",
    },
    {
      title: "Real-World Agent Projects",
      desc:
        "Build agents that automate customer support, conduct market research, generate full-stack code, and manage business workflows autonomously.",
      icon: "Rocket",
    },
    {
      title: "Agentic AI Certification",
      desc:
        "Industry-recognized certification validating expertise in agent architecture, LLM orchestration, and autonomous system deployment.",
      icon: "Award",
    },
  ],
  curriculum: [
    {
      level: "Beginner",
      topics: [
        "What are AI agents? Reasoning and planning fundamentals",
        "LLM APIs: OpenAI, Anthropic, and Gemini",
        "Introduction to LangChain chains and prompts",
        "Tool use: giving AI access to search and calculators",
        "Basic RAG: retrieving knowledge for accurate answers",
        "Agent vs chatbot: understanding the key differences",
      ],
    },
    {
      level: "Intermediate",
      topics: [
        "LangGraph: stateful, cyclical agent workflows",
        "Memory systems: in-context, vector store, and episodic",
        "ReAct and chain-of-thought agent patterns",
        "CrewAI: building collaborative multi-agent crews",
        "Structured output and function calling",
        "Agent evaluation, debugging, and observability with LangSmith",
      ],
    },
    {
      level: "Advanced",
      topics: [
        "Autonomous agent deployment with AutoGPT and BabyAGI",
        "Multi-agent orchestration with supervisor and hierarchical patterns",
        "Agent security: prompt injection and sandboxing",
        "Building and monetizing agentic SaaS products",
        "Integrating agents with enterprise systems and APIs",
        "Capstone: deploy a production-grade autonomous AI agent",
      ],
    },
  ],
  outcomes: [
    "Build and deploy production-grade autonomous AI agents",
    "Mastery of LangChain, LangGraph, CrewAI — the industry-standard agent stack",
    "Certification recognized by AI companies and top tech employers",
    "Ability to automate complex multi-step workflows worth significant business value",
    "Foundation for AI research roles, ML engineering, and AI product development",
    "Competitive edge in AI hackathons and open-source agent communities",
  ],
  gallery: [
    "https://images.unsplash.com/photo-1581092333322-31d2fd38a35e?w=800&q=80",
    "https://images.unsplash.com/photo-1622258415402-d6f597973b03?w=800&q=80",
    "https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?w=800&q=80",
  ],
  kitIncludes: [
    "Agentic AI Starter Codebase: pre-built agent templates and project scaffolds",
    "LLM API Credits Pack (OpenAI, Anthropic, Gemini) for hands-on labs",
    "Vector Database Access: Pinecone or Weaviate 1-year student license",
    "Agent Observability Tools: LangSmith and Langfuse setup guides",
    "Agentic AI Project Workbook with 20 guided real-world agent builds",
  ],
};

export default function AgenticAiLabPage() {
  return <LabPageTemplate lab={data} />;
}
