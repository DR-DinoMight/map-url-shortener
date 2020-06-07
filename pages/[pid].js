import { server } from '../config';

const URL = () => {
    return <div></div>;
};

export const getServerSideProps = async (context) => {
    const { res, params } = context;
    const { pid } = params;

    console.log(res);
    if (pid) {
        try {
            const jsonRes = await fetch(`${server}/api/${pid}`);
            const jsonOutput = await jsonRes.json();
            res.writeHead(302, {
                Location: jsonOutput.url,
            });
            res.end();
        } catch (err) {
            console.error(err);
            res.writeHead(302, {
                Location: '/',
            });
            res.end();
        }
    }
    return {
        props: {},
    };
};

export default URL;
