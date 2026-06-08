import { NextResponse } from 'next/server';

interface ContactPayload {
  name: string;
  email: string;
  interest: string;
  message: string;
}

export async function POST(request: Request) {
  const body: ContactPayload = await request.json();
  const { name, email, interest, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  // TODO: Wire up an email service (e.g. Resend) to forward submissions
  console.log('[Contact Form]', { name, email, interest, message });

  return NextResponse.json({ success: true });
}
