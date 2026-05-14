import OpenAI from "openai";

import { NextResponse } from "next/server";

const groq = new OpenAI({
    apiKey:
        process.env.GROQ_API_KEY,

    baseURL:
        "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {

    let destination = "Unknown";
    let budget = "Comfort";

    try {

        const body = await req.json();

        destination =
            body.destination || "Unknown";

        budget =
            body.budget || "Comfort";

        const {
            duration,
            interests,
            travelType,
            notes,
        } = body;

        const totalDays =
  typeof duration === "number"
    ? duration
    : Number(
        String(duration)
          .match(/\d+/)?.[0]
      ) || 7;

        const prompt = `
Create a detailed AI travel itinerary.

Destination: ${destination}

Duration: ${totalDays} Days

- Generate EXACTLY ${totalDays} days
- The "days" array MUST contain EXACTLY ${totalDays} objects
- Do NOT generate fewer days
- Do NOT generate more days

Budget Category: ${budget}

Travel Type:
${travelType || "General"}

Interests:
${interests?.join(", ") || "General"}

Notes:
${notes || "None"}

IMPORTANT:
- Return ONLY valid JSON
- No markdown
- No explanations

JSON FORMAT:

{
  "title": "Trip title",

  "destination": "${destination}",

  "budget": "${budget}",

  "summary": "Trip summary",

  "days": [
    {
      "day": 1,

      "title": "Day title",

      "theme": "Culture",

      "activities": [
        {
          "name": "Activity",

          "description": "Description",

          "time": "10:00 AM",

          "duration": "2 Hours",

          "cost": "$20",

          "type": "Sightseeing"
        }
      ],

      "transportation": {
        "mode": "Taxi",

        "cost": "$10"
      }
    }
  ]
}
`;

        const completion =
            await groq.chat.completions.create({
                model:
                    "llama-3.3-70b-versatile",

                messages: [
                    {
                        role: "system",

                        content:
                            "You are a professional AI travel planner.",
                    },

                    {
                        role: "user",

                        content: prompt,
                    },
                ],

                temperature: 0.7,
            });

        const content =
            completion.choices[0]
                ?.message?.content;

        if (!content) {

            throw new Error(
                "No AI response"
            );
        }

        const cleaned =
            content
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

        const jsonStart =
            cleaned.indexOf("{");

        const jsonEnd =
            cleaned.lastIndexOf("}");

        const jsonString =
            cleaned.slice(
                jsonStart,
                jsonEnd + 1
            );

        const parsed =
            JSON.parse(jsonString);

        // FORCE EXACT DAYS COUNT
        if (
            Array.isArray(parsed.days)
        ) {

            // TRIM EXTRA DAYS
            parsed.days =
                parsed.days.slice(
                    0,
                    totalDays
                );

            // ADD MISSING DAYS
            while (
                parsed.days.length <
                totalDays
            ) {

                const nextDay =
                    parsed.days.length + 1;

                parsed.days.push({
                    day: nextDay,

                    title:
                        `Day ${nextDay}`,

                    theme:
                        "Exploration",

                    activities: [
                        {
                            name:
                                "City Exploration",

                            description:
                                `Explore attractions in ${destination}.`,

                            time:
                                "10:00 AM",

                            duration:
                                "3 Hours",

                            cost:
                                "$50",

                            type:
                                "Sightseeing",
                        },
                    ],

                    transportation: {
                        mode:
                            "Taxi",

                        cost:
                            "$20",
                    },
                });
            }
        }

        return NextResponse.json(
            parsed,
            {
                status: 200,
            }
        );

    } catch (error: any) {

        console.error(
            "GROQ ERROR:",
            error
        );

        return NextResponse.json(
            {
                title:
                    `${destination} Adventure`,

                destination,

                budget,

                summary:
                    `Fallback itinerary for ${destination}`,

                days: Array.from({
                    length: totalDays,
                }).map((_, index) => ({
                    day: index + 1,

                    title:
                        `Day ${index + 1}`,

                    theme:
                        "Discovery",

                    activities: [
                        {
                            name:
                                "City Tour",

                            description:
                                `Explore attractions in ${destination}.`,

                            time:
                                "10:00 AM",

                            duration:
                                "3 Hours",

                            cost:
                                "$50",

                            type:
                                "Sightseeing",
                        },
                    ],

                    transportation: {
                        mode:
                            "Taxi",

                        cost:
                            "$20",
                    },
                })),
            },
            {
                status: 200,
            }
        );
    }
}