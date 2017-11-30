
function getRescutimeData() {

    $('#loading-overlay').show();
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
            var time = convertTime (row[0]);
            var duration = row[1];
            var app = row[3];
            var title = row[4];
            var category = row[5];
            var rowObj = {time:time,project:'UNALLOCATED',duration:duration,category:category,app:app,title:title};
            if (document.strucData[time] == undefined) {
                document.strucData[time] = {timeslice:time,total:0,missing:0,overcount:0,project:[{UNALLOCATED:0}],data:[]};

                document.strucArray.push(document.strucData[time]);
                $.each( document.proj, function( projname, keywords ) {
                    document.strucData[time].project[0][projname] = 0;
                    //project[1] is fixedup time
                    //if (projname != 'DOOR3') {document.strucData[time].project[1][projname] = 0;}
                });
            }
            document.strucData[time]['data'].push( rowObj );
            document.strucData[time]['total'] += duration;
            if (document.strucData[time]['total'] <=300) {
                document.strucData[time]['missing'] = 300 - document.strucData[time]['total'];
            } else {
                document.strucData[time]['missing'] = 0;
                document.strucData[time]['overcount'] = document.strucData[time]['total'] - 300;
            }
            $.each( document.proj, function( projname, keywords ) {
                if (rowObj['project'] == 'UNALLOCATED') {
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
                if (rowObj['project'] == 'UNALLOCATED') {
                    if (keywords.some(function(v) { return (title).toLowerCase().indexOf(v) >= 0; }))  {
                        document.strucData[time].project[0][projname]    += duration;
                        rowObj['project'] = projname;
                    }
                }
            });
            $.each( document.categoryproj, function( projname, keywords ) {
                if (rowObj['project'] == 'UNALLOCATED') {
                    if (keywords.some(function(v) { return (category).toLowerCase().indexOf(v) >= 0; }))  {
                        document.strucData[time].project[0][projname]    += duration;
                        rowObj['project'] = projname;
                    }
                }
            });
            if (rowObj['project'] == 'UNALLOCATED') { document.strucData[time].project[0]['UNALLOCATED']    += duration; }
        });

        $.each( document.strucData, function( timeslice, row ) {
            // fix up data, distribute missing, DOOR3, and UNALLOCATED proportionaly across other projects
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


        // after parse setup
        addTable(document.strucArray, $("#restructured-data-table"));

        $('tr.depth-0').click( function( event ) {
            event.preventDefault();
            //$(this).find('td.col-data').toggle();
            $(this).toggleClass('selected');
        });

            if($("input#checkbox-unallocated")[0].checked) {
                $('tr.row-UNALLOCATED').hide();
            } else {
                $('tr.row-UNALLOCATED').show();
            }
            if($("input#checkbox-njit")[0].checked) {
              $('tr.row-NJIT').hide();
            } else {
              $('tr.row-WAHV').show();
            }
            if($("input#checkbox-wahv")[0].checked) {
              $('tr.row-WAHV').hide();
            } else {
              $('tr.row-WAHV').show();
            }
            if($("input#checkbox-greenhill")[0].checked) {
                $('tr.row-GREENHILL').hide();
            } else {
                $('tr.row-GREENHILL').show();
            }
            if($("input#checkbox-pch")[0].checked) {
                $('tr.row-PCH').hide();
            } else {
                $('tr.row-PCH').show();
            }
            if($("input#checkbox-pgpf")[0].checked) {
                $('tr.row-PGPF').hide();
            } else {
                $('tr.row-PGPF').show();
            }
            if($("input#checkbox-resolution")[0].checked) {
                $('tr.row-RESOLUTION').hide();
            } else {
                $('tr.row-RESOLUTION').show();
            }
            if($("input#checkbox-personal")[0].checked) {
                $('tr.row-PERSONAL').hide();
            } else {
                $('tr.row-PERSONAL').show();
            }
            if($("input#checkbox-door3")[0].checked) {
                $('tr.row-DOOR3').hide();
            } else {
                $('tr.row-DOOR3').show();
            }

        $('button#show-totals').click();
        $('#loading-overlay').hide();

//                    document.jsonQobj=jsonQ(document.strucData);
//                    document.WAHV = document.jsonQobj.find('document',function () {
//                        return this[3].toLowerCase().indexOf('wahv') !== -1;
//                        //return this[0].toLowerCase().includes('wahv');
//                    });

    });

}