(function(global) {
    "use strict";
    var päas, node, choices, i, len, päa, ol, appendPäa, appendChoice, onUserChoice;

    päas = global.päas;
    node = document.getElementById("amendments");
    choices = document.getElementById("choices");

    appendPäa = function(list, päa) {
        var li, amendment, i, len, subAmendment, subItem;

        li = document.createElement("li");
        li.dataset.relatedTo = "PÄA" + päa.number;
        if (päa.hasModules) {
            amendment = document.createElement("ol");
            for (i = 0, len = päa.amendment.length; i < len; i += 1) {
                subAmendment = päa.amendment[i];
                subItem = document.createElement("li");
                subItem.appendChild(document.createTextNode(subAmendment.content));
                amendment.appendChild(subItem);
            }
        } else {
            amendment = document.createTextNode(päa.amendment);
        }
        li.appendChild(amendment);
        list.appendChild(li);
    };

    appendChoice = function(container, päa) {
        var item, label, checkbox;
        item = document.createElement("p");
        label = document.createElement("label");
        checkbox = document.createElement("input");

        item.appendChild(checkbox);
        item.appendChild(label);
        container.appendChild(item);

        checkbox.type = "checkbox";
        checkbox.id = "PÄA" + päa.number;
        checkbox.checked = true;
        label.setAttribute("for", "PÄA" + päa.number);
        label.appendChild(document.createTextNode(päa.title));
    };

    onUserChoice = function(event) {
        var checkbox, selector, item;
        checkbox = event.target;
        selector = checkbox.id;
        item = amendments.querySelector("[data-related-to='" + selector + "']");
        if (checkbox.checked) {
            item.classList.remove("unselected");
        } else {
            item.classList.add("unselected");
        }
    };

    ol = document.createElement("ol");
    node.appendChild(ol);
    for (i = 0, len = päas.length; i < len; i += 1) {
        päa = päas[i];
        appendPäa(ol, päa);
        appendChoice(choices, päa);
    }

    choices.addEventListener("change", onUserChoice);
})(this)
