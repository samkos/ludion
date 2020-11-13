require("date-format-lite");
var delta=0;
// var month_name = ['Jan','Feb','Mar','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function dateAdd(date, interval, units) {
    var ret = new Date(date); //don't change original date
    ret.add(units, interval);
    return ret;
}

function sqlDateFormat (date) {
    var d = new Date(date);
    var datestring = d.format("iso");
    return datestring;
}


function yyyymmddhh2monthDayth(date,hour_delta=0) {
	var y = Number(date.slice(0,4)), m = Number(date.slice(4,6))-1, 
	    d=Number(date.slice(6,8)), h=Number((date+"000").slice(6,8));
	var date_day_after = new Date(y,m,d,h,0,0)
	var d_string = date_day_after.add(hour_delta,"hours").toString().split(" ").slice(0,3).join(" ")
    //console.log('yyyymmddhh2monthDayth date', date ,'->',d_string)
	return `${d_string}`
}

function now () {
	var timeNow = Date.now();
	timeNow  =  dateAdd(timeNow, 'hour', -delta);
	return(timeNow);
}


function outputDateFormat(date) {
    var g = new Date(date);
    return new Date( g.getUTCFullYear(),g.getUTCMonth(),g.getUTCDay(),g.getUTCHours(),g.getUTCMinutes());
}


function deltaDateFormated(date1=null,date2=null) {

	const d1 = date1 ? new Date(date1) : new Date(Date.now());
	const d2 = date2 ? new Date(date2) : new Date(Date.now());
	
	//Get 1 day in milliseconds
	var one_day=1000*60*60*24;
	var one_hour=1000*60*60;
	var one_min=1000*60;
	var one_sec=1000;

	// Convert both dates to milliseconds
	var d1_ms = d1.getTime();
	var d2_ms = d2.getTime();


	// Calculate the difference in milliseconds
	var difference_ms = d1_ms - (d2_ms);

	// Convert back to days and return
	var difference_days = Math.round(difference_ms/one_day); 
	var difference_hours = Math.round(difference_ms/one_hour) % 24;
	var difference_mins =  Math.round(difference_ms/one_min) % 60;
	var difference_secs =  Math.round(difference_ms/one_sec) % 60; 

	var delta = (difference_days ? difference_days + ( difference_days < 2 ? " day " : " days ")  : "" ) +
		((difference_hours && difference_days < 2) ? difference_hours + " h " : "" ) +
		((!difference_days) ? ("000" + difference_mins).slice(-2) + " min " : "" ) +
		((!difference_days && !difference_hours && !difference_mins) ||
		 (difference_secs && ( !difference_days && ! difference_hours)) ? ("000" + difference_secs).slice(-2) + " s" : "" ) ;

	return delta
	
}

function getDateFromStamp(x) {
    var from_date = (x.from_date ? x.from_date.split('@')[0] : 0);
    var forecast_from_date = (x.forecast_from_date ? x.forecast_from_date : 0);
    var spill_date = x.spill_date ? x.spill_date.split(" ").reverse().join() : "";
    var run_name = x.run_name ? x.run_name.split(" ").reverse().join() : "";
    var time_stamp = x.status_timestamp;
    if (x.target==='SPILL') {
        return `${forecast_from_date}//${from_date}//${spill_date}//${run_name}//${time_stamp}`;
    }
    else {
        return Number(from_date)
    }
}




module.exports.yyyymmddhh2monthDayth = yyyymmddhh2monthDayth;
module.exports.dateAdd = dateAdd;
module.exports.deltaDateFormated = deltaDateFormated;
module.exports.sqlDateFormat = sqlDateFormat;
module.exports.now = now;
module.exports.outputDateFormat = outputDateFormat;
module.exports.getDateFromStamp = getDateFromStamp;
