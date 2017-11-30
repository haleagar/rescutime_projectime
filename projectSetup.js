/**
 * Created by haleager on 1/24/17.
 */
$( function() {
    console.log("ready!");
    document.proj = {};
    document.probablyproj = {};
    document.categoryproj = {};

      document.proj['NJIT'] = $('#keywords-njit').val().toLowerCase().trim().split("\n");
      document.probablyproj['NJIT'] = $('#probablykeywords-njit').val().toLowerCase().trim().split("\n");

      document.proj['WAHV'] = $('#keywords-wahv').val().toLowerCase().trim().split("\n");
      document.probablyproj['WAHV'] = $('#probablykeywords-wahv').val().toLowerCase().trim().split("\n");

    document.proj['GREENHILL'] = $('#keywords-green').val().toLowerCase().trim().split("\n");
    document.probablyproj['GREENHILL'] = $('#probablykeywords-green').val().toLowerCase().trim().split("\n");

    document.proj['PCH'] = $('#keywords-pch').val().toLowerCase().trim().split("\n");
    document.probablyproj['PCH'] = $('#probablykeywords-pch').val().toLowerCase().trim().split("\n");

    document.proj['PGPF'] = $('#keywords-pgpf').val().toLowerCase().trim().split("\n");
    document.probablyproj['PGPF'] = $('#probablykeywords-pgpf').val().toLowerCase().trim().split("\n");

    document.proj['RESOLUTION'] = $('#keywords-res').val().toLowerCase().trim().split("\n");
    document.probablyproj['RESOLUTION'] = $('#probablykeywords-res').val().toLowerCase().trim().split("\n");

    document.proj['PERSONAL'] = $('#keywords-personal').val().toLowerCase().trim().split("\n");
    document.probablyproj['PERSONAL'] = $('#probablykeywords-personal').val().toLowerCase().trim().split("\n");
    document.categoryproj['PERSONAL'] = $('#categorykeywords-personal').val().toLowerCase().trim().split("\n");

    document.proj['DOOR3'] = $('#keywords-door3').val().toLowerCase().trim().split("\n");
    document.probablyproj['DOOR3'] = $('#probablykeywords-door3').val().toLowerCase().trim().split("\n");
    document.categoryproj['DOOR3'] = $('#categorykeywords-door3').val().toLowerCase().trim().split("\n");
    document.jsonQobj = {};
    document.strucData = {};
    document.strucArray = [];
});