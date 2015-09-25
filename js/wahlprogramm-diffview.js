(function(global) {
    "use strict";
    var päas, node, i, len, päa, ol, li, amendment, j, len2, subAmendment, subItem;

    päas = global.päas;
    node = document.getElementById("amendments");
    ol = document.createElement("ol");
    node.appendChild(ol);
    for (i = 0, len = päas.length; i < len; i += 1) {
        päa = päas[i];
        console.log(päa);
        li = document.createElement("li");
        if (päa.hasModules) {
            amendment = document.createElement("ol");
            for (j = 0, len2 = päa.amendment.length; j < len2; j += 1) {
                subAmendment = päa.amendment[j];
                subItem = document.createElement("li");
                subItem.appendChild(document.createTextNode(subAmendment.content));
                amendment.appendChild(subItem);
            }
        } else {
            amendment = document.createTextNode(päa.amendment);
        }
        li.appendChild(amendment);
        ol.appendChild(li);
    }

})(this)

