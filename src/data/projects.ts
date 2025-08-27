export interface Project {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link: string;
  sourceCode: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "BrotherhoodBytes Platform",
    des: "Complete business management platform with client portal, project tracking, and analytics dashboard. Built with modern web technologies for scalability and performance.",
    img: "/projects/brotherhoodbytes.png",
    iconLists: ["/tech/react.svg", "/tech/nodejs.svg", "/tech/postgresql.svg", "/tech/stripe.svg"],
    link: "https://brotherhoodbytes.com",
    sourceCode: "https://github.com/brotherhoodbytes/platform"
  },
  {
    id: 2,
    title: "E-Commerce Dashboard",
    des: "Advanced e-commerce management system with real-time analytics, inventory management, and customer insights. Features responsive design and intuitive user interface.",
    img: "/projects/ecommerce.png",
    iconLists: ["/tech/nextjs.svg", "/tech/typescript.svg", "/tech/mongodb.svg", "/tech/tailwind.svg"],
    link: "https://ecommerce-demo.com",
    sourceCode: "https://github.com/darshit/ecommerce-dashboard"
  },
  {
    id: 3,
    title: "AI Chat Application",
    des: "Intelligent chat application powered by AI with real-time messaging, file sharing, and smart responses. Includes user authentication and message encryption.",
    img: "/projects/ai-chat.png",
    iconLists: ["/tech/react.svg", "/tech/python.svg", "/tech/firebase.svg", "/tech/openai.svg"],
    link: "https://ai-chat-demo.com",
    sourceCode: "https://github.com/darshit/ai-chat-app"
  },
  {
    id: 4,
    title: "Portfolio Website",
    des: "Modern portfolio website with interactive 3D elements, smooth animations, and responsive design. Showcases projects and skills in an engaging way.",
    img: "/projects/portfolio.png",
    iconLists: ["/tech/react.svg", "/tech/threejs.svg", "/tech/gsap.svg", "/tech/vite.svg"],
    link: "https://darshit-portfolio.com",
    sourceCode: "https://github.com/darshit/portfolio"
  },
  {
    id: 5,
    title: "Task Management App",
    des: "Collaborative task management application with real-time updates, team collaboration, and progress tracking. Features drag-and-drop interface and notifications.",
    img: "/projects/task-manager.png",
    iconLists: ["/tech/vue.svg", "/tech/nodejs.svg", "/tech/socketio.svg", "/tech/redis.svg"],
    link: "https://task-manager-demo.com",
    sourceCode: "https://github.com/darshit/task-manager"
  },
  {
    id: 6,
    title: "Weather Dashboard",
    des: "Real-time weather dashboard with location-based forecasts, interactive maps, and historical data visualization. Includes weather alerts and customizable widgets.",
    img: "/projects/weather.png",
    iconLists: ["/tech/react.svg", "/tech/d3js.svg", "/tech/weatherapi.svg", "/tech/pwa.svg"],
    link: "https://weather-dashboard.com",
    sourceCode: "https://github.com/darshit/weather-dashboard"
  }
];
