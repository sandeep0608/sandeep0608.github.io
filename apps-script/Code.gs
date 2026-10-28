/**
 * Google Apps Script — receives contact-form submissions and appends them
 * to this Google Sheet (and optionally emails you).
 *
 * Setup: Extensions → Apps Script in your Sheet, paste this, Save,
 * then Deploy → New deployment → Web app (Execute as: Me, Access: Anyone).
 * Copy the Web app URL into js/main.js  ->  var LEAD_ENDPOINT = "..."
 *
 * Sheet header row (row 1):
 * Timestamp | Name | Email | Phone | Message | Page
 */
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Leads') || ss.getSheets()[0];
    var d = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      d.name || '', d.email || '', d.phone || '',
      d.message || '', d.page || ''
    ]);

    // Optional: email yourself on every new lead. Edit the address or delete this block.
    MailApp.sendEmail(
      'tstsandeep@gmail.com',
      'New lead: ' + (d.name || 'Website enquiry'),
      'Name: ' + (d.name || '') +
      '\nEmail: ' + (d.email || '') +
      '\nPhone: ' + (d.phone || '') +
      '\nMessage: ' + (d.message || '') +
      '\nPage: ' + (d.page || '')
    );

    return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
