async function chatAssistant(req, res) {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message required" });
        }

        res.json({
            user: message,
            assistant: "This is a placeholder AI response for: " + message
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { chatAssistant };
