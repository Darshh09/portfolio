export interface Project {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link: string;
  sourceCode: string;
<<<<<<< HEAD
  status: 'completed' | 'concept';
=======
>>>>>>> 4c32745 (feat: Create professional projects section with OpsSight showcase and concept projects - Realistic portfolio for freelance clients)
  category: string;
  complexity: string;
  duration: string;
  impact: string;
<<<<<<< HEAD
  clientType: 'enterprise' | 'startup' | 'agency' | 'individual';
=======
  featured?: boolean;
  status: "completed" | "concept" | "in-progress";
  clientType?: string;
>>>>>>> 4c32745 (feat: Create professional projects section with OpsSight showcase and concept projects - Realistic portfolio for freelance clients)
}

export const projects: Project[] = [
  {
    id: 1,
<<<<<<< HEAD
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
=======
    title: "OpsSight AI Platform",
    des: "AI-powered revenue intelligence platform with real-time MRR tracking, churn analysis, and predictive insights. Built for SaaS companies to optimize growth and revenue operations.",
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
    clientType: "SaaS Companies"
>>>>>>> 4c32745 (feat: Create professional projects section with OpsSight showcase and concept projects - Realistic portfolio for freelance clients)
  },
  {
    id: 2,
    title: "E-Commerce Solution Concept",
<<<<<<< HEAD
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
=======
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
    clientType: "E-commerce Businesses"
>>>>>>> 4c32745 (feat: Create professional projects section with OpsSight showcase and concept projects - Realistic portfolio for freelance clients)
  },
  {
    id: 3,
    title: "AI Chat Application Concept",
<<<<<<< HEAD
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
=======
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
    clientType: "Tech Startups"
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
    clientType: "Enterprise Teams"
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
    clientType: "Weather Services"
>>>>>>> 4c32745 (feat: Create professional projects section with OpsSight showcase and concept projects - Realistic portfolio for freelance clients)
  }
];
