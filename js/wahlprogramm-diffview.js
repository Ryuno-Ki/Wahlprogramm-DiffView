(function(global) {
    "use strict";
    var päas, node, choices, form, affectedAmendments, i, len, päa, ol, moveNextToAmendment, appendPäa, appendChoice, onUserChoice, buildAcceptRefuseFormOption, onSubmit, clearAmendment;

    päas = global.päas;
    node = document.getElementById("amendments");
    choices = document.getElementById("choices");
    form = document.getElementById("accept-refuse");
    affectedAmendments = {};

    moveNextToAmendment = function(amendment, item) {
        var affected, offset, i, len, a;
        affected = document.getElementById(amendment);
        item.style.position = "absolute";
        if (!(amendment in affectedAmendments)) {
            affectedAmendments[amendment] = [];
        }
        offset = 0;
        for (i = 0, len = affectedAmendments[amendment].length; i < len; i += 1) {
            a = affectedAmendments[amendment][i];
            offset += parseInt(a.height, 10);
        }
        item.style.top = affected.offsetTop + offset + "px";
        affectedAmendments[amendment].push(affected);
    };

    appendPäa = function(list, päa) {
        var li, amendment, i, len, subAmendment, subItem, content;

        li = document.createElement("li");
        li.dataset.relatedTo = "PÄA" + päa.number;
        if (päa.affects) {
            setTimeout(function() {
                moveNextToAmendment(päa.affects, li);
            }, 0);
        }
        li.appendChild(document.createTextNode("PÄA" + päa.number + ": "));
        if (päa.hasModules) {
            amendment = document.createElement("ol");
            for (i = 0, len = päa.amendment.length; i < len; i += 1) {
                subAmendment = päa.amendment[i];
                subItem = document.createElement("li");
                if (subAmendment.affects) {
                    setTimeout(function() {
                        moveNextToAmendment(subAmendment.affects, subItem);
                    }, 0);
                }
                content = document.createElement("blockquote");
                content.appendChild(document.createTextNode(subAmendment.content));
                subItem.appendChild(document.createTextNode("Modul " + subAmendment.moduleNumber + ": "));
                subItem.appendChild(content);
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

    buildAcceptRefuseFormOption = function(form, päa) {
        var select, option;

        select = form.getElementsByTagName("select")[0];
        option = document.createElement("option");
        option.value = "PÄA" + päa.number;
        option.textContent = "PÄA" + päa.number + ": " + päa.title;
        select.appendChild(option);
    };

    clearAmendment = function(amendment, state) {
        var choice;

        choice = choices.querySelector("label[for='" + amendment.value + "']");
        choice.classList.add(state.value);
        choice.parentElement.querySelector("input").disabled = true;
    };

    onSubmit = function(event) {
        var form, options, selected, inputs, checked;

        form = event.target;
        options = Array.prototype.slice.call(form.querySelectorAll("option"));
        selected = options.reduce(function(former, latter) {
            return former.selected ? former : latter;
        });
        inputs = Array.prototype.slice.call(form.querySelectorAll("input"));
        checked = inputs.reduce(function(former, latter) {
            return former.checked ? former : latter;
        });
        if (!checked.checked) {
            checked = null;
        }
        clearAmendment(selected, checked);

        selected.parentElement.removeChild(selected);
        if (checked !== null) {
            checked.checked = false;
        }
        event.preventDefault();
        return false;
    };

    ol = document.createElement("ol");
    node.appendChild(ol);
    for (i = 0, len = päas.length; i < len; i += 1) {
        päa = päas[i];
        appendPäa(ol, päa);
        appendChoice(choices, päa);
        buildAcceptRefuseFormOption(form, päa);
    }

    choices.addEventListener("change", onUserChoice);
    form.addEventListener("submit", onSubmit);
})(this)
