import { NextResponse } from 'next/server';
import { getSavedStatuses } from '../../lib/getSavedStatuses';

export async function GET() {
    const statuses = await getSavedStatuses();
    return NextResponse.json(statuses, { status: 200 });
}
