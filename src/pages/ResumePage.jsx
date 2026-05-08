import Seo from "../seo/Seo";
import { i18n } from "../i18n";


const content = {
  en: {
    name: "KCRich566",
    role: "Software Engineer",
    profileTitle: "Personal Profile",
    profile:
      "I am KCRich566, a software engineer currently responsible for designing and planning system integration and automation solutions. With over 10 years of experience in the industry, I have developed a strong expertise in machine vision, automation, and software development. I am passionate about leveraging technology to solve complex problems and drive innovation.",
    educationTitle: "Education",
    education: [
      "Master's Degree: Department of Electronic Engineering, National Kaohsiung University of Science and Technology (2013-2015)",
      "Bachelor's Degree: Department of Electronic Engineering, National Kaohsiung University of Science and Technology (2009-2013)",
    ],
    experienceTitle: "Experience",
    experiences: [
      {
        company: "Phoenix Technologies",
        url: "https://phoenixtech.com",
        role: "Software Designer",
        period: "2025-05-05 - Present",
        highlights: [
          "Collaborated with Microsoft platform engineering teams on hyperscale firmware validation",
          "Developed firmware validation automation using Python, Pytest and Robot Framework",
          "Maintained CI/CD pipelines using Azure DevOps",
          "Performed root cause analysis for platform reliability issues"
        ],
        achievements: [
          "Migrated manual testing workflows to automated validation frameworks",
          "Improved regression testing efficiency through automation scripts",
          "Implemented structured release validation workflows"
        ],
        tech: ["Python", "Pytest", "Robot Framework", "Azure DevOps", "C/C++", "Git"]
      },
      {
        company: "FutureDial Inc",
        url: "https://www.futuredial.com/",
        role: "Software Engineer",
        period: "2018-09-20 - 2025-04-30",
        highlights: [
          "Led AI inspection automation platform engineering",
          "Designed SMARTGrade inspection platform workflows",
          "Built image analysis and quality scoring pipelines",
          "Implemented adaptive threshold tuning systems"
        ],
        achievements: [
          "Achieved 99% classification accuracy in production workflows",
          "Reduced manual inspection workload through AI automation",
          "Supported global enterprise customer deployment"
        ],
        tech: ["C#", "Computer Vision", "CNN", "Deep Learning", "OpenCV", "Halcon", "Python"]
      },
      {
        company: "Xintec Inc",
        url: "https://www.xintec.com.tw/eng/IT/index.html",
        role: "Computer Vision Engineer",
        period: "2017-10-31 - 2018-06-15",
        highlights: [
          "Developed CNN-based semiconductor defect detection models",
          "Designed wafer alignment measurement algorithms",
          "Built vision inference modules for production inspection"
        ],
        tech: ["C#", "CNN", "YOLO", "Image Classification"]
      },
      {
        company: "Jettech Technology",
        url: "https://www.jettech.com.tw/index.php",
        role: "AOI Software Engineer",
        period: "2015-09-16 - 2017-09-26",
        highlights: [
          "Developed AOI machine control software",
          "Optimized optical inspection scanning performance",
          "Implemented machine vision control logic",
          "Supported production deployment of inspection equipment"
        ],
        tech: ["C++", "MFC", "OpenCV", "Halcon", "Python"]
      }
    ],
    skillsTitle: "Skills",
    skills: [
      "Programming Languages: C#, Python, C++",
      "Image Processing Libraries: OpenCV, Halcon, EEvision",
      "Machine Learning Frameworks: TensorFlow",
      "CI/CD Tools: Azure DevOps, github Actions",
      "Testing Frameworks: Pytest, Robot Framework, unittest",
      "Version Control: Git",
    ],
    languageTitle: "Languages",
    language: [
      "English: Advanced",
      "Chinese: Native",]
  },
  zh: {
    name: "KCRich566",
    role: "軟體工程師",
    profileTitle: "個人簡介",
    profile:
      "我是 KCRich566, 一位軟體工程師, 目前負責設計與規劃系統整合與自動化解決方案。在業界擁有超過 10 年的經驗, 專長於機器視覺、自動化與軟體開發。我熱衷於運用科技解決複雜問題並推動技術創新。",
    experienceTitle: "工作經歷",
    experiences: [
      {
        company: "Phoenix Technologies",
        url: "https://phoenixtech.com",
        role: "軟體設計師",
        period: "2025-05-05 - 至今",
        highlights: [
          "與 Microsoft 平台工程團隊合作進行超大規模韌體驗證",
          "使用 Python、Pytest 與 Robot Framework 開發韌體驗證自動化流程",
          "維護 Azure DevOps CI/CD 流程",
          "進行平台可靠性問題的根因分析"
        ],
        achievements: [
          "將人工測試流程遷移至自動化驗證框架",
          "透過自動化腳本提升回歸測試效率",
          "建立結構化的版本驗證流程"
        ],
        tech: ["Python", "Pytest", "Robot Framework", "Azure DevOps", "C/C++", "Git"]
      },
      {
        company: "FutureDial Inc",
        url: "https://www.futuredial.com/",
        role: "軟體工程師",
        period: "2018-09-20 - 2025-04-30",
        highlights: [
          "主導 AI 檢測自動化平台開發",
          "設計 SMARTGrade 檢測平台流程",
          "建立影像分析與品質評分管線",
          "實作自適應閾值調整系統"
        ],
        achievements: [
          "在生產環境達成 99% 分類準確率",
          "透過 AI 自動化降低人工檢測負擔",
          "支援全球企業客戶部署"
        ],
        tech: ["C#", "電腦視覺", "CNN", "深度學習", "OpenCV", "Halcon", "Python"]
      },
      {
        company: "Xintec Inc",
        url: "https://www.xintec.com.tw/eng/IT/index.html",
        role: "機器視覺工程師",
        period: "2017-10-31 - 2018-06-15",
        highlights: [
          "開發基於 CNN 的半導體缺陷檢測模型",
          "設計晶圓對位量測演算法",
          "建立生產檢測用視覺推論模組"
        ],
        tech: ["C#", "CNN", "YOLO", "影像分類", "影像切割", "演算法開發"]
      },
      {
        company: "Jettech Technology",
        url: "https://www.jettech.com.tw/index.php",
        role: "AOI 軟體工程師",
        period: "2015-09-16 - 2017-09-26",
        highlights: [
          "開發 AOI 機台控制軟體",
          "優化光學檢測掃描效能",
          "實作機器視覺控制邏輯",
          "支援檢測設備量產導入"
        ],
        tech: ["C++", "MFC", "OpenCV", "Halcon", "Python"]
      }
    ],
    skillsTitle: "技能",
    skills: [
      "程式語言: C#、Python、C++",
      "影像處理函式庫: OpenCV、Halcon、EEvision",
      "機器學習框架: TensorFlow",
      "CI/CD 工具: Azure DevOps、GitHub Actions",
      "測試框架: Pytest、Robot Framework、unittest",
      "版本控制: Git"
    ],
    languageTitle: "語言能力",
    language: [
      "英文: 進階",
      "中文: 母語"
    ],
    educationTitle: "學歷",
    education: [
      "碩士: 國立高雄科技大學 電子工程學系(2013-2015)",
      "學士: 國立高雄科技大學 電子工程學系(2009-2013)"
    ]
  }
};

export default function ResumePage({ locale }) {
  const t = i18n[locale];
  const c = content[locale];
  return (
    <>
      <Seo locale={locale} title={t.resume} description={t.homeDesc} path={`/${locale}/resume`} />
      <section className="text-center">
        <h1>{c.name}</h1>
        <h3>{c.role}</h3>
        <p>
          Email: <a href="mailto:KCRich566@gmail.com">KCRich566@gmail.com</a>
        </p>
      </section>
      <section>
        <h2>{c.profileTitle}</h2>
        <p>{c.profile}</p>
      </section>
      <section>
        <h2>{c.experienceTitle}</h2>
        {c.experiences.map((exp, index) => (
          <div key={index} style={{ marginBottom: "1.5rem" }}>
            <h3>
              <a href={exp.url} target="_blank" rel="noopener noreferrer">{exp.company}</a>
              {" - "}{exp.role}<small><em>({exp.period})</em></small>
            </h3>
            <ul>
              {exp.highlights.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            {exp.archievements && (
              <>
                <strong>{locale === "zh" ? "成就: " : "Archievements: "}</strong>
                <ul>
                  {exp.achievements.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </>
            )}
            <p><strong>Tech: </strong>{exp.tech.join(", ")}</p>
          </div>
        ))}
      </section>
      <section>
        <h2>{c.skillsTitle}</h2>
        <ul>
          {c.skills.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>{c.languageTitle}</h2>
        <ul>
          {c.language.map((item, index) => (<li key={index}>{item}</li>))}
        </ul>
      </section>
      <section>
        <h2>{c.educationTitle}</h2>
        <ul>
          {c.education.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
