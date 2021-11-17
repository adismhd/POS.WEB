class DynamicPage {

    constructor() {
        this.input = document.createElement('input');
        this.label = document.createElement('label');
        this.div = document.createElement('div');
        
    }

    CreateSection(data) {
        var section = document.createElement('section');
    }

    CreateTextBox(data) {
        var form_control = document.createElement('div');
        form_control.classList.add("form-group");
        var label = document.createElement('label');
        label.innerText = data.FieldDesc;
        var textbox = document.createElement('input');
        textbox.setAttribute("type", "text");
        textbox.classList.add("form-control");
        form_control.append(label, textbox);
        $("#container").append(form_control);

    }

    CreateCheckBox(data) {
        var form_check = document.createElement('div');
        form_check.classList.add("form-check");
        var checkbox = document.createElement('input');
        checkbox.setAttribute("type", "checkbox");
        checkbox.classList.add("form-check-input");
        var label = document.createElement('label');
        label.innerText = "Checkbox";
        label.classList.add("form-check-label");
        form_check.append(checkbox, label);

        $("#container").append(form_check);
    }

    CreateDropdownList(data) {
        var form_group = document.createElement('div');
        form_group.classList.add("form-group");
        var dropdown = document.createElement('select');
        dropdown.classList.add("form-control");
        var label = document.createElement('label');
        label.innerText = "Dropdown List";
        form_group.append(label, dropdown);
        $("#container").append(form_group);

        }

    CreateDatePicker(data) {
        var form_group = document.createElement('div');
        form_group.classList.add("form-group");
        var label = document.createElement('label');
        label.innerText = "Test";
        var datepicker = document.createElement('input');
        datepicker.setAttribute("type", "text");
        datepicker.classList.add("form-control");
        datepicker.classList.add("set-datepicker");

        var input_group_append = document.createElement('div');
        input_group_append.classList.add("input-group-append");

        var input_group = document.createElement('div');
        var input_text = document.createElement('div');
        input_text.classList.add("input-group-text");
        var icon = document.createElement('i');
        icon.classList.add("fa", "fa-calendar")
        input_group.classList.add("input-group");
        input_text.append(icon);
        input_group_append.append(input_text);
        input_group.append(datepicker, input_group_append);

        form_group.append(label, input_group);

        $("#container").append(form_group);
      }

}