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
                <meta charSet='utf-8' />
                <meta http-equiv='X-UA-Compatible' content='IE=edge' />
                <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
                <meta name='keywords' content='Keywords' />
                <title>M4P.UK</title>

                <meta
                    name='description'
                    content='
                    A simple URL Shortener - Made by Matthew Peck-Deloughry part
                    of #100DaysOfCode'
                />

                    <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-icon-57x57.png"/>
                    <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-icon-60x60.png"/>
                    <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-icon-72x72.png"/>
                    <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-icon-76x76.png"/>
                    <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-icon-114x114.png"/>
                    <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-icon-120x120.png"/>
                    <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-icon-144x144.png"/>
                    <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152x152.png"/>
                    <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png"/>
                    <link rel="icon" type="image/png" sizes="192x192"  href="/icons/android-icon-192x192.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png"/>
                    <link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png"/>
                    <link rel="manifest" href="/manifest.json"/>
                    <meta name="msapplication-TileColor" content="#f8e71c"/>
                    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
                    <meta name="theme-color" content="#f8e71c"/>

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
