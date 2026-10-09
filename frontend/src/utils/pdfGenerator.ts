import jsPDF from "jspdf";

export interface PatientInfo {
  name: string;
  age: number | string;
  gender: string;
  bloodGroup: string;
}

export interface VitalItem {
  name: string;
  value: string;
  trend?: string;
}

export interface DoctorSummaryData {
  patient: PatientInfo;
  concerns: string[];
  vitals: VitalItem[];
  medications: string[];
  reports: string[];
  questions: string[];
}

export interface ReportValueItem {
  test: string;
  result: string;
  range?: string;
  reference_range?: string;
  status: string;
  explanation?: string;
}

export interface ReportResultData {
  summary: string;
  values?: ReportValueItem[];
  important_values?: ReportValueItem[];
  normal?: string[];
  what_looks_normal?: string[];
  attention?: string[];
  what_may_need_attention?: string[];
  questions?: string[];
  questions_for_doctor?: string[];
  trends?: string;
  disclaimer?: string;
}

/**
 * Generates and triggers download of a clinical PDF summary for doctor appointments.
 */
export function generateDoctorSummaryPDF(summary: DoctorSummaryData): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = 18;

  // Header Bar Background
  doc.setFillColor(37, 99, 235); // Primary Blue (#2563eb)
  doc.rect(margin, y, contentWidth, 20, "F");

  // Header Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text("MediSense AI — Clinical Visit Summary", margin + 6, y + 9);

  // Subtitle
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(220, 235, 255);
  doc.text(
    "Automated Patient Health Brief for Licensed Medical Professionals",
    margin + 6,
    y + 15
  );

  y += 26;

  // Patient Info Box
  doc.setFillColor(245, 247, 250);
  doc.setDrawColor(218, 225, 233);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);
  doc.text(`Patient: ${summary.patient.name}`, margin + 5, y + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105);
  doc.text(
    `Age: ${summary.patient.age} yrs   |   Gender: ${summary.patient.gender}   |   Blood Group: ${summary.patient.bloodGroup}`,
    margin + 5,
    y + 15
  );

  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`Generated on: ${dateStr}`, contentWidth - 25, y + 15);

  y += 30;

  // Section: Current Concerns & Chief Complaints
  y = renderSectionTitle(doc, "1. CURRENT CHIEF CONCERNS & SYMPTOMS", margin, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(30, 41, 59);

  summary.concerns.forEach((concern) => {
    doc.setFillColor(220, 38, 38);
    doc.circle(margin + 3, y - 1, 1, "F");
    const lines = doc.splitTextToSize(concern, contentWidth - 10);
    doc.text(lines, margin + 7, y);
    y += lines.length * 5 + 2;
  });

  y += 4;

  // Section: Recent Vitals
  y = renderSectionTitle(doc, "2. RECENT VITALS & OBSERVATIONS", margin, y);
  const vitalsBoxWidth = (contentWidth - 6) / Math.min(3, summary.vitals.length || 1);
  let vitalX = margin;

  summary.vitals.forEach((vital) => {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(vitalX, y, vitalsBoxWidth - 2, 16, 1.5, 1.5, "FD");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text(vital.name, vitalX + 4, y + 6);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text(vital.value, vitalX + 4, y + 12);

    vitalX += vitalsBoxWidth;
  });

  y += 22;

  // Section: Current Medications
  y = renderSectionTitle(doc, "3. ACTIVE MEDICATIONS & SUPPLEMENTS", margin, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(30, 41, 59);

  summary.medications.forEach((med) => {
    doc.setFillColor(37, 99, 235);
    doc.circle(margin + 3, y - 1, 1, "F");
    doc.text(med, margin + 7, y);
    y += 6;
  });

  y += 4;

  // Section: Recent Reports / Labs
  y = renderSectionTitle(doc, "4. RECENT LAB REPORTS & FINDINGS", margin, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(30, 41, 59);

  summary.reports.forEach((rep) => {
    doc.setFillColor(16, 185, 129);
    doc.circle(margin + 3, y - 1, 1, "F");
    const lines = doc.splitTextToSize(rep, contentWidth - 10);
    doc.text(lines, margin + 7, y);
    y += lines.length * 5 + 2;
  });

  y += 4;

  // Section: Suggested Questions for Doctor (Highlighted Box)
  y = renderSectionTitle(doc, "5. PRE-COMPILED QUESTIONS FOR CLINICIAN", margin, y);
  
  const questionsHeight = summary.questions.length * 8 + 8;
  doc.setFillColor(239, 246, 255); // light blue
  doc.setDrawColor(191, 219, 254);
  doc.roundedRect(margin, y - 2, contentWidth, questionsHeight, 2, 2, "FD");

  let qY = y + 4;
  summary.questions.forEach((q, idx) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(29, 78, 216);
    doc.text(`Q${idx + 1}:`, margin + 4, qY);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(30, 58, 138);
    const qLines = doc.splitTextToSize(q, contentWidth - 18);
    doc.text(qLines, margin + 12, qY);
    qY += qLines.length * 5 + 3;
  });

  // Footer / Disclaimer
  const footerY = 280;
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  const disclaimer =
    "Disclaimer: This document is an AI-assisted compilation based on patient-reported logs and uploaded health records. It is intended solely as an agenda aid for direct clinical evaluation and does not constitute a medical diagnosis.";
  doc.text(doc.splitTextToSize(disclaimer, contentWidth), margin, footerY);

  // Trigger browser download
  const safeName = summary.patient.name.replace(/[^a-zA-Z0-9]/g, "_");
  doc.save(`${safeName}_Doctor_Summary_${new Date().toISOString().slice(0, 10)}.pdf`);
}

/**
 * Triggers clean print view for Doctor Summary.
 */
export function printDoctorSummary(summary: DoctorSummaryData): void {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    window.print();
    return;
  }

  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Doctor Visit Summary - ${summary.patient.name}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #1e293b;
            padding: 30px;
            max-width: 800px;
            margin: 0 auto;
          }
          .header {
            background: #2563eb;
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
          }
          .patient-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            padding: 16px;
            border-radius: 8px;
            margin-bottom: 24px;
            display: flex;
            justify-content: space-between;
          }
          h2 {
            color: #1e3a8a;
            font-size: 16px;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 6px;
            margin-top: 24px;
          }
          ul {
            padding-left: 20px;
            line-height: 1.6;
          }
          .vitals-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin-bottom: 16px;
          }
          .vital-item {
            background: #f1f5f9;
            padding: 10px;
            border-radius: 6px;
          }
          .questions-box {
            background: #eff6ff;
            border: 1px solid #bfdbfe;
            padding: 16px;
            border-radius: 8px;
            color: #1e40af;
          }
          .disclaimer {
            font-size: 11px;
            color: #94a3b8;
            font-style: italic;
            margin-top: 30px;
            border-top: 1px solid #e2e8f0;
            padding-top: 12px;
          }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="margin: 0; font-size: 22px;">MediSense AI — Clinical Visit Summary</h1>
          <p style="margin: 4px 0 0; opacity: 0.9; font-size: 13px;">Generated for appointment review</p>
        </div>
        <div class="patient-card">
          <div>
            <h3 style="margin: 0 0 4px;">${summary.patient.name}</h3>
            <p style="margin: 0; color: #64748b; font-size: 14px;">${summary.patient.age} yrs • ${summary.patient.gender} • Blood Group: ${summary.patient.bloodGroup}</p>
          </div>
          <div style="text-align: right; color: #64748b; font-size: 13px;">
            <div>Date: ${dateStr}</div>
          </div>
        </div>

        <h2>1. Current Chief Concerns</h2>
        <ul>${summary.concerns.map((c) => `<li>${c}</li>`).join("")}</ul>

        <h2>2. Recent Vitals</h2>
        <div class="vitals-grid">
          ${summary.vitals.map((v) => `<div class="vital-item"><strong>${v.name}:</strong> <div>${v.value}</div></div>`).join("")}
        </div>

        <h2>3. Active Medications</h2>
        <ul>${summary.medications.map((m) => `<li>${m}</li>`).join("")}</ul>

        <h2>4. Recent Lab Reports</h2>
        <ul>${summary.reports.map((r) => `<li>${r}</li>`).join("")}</ul>

        <h2>5. Pre-compiled Questions for Doctor</h2>
        <div class="questions-box">
          <ol>${summary.questions.map((q) => `<li>${q}</li>`).join("")}</ol>
        </div>

        <div class="disclaimer">
          AI-generated health summary — not a clinical diagnosis. Consult a licensed medical practitioner for personalized healthcare decisions.
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}

/**
 * Generates and downloads a lab report analysis PDF.
 */
export function generateReportAnalysisPDF(result: ReportResultData, fileName: string = "Medical_Report"): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = 18;

  // Header
  doc.setFillColor(16, 185, 129); // Emerald Green (#10b981)
  doc.rect(margin, y, contentWidth, 20, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text("MediSense AI — Diagnostic Report Analysis", margin + 6, y + 9);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(230, 255, 245);
  doc.text(`File: ${fileName}   |   Analyzed on: ${new Date().toLocaleDateString()}`, margin + 6, y + 15);

  y += 26;

  // Summary Card
  doc.setFillColor(245, 247, 250);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 22, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(30, 41, 59);
  doc.text("Clinical Summary:", margin + 5, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  const summaryLines = doc.splitTextToSize(result.summary || "Report reviewed.", contentWidth - 10);
  doc.text(summaryLines, margin + 5, y + 12);

  y += 28;

  // Values Table
  const vals = result.values || result.important_values || [];
  if (vals.length > 0) {
    y = renderSectionTitle(doc, "MEASURED BIOMARKERS & LAB VALUES", margin, y);

    // Table Header
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, y, contentWidth, 7, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text("Test", margin + 3, y + 5);
    doc.text("Result", margin + 60, y + 5);
    doc.text("Reference Range", margin + 95, y + 5);
    doc.text("Status", margin + 140, y + 5);

    y += 9;

    vals.forEach((v) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(30, 41, 59);
      doc.text(v.test, margin + 3, y + 4);

      doc.text(v.result, margin + 60, y + 4);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(100, 116, 139);
      doc.text(v.range || v.reference_range || "-", margin + 95, y + 4);

      // Status Badge
      const isElevated = v.status.toLowerCase().includes("elev") || v.status.toLowerCase().includes("high");
      if (isElevated) {
        doc.setTextColor(185, 28, 28);
      } else {
        doc.setTextColor(21, 128, 61);
      }
      doc.setFont("helvetica", "bold");
      doc.text(v.status, margin + 140, y + 4);

      doc.setDrawColor(241, 245, 249);
      doc.line(margin, y + 7, pageWidth - margin, y + 7);
      y += 8;
    });

    y += 6;
  }

  // Normal & Attention Lists
  const normals = result.normal || result.what_looks_normal || [];
  const attentions = result.attention || result.what_may_need_attention || [];

  if (normals.length > 0 || attentions.length > 0) {
    const colWidth = (contentWidth - 6) / 2;

    // Normals Box
    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(187, 247, 208);
    doc.roundedRect(margin, y, colWidth, 24, 2, 2, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(22, 101, 52);
    doc.text("Normal Findings:", margin + 4, y + 5);
    doc.setFont("helvetica", "normal");
    let normY = y + 10;
    normals.slice(0, 3).forEach((n) => {
      doc.text(`• ${n}`, margin + 4, normY);
      normY += 4.5;
    });

    // Attentions Box
    doc.setFillColor(254, 242, 242);
    doc.setDrawColor(254, 202, 202);
    doc.roundedRect(margin + colWidth + 6, y, colWidth, 24, 2, 2, "FD");
    doc.setFont("helvetica", "bold");
    doc.setTextColor(153, 27, 27);
    doc.text("Requires Attention:", margin + colWidth + 10, y + 5);
    doc.setFont("helvetica", "normal");
    let attY = y + 10;
    attentions.slice(0, 3).forEach((a) => {
      doc.text(`• ${a}`, margin + colWidth + 10, attY);
      attY += 4.5;
    });

    y += 30;
  }

  // Questions
  const questions = result.questions || result.questions_for_doctor || [];
  if (questions.length > 0) {
    y = renderSectionTitle(doc, "QUESTIONS FOR DOCTOR", margin, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    questions.forEach((q) => {
      const qLines = doc.splitTextToSize(`• ${q}`, contentWidth - 8);
      doc.text(qLines, margin + 4, y);
      y += qLines.length * 4.5 + 2;
    });
  }

  // Footer
  const footerY = 280;
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(
    result.disclaimer ||
      "Disclaimer: AI interpretation only. Always review medical reports directly with a certified healthcare practitioner.",
    margin,
    footerY
  );

  doc.save(`${fileName.replace(/[^a-zA-Z0-9]/g, "_")}_Analysis.pdf`);
}

function renderSectionTitle(doc: jsPDF, title: string, margin: number, y: number): number {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(37, 99, 235);
  doc.text(title, margin, y);
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y + 2, margin + doc.internal.pageSize.getWidth() - margin * 2, y + 2);
  return y + 7;
}
