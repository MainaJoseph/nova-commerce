export const getVerificationEmailTemplate = (
  name: string,
  verificationCode: string,
) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .code-box { background: white; border: 2px solid #f97316; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
          .code { font-size: 32px; font-weight: bold; color: #f97316; letter-spacing: 8px; }
          .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✨ Verify Your Email</h1>
          </div>
          <div class="content">
            <p>Hi ${name},</p>
            <p>Thank you for registering with Nova! To complete your registration, please use the verification code below:</p>
            
            <div class="code-box">
              <div class="code">${verificationCode}</div>
            </div>
            
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't create an account with Nova, please ignore this email.</p>
            
            <div class="footer">
              <p>© 2025 Nova. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};
