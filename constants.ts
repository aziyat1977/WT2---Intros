import { StaticTopic } from "./types";

export const UI_LABELS = {
  en: {
    start: "Start Lesson",
    module: "Module",
    xp: "XP",
    level: "Level",
    tap: "Tap to advance",
    correct: "Correct",
    reveal: "Reveal Answers",
    continue: "Continue Journey",
    option: "Option"
  },
  ru: {
    start: "Начать урок",
    module: "Модуль",
    xp: "Опыт",
    level: "Уровень",
    tap: "Нажмите для продолжения",
    correct: "Верно",
    reveal: "Показать ответы",
    continue: "Продолжить",
    option: "Вариант"
  },
  uz: {
    start: "Darsni boshlash",
    module: "Modul",
    xp: "XP",
    level: "Daraja",
    tap: "Davom etish uchun bosing",
    correct: "To'g'ri",
    reveal: "Javoblarni ko'rsatish",
    continue: "Davom etish",
    option: "Variant"
  }
};

export const STATIC_TOPICS: StaticTopic[] = [
  {
    id: 1,
    year: "2025 High Probability",
    topicTitle: "Media & Censorship",
    prompt: "Some people believe that news coverage of violent crimes should be restricted to prevent public fear and copycat behavior. Others argue that full reporting is necessary for public safety. Discuss both views and give your own opinion.",
    specificQuestion: "Hide violence to stop fear? OR Show violence to keep us safe?",
    theTrap: "Writing generally about 'Fake News' or 'Corruption'.",
    logicMap: {
      viewA: "Too much detail = Panic → 'Copycat' criminals imitate what they see.",
      viewB: "Awareness = Preparation → If we know the danger, we can avoid it.",
      position: "Transparency is vital, but graphic/bloody details are unnecessary."
    },
    introduction: "It is often argued that media outlets should limit the details of violent crimes to avoid **inciting** unnecessary panic or encouraging potential criminals. However, others insist that **transparent** reporting is essential for maintaining community safety. While I accept that **sensationalizing** violence is harmful, I believe that the public has a right to be informed about potential threats in their **vicinity**.",
    practice: {
      logic: {
        question: "What is the specific function of the phrase \"While I accept that...\" in the Thesis Statement?",
        options: ["It introduces a concession.", "It states the main argument.", "It gives a specific example."],
        answer: "It introduces a concession.",
        explanation: "It acknowledges the opposing view ('sensationalism is bad') before stating the writer's main opinion ('transparency is vital')."
      },
      trap: {
        question: "Which argument below would be OFF-TOPIC for this specific prompt?",
        options: ["The media often spreads fake news for political reasons.", "Copycat behavior is a real psychological risk.", "Detailed reporting helps people prepare."],
        answer: "The media often spreads fake news for political reasons.",
        explanation: "This prompt is about VIOLENCE and FEAR, not political truth."
      },
      gap: {
        textParts: [
          "It is argued that media should limit details to avoid ",
          " panic. However, others insist that ",
          " reporting is essential. While I accept that ",
          " violence is harmful, the public must know about threats in their ",
          "."
        ],
        answers: ["Inciting", "Transparent", "Sensationalizing", "Vicinity"]
      },
      vocab: {
        question: "Match the word \"Vicinity\" to its definition.",
        options: ["The area near or surrounding a particular place.", "A dangerous situation.", "A type of transparent material."],
        answer: "The area near or surrounding a particular place."
      }
    },
    translations: {
      ru: {
        topicTitle: "СМИ и Цензура",
        prompt: "Некоторые считают, что освещение насильственных преступлений следует ограничивать, чтобы предотвратить страх. Другие утверждают, что полная отчетность необходима для безопасности.",
        theTrap: "Писать обобщенно о 'Фейковых новостях' или 'Коррупции'.",
        specificQuestion: "Скрывать насилие, чтобы остановить страх? ИЛИ Показывать насилие ради безопасности?",
        logicMap: {
          viewA: "Слишком много деталей = Паника → Преступники-подражатели.",
          viewB: "Осведомленность = Подготовка → Зная опасность, мы можем ее избежать.",
          position: "Прозрачность важна, но кровавые детали не нужны."
        },
        lines: {
          "The Invisible Work": "Невидимая Работа",
          "2025 Edition": "Издание 2025",
          "Analyze Prompt": "Анализ Темы",
          "Most students write:": "Большинство пишут:",
          "This limits you to Band 6.0.": "Это ограничивает вас баллом 6.0.",
          "Stop writing.": "Перестаньте писать.",
          "Start thinking.": "Начните думать.",
          "Find the specific question.": "Найдите конкретный вопрос.",
          "Specific Question": "Конкретный Вопрос",
          "View A": "Мнение А",
          "View B": "Мнение Б",
          "My Position": "Моя Позиция",
          "Surgical Introduction": "Хирургическое Введение",
          "Thesis": "Тезис",
          "Development": "Развитие"
        }
      },
      uz: {
        topicTitle: "OAV va Senzura",
        prompt: "Ba'zilar zo'ravonlik jinoyatlarini yoritishni cheklash kerak deb hisoblaydilar. Boshqalar esa to'liq xabar berish xavfsizlik uchun zarur deb bahslashadilar.",
        theTrap: "'Soxta yangiliklar' yoki 'Korruptsiya' haqida umumiy yozish.",
        specificQuestion: "Qo'rquvni to'xtatish uchun zo'ravonlikni yashirish kerakmi? YOKI Xavfsizlik uchun ko'rsatish kerakmi?",
        logicMap: {
          viewA: "Juda ko'p tafsilot = Vahima → Jinoyatchilar taqlid qiladi.",
          viewB: "Xabardorlik = Tayyorgarlik → Xavfni bilsak, undan qochishimiz mumkin.",
          position: "Shaffoflik muhim, ammo qonli tafsilotlar kerak emas."
        },
        lines: {
          "The Invisible Work": "Ko'rinmas Ish",
          "2025 Edition": "2025 Nashri",
          "Analyze Prompt": "Mavzuni Tahlil Qilish",
          "Most students write:": "Ko'pchilik talabalar yozadi:",
          "This limits you to Band 6.0.": "Bu sizni 6.0 ball bilan cheklaydi.",
          "Stop writing.": "Yozishni to'xtating.",
          "Start thinking.": "O'ylashni boshlang.",
          "Find the specific question.": "Aniq savolni toping.",
          "Specific Question": "Aniq Savol",
          "View A": "A Qarash",
          "View B": "B Qarash",
          "My Position": "Mening Pozitsiyam",
          "Surgical Introduction": "Jarrohlik Kirish",
          "Thesis": "Tezis",
          "Development": "Rivojlanish"
        }
      }
    }
  },
  {
    id: 2,
    year: "Economic Focus",
    topicTitle: "Business & Ethics",
    prompt: "Large companies should pay CEOs and executives much higher salaries than other workers. To what extent do you agree or disagree?",
    specificQuestion: "Is the massive pay gap justified by the market?",
    theTrap: "An emotional rant about 'fairness' without business logic.",
    logicMap: {
      viewA: "High Risk/Stress → One bad decision destroys the company → Talent war.",
      viewB: "Demotivates staff → Creates social inequality → Success is a team effort.",
      position: "Higher pay is okay, but the current gap is excessive."
    },
    introduction: "In the corporate world, it is common practice for senior executives to receive **remuneration** packages that are vastly superior to those of the average employee. While I agree that the immense responsibility of these roles **warrants** higher pay, I disagree that the current **disparity** found in many large corporations is ethically or economically **justifiable**.",
    practice: {
      logic: {
        question: "Does the writer agree or disagree with high salaries?",
        options: ["A balanced view (Yes to higher pay, No to huge gap).", "Completely agrees with high salaries.", "Completely disagrees with high salaries."],
        answer: "A balanced view (Yes to higher pay, No to huge gap).",
        explanation: "Agrees they deserve higher pay, but disagrees with the extent (the huge gap)."
      },
      trap: {
        question: "Why is writing \"CEOs are greedy and evil\" a Band 6.0 mistake?",
        options: ["It is emotional and generalized.", "It is too specific.", "It uses incorrect grammar."],
        answer: "It is emotional and generalized.",
        explanation: "You must analyze the economic justification, not just judge the character of people."
      },
      gap: {
        textParts: [
          "Executives receive ",
          " packages superior to others. While responsibility ",
          " higher pay, the current ",
          " is not economically ",
          "."
        ],
        answers: ["Remuneration", "Warrants", "Disparity", "Justifiable"]
      },
      vocab: {
        question: "Match the word \"Remuneration\" to its definition.",
        options: ["Money paid for work or a service (formal).", "A feeling of respect.", "The act of firing someone."],
        answer: "Money paid for work or a service (formal)."
      }
    }
  },
  {
    id: 3,
    year: "Urbanization",
    topicTitle: "Environment vs Housing",
    prompt: "In many countries, there is a shortage of housing in cities. Some people argue that new towns should be built in the countryside to solve this. Do the advantages of this outweigh the disadvantages?",
    specificQuestion: "Is building in the country a net positive solution for the housing crisis?",
    theTrap: "Focusing only on 'Saving Trees' and forgetting 'Housing'.",
    logicMap: {
      viewA: "Immediate relief for overcrowding → Cheaper land costs.",
      viewB: "Irreversible habitat destruction → Loss of food/farm land → Increased commute/traffic.",
      position: "Environmental cost is too high; build up (skyscrapers) instead."
    },
    introduction: "To address the **chronic** lack of accommodation in urban centers, it has been suggested that governments should construct new residential areas in rural zones. In my view, although this **strategy** offers immediate relief for city overcrowding, the long-term environmental **degradation** and loss of agricultural land mean that the disadvantages are far more **significant**.",
    practice: {
      logic: {
        question: "What is the writer's \"Thesis Statement\" doing here?",
        options: ["It clearly outweighs the advantages.", "It says advantages and disadvantages are equal.", "It does not give an opinion."],
        answer: "It clearly outweighs the advantages.",
        explanation: "It admits one benefit (relief) but states two major negatives (environment + agriculture)."
      },
      trap: {
        question: "True or False: You should spend a paragraph describing different types of pollution (air, water, noise).",
        options: ["False. Focus on housing logic.", "True. Environmental essays need pollution lists."],
        answer: "False. Focus on housing logic.",
        explanation: "This is a housing essay. You only discuss pollution IF it results from building the new towns."
      },
      gap: {
        textParts: [
          "To address the ",
          " lack of accommodation, a new ",
          " is suggested. Although it offers relief, the environmental ",
          " means disadvantages are ",
          "."
        ],
        answers: ["Chronic", "Strategy", "Degradation", "Significant"]
      },
      vocab: {
        question: "Match the word \"Chronic\" to its definition.",
        options: ["(Of a problem) persisting for a long time or constantly recurring.", "A severe illness.", "Something temporary."],
        answer: "(Of a problem) persisting for a long time or constantly recurring."
      }
    }
  },
  {
      id: 4,
      year: "Modern Tech",
      topicTitle: "Technology & Art",
      prompt: "With the rise of artificial intelligence, computers are now creating art, music, and literature. Some people think this is a negative development. To what extent do you agree or disagree?",
      specificQuestion: "Is AI in creative fields bad?",
      theTrap: "Talking about robots in factories. Stick to ART.",
      logicMap: {
          viewA: "Art requires a soul/emotion → AI only mimics patterns → Devalues human skill.",
          viewB: "It is a tool to help non-artists create.",
          position: "It is negative. It threatens livelihoods and lacks authenticity."
      },
      introduction: "The **capability** of artificial intelligence to generate complex works of art, music, and writing has sparked intense debate regarding the value of human creativity. I strongly agree that this is a negative development, as it not only **undermines** the **livelihoods** of professional artists but also floods the market with content **devoid** of genuine human emotion.",
      practice: {
        logic: {
          question: "How many main ideas does the Thesis Statement promise to discuss?",
          options: ["Two: Economic impact & Artistic quality.", "One: Technology is bad.", "Three: Jobs, Money, and Computers."],
          answer: "Two: Economic impact & Artistic quality.",
          explanation: "1. Economic impact (undermines livelihoods) and 2. Artistic quality (devoid of emotion)."
        },
        trap: {
          question: "Which example is best to use in Body Paragraph 1?",
          options: ["Graphic designers losing jobs to tools like Midjourney.", "Robots building cars in factories.", "AI controlling nuclear weapons."],
          answer: "Graphic designers losing jobs to tools like Midjourney.",
          explanation: "This is relevant to Art/Livelihood. Do not talk about factory robots."
        },
        gap: {
          textParts: [
            "The ",
            " of AI to create art is debated. This ",
            " the ",
            " of artists and creates content ",
            " of emotion."
          ],
          answers: ["Capability", "Undermines", "Livelihoods", "Devoid"]
        },
        vocab: {
          question: "Match the word \"Devoid\" to its definition.",
          options: ["Entirely lacking or free from.", "Full of something.", "To destroy completely."],
          answer: "Entirely lacking or free from."
        }
      }
  },
  {
      id: 5,
      year: "Global Issues",
      topicTitle: "Space Debris",
      prompt: "The increasing frequency of satellite launches and space missions is leading to a buildup of dangerous debris in orbit. Who should be responsible for clearing this waste: the companies that launched them, or international governments?",
      specificQuestion: "WHO cleans the trash? Company vs Government.",
      theTrap: "Discussing 'Is space travel good?'. Focus on LIABILITY.",
      logicMap: {
          viewA: "'Polluter pays' principle → They make the profit, they pay the cost.",
          viewB: "Space is shared territory → Governments must enforce the laws.",
          position: "Governments make the rules; Companies pay the bill."
      },
      introduction: "As commercial and state-sponsored space missions multiply, the **accumulation** of space debris has become a critical hazard. The question of **liability** for removing this waste is complex. I believe that while governments must establish the regulatory **framework**, the financial and physical responsibility for cleanup should **ultimately** fall upon the organizations and corporations profiting from these launches.",
      practice: {
        logic: {
          question: "Who does the writer identify as the primary actors?",
          options: ["Governments (Rules) & Corporations (Money).", "Only Governments.", "Only Corporations."],
          answer: "Governments (Rules) & Corporations (Money).",
          explanation: "Governments (for rules) and Corporations (for money/cleanup). It is a dual-responsibility approach."
        },
        trap: {
          question: "Which sentence should you DELETE from your plan?",
          options: ["Space exploration is a waste of money that should be spent on Earth.", "Companies should pay because they profit.", "Governments control the laws."],
          answer: "Space exploration is a waste of money that should be spent on Earth.",
          explanation: "Off-topic. The prompt assumes space launches are happening; the question is about cleaning the debris."
        },
        gap: {
          textParts: [
            "The ",
            " of debris is a hazard. The question of ",
            " is complex. While governments create the ",
            ", the cost should ",
            " fall on corporations."
          ],
          answers: ["Accumulation", "Liability", "Framework", "Ultimately"]
        },
        vocab: {
          question: "Match the word \"Liability\" to its definition.",
          options: ["The state of being responsible by law.", "The ability to lie.", "A heavy weight."],
          answer: "The state of being responsible by law."
        }
      }
  }
];