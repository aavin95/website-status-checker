import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

let statuses = [];

const websites = [];

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
    await checkStatus();
    return NextResponse.json(JSON.stringify(statuses), { status: 200 });
}
