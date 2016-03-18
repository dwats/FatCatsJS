
function(spreadsheet_key, cred){
  var GoogleSpreadsheet = require("google-spreadsheet");
  var doc = new GoogleSpreadsheet(spreadsheet_key);
  var sheet;

  async.series([
    function setAuth(step) {
      docs.useServiceAccountAuth(cred, step);
    },
    function getInfoAndWorksheets(step) {
        doc.getInfo(function(err, info) {
          console.log('Loaded doc: '+info.title+' by '+info.author.email);
          sheet = info.worksheets[0];
          console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
          step();
      });
    },
    function workingWithCells(step) {
      sheet.getCells({
        'min-row': 1,
        'max-row': 5,
        'return-empty': true
      }, function(err, cells) {
        var cell = cells[0];
        console.log('Cell R'+cell.row+'C'+cell.col+' = '+cells.value);

        // cells have a value, numericValue, and formula
        cell.value ==
        sheet.bulkUpdateCells(cells); //async

        step();
      });
    }
  ])
}
