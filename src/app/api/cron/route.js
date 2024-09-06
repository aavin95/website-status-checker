import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import axios from 'axios';

const websites = [
    'https://goodreads-book-selector.vercel.app/',
    'https://andrew-vincent.vercel.app/'
];

const checkStatus = async () => {
    const statuses = await Promise.all(
        websites.map(async (url) => {
            try {
                const response = await axios.get(url);
                return { url, status: response.status };
            } catch (error) {
                return { url, status: 'down' };
            }
        })
    );

    // Save statuses to file
    const filePath = path.join(process.cwd(), 'statuses.json');
    await fs.writeFile(filePath, JSON.stringify(statuses), 'utf-8');
    console.log('Statuses updated:', statuses);
};

export async function GET(request, { params }) {
    if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await checkStatus();
    return NextResponse.json({ message: 'Status updated' }, { status: 200 });
}
