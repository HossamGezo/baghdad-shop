// --- Generate Verification Email Template
export const getVerificationTemplate = (link: string) => {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; color: #34465b;">
      <div style="background-color: #34465b; padding: 20px; text-align: center;">
        <h1 style="color: #ffc107; margin: 0; font-size: 28px; letter-spacing: 1px;">Baghdad Shop</h1>
      </div>
      <div style="padding: 30px; background-color: #ffffff; line-height: 1.6;">
        <h2 style="color: #34465b; margin-top: 0;">Welcome to our community!</h2>
        <p style="font-size: 16px; color: #555;">
          Thank you for joining <strong>Baghdad Shop</strong>. To ensure the security of your account, please verify your email address by clicking the button below.
        </p>
        <div style="text-align: center; margin: 40px 0;">
          <a href="${link}" style="background-color: #ffc107; color: #34465b; padding: 15px 35px; text-decoration: none; font-weight: bold; border-radius: 5px; font-size: 18px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            Verify My Email
          </a>
        </div>
        <p style="font-size: 14px; color: #777;">
          If the button above doesn't work, you can also copy and paste the following link: <br>
          <a href="${link}" style="color: #007bff; word-break: break-all;">${link}</a>
        </p>
      </div>
      <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #999;">
        <p style="margin: 0;">© 2026 Baghdad Shop. All rights reserved.</p>
      </div>
    </div>
  `;
};
