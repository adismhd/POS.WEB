/* Catatan Bowo 
_url sample nya: ../DocumentChecking/GetReason
DocumentChecking   : nama Contoller
GetReason          : nama methode

objectid Di Isi dengan nama property screen contoh:
    <select class="form-control" id="Reason"></select>
maka objectid Di Isi dengan Reason
 */

function GetDropDownValue(_url, objectid) {
    $.ajax({
        url: _url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            var html = "";
            if (result.data != null) {
                $("#" + objectid + "").val("");
                //var html = "";
                for (var i = 0; i < result.data.length; i++) {
                    if (i == 0)
                        html += "<option value=''>Pilih...</option>"

                    html += "<option value=" + result.data[i].id + ">" + result.data[i].description + "</option>"
                }
                //$("#" + objectid + "").html(html);
            }
            else {
                html = "<option value=''>Pilih...</option>"
            }
            $("#" + objectid + "").html(html);
        },
        failure: function (response) {
            alert(response.d);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jQuery.parseJSON(jqXHR.responseText));
        },
        async: false,
        processData: false
    });
}

function GetDropDownValueWithParam(_url, objectid, par1, par2 = "", par3 = "") {
    var param = {
        Param1: par1,
        Param2: par2,
        Param3: par3
    }

    $.ajax({
        type: 'POST',
        dataType: 'json',
        cache: false,
        contentType: 'application/json; charset=utf-8',
        url: _url,
        data: JSON.stringify(param),
        //data: "{'id':'" + par + "'}",
        success: function (result) {
            //console.log(result);
            var html = "";
            if (result.data != null) {
                $("#" + objectid + "").val("");
                //var html = "";
                for (var i = 0; i < result.data.length; i++) {
                    if (i == 0)
                        html += "<option value=''>Pilih...</option>"

                    html += "<option value=" + result.data[i].id + ">" + result.data[i].description + "</option>"
                }
                //$("#" + objectid + "").html(html);
            }
            else {
                html = "<option value=''>Pilih...</option>"
            }
            $("#" + objectid + "").html(html);
        },
        failure: function (response) {
            alert(response.d);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jQuery.parseJSON(jqXHR.responseText));
        },
        async: false,
        processData: false
    });
}

function LoadDataKodePos(zipCode, kelurahan, kecamatan, kota, provinsi, tableBodyName, tableName, idBtnInRow) {
    var param = {
        zip_Code: zipCode,
        kelurahan: kelurahan,
        kecamatan: kecamatan,
        kota: kota,
        provinsi: provinsi,
        zip_Desc: ""
    };

    $.ajax({
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        cache: false,
        url: "../KodePos/GetKodePosAsync",
        data: JSON.stringify(param),
        success: function (Data, textStatus, jqXHR) {
            $('#' + tableBodyName + '').empty();
            var trHTML = '';
            $.each(Data.data, function (i, rowData) {
                var url = "<a href='javascript:void(0)' class='btn btn-secondary' id='|' data-dismiss='modal'>&nbsp;Pilih</a>";
                url = url.replace("|", idBtnInRow);
                trHTML += '<tr>' +
                    "<td style='display:none'>" + rowData.zip_Seq + "</td>" +
                    "<td>" + rowData.zip_Code + "</td>" +
                    "<td>" + rowData.kelurahan + "</td>" +
                    "<td>" + rowData.kecamatan + "</td>" +
                    "<td>" + rowData.kota + "</td>" +
                    "<td>" + rowData.provinsi + "</td>" +
                    "<td style='text-align: center;'>" + url + "</td>" +
                    '</tr>';
            });
            $('#' + tableName + '').append(trHTML);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("LoadDataKodePos Error.")
        }
    });
}

function SetDataKodePos(currentRow, kodePos, kelurahan, kecamatan, kabupatenKota, provinsi, modalId) {
    var _zipCode = currentRow.find("td:eq(1)").text();
    var _kelurahan = currentRow.find("td:eq(2)").text();
    var _kecamatan = currentRow.find("td:eq(3)").text();
    var _kota = currentRow.find("td:eq(4)").text();
    var _provinsi = currentRow.find("td:eq(5)").text();

    $('#' + kodePos + '').val(_zipCode);
    $('#' + kelurahan + '').val(_kelurahan);
    $('#' + kecamatan + '').val(_kecamatan);
    $('#' + kabupatenKota + '').val(_kota);
    $('#' + provinsi + '').val(_provinsi);
    $('#' + modalId + '').modal().hide();
}


function SearchKodePos(kodePos, kelurahan, kecamatan, kabupatenKota, provinsi, tableBodyName, tableName, idBtnInRow) {
    var _zipCode = $('#' + kodePos + '').val();
    var _kelurahan = $('#' + kelurahan + '').val();
    var _kecamatan = $('#' + kecamatan + '').val();
    var _kota = $('#' + kabupatenKota + '').val();
    var _provinsi = $('#' + provinsi + '').val();

    LoadDataKodePos(_zipCode, _kelurahan, _kecamatan, _kota, _provinsi, tableBodyName, tableName, idBtnInRow);
}

function ClearKodePos(kodePos, kelurahan, kecamatan, kabupatenKota, provinsi, tableBodyName, tableName, idBtnInRow) {
    $('#' + kodePos + '').val("");
    $('#' + kelurahan + '').val("");
    $('#' + kecamatan + '').val("");
    $('#' + kabupatenKota + '').val("");
    $('#' + provinsi + '').val("");

    LoadDataKodePos("", "", "", "", "", tableBodyName, tableName, idBtnInRow);
}

//Begin Download File
function Base64ToBytes(base64) {
    var s = window.atob(base64);
    var bytes = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) {
        bytes[i] = s.charCodeAt(i);
    }
    return bytes;
};

function DownloadFile(fileContentBase64, fileNameWithExt) {
    var bytes = Base64ToBytes(fileContentBase64);
    var blob = new Blob([bytes], { type: "application/octetstream" });
    //Check the Browser type and download the File.
    var isIE = false || !!document.documentMode;
    if (isIE) {
        window.navigator.msSaveBlob(blob, fileNameWithExt);
    } else {
        var url = window.URL || window.webkitURL;
        link = url.createObjectURL(blob);
        var a = $("<a />");
        a.attr("download", fileNameWithExt);
        a.attr("href", link);
        $("body").append(a);
        a[0].click();
        $("body").remove(a);
    }
}
//End Download File

function DisabledField(formId) {
    if (GetUrlVars()["IsReadOnly"] == "1") {
        $('#' + formId + '').find('select, textarea, input').each(function () {
            var idForm = $(this).attr('id');
            $('#' + idForm + '').prop('disabled', true);
        });

        $('#' + formId + '').find('button, a').each(function () {
            $(this).hide();
        });
        $('#deleteInboxMutasi').hide();
        
    }
}

function GetUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

