import { useState } from 'react';
import Head from 'next/head';

import styles from './index.module.css';

import DarkModeSwitcher from '../components/dark_mode_switcher';

export default function Home() {
    const [url, setUrl] = useState({
        url: '',
        slug: null,
    });

    const [response, setResponse] = useState({
        type: '',
        shortnedUrl: '',
    });

    const handleChange = (e) =>
        setUrl({ ...url, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        setResponse({
            type: 'processing',
        });
        e.preventDefault();
        try {
            const results = await fetch('/api/url', {
                method: 'POST',
                body: JSON.stringify(url),
                headers: { 'Content-Type': 'application/json' },
            });

            const json = await results.json();
            console.log('JSON', json);

            if (json.url) {
                setResponse({
                    type: 'success',
                    message: json.url,
                });
            } else {
                setResponse({
                    type: 'error',
                    message: json.message,
                });
            }
        } catch (e) {
            console.log('An error occurred', e);
            setResponse({
                type: 'error',
                message: 'An error occured while submitting the form',
            });
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>M4P.UK</title>
                <link rel='icon' href='/favicon.ico' />
                <meta name='description'>
                    A simple URL Shortener - Made by Matthew Peck-Deloughry part
                    of #100DaysOfCode
                </meta>
            </Head>

            <DarkModeSwitcher />

            <main>
                <h1 className={styles.title}>
                    Welcome to M4P.UK the URL Shortener
                </h1>

                <p className={styles.description}>
                    Get started by entering a URL below
                </p>

                <div className={styles.grid}>
                    {response.type == 'success' && (
                        <div className={`${styles.card} ${styles.success}`}>
                            <span>Success!</span>
                            <a
                                href={response.message}
                                target='_blank'
                                rel='noreferrer'
                            >
                                {response.message}
                            </a>
                        </div>
                    )}

                    {response.type == 'error' && (
                        <div className={`${styles.card} ${styles.error}`}>
                            <span>Error!</span>
                            <p>{response.message}</p>
                        </div>
                    )}
                    {response.type === 'processing' && (
                        <div className={styles.loader}></div>
                    )}
                    {response.type !== 'processing' && (
                        <div className={styles.card}>
                            <form
                                onSubmit={handleSubmit}
                                className={styles.form}
                            >
                                <fieldset>
                                    <label htmlFor='url'>URL: </label>
                                    <input
                                        type='url'
                                        name='url'
                                        id='url'
                                        onChange={handleChange}
                                        required
                                    ></input>
                                </fieldset>
                                <fieldset>
                                    <label htmlFor='slug'>Slug: </label>
                                    <input
                                        type='text'
                                        name='slug'
                                        id='slug'
                                        onChange={handleChange}
                                    ></input>
                                </fieldset>
                                <button>Shorten</button>
                            </form>
                        </div>
                    )}
                </div>
            </main>

            <footer>
                <div>
                    Powered by{' '}
                    <a
                        href='https://vercel.com'
                        target='_blank'
                        rel='noreferrer'
                        rel='noopener noreferrer'
                    >
                        Vercel
                    </a>
                    {' & '}
                    <a
                        href='https://nextjs.org/'
                        target='_blank'
                        rel='noreferrer'
                        rel='noopener noreferrer'
                    >
                        Next.js
                    </a>
                </div>
                <div className=''>
                    Made by{' '}
                    <a
                        href='https://deloughry.co.uk'
                        target='_blank'
                        rel='noreferrer'
                    >
                        Matthew Peck-Deloughry
                    </a>{' '}
                    June 2020 as part of{' '}
                    <a
                        href='https://www.100daysofcode.com/'
                        target='_blank'
                        rel='noreferrer'
                    >
                        #100DaysOfCode
                    </a>
                </div>
            </footer>
        </div>
    );
}
