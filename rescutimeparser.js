
function getRescutimeData() {

    var day = "2017-01-09";
    var rtAPIkey = 'B639daNB9cIPMCFK3ulFjwliHdu5Eygc2Bw0BW8T';
    var apiURL = "https://www.rescuetime.com/anapi/data";//?callback=?

    $('#restructured-data-table tr').remove();
    document.strucData = {};
    document.strucArray = [];
    var currentDate = $( "#datepicker" ).datepicker( "getDate" );
    day = $.datepicker.formatDate( "yy-mm-dd", currentDate );
    console.log("day",day);
    $.getJSON( apiURL, {
        key:rtAPIkey,
        rs: "minute",
        rb: day,
        re: day,
        pv: 'interval',
        rk: 'document',
        format: "json"
    }).done(function( data ) {

        //console.log('data notes',data['notes']);
        console.log('data row_headers',data['row_headers']);
        //console.log('data rows',data['rows']);
        $.each( data.rows, function( i, row ) {
            //$( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
            var time = row[0];
            var duration = row[1];
            var app = row[3];
            var title = row[4];
            var category = row[5];
            var rowObj = {time:time,project:'UNALOCATED',duration:duration,category:category,app:app,title:title};
            if (document.strucData[time] == undefined) {
                document.strucData[time] = {timeslice:time,total:0,missing:0,project:[{UNALOCATED:0}],data:[]};

                document.strucArray.push(document.strucData[time]);
                $.each( document.proj, function( projname, keywords ) {
                    document.strucData[time].project[0][projname] = 0;
                    //project[1] is fixedup time
                    //if (projname != 'DOOR3') {document.strucData[time].project[1][projname] = 0;}
                });
            }
            document.strucData[time]['data'].push( rowObj );
            document.strucData[time]['total'] += duration;
            document.strucData[time]['missing'] = 300 - document.strucData[time]['total'];
            $.each( document.proj, function( projname, keywords ) {
                if (rowObj['project'] == 'UNALOCATED') {
                    if (title.toLowerCase().trim() == 'no details') { title = app; }
                    if (title.toLowerCase().indexOf('New Tab') >= 0) { title = app; }
                    if (keywords.some(function (v) {
                            return (title).toLowerCase().indexOf(v) >= 0;
                        })) {
                        document.strucData[time].project[0][projname] += duration;
                        rowObj['project'] = projname;
                    }
                }
            });
            $.each( document.probablyproj, function( projname, keywords ) {
                if (title.toLowerCase().trim() == 'no details') { title = app; }
                if (title.toLowerCase().indexOf('New Tab') >= 0) { title = app; }
                if (rowObj['project'] == 'UNALOCATED') {
                    if (keywords.some(function(v) { return (title).toLowerCase().indexOf(v) >= 0; }))  {
                        document.strucData[time].project[0][projname]    += duration;
                        rowObj['project'] = projname;
                    }
                }
            });
            $.each( document.categoryproj, function( projname, keywords ) {
                if (rowObj['project'] == 'UNALOCATED') {
                    if (keywords.some(function(v) { return (category).toLowerCase().indexOf(v) >= 0; }))  {
                        document.strucData[time].project[0][projname]    += duration;
                        rowObj['project'] = projname;
                    }
                }
            });
            if (rowObj['project'] == 'UNALOCATED') { document.strucData[time].project[0]['UNALOCATED']    += duration; }
        });

        $.each( document.strucData, function( timeslice, row ) {
            // fix up data, distribute missing, DOOR3, and UNALOCATED proportionaly across other projects
            // sum loose time
            // calc % of remaining time existing on other projects
            // divide remaing time by each proj %, floor it, add it to proj (in new obj)
            // check total in new obj and fill roudning error on largest proj

            $.each( document.probablyproj, function( projname, keywords ) {
                //project[1] is fixedup time
                //document.strucData[timeslice].project[1][projname] = 0;
            });
        });

        $.each( document.strucData, function( timeslice, row ) {
            // sum proj totals
        });

        addTable(document.strucArray, $("#restructured-data-table"));

        $('tr.depth-0').click( function( event ) {
            event.preventDefault();
            //$(this).find('td.col-data').toggle();
            $(this).toggleClass('selected');
        });

//                    document.jsonQobj=jsonQ(document.strucData);
//                    document.WAHV = document.jsonQobj.find('document',function () {
//                        return this[3].toLowerCase().indexOf('wahv') !== -1;
//                        //return this[0].toLowerCase().includes('wahv');
//                    });

    });

}