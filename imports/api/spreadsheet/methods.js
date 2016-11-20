/**
 * Created by stachrom on 04.09.16.
 */

import { Meteor } from 'meteor/meteor';

import GoogleSpreadsheet from 'google-spreadsheet';
import async from 'async';
import { _ } from 'meteor/underscore';


var doc = new GoogleSpreadsheet('1cLMrahvXUtQPm87szoTDoQWrtexxdeq5nDB9PM3BiR8');


async.series([
    function setAuth(step) {
        var creds = Meteor.settings.private.spreadsheet;
        doc.useServiceAccountAuth(creds, step);
    },
    function getInfoAndWorksheets(step) {
        doc.getInfo(function(err, info) {
            console.log('Loaded doc: '+info.title+' by '+info.author.email);
            sheet = info.worksheets[0];
            console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
            step();
        });
    },
    function workingWithRows(step) {
        // google provides some query options
        sheet.getRows({}, function( err, rows ){

            _.each(rows, function(row) {

                console.log(row.timestamp);
                console.log(row.anlass);
                console.log(row.mitglied);
                console.log(row.kategorie);
                console.log(row.rang);
                console.log(row.rangliste);

            });

        });
    }
]);












