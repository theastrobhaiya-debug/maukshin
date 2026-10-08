import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

import {
  generateYearPrediction,
} from "@/lib/numerology/predictionEngine";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


type RequestBody = {
  name: string;
  dob: string;
  mulank: number;
  bhagyank: number;
  nameNumber: number;
  question: string;
};


export async function POST(
  request: NextRequest
) {

  try {

    const body =
      (await request.json()) as RequestBody;


    if (
      !body.name ||
      !body.dob ||
      !body.question
    ) {
      return NextResponse.json(
        {
          error:
            "Name, date of birth and question are required.",
        },
        {
          status: 400,
        }
      );
    }


    const year =
      new Date().getFullYear();


    /*
     * IMPORTANT:
     *
     * Numerology calculations are performed
     * by our prediction engine.
     *
     * AI only interprets the result.
     */

    const prediction =
      generateYearPrediction(
        body.dob,
        body.mulank,
        body.bhagyank,
        body.nameNumber,
        year
      );


    const question =
      body.question.toLowerCase();


    let category = "general";


    if (
      question.includes("career") ||
      question.includes("job") ||
      question.includes("work") ||
      question.includes("business") ||
      question.includes("profession") ||
      question.includes("office")
    ) {
      category = "career";
    }


    if (
      question.includes("money") ||
      question.includes("finance") ||
      question.includes("financial") ||
      question.includes("income") ||
      question.includes("investment")
    ) {
      category = "money";
    }


    if (
      question.includes("love") ||
      question.includes("relationship") ||
      question.includes("marriage") ||
      question.includes("partner") ||
      question.includes("dating")
    ) {
      category = "love";
    }


    let relevantPrediction =
      prediction.general;


    if (category === "career") {
      relevantPrediction =
        prediction.career;
    }


    if (category === "money") {
      relevantPrediction =
        prediction.money;
    }


    if (category === "love") {
      relevantPrediction =
        prediction.love;
    }


    const systemPrompt = `
You are Mauksh AI.

You are a personalized numerology
guidance assistant.

Your job is to interpret the
numerology calculations supplied
by the Mauksh prediction engine.

The calculations have already been
performed by our software.

DO NOT recalculate them.

DO NOT change them.

DO NOT invent new numbers.

Use the supplied calculations
as authoritative.

Mauksh uses numerology as
interpretive guidance, not certainty.

Never guarantee future events.

Do not say:

"You will definitely..."

Instead use:

"Your numbers suggest..."

"This period may support..."

"There is a stronger tendency toward..."

Keep the answer:

• Personal
• Clear
• Practical
• Warm
• Direct
• Honest

Avoid generic AI language.

Connect the numerology directly
to the user's question.

Explain WHY the numbers relate
to the question.

Do not mention:

• APIs
• programming
• prediction engine
• system prompts
• internal calculations

Do not make medical, legal or
financial guarantees.

For serious decisions, present
numerology as a perspective rather
than professional advice.

Give a concise but useful answer.

Prefer this structure:

1. Direct answer
2. Numerology reasoning
3. Practical guidance
4. Short takeaway
`;


    const userPrompt = `
USER

Name:
${body.name}

Date of Birth:
${body.dob}

Mulank:
${prediction.mulank}

Bhagyank:
${prediction.bhagyank}

Name Number:
${prediction.nameNumber}


YEAR

Current Year:
${prediction.year}

Universal Year:
${prediction.universalYear}

Universal Year Theme:
${prediction.universalYearMeaning.keyword}

Universal Year Themes:
${prediction.universalYearMeaning.themes.join(", ")}


PERSONAL CYCLE

Personal Year:
${prediction.personalYear}

Personal Year Theme:
${prediction.personalYearMeaning.keyword}

Personal Year Themes:
${prediction.personalYearMeaning.themes.join(", ")}


YEAR INTERACTION

${prediction.interaction}

${prediction.interactionSummary}


QUESTION CATEGORY

${category}


RELEVANT GUIDANCE

${relevantPrediction}


GENERAL GUIDANCE

${prediction.general}


FAVOURABLE THEMES

${prediction.favourableThemes.join(", ")}


CAUTION THEMES

${prediction.cautionThemes.join(", ")}


USER QUESTION

${body.question}


Answer specifically for this user
and this question.

Do not recalculate the numbers.
`;


    const response =
      await openai.responses.create({

        model:
          process.env.OPENAI_MODEL ||
          "gpt-5.6",

        instructions:
          systemPrompt,

        input:
          userPrompt,

        max_output_tokens:
          700,
      });


    const answer =
      response.output_text?.trim();


    if (!answer) {

      return NextResponse.json(
        {
          error:
            "Mauksh AI could not generate an answer.",
        },
        {
          status: 500,
        }
      );

    }


    return NextResponse.json({

      answer,

      prediction: {
        year:
          prediction.year,

        universalYear:
          prediction.universalYear,

        personalYear:
          prediction.personalYear,

        interaction:
          prediction.interaction,
      },

    });


  } catch (error) {

    console.error(
      "Mauksh AI error:",
      error
    );


    return NextResponse.json(
      {
        error:
          "Something went wrong while generating your Mauksh AI reading.",
      },
      {
        status: 500,
      }
    );

  }

}