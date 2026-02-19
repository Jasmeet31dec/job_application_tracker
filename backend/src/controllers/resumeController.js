
const OpenAI = require('openai');
const puppeteer = require('puppeteer');

console.log("KEY:", process.env.OPENAI_API_KEY);


const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const buildResume = async (req, res) => {
    try {
        const { personal, education, experience, skills } = req.body;
        
        let resumeContent = {
            professionalSummary: "Results-driven professional with experience in " + skills.join(', '),
            polishedExperience: experience.map(exp => ({
                ...exp,
                points: exp.description.split('.').filter(p => p.trim() !== '') // Split description into bullets
            }))
        };

        // 1. Try to use AI, but don't crash if it fails
        try {
            const completion = await openai.chat.completions.create({
                messages: [
                    { role: "system", content: "You are a professional resume writer." },
                    { role: "user", content: `Rewrite this experience into professional bullets: ${JSON.stringify(experience)}` }
                ],
                model: "gpt-3.5-turbo",
                response_format: { type: "json_object" },
                timeout: 5000, // Don't wait more than 5 seconds
            });
            
            const aiData = JSON.parse(completion.choices[0].message.content);
            // If AI worked, overwrite our fallback content
            resumeContent.professionalSummary = aiData.professionalSummary;
            resumeContent.polishedExperience = aiData.polishedExperience;
            console.log("AI Polish Applied successfully.");
            
        } catch (aiErr) {
            console.warn("AI Rate Limit/Error hit - Using Raw Input Fallback instead.");
            // We don't throw an error here, so the code continues to PDF generation
        }

        // 2. Generate PDF with whatever content we have (AI or Raw)
        const htmlContent = `
            <html>
                <body>
                    <h1>${personal.name}</h1>
                    <p>${resumeContent.professionalSummary}</p>
                    ${resumeContent.polishedExperience.map(exp => `
                        <div>
                            <strong>${exp.role} @ ${exp.company}</strong>
                            <ul>${exp.points.map(p => `<li>${p}</li>`).join('')}</ul>
                        </div>
                    `).join('')}
                </body>
            </html>
        `;

        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.setContent(htmlContent);
        const pdfBuffer = await page.pdf({ format: 'A4' });
        await browser.close();

        res.set({ 'Content-Type': 'application/pdf' });
        res.send(pdfBuffer);

    } catch (error) {
        console.error("PDF Component Error:", error);
        res.status(500).json({ message: "System error generating PDF" });
    }
};

module.exports = { buildResume };