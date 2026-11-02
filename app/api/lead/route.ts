import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Honeypot spam trap
    if (data.company_website || data.hp_trap) {
      console.warn("[LEAD] Spam detected via honeypot trap:", data);
      return NextResponse.json({ success: true, message: "Received" }, { status: 200 });
    }

    const { name, phone, email, goal, program, timeSlot, source } = data;

    // Validate required fields
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: "Please provide your full name." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string") {
      return NextResponse.json(
        { success: false, message: "Mobile number is required." },
        { status: 400 }
      );
    }

    // Validate Indian phone number (10 digits starting with 6-9, optional +91 prefix)
    const cleanedPhone = phone.replace(/[\s\-\(\)]/g, "");
    const indianPhoneRegex = /^(?:\+91|91)?[6789]\d{9}$/;
    if (!indianPhoneRegex.test(cleanedPhone)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid 10-digit Indian mobile number." },
        { status: 400 }
      );
    }

    // Optional email validation if provided
    if (email && typeof email === "string" && email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return NextResponse.json(
          { success: false, message: "Please provide a valid email address." },
          { status: 400 }
        );
      }
    }

    const leadPayload = {
      name: name.trim(),
      phone: cleanedPhone,
      email: email ? email.trim() : undefined,
      goal: goal || "General Strength & Fitness",
      program: program || "General Gym Floor",
      timeSlot: timeSlot || "Flexible",
      source: source || "Website Lead Form",
      timestamp: new Date().toISOString(),
    };

    console.log("==========================================");
    console.log("⭐ NEW LEAD CAPTURED [FITNESSGYM VADODARA]");
    console.log("Name:", leadPayload.name);
    console.log("Phone:", leadPayload.phone);
    console.log("Email:", leadPayload.email || "Not provided");
    console.log("Goal:", leadPayload.goal);
    console.log("Program:", leadPayload.program);
    console.log("Time Slot:", leadPayload.timeSlot);
    console.log("Source:", leadPayload.source);
    console.log("Time:", leadPayload.timestamp);
    console.log("==========================================");

    // 1. Resend Email Notification (if RESEND_API_KEY is configured)
    if (process.env.RESEND_API_KEY) {
      try {
        const emailHtml = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0A1A1F; color: #FFFFFF; border-radius: 12px; border: 1px solid #1E3840;">
            <div style="border-bottom: 2px solid #F21B35; padding-bottom: 12px; margin-bottom: 20px;">
              <h2 style="color: #FFFFFF; margin: 0; font-size: 20px; text-transform: uppercase;">New 1-Day Trial Pass Lead</h2>
              <p style="color: #B7C4C8; margin: 4px 0 0 0; font-size: 13px;">${siteConfig.brand.name} • Waghodia Road, Vadodara</p>
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 8px 0; color: #7B8E94;">Name:</td><td style="padding: 8px 0; color: #FFFFFF; font-weight: bold;">${leadPayload.name}</td></tr>
              <tr><td style="padding: 8px 0; color: #7B8E94;">Phone:</td><td style="padding: 8px 0; color: #25D366; font-weight: bold;"><a href="tel:${leadPayload.phone}" style="color: #25D366; text-decoration: none;">${leadPayload.phone}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #7B8E94;">Email:</td><td style="padding: 8px 0; color: #FFFFFF;">${leadPayload.email || "Not provided"}</td></tr>
              <tr><td style="padding: 8px 0; color: #7B8E94;">Fitness Goal:</td><td style="padding: 8px 0; color: #FFFFFF;">${leadPayload.goal}</td></tr>
              <tr><td style="padding: 8px 0; color: #7B8E94;">Program:</td><td style="padding: 8px 0; color: #FFFFFF;">${leadPayload.program}</td></tr>
              <tr><td style="padding: 8px 0; color: #7B8E94;">Preferred Time:</td><td style="padding: 8px 0; color: #FFFFFF;">${leadPayload.timeSlot}</td></tr>
              <tr><td style="padding: 8px 0; color: #7B8E94;">Lead Source:</td><td style="padding: 8px 0; color: #FFFFFF;">${leadPayload.source}</td></tr>
            </table>
            <div style="margin-top: 24px; text-align: center;">
              <a href="https://wa.me/${leadPayload.phone.replace(/\D/g, '')}" style="display: inline-block; padding: 12px 24px; background: #25D366; color: #FFFFFF; font-weight: bold; border-radius: 9999px; text-decoration: none;">Reply on WhatsApp →</a>
            </div>
          </div>
        `;

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || "leads@fitnessgym.in",
            to: process.env.NOTIFICATION_EMAIL || siteConfig.contact.email,
            subject: `🔥 New Lead: ${leadPayload.name} (${leadPayload.phone})`,
            html: emailHtml,
          }),
        });
        console.log("[LEAD] Resend email dispatched successfully.");
      } catch (emailErr) {
        console.error("[LEAD] Error dispatching Resend email:", emailErr);
      }
    }

    // 2. Google Sheet Webhook Sync (if GOOGLE_SHEET_WEBHOOK_URL is configured)
    if (process.env.GOOGLE_SHEET_WEBHOOK_URL) {
      try {
        await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadPayload),
        });
        console.log("[LEAD] Google Sheet webhook dispatched successfully.");
      } catch (sheetErr) {
        console.error("[LEAD] Error dispatching to Google Sheets webhook:", sheetErr);
      }
    }

    // 3. Construct WhatsApp URL for instant conversion
    const waText = `Hi ${siteConfig.brand.name}! I just claimed a 1-Day Trial Pass on the website.\n\n👤 Name: ${leadPayload.name}\n📱 Phone: ${leadPayload.phone}\n🎯 Goal: ${leadPayload.goal}\n🏋️ Program: ${leadPayload.program}\n⏰ Preferred Time: ${leadPayload.timeSlot}`;
    const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(waText)}`;

    return NextResponse.json({
      success: true,
      message: "Lead recorded successfully. Trial pass reserved.",
      lead: leadPayload,
      whatsappUrl,
    });
  } catch (error) {
    console.error("Error processing lead submission:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
