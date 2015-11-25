/**
 * Export an array of Objects to a CSV file.
 * Code from
 * http://halistechnology.com/2015/05/28/use-javascript-to-export-your-data-as-csv/
 *
 * Modified to ES6 module by Matt Perkins, 11/23/15
 *
 * Automatic downloading only works in Webkit. For FF or other browsers, pass an
 * <a> tag reference to the ExportCVS on page render. It'll will append the proper
 * download information to it and the download will happen with the user presses
 * the link.
 *
 * Usage
 * 1. Import
 * 2. ExportCSV({filename: 'data.csv', source:dataArray, element:anchorTag});
 */

function convertArrayOfObjectsToCSV(args) {
  var result, ctr, keys, columnDelimiter, lineDelimiter, data;

  data = args.data || null;
  if (data == null || !data.length) {
    return null;
  }

  columnDelimiter = args.columnDelimiter || ',';
  lineDelimiter   = args.lineDelimiter || '\n';

  keys = Object.keys(data[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach(item => {
    ctr = 0;
    keys.forEach(function (key) {
      if (ctr > 0) {
        result += columnDelimiter;
      }
      result += item[key];
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

// Needs to be global
window.downloadCSV = function ({filename, source, element}) {
  var data, link;
  var csv = convertArrayOfObjectsToCSV({
    data: source
  });
  if (csv == null) {
    return;
  }

  filename = filename || 'export.csv';

  if (!csv.match(/^data:text\/csv/i)) {
    csv = 'data:text/csv;charset=utf-8,' + csv;
  }
  data = encodeURI(csv);

  if(!element) {
    // This only works in Chrome
    console.warn('Automatic CSV download only works in Chrome. Pass an <A> elem for other browsers.');
    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.dispatchEvent(evt);
    link.click();
  } else {
    element.setAttribute('href', data);
    element.setAttribute('download', filename);
  }

};

export default function (args) {
  downloadCSV(args);
}