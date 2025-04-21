function TryParseInt(str, defaultValue) {
    var retValue = defaultValue;
    if (str !== null) {
        if (str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseInt(str);
            }
        }
    }
    return retValue;
}
function ExFrontEndParams(prefix) {
    let FE={};
    let ob = Object.keys(process.env);
    for (let i = 0; i < ob.length; i++) {
         let env = ob[i];
         if(env.indexOf(prefix)!=-1){
            FE[env] = process.env[env];
         }
    }
    return FE;
}




function ValidEmailRegex(email) {

    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

}

function groupBy (xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
  

module.exports.ValidEmailRegex = ValidEmailRegex;
module.exports.TryParseInt = TryParseInt;
module.exports.ExFrontEndParams = ExFrontEndParams;
module.exports.groupBy = groupBy;
