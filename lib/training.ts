import { NextResponse } from "next/server";
import { db } from "./db";

export const training = async (examples_data) => {
  try {
    const training = await db.model.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/tunedModels",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GOOGLE_ACCESS_TOKEN}`,
          "x-goog-user-project": process.env.GOOGLE_PROJECT_ID,
        },
        body: JSON.stringify({
          display_name: "modèle d'information sur les villes",
          base_model: "models/gemini-1.0-pro-001",
          tuning_task: {
            hyperparameters: {
              batch_size: 2,
              learning_rate: 0.001,
              epoch_count: 5,
            },
            training_data: {
              examples: {
                examples: training.trainingData,
              },
            },
          },
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`Erreur API: ${res.statusText}`);
    }

    const lastTraining = await db.model.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    const data = await res.json();
    console.log("data", data);
    const modelName = data?.metadata.tunedModel;

    const trainingDataArray = Array.isArray(lastTraining.trainingData)
      ? lastTraining.trainingData
      : [lastTraining.trainingData];
    const examplesDataArray = Array.isArray(examples_data)
      ? examples_data
      : [examples_data];

    const mergedDataArray = trainingDataArray.concat(examplesDataArray);

    if (modelName) {
      await db.model.create({
        data: {
          modelName: modelName,
          trainingData: mergedDataArray,
        },
      });
    }

    return new NextResponse("zd", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
