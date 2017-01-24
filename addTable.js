// thanks to https://jsfiddle.net/7og5348w/3/
function addTable(list, appendObj, depth) {
    depth = depth || 0;
    var columns = addAllColumnHeaders(list, appendObj);

    for (var i = 0; i < list.length; i++) {
        var row$ = $('<tr/>');
        row$.addClass('depth-'+depth);
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = list[i][columns[colIndex]];

            if (cellValue == null) {
                cellValue = "";
            }

            if (cellValue.constructor === Array)
            {
                $a = $('<td/>');
                row$.append($a);
                addTable(cellValue, $a, depth+1);
                $a.addClass('col-'+columns[colIndex]);

            } else if (cellValue.constructor === Object)
            {

                var array = $.map(cellValue, function (value, index) {
                    return [value];
                });

                $a = $('<td/>');
                row$.append($a);
                addObject(array, $a, depth+1);
                $a.addClass('col-'+columns[colIndex]);

            } else {
                if (colIndex <= 1 ) {row$.addClass('row-'+cellValue);}

                var $newTD = $('<td/>').html(cellValue);
                row$.append($newTD);
                $newTD.addClass('col-'+columns[colIndex]);
            }
        }
        appendObj.append(row$);
    }
}


function addObject(list, appendObj, depth) {
    depth = depth || 0;
    for (var i = 0; i < list.length; i++) {
        var row$ = $('<tr/>');
        row$.addClass('depth-'+depth);

        var cellValue = list[i];

        if (cellValue == null) {
            cellValue = "";
        }

        if (cellValue.constructor === Array)
        {
            $a = $('<td/>');
            row$.append($a);
            addTable(cellValue, $a, depth+1);
            $a.addClass('col-'+columns[colIndex]);


        } else if (cellValue.constructor === Object)
        {

            var array = $.map(cellValue, function (value, index) {
                return [value];
            });

            $a = $('<td/>');
            row$.append($a);
            addObject(array, $a, depth+1);
            $a.addClass('col-'+columns[colIndex]);

        } else {
            var $newTD = $('<td/>').html(cellValue);
            row$.append($newTD);
            $newTD.addClass('col-');
        }
        appendObj.append(row$);
    }
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records
function addAllColumnHeaders(list, appendObj)
{
    var columnSet = [];
    var headerTr$ = $('<tr/>');

    for (var i = 0; i < list.length; i++) {
        var rowHash = list[i];
        for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1) {
                columnSet.push(key);
                var $newTR = $('<th/>').html(key)
                headerTr$.append($newTR);
                $newTR.addClass('col-'+key);
            }
        }
    }
    appendObj.append(headerTr$);

    return columnSet;
}
