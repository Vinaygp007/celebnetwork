import { Injectable } from '@nestjs/common';
import { Celebrity } from '../entities/celebrity.entity';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PdfService {
  async generateCelebrityProfilePdf(celebrity: Celebrity): Promise<Buffer> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      const page = await browser.newPage();
      
      const html = this.generateHtmlTemplate(celebrity);
      
      await page.setContent(html, { waitUntil: 'networkidle0' });
      
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '1cm',
          right: '1cm',
          bottom: '1cm',
          left: '1cm'
        }
      });

      return Buffer.from(pdf);
    } finally {
      await browser.close();
    }
  }

  private generateHtmlTemplate(celebrity: Celebrity): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${celebrity.firstName} ${celebrity.lastName} - Profile</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #6366f1;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .celebrity-name {
            font-size: 2.5rem;
            font-weight: bold;
            color: #6366f1;
            margin: 0;
          }
          .stage-name {
            font-size: 1.2rem;
            color: #8b5cf6;
            margin: 5px 0;
          }
          .verified {
            color: #10b981;
            font-weight: bold;
          }
          .stats {
            display: flex;
            justify-content: space-around;
            background: #f8fafc;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
          }
          .stat-item {
            text-align: center;
          }
          .stat-number {
            font-size: 1.5rem;
            font-weight: bold;
            color: #6366f1;
          }
          .stat-label {
            color: #64748b;
            text-transform: uppercase;
            font-size: 0.8rem;
          }
          .section {
            margin: 30px 0;
          }
          .section-title {
            font-size: 1.3rem;
            font-weight: bold;
            color: #1e293b;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 5px;
            margin-bottom: 15px;
          }
          .bio {
            background: #f1f5f9;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #6366f1;
          }
          .industries {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }
          .industry-tag {
            background: #6366f1;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.9rem;
          }
          .social-handles {
            list-style: none;
            padding: 0;
          }
          .social-handles li {
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
          }
          .social-platform {
            font-weight: bold;
            color: #6366f1;
            text-transform: capitalize;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            color: #64748b;
            font-size: 0.9rem;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="celebrity-name">${celebrity.firstName} ${celebrity.lastName}</h1>
          ${celebrity.stageName ? `<p class="stage-name">Known as: ${celebrity.stageName}</p>` : ''}
          ${celebrity.isVerified ? '<p class="verified">✓ Verified Celebrity</p>' : ''}
        </div>

        <div class="stats">
          <div class="stat-item">
            <div class="stat-number">${celebrity.followersCount.toLocaleString()}</div>
            <div class="stat-label">Followers</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">${celebrity.rating}/5</div>
            <div class="stat-label">Rating</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">${celebrity.profileViews.toLocaleString()}</div>
            <div class="stat-label">Profile Views</div>
          </div>
        </div>

        ${celebrity.bio ? `
        <div class="section">
          <h2 class="section-title">Biography</h2>
          <div class="bio">
            <p>${celebrity.bio}</p>
          </div>
        </div>
        ` : ''}

        ${celebrity.country ? `
        <div class="section">
          <h2 class="section-title">Location</h2>
          <p>${celebrity.country}</p>
        </div>
        ` : ''}

        ${celebrity.industries && celebrity.industries.length > 0 ? `
        <div class="section">
          <h2 class="section-title">Industries</h2>
          <div class="industries">
            ${celebrity.industries.map(industry => `<span class="industry-tag">${industry}</span>`).join('')}
          </div>
        </div>
        ` : ''}

        ${celebrity.socialHandles ? `
        <div class="section">
          <h2 class="section-title">Social Media</h2>
          <ul class="social-handles">
            ${Object.entries(celebrity.socialHandles)
              .filter(([, handle]) => handle)
              .map(([platform, handle]) => `
                <li>
                  <span class="social-platform">${platform}:</span> ${handle}
                </li>
              `).join('')}
          </ul>
        </div>
        ` : ''}

        <div class="footer">
          <p>Profile generated from CelebNetwork.com</p>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
        </div>
      </body>
      </html>
    `;
  }
}
