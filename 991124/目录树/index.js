$(function () {
    jtree_init();
    $("#searchTreeBtn").bind("click", function () {
        if ($("#searchTree").val() != "") {
            $("#searchTreeClose").show();
        }
        $('ul.tree').colExpAll({
            clickType: 'search'
        });
    });
    $("#searchTree").bind("keydown", function (e) {
        if (e.keyCode == 13) {
            if ($("#searchTree").val() != "") {
                $("#searchTreeClose").show();
            } else {
                $("#searchTreeClose").hide();
            };
            $('ul.tree').colExpAll({
                clickType: 'search'
            })
        }
    });
    $("#searchTreeClose").bind("click", function () {
        $("#searchTreeClose").hide();
        $("#searchTree").val("");
        $('ul.tree').colExpAll({
            clickType: 'close'
        });
    });
})

function jtree_init() {
    var $p = $(document);
    $("ul.tree", $p).jTree();
}
$.fn.extend({
    size: function () {
        return this.length;
    }
})