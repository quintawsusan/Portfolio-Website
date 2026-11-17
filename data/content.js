export const profile = {
  name: "Quinta Susan",
  shortName: "Quinta",
  title: "Software Engineer | Digital Problem Solver | Technology Enthusiast",
  location: "Nairobi, Kenya",

  summary:
    "I enjoy digging beneath the surface, understanding why things work the way they do and finding better ways to approach challenges. I see software engineering as more than writing code; it's about thinking critically, questioning assumptions and turning ideas into well thought out solutions.",

  email: "quintawsusan@gmail.com",

  linkedin: {
    label: "linkedin.com/in/quinta-susan",
    url: "https://www.linkedin.com/in/quinta-susan/",
  },

  github: {
    label: "github.com/quintawsusan",
    url: "https://github.com/quintawsusan",
  },

  about: [
    "A Software Engineer who is driven by the belief that growth comes from being willing to start with what you do not know. I am experienced with Python, FastAPI, PostgreSQL, Flutter, Dart, Next.js and REST APIs, with an understanding of database design, authentication, API integration and collaborative software development.",

    "I have moved from simply using technology to understanding how it is built, why it works and how I can build it myself. I embrace unfamiliar technologies, using research, experimentation and persistence to turn uncertainty into understanding and keep growing.",
  ],
};

export const skillGroups = [
  {
    label: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
  },
  {
    label: "Backend",
    items: ["Python", "FastAPI", "SQLAlchemy", "REST APIs"],
  },
  {
    label: "Mobile",
    items: ["Flutter", "Dart"],
  },
  {
    label: "Databases",
    items: ["PostgreSQL"],
  },
];

export const moreSkillGroups = [
  {
    label: "Machine learning",
    items: [
      "TensorFlow",
      "scikit-learn",
      "Model Training",
      "Model Evaluation",
      "Deep Learning",
    ],
  },
  {
    label: "Used on my projects",
    items: [
      "Figma",
      "Postman",
      "Jira",
      "Google Gemini",
      "YouTube Data API",
      "Google Serper API",
    ],
  },
  {
    label: "Languages",
    items: ["English (Fluent)", "Swahili (Fluent)"],
  },
];

export const projects = [
  {
    id: "vuka",
    name: "Vuka",
    summary:
      "A career and learning platform that turns Kenyan high-school graduates' interests into structured learning pathways.",
    lead: "Career and learning platform for Kenyan high-school graduates.",
    tags: ["Career and learning", "Flutter + FastAPI"],
    stack: [
      { label: "Mobile", items: ["Flutter", "Dart"] },
      { label: "Backend", items: ["FastAPI", "SQLAlchemy", "PostgreSQL"] },
      {
        label: "External APIs",
        items: ["Google Gemini", "YouTube Data API", "Google Serper API"],
      },
    ],
    bullets: [
      "Researched how graduates consume educational content online and where the move from social-media learning to structured skills breaks down.",
      "Designed responsive interfaces and app flows in Figma for onboarding, learning, assessment and progress.",
      "Built FastAPI REST APIs for authentication, onboarding, content pathways, assessments, progress and recommendations.",
      "Built Flutter screens in Dart for onboarding, learning content, assessments, progress and opportunities.",
      "Integrated Google Gemini to generate personalized assessments, learning experiences and opportunity recommendations.",
      "Modeled data in PostgreSQL with SQLAlchemy, tested APIs in Postman and tracked tasks in Jira.",
      "Integrated the YouTube Data API and Google Serper API for learning content and career and opportunity discovery.",
    ],
  },
  {
    id: "umucyo",
    name: "Umucyo",
    summary:
      "An IoT-enabled digital platform that digitizes tea cooperative operations in Rwanda and keeps farmers informed.",
    lead: "IoT and web platform for tea cooperatives.",
    tags: ["IoT", "Web + PWA"],
    stack: [
      { label: "Frontend", items: ["Next.js", "React", "JavaScript", "PWA"] },
      {
        label: "Backend",
        items: [
          "Python",
          "FastAPI",
          "PostgreSQL",
          "SQLAlchemy",
          "REST APIs",
          "Flutter Wave",
        ],
      },
      {
        label: "IoT & messaging",
        items: ["Digital Weighing Hardware", "SMS Leopard"],
      },
    ],
    bullets: [
      "Researched cooperative workflows and stakeholder needs, identifying challenges in tea collection, weighing, deliveries and administration.",

      "Designed user experiences and interfaces for the public website, admin dashboard and field-agent PWA, including role-specific user flows.",

      "Built responsive Next.js and React dashboards for farmer management, tea collections, delivery tracking, payments, reporting and agent tasks.",

      "Designed and built an IoT-enabled digital weighing device, integrating hardware with the software platform to automatically capture and transmit tea weights.",

      "Developed a field-agent PWA for digital weighing, delivery registration, weight verification and task management, with automated SMS notifications to farmers.",

      "Built FastAPI REST APIs with Python and PostgreSQL for authentication, role-based access, farmer management, collections, deliveries, payments and reporting.",
    ],
  },
  {
    id: "mealq",
    name: "Meal Q",
    summary:
      "A meal queue management system for organizing and monitoring meal service.",
    lead: "Meal queue management system.",
    tags: ["Queue management", "Next.js + FastAPI"],
    stack: [
      { label: "Frontend", items: ["Next.js", "React"] },
      { label: "Backend", items: ["FastAPI"] },
    ],
    bullets: [
      "Built secure authentication with password hashing, account verification, failed-login tracking and account locking.",
      "Implemented role-based authorization in FastAPI for student, administrator and system-management access.",
      "Built the user dashboard in Next.js and React for meal-session information.",
      "Integrated backend APIs with the dashboard, supporting real-time updates to queue and meal-session information.",
      "Structured the backend as services, separating business rules and external integrations from API routes.",
    ],
  },
  {
    id: "ham10000",
    name: "HAM10000 Skin Lesion Classifier",
    summary:
      "A deep-learning image classification project that classifies skin lesion images into seven categories.",
    lead: "Machine learning and image analysis project.",
    tags: ["Machine learning", "Image analysis"],
    github: "https://github.com/quintawsusan/HAM10000-skin-lesion-classifier",
    stack: [
      { label: "Languages", items: ["Python", "Jupyter Notebook"] },
      {
        label: "Machine learning",
        items: ["EfficientNetB0", "Transfer Learning", "Image Augmentation"],
      },
      { label: "Interface", items: ["Streamlit"] },
    ],
    bullets: [
      "Developed a deep-learning image classification pipeline using transfer learning to classify dermatoscopic images into seven predefined categories.",
      "Prepared and validated image data and metadata, performed data sanity checks, and implemented preprocessing and image augmentation to support consistent model training.",
      "Implemented lesion-level training, validation, and test splits using lesion_id to reduce data leakage and support more reliable model evaluation.",
      "Evaluated model performance using precision, recall, F1-score, and confusion matrices to examine classification errors across individual classes.",
      "Built an interactive web application for image uploads, model predictions, class-probability displays, and uncertainty warnings.",
    ],
  },
];

export const toc = [
  { n: "01", title: "About me", page: 2, go: 0 },
  { n: "02", title: "How I think", page: 3, go: 1 },
  { n: "03", title: "Technical skills", page: 4, go: 1 },
  { n: "04", title: "How I approach a project", page: 6, go: 2 },
  { n: "05", title: "Vuka", page: 7, go: 3 },
  { n: "06", title: "Umucyo", page: 9, go: 4 },
  { n: "07", title: "Meal Q", page: 11, go: 5 },
  { n: "08", title: "HAM10000 Skin Lesion Classifier", page: 13, go: 6 },
  { n: "09", title: "What's next?", page: 15, go: 7 },
];

export const guide = {
  cover: "Keep scrolling and I'll open the book for you.",
  static: "Scroll down and I'll walk you through each page.",
  spreads: [
    "Let's start with who Quinta is and what drives her.",
    "Here's how Quinta thinks and her technical skills.",
    "Here is how Quinta approaches problems and keeps learning.",
    "Let's begin with Vuka, a career and learning platform.",
    "Now let's explore Umucyo, an IoT-enabled tea cooperative platform.",
    "Meal Q is another project Quinta has built.",
    "Quinta has explored machine learning too.",
    "Thanks for reading!",
  ],
};
