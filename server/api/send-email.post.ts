import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [process.env.NUXT_RESEND_TO_EMAIL!],
      subject: body.subject,
      html: `
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone_number}</p>
        <p><strong>Message:</strong> ${body.message}</p>
      `,
    });

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
});
