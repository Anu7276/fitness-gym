import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Honeypot spam check
    if (data.company_website || data.hp_trap) {
      console.warn("Spam detected via honeypot field:", data);
      return NextResponse.json({ success: true, message: "Received" }, { status: 200 });
    }

    const { name, phone, goal, program, timeSlot, source } = data;

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: "Name and phone number are required." },
        { status: 400 }
      );
    }

    // Indian phone number regex verification (10 digits starting with 6, 7, 8, or 9, optional +91 prefix)
    const cleanedPhone = phone.replace(/[\s\-\(\)]/g, "");
    const indianPhoneRegex = /^(?:\+91|91)?[6789]\d{9}$/;
    if (!indianPhoneRegex.test(cleanedPhone)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid 10-digit Indian mobile number." },
        { status: 400 }
      );
    }

    // Log the lead payload
    console.log("==========================================");
    console.log("NEW LEAD CAPTURED [FITNESSGYM WAGHODIA]");
    console.log("Timestamp:", new Date().toISOString());
    console.log("Name:", name);
    console.log("Phone:", cleanedPhone);
    console.log("Goal:", goal || "Unspecified");
    console.log("Preferred Program:", program || "Any");
    console.log("Preferred Time:", timeSlot || "Flexible");
    console.log("Source Page:", source || "Website");
    console.log("==========================================");

    // Ready for webhook integration (e.g. Google Sheets API, Resend, or CRM)
    return NextResponse.json({
      success: true,
      message: "Lead recorded successfully. VIP Pass registered.",
      lead: {
        name,
        phone: cleanedPhone,
        goal,
        program,
        timeSlot,
      },
    });
  } catch (error) {
    console.error("Error processing lead submission:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}

