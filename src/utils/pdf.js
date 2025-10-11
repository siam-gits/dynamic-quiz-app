import html2pdf from "html2pdf.js";

/**
 * Generates a quiz result PDF with English headings and Bangla-safe text.
 * Ensures that the table never starts at the top of a new page.
 */
export function downloadQuizPDF({
  name,
  topic,
  questions,
  answers,
  score,
  maxScore,
  percentage,
}) {
  const element = document.createElement("div");

  element.innerHTML = `
    <div style="
      font-family: 'Noto Sans Bengali', 'Siyam Rupali', sans-serif;
      padding: 40px 32px;
      color: #111;
      line-height: 1.6;
      background: white;
      box-sizing: border-box;
      min-height: 100%;
    ">
      <!-- Title -->
      <div style="page-break-inside: avoid; margin-bottom: 16px;">
        <h2 style="
          text-align: center;
          font-size: 22px;
          margin-bottom: 12px;
          color: #1d4ed8;
        ">
          Quiz Results
        </h2>

        <div style="font-size: 13px;">
          <p><b>Name:</b> ${name}</p>
          <p><b>Topic:</b> ${topic}</p>
          <p><b>Score:</b> ${score.toFixed(2)} / ${maxScore} (${percentage}%)</p>
        </div>
      </div>

      <!-- Table -->
<div style="margin-top: 12px;">
  <table style="
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    font-size: 12px;
    word-wrap: break-word;
    table-layout: fixed;
  ">
    <colgroup>
      <col style="width: 35px;">
      <col style="width: 220px;">
      <col style="width: 160px;">
      <col style="width: 110px;">
      <col style="width: 110px;">
    </colgroup>

    <!-- ✅ Header section -->
    <thead style="display: table-header-group;">
      <!-- invisible top border band to prevent missing top line -->
      <tr style="height: 2px; background: #ccc;">
        <td colspan="5" style="padding: 0; margin: 0;"></td>
      </tr>
      <tr style="background: #2563eb; color: white;">
        <th style="border: 1px solid #ccc; padding: 6px;">#</th>
        <th style="border: 1px solid #ccc; padding: 6px;">Question</th>
        <th style="border: 1px solid #ccc; padding: 6px;">Options</th>
        <th style="border: 1px solid #ccc; padding: 6px;">Your Answer</th>
        <th style="border: 1px solid #ccc; padding: 6px;">Correct Answer</th>
      </tr>
    </thead>

    <!-- ✅ Body -->
    <tbody style="display: table-row-group;">
      ${questions
        .map(
          (q, i) => `
          <tr style="page-break-inside: avoid; page-break-after: auto;">
            <td style="border: 1px solid #ccc; padding: 6px; text-align: center;">${i + 1}</td>
            <td style="border: 1px solid #ccc; padding: 6px;">${q.question}</td>
            <td style="border: 1px solid #ccc; padding: 6px;">${q.options.join(", ")}</td>
            <td style="border: 1px solid #ccc; padding: 6px;">${
              answers[i] || "Not Answered"
            }</td>
            <td style="border: 1px solid #ccc; padding: 6px;">${q.correct}</td>
          </tr>`
        )
        .join("")}
    </tbody>
  </table>
</div>



      <!-- Footer -->
      <div style="height: 60px;"></div>
      <p style="
        margin-top: 30px;
        text-align: center;
        font-size: 10px;
        color: #666;
      ">
        Generated on ${new Date().toLocaleString("en-US")}
      </p>
    </div>
  `;

  // ✅ PDF Options
  const options = {
    margin: [20, 15, 30, 15], // add top margin so table doesn't hit top
    filename: `quiz_result_${topic}_${name}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      scrollY: 0,
    },
    jsPDF: {
      unit: "pt",
      format: "a4",
      orientation: "portrait",
    },
pagebreak: {
  mode: ["css", "legacy"],
  avoid: ["table", "thead", "tr"],
},


  };

  html2pdf().set(options).from(element).save();
}
