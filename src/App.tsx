import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultProviders } from "./components/providers/default.tsx";
import { useServiceWorker } from "@/hooks/use-service-worker.ts";
import AuthCallback from "./pages/auth/Callback.tsx";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

// Labs
import AiLabPage from "./pages/labs/AiLab.tsx";
import RoboticsLabPage from "./pages/labs/RoboticsLab.tsx";
import IoTLabPage from "./pages/labs/IoTLab.tsx";
import ArVrLabPage from "./pages/labs/ArVrLab.tsx";
import CodingLabPage from "./pages/labs/CodingLab.tsx";
import StemLabPage from "./pages/labs/StemLab.tsx";
import CreatorLabPage from "./pages/labs/CreatorLab.tsx";
import SkillLabPage from "./pages/labs/SkillLab.tsx";

// Products
import PictoLabPage from "./pages/products/PictoLab.tsx";
import PictoLabPlayground from "./pages/products/picto-lab/playground.tsx";
import PictoLabChallenges from "./pages/products/picto-lab/challenges.tsx";
import PictoLabSubscribe from "./pages/products/picto-lab/subscribe.tsx";
import PythonLabPage from "./pages/products/PythonLab.tsx";
import LmsPage from "./pages/products/Lms.tsx";

// Services & Solutions
import SolutionsPage from "./pages/solutions/page.tsx";
import TeachersTrainingPage from "./pages/teachers-training/page.tsx";
import ContactPage from "./pages/contact/page.tsx";
import AboutPage from "./pages/about/page.tsx";
import BlogPage from "./pages/blog/page.tsx";
import BlogPostPage from "./pages/blog/post.tsx";
import AdminInquiriesPage from "./pages/admin/inquiries.tsx";
import LmsDashboard from "./pages/lms/page.tsx";
import CourseDetailPage from "./pages/lms/course.tsx";
import LessonViewerPage from "./pages/lms/lesson.tsx";

// New Labs
import SpaceLabPage from "./pages/labs/SpaceLab.tsx";
import RndLabPage from "./pages/labs/RndLab.tsx";
import IncubationLabPage from "./pages/labs/IncubationLab.tsx";
import AiToolsLabPage from "./pages/labs/AiToolsLab.tsx";
import AgenticAiLabPage from "./pages/labs/AgenticAiLab.tsx";
import AutomatedLabPage from "./pages/labs/AutomatedLab.tsx";
import AutonomousLabPage from "./pages/labs/AutonomousLab.tsx";
import Ir50LabPage from "./pages/labs/Ir50Lab.tsx";
import FutureWorkforceLabPage from "./pages/labs/FutureWorkforceLab.tsx";

export default function App() {
  useServiceWorker();
  return (
    <DefaultProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Lab Routes */}
          <Route path="/labs/ai" element={<AiLabPage />} />
          <Route path="/labs/robotics" element={<RoboticsLabPage />} />
          <Route path="/labs/iot" element={<IoTLabPage />} />
          <Route path="/labs/arvr" element={<ArVrLabPage />} />
          <Route path="/labs/coding" element={<CodingLabPage />} />
          <Route path="/labs/stem" element={<StemLabPage />} />
          <Route path="/labs/creator" element={<CreatorLabPage />} />
          <Route path="/labs/skill" element={<SkillLabPage />} />

          {/* Product Routes */}
          <Route path="/products/picto-lab" element={<PictoLabPage />} />
          <Route path="/products/picto-lab/playground" element={<PictoLabPlayground />} />
          <Route path="/products/picto-lab/challenges" element={<PictoLabChallenges />} />
          <Route path="/products/picto-lab/subscribe" element={<PictoLabSubscribe />} />
          <Route path="/products/python-lab" element={<PythonLabPage />} />
          <Route path="/products/lms" element={<LmsPage />} />

          {/* Services & Solutions Routes */}
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/teachers-training" element={<TeachersTrainingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* New Lab Routes */}
          <Route path="/labs/space" element={<SpaceLabPage />} />
          <Route path="/labs/rnd" element={<RndLabPage />} />
          <Route path="/labs/incubation" element={<IncubationLabPage />} />
          <Route path="/labs/ai-tools" element={<AiToolsLabPage />} />
          <Route path="/labs/agentic-ai" element={<AgenticAiLabPage />} />
          <Route path="/labs/automated" element={<AutomatedLabPage />} />
          <Route path="/labs/autonomous" element={<AutonomousLabPage />} />
          <Route path="/labs/ir50" element={<Ir50LabPage />} />
          <Route path="/labs/future-workforce" element={<FutureWorkforceLabPage />} />

          {/* Coming Soon stubs */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/admin/inquiries" element={<AdminInquiriesPage />} />
          <Route path="/lms" element={<LmsDashboard />} />
          <Route path="/lms/courses/:slug" element={<CourseDetailPage />} />
          <Route path="/lms/courses/:slug/lessons/:lessonId" element={<LessonViewerPage />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </DefaultProviders>
  );
}
