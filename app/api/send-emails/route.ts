import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const formData = new URLSearchParams({
      apikey: process.env.ELASTIC_EMAIL_API_KEY || '',
      subject: `New message from ${name}`,
      from: 'your_verified_email@example.com', // Must match a verified sender
      to: 'your_destination_email@example.com',
      bodyText: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    });

    const response = await fetch('https://api.elasticemail.com/v2/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: data.error }, { status: 500 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
