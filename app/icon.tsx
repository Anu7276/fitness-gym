import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A1A1F",
          borderRadius: "50%",
          border: "1.5px solid #F21B35",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Stylized barbell / dumbbell */}
          <path d="M6 5v14" />
          <path d="M18 5v14" />
          <path d="M6 12h12" />
          <path d="M3 8v8" stroke="#F21B35" />
          <path d="M21 8v8" stroke="#F21B35" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}

