import ConnectToDatabase from '../../util/db';
import { server } from '../../config';
import { customAlphabet } from 'nanoid';
import slugify from 'slugify';

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 5);

export default async (req, res) => {
    if (req.method !== 'POST') {
        res.statusCode = 403;
        res.statusMessage = 'Only handle POST';
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ message: 'only handle POST' }));
    }

    const db = await ConnectToDatabase(process.env.MONGODB_URI);

    const collection = await db.collection('urls');
    collection.createIndex('shortUrl', { unique: true });

    const jsonBody = req.body;
    if (jsonBody.url !== null) {
        let slugifyOptions = {
            replacement: '', // replace spaces with replacement character, defaults to `-`
            lower: true, // convert to lower case, defaults to `false`
            strict: true,
        };
        let randomURL = jsonBody.slug
            ? slugify(jsonBody.slug, slugifyOptions)
            : nanoid();

        try {
            let docs = await collection.insertOne({
                url: jsonBody.url,
                shortUrl: randomURL.toLowerCase(),
            });

            res.statusCode = 200;
            res.statusMessage = 'success';
            res.setHeader('Content-Type', 'application/json');

            return res.end(
                JSON.stringify({
                    url: `${server}/${docs.ops[0].shortUrl}`,
                })
            );
        } catch (err) {
            if (err.code == 11000) {
                console.error(err);
                res.statusCode = 403;
                res.statusMessage = 'error';
                res.setHeader('Content-Type', 'application/json');
                return res.end(
                    JSON.stringify({
                        message: 'An item with that slug already exists',
                    })
                );
            }
        }
    }
};
