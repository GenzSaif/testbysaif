export type QrType = "link" | "text" | "wifi" | "email" | "contact";
export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

export type DotStyle =
  | "square"
  | "rounded"
  | "dots"
  | "diamond"
  | "star"
  | "heart"
  | "hex"
  | "sparkle"
  | "bars"
  | "rings";

export interface QrForm {
  type: QrType;
  link: string;
  text: string;
  wifiSsid: string;
  wifiPassword: string;
  wifiEncryption: "WPA" | "WEP" | "nopass";
  wifiHidden: boolean;
  emailTo: string;
  emailSubject: string;
  emailBody: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  contactOrg: string;
}

export const emptyForm: QrForm = {
  type: "link",
  link: "",
  text: "",
  wifiSsid: "",
  wifiPassword: "",
  wifiEncryption: "WPA",
  wifiHidden: false,
  emailTo: "",
  emailSubject: "",
  emailBody: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  contactOrg: "",
};

export function buildPayload(form: QrForm): string {
  switch (form.type) {
    case "link":
      return form.link.trim();
    case "text":
      return form.text;
    case "wifi": {
      const enc = form.wifiEncryption;
      const hidden = form.wifiHidden ? "true" : "false";
      const escape = (v: string) => v.replace(/([\\;,":])/g, "\\$1");
      return `WIFI:T:${enc};S:${escape(form.wifiSsid)};P:${escape(form.wifiPassword)};H:${hidden};;`;
    }
    case "email": {
      const params = new URLSearchParams();
      if (form.emailSubject) params.set("subject", form.emailSubject);
      if (form.emailBody) params.set("body", form.emailBody);
      const qs = params.toString();
      return `mailto:${form.emailTo.trim()}${qs ? `?${qs}` : ""}`;
    }
    case "contact": {
      const lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        form.contactName ? `FN:${form.contactName}` : "",
        form.contactOrg ? `ORG:${form.contactOrg}` : "",
        form.contactPhone ? `TEL:${form.contactPhone}` : "",
        form.contactEmail ? `EMAIL:${form.contactEmail}` : "",
        "END:VCARD",
      ];
      return lines.filter(Boolean).join("\n");
    }
  }
}

export function isFormReady(form: QrForm): boolean {
  switch (form.type) {
    case "link":
      return form.link.trim().length > 0;
    case "text":
      return form.text.trim().length > 0;
    case "wifi":
      return form.wifiSsid.trim().length > 0;
    case "email":
      return form.emailTo.trim().length > 0;
    case "contact":
      return form.contactName.trim().length > 0;
  }
}

export interface ColorPreset {
  name: string;
  fg: string;
  bg: string;
}

export const COLOR_PRESETS: ColorPreset[] = [
  { name: "Classic", fg: "#212121", bg: "#FFFFFF" },
  { name: "Kiwi", fg: "#58A60A", bg: "#F4FFEB" },
  { name: "Deep teal", fg: "#194965", bg: "#DFF1FC" },
  { name: "Midnight", fg: "#0A0A0A", bg: "#F8FAFC" },
  { name: "Forest", fg: "#14532D", bg: "#F0FDF4" },
  { name: "Ocean", fg: "#0C4A6E", bg: "#F0F9FF" },
  { name: "Plum", fg: "#581C87", bg: "#FAF5FF" },
  { name: "Crimson", fg: "#7F1D1D", bg: "#FEF2F2" },
  { name: "Sunset", fg: "#9A3412", bg: "#FFF7ED" },
  { name: "Ink on kiwi", fg: "#212121", bg: "#F4FFEB" },
];

export const DOT_STYLES: { id: DotStyle; label: string }[] = [
  { id: "square", label: "Square" },
  { id: "rounded", label: "Rounded" },
  { id: "dots", label: "Dots" },
  { id: "diamond", label: "Diamond" },
  { id: "star", label: "Star" },
  { id: "heart", label: "Heart" },
  { id: "hex", label: "Hex" },
  { id: "sparkle", label: "Sparkle" },
  { id: "bars", label: "Bars" },
  { id: "rings", label: "Rings" },
];

export function isFinderPattern(
  row: number,
  col: number,
  size: number
): boolean {
  const inTopLeft = row < 7 && col < 7;
  const inTopRight = row < 7 && col >= size - 7;
  const inBottomLeft = row >= size - 7 && col < 7;
  return inTopLeft || inTopRight || inBottomLeft;
}
