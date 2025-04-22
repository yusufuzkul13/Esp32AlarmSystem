function ProfAJAXPost(endpoint, data,fname="") {
    $.ajax({
      type: "POST",
      url: settings.FE_SOURCEAJAXURL + endpoint,
      async:true,
      data:JSON.stringify(data),
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        if(fname==""){ fname=endpoint;}
        if (typeof window["AFTER_" + fname] == "function") {
          window["AFTER_" + fname].call(this,result);
        }
      },
      failure: function (result) {
        if (typeof window["ERROR_" + fname] == "function") {
          window["ERROR_" + fname].call(this,result);
        }
      }
    });
  }
  
  function ProfAJAXGet(endpoint, data,fname="") {
    $.ajax({
      type: "GET",
      url: settings.FE_SOURCEAJAXURL + endpoint,
      async:true,
      data:JSON.stringify(data),
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        if(fname==""){ fname=endpoint;}
        if (typeof window["AFTER_" + fname] == "function") {
          window["AFTER_" + fname].call(this,result);
        }
      },
      failure: function (result) {
        if (typeof window["ERROR_" + fname] == "function") {
          window["ERROR_" + fname].call(this,result);
        }
      }
    });
  }
  
  function _FormatDateTime(date) {
    var allstring = " ";
    if (date != "güncel") {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            hours = d.getUTCHours(),
            minute = d.getUTCMinutes()
  
        if (month.length < 2) {
            month = '0' + month;
        }
  
        if (day.length < 2) {
            day = '0' + day;
        }
        if (day.length < 2) {
            day = '0' + day;
        }
        if (hours.length < 2) {
            hours = '0' + hours;
        }
        if (minute.length < 2) {
            minute = '0' + minute;
        }
  
        allstring += [year, month, day].join('-');
        allstring += " "
        allstring += [hours, minute].join(':');
        return allstring;
    }
    else {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            hours = d.getUTCHours(),
            minute = d.getUTCMinutes()
  
        if (day.length < 2) {
            day = '0' + day;
        }
        if (day.length < 2) {
            day = '0' + day;
        }
        if (hours.length < 2) {
            hours = '0' + hours;
        }
        if (minute.length < 2) {
            minute = '0' + minute;
        }
  
        allstring += [year, month, day].join('-');
        allstring += " "
        allstring += [hours, minute].join(':');
        return allstring;
    }
  }
  
  function _FormatDate(date) {
    var allstring = " ";
    if (date != "güncel") {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            hours = d.getUTCHours(),
            minute = d.getUTCMinutes()
  
        if (month.length < 2) {
            month = '0' + month;
        }
  
        if (day.length < 2) {
            day = '0' + day;
        }
        if (day.length < 2) {
            day = '0' + day;
        }
      
  
        allstring += [year, month, day].join('-');
        return allstring;
    }
    else {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            hours = d.getUTCHours(),
            minute = d.getUTCMinutes()
  
        if (day.length < 2) {
            day = '0' + day;
        }
        if (day.length < 2) {
            day = '0' + day;
        }
       
  
        allstring += [year, month, day].join('-');
        return allstring;
    }
  }
  
  function _FormatTime(date) {
    var allstring = " ";
    if (date != "güncel") {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            hours = d.getUTCHours(),
            minute = d.getUTCMinutes()
  
  
        if (hours.length < 2) {
            hours = '0' + hours;
        }
        if (minute.length < 2) {
            minute = '0' + minute;
        }
  
        allstring += [hours, minute].join(':');
        return allstring;
    }
    else {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            hours = d.getUTCHours(),
            minute = d.getUTCMinutes()
  
  
        if (minute.length < 2) {
            minute = '0' + minute;
        }
        allstring += [hours, minute].join(':');
        return allstring;
    }
  }
  var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] ??= []).push(x);
      return rv;
    }, {});
  };