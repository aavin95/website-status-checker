import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

let statuses = [];

const websites = [
    'https://goodreads-book-selector.vercel.app/',
    'https://andrew-vincent.vercel.app/'
];

const checkStatus = async () => {
    statuses = await Promise.all(
        websites.map(async (url) => {
            try {
                const response = await axios.get(url);
                return { url, status: response.status };
            } catch (error) {
                return { url, status: 'down' };
            }
        })
    );
    console.log('Statuses updated:', statuses);
};

export async function GET(request, { params }) {
    if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    await checkStatus();
    return NextResponse.json(statuses, { status: 200 });
}
