export interface Project {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link: string;
  sourceCode: string;
  status: 'completed' | 'concept';
  category: string;
  complexity: string;
  duration: string;
  impact: string;
  clientType: 'enterprise' | 'startup' | 'agency' | 'individual';
}

export const projects: Project[] = [
  {
    id: 1,
    title: "OpsSight Platform",
    des: "AI-powered revenue intelligence platform that helps businesses optimize their sales processes, track performance metrics, and make data-driven decisions. Features advanced analytics, predictive insights, and automated reporting.",
    img: "/projects/opssight.png",
    iconLists: ["/tech/react.svg", "/tech/nodejs.svg", "/tech/postgresql.svg", "/tech/openai.svg", "/tech/aws.svg"],
    link: "https://opssight.ai",
    sourceCode: "https://github.com/Darshh09/opssight",
    status: "completed",
    category: "AI SaaS",
    complexity: "Advanced",
    duration: "12-16",
    impact: "High",
    clientType: "enterprise"
  },
  {
    id: 2,
    title: "E-Commerce Solution Concept",
    des: "Modern e-commerce platform with AI-powered product recommendations, real-time inventory management, and advanced analytics. Built for scalability and high-performance user experience.",
    img: "/projects/ecommerce-concept.png",
    iconLists: ["/tech/nextjs.svg", "/tech/typescript.svg", "/tech/mongodb.svg", "/tech/stripe.svg", "/tech/redis.svg"],
    link: "#",
    sourceCode: "#",
    status: "concept",
    category: "E-Commerce",
    complexity: "Advanced",
    duration: "8-12",
    impact: "High",
    clientType: "startup"
  },
  {
    id: 3,
    title: "AI Chat Application Concept",
    des: "Intelligent customer support chatbot with natural language processing, sentiment analysis, and seamless integration with existing systems. Reduces support costs and improves customer satisfaction.",
    img: "/projects/ai-chat-concept.png",
    iconLists: ["/tech/react.svg", "/tech/python.svg", "/tech/firebase.svg", "/tech/openai.svg", "/tech/socketio.svg"],
    link: "#",
    sourceCode: "#",
    status: "concept",
    category: "AI/ML",
    complexity: "Advanced",
    duration: "6-10",
    impact: "Medium",
    clientType: "agency"
  },
  {
    id: 4,
    title: "Task Management App Concept",
    des: "Collaborative project management tool with real-time updates, team collaboration, and AI-powered task prioritization. Streamlines workflow and boosts team productivity.",
    img: "/projects/task-manager-concept.png",
    iconLists: ["/tech/vue.svg", "/tech/nodejs.svg", "/tech/socketio.svg", "/tech/redis.svg", "/tech/postgresql.svg"],
    link: "#",
    sourceCode: "#",
    status: "concept",
    category: "Productivity",
    complexity: "Intermediate",
    duration: "6-8",
    impact: "Medium",
    clientType: "startup"
  },
  {
    id: 5,
    title: "Weather Dashboard Concept",
    des: "Real-time weather monitoring system with predictive analytics, customizable alerts, and integration with IoT devices. Perfect for agriculture, logistics, and outdoor event planning.",
    img: "/projects/weather-concept.png",
    iconLists: ["/tech/react.svg", "/tech/d3js.svg", "/tech/weatherapi.svg", "/tech/pwa.svg", "/tech/nodejs.svg"],
    link: "#",
    sourceCode: "#",
    status: "concept",
    category: "IoT/Data",
    complexity: "Intermediate",
    duration: "4-6",
    impact: "Medium",
    clientType: "individual"
  }
];
