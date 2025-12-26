export default async function handler(req, res) {
    const API_KEY = process.env.GROQ_API_KEY;
    const { prompt } = JSON.parse(req.body);

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: "You are IslamNet. Sources: Quran, Sahih Hadith, IslamQA.info. Wrap Arabic in <span class='arabic'></span>. Use bold for headers." },
                { role: "user", content: prompt }
            ]
        })
    });

    const data = await response.json();
    res.status(200).json(data);
}