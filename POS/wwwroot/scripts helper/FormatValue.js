function MoneyFormat(val) {
    //val = Number(val).toFixed();
    val = Number(val);
    var components = val.toString().split(".");
    components[0] = components[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return components.join(".");
}
function InputMoneyFormat(fieldId, val) {
    $('#' + fieldId + '').on("cut copy paste", function (e) {
        e.preventDefault();
    });

    var lastLetter = val[val.length - 1];
    if (!lastLetter.includes(".")) {
        //if (val.includes(".")) {
        //    alert('Dibulatkan');
        //}
        if (val.includes("NaN")) {
            alert('Numeric only')
            val = 0;
        }

        var orig = OriginalFormat(val);
        $('#' + fieldId + '').val(MoneyFormat(orig));
    }
}
function OriginalFormat(val) {
    if (val !== null && val !== undefined) {
        val = val.toString();
        var result = (val).replace(/,/g, "")
        return Number(result);
    }
}

$('.number').on("cut copy paste", function (e) {
    e.preventDefault();
});

$('.is-numeric').keypress(function (e) {
    e = e || window.event;
    var charCode = (typeof e.which == "number") ? e.which : e.keyCode;

    // Allow non-printable keys
    if (!charCode || charCode == 8 /* Backspace */) {
        return;
    }

    var typedChar = String.fromCharCode(charCode);

    // Allow numeric characters
    if (/\d/.test(typedChar)) {
        return;
    }

    // Allow the minus sign (-) if the user enters it first
    //if (typedChar == "-" && this.value == "") {
    //    return;
    //}

    //if (charCode == 46) {
    //    var txt = $(this).val();
    //    if (!(txt.indexOf(".") > -1)) {
    //        return;
    //    }
    //}

    //if (event.keyCode == 46) {return true;}
    // In all other cases, suppress the event
    return false;
});

function ValidateMandatory(formId) {
    var fail = false;
    var fail_log = '';
    $('#' + formId + '').find('select, textarea, input').each(function () {
        if (!$(this).prop('required')) {
        } else {
            if (!$(this).val() && ($(this).is(":visible") || !$(this).is(":hidden"))) {
                fail = true;
                fail_log = "Mohon isi semua field mandatory.";
                var idForm = $(this).attr('id');
                $('#' + idForm + '').prop('disabled', false);
            }
        }
    });
    if (!fail) {
        return true;
    } else {
        alert(fail_log);
    }
}

function InputIsNumeric(fieldId, typeField) {
    typeField = typeField.toLowerCase();
    if (typeField == "input") {
        var value = OriginalFormat($('#' + fieldId + '').val());
        if ($.isNumeric(value) == false) {
            return 0;
        }
        else {
            return value;
        }
    }
    else {
        var value = OriginalFormat($('#' + fieldId + '').text());
        if ($.isNumeric(value) == false) {
            return 0;
        }
        else {
            return value;
        }
    }
}

function ValueIsNumeric(value) {
    value = OriginalFormat(value);
    if ($.isNumeric(value) == false) {
        return 0;
    }
    else {
        return value;
    }
}

//DIGUNAKAN PADA SAAT SAVE DATA
function dateTo_MmDdYyyy(date) {
    //29/08/2020
    if (date != "") {
        var from = date.split("/")
        console.log(from)
        var f = (from[1] + "/" + from[0] + "/" + from[2])
        return f;
    }
    else {
        return "";
    }
}

//DIGUNAKAN PADA SAAT RETRIVE DATA
function dateTo_DdMmYyyy(date) {
    if (date == null)
        return "";

    //8/28/2020 12:00:00 AM
    if (date != "") {
        var from = date.split("/")

        var bln = "";
        if (from[0].length > 1) {
            bln = from[0];
        }
        else {
            bln = '0' + from[0];
        }
        var hari = "";
        if (from[1].length > 1) {
            hari = from[1];
        }
        else {
            hari = '0' + from[1];
        }
        var f = (hari + "/" + bln + "/" + from[2].split(" ")[0])
        return f;
    }
    else {
        return "";
    }
}


function maxLengthVal(value, id, length) {
    if (value.length >= Number(length))
        alert('Maksimal ' + length + ' karakter.')
    $("#" + id + "").attr('maxlength', length);
}

/*begin set back url*/
function DirectUrlTo() {
    var winLoc = window.location;
    var param = {
        url: ".." + winLoc.pathname + winLoc.search
    }

    $.ajax({
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        cache: false,
        url: "../UrlHelpers/BackUrlAsync",
        data: JSON.stringify(param),
        success: function (Data, textStatus, jqXHR) {
        }
        //,
        //error: function (jqXHR, textStatus, errorThrown) {
        //    alert("BackUrl Error.");
        //}
    });
}
/*end set back url*/

/*begin Update Status Main Track*/
/*
processId di isi:
    1 => Proceed
    2 => Send Back
    3 => Cancel
    4 => Reject
    5 => Done (Data Found)
    6 => Done (Data Not Found)

directUrlTo di isi setelah proses selesai akan di direct ke url mana
 */
function UpdateStatus_MainTrack(applicationNo, processId, directUrlTo) {
    var param = {
        applicationNo: applicationNo,
        processId: processId
    };

    $.ajax({
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        cache: false,
        url: "../UpdateStatus/UpdateStatusAsync",
        data: JSON.stringify(param),
        success: function (Data, textStatus, jqXHR) {
            alert(Data.responseMsg)
            if (Data.responseCode == "0") {
                window.location.href = directUrlTo;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("UpdateStatus_MainTrack Error.");
        }
    });
}
/*end Update Status Main Track*/

//function test() {
//    $('#table-inboxMutasi tr').each(function () {
//        alert("test ini")
//        var Cells = this.getElementsByTagName("td");
//        console.log(Cells);
//        if (Cells != undefined && Cells.length > 0) {
//            $(this).find('button').attr("style", "visibility: hidden");
//        }
//    });
//}

