import { spawn } from "child_process";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const pythonPath = path.join(
      process.cwd(),
      "ai-model",
      ".venv",
      "Scripts",
      "python.exe"
    );

    const scriptPath = path.join(
      process.cwd(),
      "ai-model",
      "pipeline.py"
    );

    const pythonProcess = spawn(pythonPath, ["-u", scriptPath, message]);

    let result = "";
    let errorOutput = "";

    pythonProcess.stdout.on("data", (data) => {
      const text = data.toString();
      console.log("Python Output:", text);
      result += text;
    });

    pythonProcess.stderr.on("data", (data) => {
      const text = data.toString();
      console.error("Python Error:", text);
      errorOutput += text;
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        return res.status(500).json({
          error: "Python process crashed",
          details: errorOutput,
        });
      }

      if (!result || result.trim() === "") {
        return res.status(500).json({
          error: "Empty response from AI",
          details: errorOutput,
        });
      }

      res.status(200).json({
        reply: result.trim(),
      });
    });

  } catch (error) {
    console.error("API Error:", error);

    res.status(500).json({
      error: "Server failed to run AI model",
      details: error.message,
    });
  }
}