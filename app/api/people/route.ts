import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const people = await prisma.person.findMany();
        return new Response(JSON.stringify(people), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error fetching people:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json().catch((err) => {
            console.error('Error parsing JSON:', err);
            return null;
        });

        if (!body) {
            console.error('Request body is null or malformed');
            return new Response('Request body is null or malformed', { status: 400 });
        }

        const { firstname, lastname, phone, dob, city, suburb } = body;

        if (!firstname || !lastname || !phone || !dob || !city || !suburb) {
            console.error('Missing required fields:', { firstname, lastname, phone, dob, city, suburb });
            return new Response('Missing required fields', { status: 400 });
        }

        const parsedDob = new Date(dob);
        if (isNaN(parsedDob.getTime())) {
            console.error('Invalid date format for dob:', dob);
            return new Response('Invalid date format', { status: 400 });
        }

        const person = await prisma.person.create({
            data: {
                firstname,
                lastname,
                phone,
                dob: parsedDob,
                city,
                suburb,
            },
        });

        console.log('Person created successfully:', person);

        return new Response(JSON.stringify(person), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error('Error creating person:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

export async function PUT(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json().catch((err) => {
            console.error('Error parsing JSON:', err);
            return null;
        });

        if (!body) {
            console.error('Request body is null or malformed');
            return new Response('Request body is null or malformed', { status: 400 });
        }

        const { id, firstname, lastname, phone, dob, city, suburb } = body;

        if (!id || !firstname || !lastname || !phone || !dob || !city || !suburb) {
            console.error('Missing required fields:', { id, firstname, lastname, phone, dob, city, suburb });
            return new Response('Missing required fields', { status: 400 });
        }

        const parsedDob = new Date(dob);
        if (isNaN(parsedDob.getTime())) {
            console.error('Invalid date format for dob:', dob);
            return new Response('Invalid date format', { status: 400 });
        }

        const updatedPerson = await prisma.person.update({
            where: { id: Number(id) },
            data: {
                firstname,
                lastname,
                phone,
                dob: parsedDob,
                city,
                suburb,
            },
        });

        console.log('Person updated successfully:', updatedPerson);

        return new Response(JSON.stringify(updatedPerson), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error('Error updating person:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
