// lib/numerology/predictionEngine.ts

export type NumberMeaning = {
  keyword: string;
  themes: string[];
  career: string;
  money: string;
  love: string;
  general: string;
};

export type PredictionResult = {
  year: number;

  universalYear: number;
  personalYear: number;

  mulank: number;
  bhagyank: number;
  nameNumber: number;

  universalYearMeaning: NumberMeaning;
  personalYearMeaning: NumberMeaning;

  interaction:
    | "supportive"
    | "neutral"
    | "challenging";

  interactionSummary: string;

  career: string;
  money: string;
  love: string;
  general: string;

  favourableThemes: string[];
  cautionThemes: string[];
};


/* =========================================================
   BASIC NUMBER REDUCTION
   ========================================================= */

export function reduceNumber(
  value: number
): number {
  while (value > 9) {
    value = String(value)
      .split("")
      .reduce(
        (sum, digit) =>
          sum + Number(digit),
        0
      );
  }

  return value;
}


/* =========================================================
   UNIVERSAL YEAR
   =========================================================

   Example:

   2026
   2 + 0 + 2 + 6
   = 10
   = 1
*/

export function getUniversalYear(
  year: number
): number {
  return reduceNumber(
    String(year)
      .split("")
      .reduce(
        (sum, digit) =>
          sum + Number(digit),
        0
      )
  );
}


/* =========================================================
   PERSONAL YEAR
   =========================================================

   Personal Year =
   Birth Day + Birth Month + Universal Year

   Example:

   15/08
   15 → 6
   08 → 8
   2026 → 1

   6 + 8 + 1
   = 15
   = 6
*/

export function getPersonalYear(
  dob: string,
  year: number
): number {

  const parts = dob.split("-");

  if (parts.length !== 3) {
    throw new Error(
      "DOB must be YYYY-MM-DD"
    );
  }

  const month = Number(parts[1]);
  const day = Number(parts[2]);

  const universalYear =
    getUniversalYear(year);

  return reduceNumber(
    reduceNumber(day) +
      reduceNumber(month) +
      universalYear
  );
}


/* =========================================================
   NUMBER MEANINGS
   ========================================================= */

export const NUMBER_MEANINGS: Record<
  number,
  NumberMeaning
> = {

  1: {
    keyword: "Initiation",
    themes: [
      "new beginnings",
      "independence",
      "leadership",
      "initiative",
      "self-confidence"
    ],
    career:
      "A cycle associated with starting, leading and taking initiative.",
    money:
      "Favors building new income directions and taking ownership of financial decisions.",
    love:
      "Encourages independence and clarity about what you personally want.",
    general:
      "A beginning-oriented energy that favors initiative and personal direction."
  },


  2: {
    keyword: "Partnership",
    themes: [
      "relationships",
      "cooperation",
      "patience",
      "diplomacy",
      "emotional awareness"
    ],
    career:
      "Favors collaboration, partnerships and situations requiring diplomacy.",
    money:
      "Financial progress may benefit from cooperation rather than acting completely alone.",
    love:
      "Relationships, emotional understanding and partnership become more important.",
    general:
      "A slower, more receptive energy that rewards patience and cooperation."
  },


  3: {
    keyword: "Expression",
    themes: [
      "communication",
      "creativity",
      "social connection",
      "visibility",
      "learning"
    ],
    career:
      "Favors communication, creativity, networking and putting your ideas in front of people.",
    money:
      "Income can be connected with communication, creativity or social opportunities.",
    love:
      "Encourages openness, communication and enjoyable social experiences.",
    general:
      "An expressive cycle emphasizing communication, creativity and visibility."
  },


  4: {
    keyword: "Structure",
    themes: [
      "discipline",
      "planning",
      "systems",
      "hard work",
      "foundation"
    ],
    career:
      "Favors building systems, improving processes and creating a stronger foundation.",
    money:
      "Budgeting, consistency and disciplined financial planning are emphasized.",
    love:
      "Relationships may require reliability, patience and practical effort.",
    general:
      "A foundation-building energy that rewards consistency more than shortcuts."
  },


  5: {
    keyword: "Change",
    themes: [
      "freedom",
      "movement",
      "change",
      "experimentation",
      "adaptability"
    ],
    career:
      "Favors experimentation, movement, new experiences and adapting to changing opportunities.",
    money:
      "Financial circumstances may become more dynamic, so flexibility is important.",
    love:
      "Relationships may seek more freedom, novelty and honest communication.",
    general:
      "A dynamic cycle where flexibility and adaptability become important."
  },


  6: {
    keyword: "Responsibility",
    themes: [
      "family",
      "relationships",
      "responsibility",
      "stability",
      "commitment"
    ],
    career:
      "Favors responsibility, management, service and creating greater stability.",
    money:
      "Encourages responsible financial decisions and strengthening long-term stability.",
    love:
      "Relationships, commitment, family and emotional responsibility become prominent.",
    general:
      "A responsibility-oriented cycle focused on stability and meaningful commitments."
  },


  7: {
    keyword: "Reflection",
    themes: [
      "introspection",
      "research",
      "learning",
      "spirituality",
      "analysis"
    ],
    career:
      "Favors research, specialization, learning and stepping back to understand direction.",
    money:
      "Encourages careful analysis rather than impulsive financial decisions.",
    love:
      "May create a stronger need for emotional space, reflection and deeper understanding.",
    general:
      "A reflective cycle that favors learning, analysis and inner clarity."
  },


  8: {
    keyword: "Achievement",
    themes: [
      "power",
      "management",
      "ambition",
      "results",
      "material progress"
    ],
    career:
      "Favors leadership, management, responsibility and measurable professional results.",
    money:
      "Strong focus on financial organization, material goals and long-term results.",
    love:
      "Power dynamics and practical responsibilities may become more noticeable.",
    general:
      "An achievement-oriented energy emphasizing responsibility and tangible results."
  },


  9: {
    keyword: "Completion",
    themes: [
      "closure",
      "release",
      "completion",
      "wisdom",
      "transition"
    ],
    career:
      "Favors completing existing cycles and deciding what should be released before the next beginning.",
    money:
      "Encourages clearing unfinished financial matters and avoiding unnecessary attachment.",
    love:
      "Old emotional patterns or relationships may require closure and understanding.",
    general:
      "A completion-oriented cycle that prepares the ground for a new phase."
  }
};


/* =========================================================
   UNIVERSAL ↔ PERSONAL YEAR INTERACTION
   ========================================================= */

function getInteraction(
  universalYear: number,
  personalYear: number
):
  | "supportive"
  | "neutral"
  | "challenging" {

  if (
    universalYear === personalYear
  ) {
    return "supportive";
  }

  const supportivePairs = [
    [1, 3],
    [1, 5],
    [1, 8],

    [2, 4],
    [2, 6],

    [3, 1],
    [3, 5],
    [3, 6],

    [4, 2],
    [4, 6],
    [4, 8],

    [5, 1],
    [5, 3],
    [5, 7],

    [6, 2],
    [6, 3],
    [6, 4],

    [7, 5],
    [7, 9],

    [8, 1],
    [8, 4],
    [8, 6],

    [9, 7],
    [9, 2]
  ];

  const isSupportive =
    supportivePairs.some(
      ([a, b]) =>
        a === universalYear &&
        b === personalYear
    );

  if (isSupportive) {
    return "supportive";
  }


  const challengingPairs = [
    [1, 6],
    [1, 7],

    [2, 5],
    [2, 8],

    [4, 5],
    [4, 9],

    [5, 2],
    [5, 4],

    [6, 1],
    [6, 5],

    [7, 1],
    [7, 8],

    [8, 2],
    [8, 7],

    [9, 4]
  ];

  const isChallenging =
    challengingPairs.some(
      ([a, b]) =>
        a === universalYear &&
        b === personalYear
    );

  if (isChallenging) {
    return "challenging";
  }

  return "neutral";
}


/* =========================================================
   INTERACTION EXPLANATION
   ========================================================= */

function getInteractionSummary(
  universalYear: number,
  personalYear: number,
  interaction:
    | "supportive"
    | "neutral"
    | "challenging"
): string {

  const universal =
    NUMBER_MEANINGS[universalYear];

  const personal =
    NUMBER_MEANINGS[personalYear];


  if (interaction === "supportive") {
    return (
      `The Universal Year carries ${universal.keyword.toLowerCase()} ` +
      `energy while your Personal Year carries ${personal.keyword.toLowerCase()} ` +
      `energy. These themes can work relatively well together, so the broader ` +
      `yearly environment can support your personal cycle when you act consistently.`
    );
  }


  if (interaction === "challenging") {
    return (
      `The Universal Year emphasizes ${universal.keyword.toLowerCase()} ` +
      `while your Personal Year emphasizes ${personal.keyword.toLowerCase()}. ` +
      `The two energies can create tension, meaning timing, patience and conscious ` +
      `decision-making become more important.`
    );
  }


  return (
    `The Universal Year emphasizes ${universal.keyword.toLowerCase()} ` +
    `while your Personal Year emphasizes ${personal.keyword.toLowerCase()}. ` +
    `These energies are neither strongly aligned nor strongly conflicting, ` +
    `so your results depend more heavily on how you work with your personal cycle.`
  );
}


/* =========================================================
   COMBINE PREDICTIONS
   ========================================================= */

function getCombinedPrediction(
  personalYear: number,
  universalYear: number,
  interaction:
    | "supportive"
    | "neutral"
    | "challenging"
) {

  const personal =
    NUMBER_MEANINGS[personalYear];

  const universal =
    NUMBER_MEANINGS[universalYear];


  let career =
    personal.career;

  let money =
    personal.money;

  let love =
    personal.love;

  let general =
    personal.general;


  if (
    interaction === "supportive"
  ) {

    career +=
      ` The broader ${universalYear} year also supports ${universal.themes.slice(0, 2).join(" and ")}.`;

    money +=
      ` The wider yearly energy can help when financial decisions are connected with constructive new direction.`;

    love +=
      ` The overall year can support this theme when you remain clear about your priorities.`;

    general +=
      ` The Universal Year adds ${universal.themes.slice(0, 2).join(" and ")} to the background.`;

  }


  if (
    interaction === "challenging"
  ) {

    career +=
      ` Because the Universal Year carries ${universal.keyword.toLowerCase()} energy, avoid forcing decisions before the timing and practical details are clear.`;

    money +=
      ` The different yearly influences suggest avoiding unnecessary financial risks and keeping decisions measured.`;

    love +=
      ` Different priorities may become noticeable, so communication and patience are particularly useful.`;

    general +=
      ` The interaction suggests working consciously with the difference between your personal cycle and the wider yearly energy.`;

  }


  return {
    career,
    money,
    love,
    general
  };
}


/* =========================================================
   MAIN PREDICTION FUNCTION
   ========================================================= */

export function generateYearPrediction(
  dob: string,
  mulank: number,
  bhagyank: number,
  nameNumber: number,
  year: number
): PredictionResult {

  const universalYear =
    getUniversalYear(year);

  const personalYear =
    getPersonalYear(
      dob,
      year
    );

  const interaction =
    getInteraction(
      universalYear,
      personalYear
    );

  const interactionSummary =
    getInteractionSummary(
      universalYear,
      personalYear,
      interaction
    );

  const combined =
    getCombinedPrediction(
      personalYear,
      universalYear,
      interaction
    );


  const universalMeaning =
    NUMBER_MEANINGS[
      universalYear
    ];

  const personalMeaning =
    NUMBER_MEANINGS[
      personalYear
    ];


  return {

    year,

    universalYear,

    personalYear,

    mulank,

    bhagyank,

    nameNumber,

    universalYearMeaning:
      universalMeaning,

    personalYearMeaning:
      personalMeaning,

    interaction,

    interactionSummary,

    career:
      combined.career,

    money:
      combined.money,

    love:
      combined.love,

    general:
      combined.general,

    favourableThemes: [
      ...personalMeaning.themes,
      ...universalMeaning.themes
    ].filter(
      (value, index, array) =>
        array.indexOf(value) === index
    ),

    cautionThemes: [
      interaction === "challenging"
        ? "Avoid impulsive decisions"
        : "Avoid ignoring practical details",

      "Use timing alongside intuition",

      "Do not treat numerology as certainty"
    ]
  };
}