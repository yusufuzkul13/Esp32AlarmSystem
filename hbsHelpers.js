exports.debugOnly = function (optionalValue) {

    if (optionalValue) {
        console.log("Value");
        console.log("====================");
        console.log(optionalValue);
    }
};
exports.debug = function (optionalValue) {
    console.log("Current Context");
    console.log("====================");
    console.log(this);

    if (optionalValue) {
        console.log("Value");
        console.log("====================");
        console.log(optionalValue);
    }
    else {
        console.log("NegatifValue");
        console.log("====================");
        console.log(optionalValue);
    }
};
exports.prevID = function (value) {
return Number(value.toString()) - 1;
};
exports.nextID = function (value) {
    return Number(value.toString()) + 1;
};
    
exports.debugOnly = function (optionalValue) {

    console.log("Value");
    console.log("====================");
    console.log(optionalValue);

};
exports.moneyresult = function (value) {

    //return value;
    return Number(value.toString().replace(/[^0-9.-]+/g, ""));
};
exports.convertBool= function(v1=false){
    return (v1 === 'true');
}
exports.BooltoStr = function(v1){
    return v1.toString().toLowerCase()
}

exports.ifCond = function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
};
var window = {};

exports.textcrop = function (start, end, text, character) {
    if (typeof (character) == 'object') {
        character = '...'
    }
    return ' ' + text.substring(start, end) + character;
}
exports.replaceAll = function (searchStr, replaceStr, text) {
    var str = this;
    if (str.indexOf(searchStr) === -1) {
        return str;
    }
    return (str.replace(searchStr, replaceStr)).replaceAll(searchStr, replaceStr);
}
// exports.toplafatura = function (miktar,fiyat,indirim,kdv,otv) {

//     return result
// }
exports.times = function (n, block) {
    var accum = '';
    for (var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
}
exports.objtostr = function (n, block) {
    return JSON.stringify(n);
}

exports.FormatDate = function (date) {
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
exports.currformat = function (value) {
    if (value) {
        return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    }
    else {
        return "0";
    }
}
exports.switch = function(value, options) {
    this.switch_value = value;
    this.switch_break = false;
    return options.fn(this);
}
  
 exports.case = function(value, options) {
    if (value == this.switch_value) {
      this.switch_break = true;
      return options.fn(this);
    }
}
exports.default = function(value, options) {
     if (this.switch_break == false) {
       return options.fn(this);
     }
};


exports.toJsonString = function (value, options) {
    return JSON.stringify(value);
};
