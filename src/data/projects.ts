export interface Project {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link: string;
  sourceCode: string;
  category: string;
  complexity: string;
  duration: string;
  impact: string;
  featured?: boolean;
  status: "completed" | "concept" | "in-progress";
  clientType?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "OpsSight AI Platform",
    des: "AI-powered revenue intelligence platform with real-time MRR tracking, churn analysis, and predictive insights. A demonstration of my full-stack development capabilities.",
    img: "/projects/opssight.png",
    iconLists: ["/tech/nextjs.svg", "/tech/nodejs.svg", "/tech/postgresql.svg", "/tech/openai.svg"],
    link: "https://builtbydarshit.netlify.app/opssight",
    sourceCode: "https://github.com/Darshh09/opssight",
    category: "saas",
    complexity: "hard",
    duration: "10-12",
    impact: "Very High",
    featured: true,
    status: "completed",
    clientType: "Personal Project"
  },
  {
    id: 2,
    title: "E-Commerce Solution Concept",
    des: "Modern e-commerce platform concept with AI-powered product recommendations, real-time inventory management, and advanced analytics dashboard. Designed for scalability and performance.",
    img: "/projects/ecommerce-concept.png",
    iconLists: ["/tech/nextjs.svg", "/tech/typescript.svg", "/tech/mongodb.svg", "/tech/stripe.svg"],
    link: "#",
    sourceCode: "#",
    category: "ecommerce",
    complexity: "hard",
    duration: "8-10",
    impact: "High",
    status: "concept",
    clientType: "Ready to Build"
  },
  {
    id: 3,
    title: "AI Chat Application Concept",
    des: "Intelligent chat application concept with AI integration, real-time messaging, and smart response generation. Features user authentication, file sharing, and conversation analytics.",
    img: "/projects/ai-chat-concept.png",
    iconLists: ["/tech/react.svg", "/tech/python.svg", "/tech/firebase.svg", "/tech/openai.svg"],
    link: "#",
    sourceCode: "#",
    category: "ai",
    complexity: "hard",
    duration: "6-8",
    impact: "High",
    status: "concept",
    clientType: "Ready to Build"
  },
  {
    id: 4,
    title: "Portfolio Website",
    des: "Modern portfolio website with interactive 3D elements, smooth animations, and responsive design. Showcases professional skills and project capabilities in an engaging way.",
    img: "/projects/portfolio.png",
    iconLists: ["/tech/react.svg", "/tech/threejs.svg", "/tech/gsap.svg", "/tech/vite.svg"],
    link: "https://darshitdev.in",
    sourceCode: "https://github.com/Darshh09/portfolio",
    category: "web",
    complexity: "medium",
    duration: "2-3",
    impact: "Medium",
    status: "completed",
    clientType: "Personal Branding"
  },
  {
    id: 5,
    title: "Task Management App Concept",
    des: "Collaborative task management application concept with real-time updates, team collaboration, and progress tracking. Features drag-and-drop interface and smart notifications.",
    img: "/projects/task-manager-concept.png",
    iconLists: ["/tech/react.svg", "/tech/nodejs.svg", "/tech/socketio.svg", "/tech/redis.svg"],
    link: "#",
    sourceCode: "#",
    category: "web",
    complexity: "medium",
    duration: "4-5",
    impact: "Medium",
    status: "concept",
    clientType: "Ready to Build"
  },
  {
    id: 6,
    title: "Weather Dashboard Concept",
    des: "Real-time weather dashboard concept with location-based forecasts, interactive maps, and historical data visualization. Includes weather alerts and customizable widgets.",
    img: "/projects/weather-concept.png",
    iconLists: ["/tech/react.svg", "/tech/d3js.svg", "/tech/weatherapi.svg", "/tech/pwa.svg"],
    link: "#",
    sourceCode: "#",
    category: "web",
    complexity: "easy",
    duration: "2-3",
    impact: "Medium",
    status: "concept",
    clientType: "Ready to Build"
  }
];
