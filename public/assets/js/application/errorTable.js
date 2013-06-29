
var error_filters = {};

function tagsFormatter(cellvalue, options, rowObject){
    return cellvalue[0].id;
}
$.views.settings.delimiters("@%", "%@");

function fillData() {
    $.getJSON('api/error/facets', error_filters, function (data) {

        var facets = [];
        $.each(data, function () {
            facets.push(this);
        });
        var app = {
            facets: facets
        };
        var facetsTemplate = $.templates("#facetTmpl");
        facetsTemplate.link("#facets", app);

    });

}


$(document).ready(function () {

    fillData();

    jQuery.ajaxSetup({
        dataFilter: function(data, dataType) {
            var obj = jQuery.parseJSON(data);
            console.log(obj.page);
            return data;
        }
    });

    $(document).on("click", '.revert',function(event){

        $(event.target).parents(".facet").toggleClass("active",false);
        $(event.target).parents(".facet").find(".facet-item").toggleClass("selected",false);
        delete error_filters[$(event.target).parent(".revert").attr("data-facet")] ;
        $("#list").setGridParam({postData: null});
        $('#list').setGridParam({ postData: {filters:error_filters} , lol: "troll"}).trigger( 'reloadGrid' );
    });

    $(document).on("click", '.facet-item a',function(event){
        $(event.target).parents(".facet").find(".facet-item").toggleClass("selected",false);
        $(event.target).parent(".facet-item").toggleClass("selected",true);
        $(event.target).parents(".facet").toggleClass("active",true);
        error_filters[$(event.target).attr("data-facet")]={name:$(event.target).attr("data-facet"), operator:"=", value: $(event.target).attr("data-facet-value")};

        $('#list').setGridParam({ postData: {filters:error_filters} }).trigger( 'reloadGrid' );
    });

    $("#list").jqGrid({
        url: "api/error",
        height:'auto',
        autowidth: true,
        datatype: "json",
        mtype: "GET",
        colNames: ["Identifier", "Resource", "Property",  "query", "tags"],
        colModel: [
            { name: "id" },
            { name: "violationRoot.0.label" },
            { name: "inaccurateProperty.0.label", align: "right" },
           // { name: "test.0.id",  align: "right" },
            { name: "query",  align: "right" },
            { name: "subject", sortable: false,formatter:tagsFormatter  }
        ],
        jsonReader : {
            root:"errors",
            page: "page",
            total: "total",
            records: "records",
            cell: "",
            id: "0"
        },
        pager: "#pager",
        rowNum: 10,
        rowList: [10, 20, 30],
        sortname: "id",
        sortorder: "desc",
        viewrecords: true,
        gridview: true,
        autoencode: true,
        caption: "DBpedia Errors"
    });
    jQuery("#list").jqGrid('navGrid','#pager',{edit:false,add:false,del:false});
    //fillData();
});

