module.exports = function (req, res, next) {
if (req.method === "GET") return next();


const apiKey = req.headers["x-api-key"];
if (!apiKey || apiKey !== process.env.API_KEY)
return res.status(403).json({ error: "Invalid API Key" });


next();
};