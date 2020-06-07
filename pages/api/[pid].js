import ConnectToDatabase from '../../util/db';

export default async (req, res) => {
    const db = await ConnectToDatabase(process.env.MONGODB_URI);
    const collection = await db.collection('urls');

    const {
        query: { pid },
    } = req;

    try {
        let urls = await collection.findOne({ shortUrl: pid.toLowerCase() });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        if (urls == null)
            return res.end(JSON.stringify({ body: 'working...' }));

        return res.end(JSON.stringify({ url: urls.url }));
    } catch (err) {
        console.error(err);
        res.statusCode = 503;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ error: err }));
    }
};
