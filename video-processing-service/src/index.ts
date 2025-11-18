import express from "express";
import ffmpeg from "fluent-ffmpeg";


const app = express();
app.use(express.json());

app.post("/process-video", (req, res) => {
    // get path of input video from request body
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    if (!inputFilePath || !outputFilePath) {
        res.status(400).send("Input and output file paths are required.");
    }

    ffmpeg(inputFilePath)
        .outputOptions("-vf", "scale=-1:360") // example: resize video to 360p
        .on("end", () => {
            res.status(200).send(`Video processed and saved to ${outputFilePath}`);
        })
        .on("error", (err) => {
            console.error("Error processing video:", err.message);
            res.status(500).send(`Error processing video: ${err.message}`);
        })
        .save(outputFilePath);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(
        `Video processing service listening at http://localhost:${port}`);
});
