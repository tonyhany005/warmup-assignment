const fs = require("fs");

// ============================================================
// Function 1: getShiftDuration(startTime, endTime)
// startTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// endTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// Returns: string formatted as h:mm:ss
// ============================================================
function getShiftDuration(startTime, endTime) {
    function amPmToSeconds(timeStr) {
        timeStr = timeStr.trim().toLowerCase();
        let parts = timeStr.split(' ');
        let period = parts[1];
        let timeParts = parts[0].split(':');
        let hours = parseInt(timeParts[0]);
        let minutes = parseInt(timeParts[1]);
        let seconds = parseInt(timeParts[2]);
        if (period === 'am') {
            if (hours === 12) hours = 0;
        } else {
            if (hours !== 12) hours += 12;
        }
        return hours * 3600 + minutes * 60 + seconds;
    }

    function secondsToHMS(totalSeconds) {
        let h = Math.floor(totalSeconds / 3600);
        let m = Math.floor((totalSeconds % 3600) / 60);
        let s = totalSeconds % 60;
        let mm = m < 10 ? '0' + m : '' + m;
        let ss = s < 10 ? '0' + s : '' + s;
        return h + ':' + mm + ':' + ss;
    }

    let startSeconds = amPmToSeconds(startTime);
    let endSeconds = amPmToSeconds(endTime);
    let diff = endSeconds - startSeconds;

    if (diff < 0) {
        diff += 24 * 3600;
    }

    return secondsToHMS(diff);
}

// ============================================================
// Function 2: getIdleTime(startTime, endTime)
// startTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// endTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// Returns: string formatted as h:mm:ss
// ============================================================
function getIdleTime(startTime, endTime) {
    function amPmToSeconds(timeStr) {
        timeStr = timeStr.trim().toLowerCase();
        let parts = timeStr.split(' ');
        let period = parts[1];
        let timeParts = parts[0].split(':');
        let hours = parseInt(timeParts[0]);
        let minutes = parseInt(timeParts[1]);
        let seconds = parseInt(timeParts[2]);
        if (period === 'am') {
            if (hours === 12) hours = 0;
        } else {
            if (hours !== 12) hours += 12;
        }
        return hours * 3600 + minutes * 60 + seconds;
    }

    function secondsToHMS(totalSeconds) {
        let h = Math.floor(totalSeconds / 3600);
        let m = Math.floor((totalSeconds % 3600) / 60);
        let s = totalSeconds % 60;
        let mm = m < 10 ? '0' + m : '' + m;
        let ss = s < 10 ? '0' + s : '' + s;
        return h + ':' + mm + ':' + ss;
    }

    const DELIVERY_START = 8 * 3600;
    const DELIVERY_END = 22 * 3600;

    let startSeconds = amPmToSeconds(startTime);
    let endSeconds = amPmToSeconds(endTime);

    let idleSeconds = 0;

    if (startSeconds < DELIVERY_START) {
        let earlyEnd = Math.min(endSeconds, DELIVERY_START);
        idleSeconds += earlyEnd - startSeconds;
    }

    if (endSeconds > DELIVERY_END) {
        let lateStart = Math.max(startSeconds, DELIVERY_END);
        idleSeconds += endSeconds - lateStart;
    }

    return secondsToHMS(idleSeconds);
}


// ============================================================
// Function 3: getActiveTime(shiftDuration, idleTime)
// shiftDuration: (typeof string) formatted as h:mm:ss
// idleTime: (typeof string) formatted as h:mm:ss
// Returns: string formatted as h:mm:ss
// ============================================================
function getActiveTime(shiftDuration, idleTime) {
    function toSeconds(timeStr) {
        timeStr = timeStr.trim();
        let parts = timeStr.split(':');
        let hours = parseInt(parts[0]);
        let minutes = parseInt(parts[1]);
        let seconds = parseInt(parts[2]);
        return hours * 3600 + minutes * 60 + seconds;
    }

    function secondsToHMS(totalSeconds) {
        let h = Math.floor(totalSeconds / 3600);
        let m = Math.floor((totalSeconds % 3600) / 60);
        let s = totalSeconds % 60;
        let mm = m < 10 ? '0' + m : '' + m;
        let ss = s < 10 ? '0' + s : '' + s;
        return h + ':' + mm + ':' + ss;
    }

    let shiftSeconds = toSeconds(shiftDuration);
    let idleSeconds = toSeconds(idleTime);
    let activeSeconds = shiftSeconds - idleSeconds;

    return secondsToHMS(activeSeconds);
}

// ============================================================
// Function 4: metQuota(date, activeTime)
// date: (typeof string) formatted as yyyy-mm-dd
// activeTime: (typeof string) formatted as h:mm:ss
// Returns: boolean
// ============================================================
function metQuota(date, activeTime) {
    function toSeconds(timeStr) {
        timeStr = timeStr.trim();
        let parts = timeStr.split(':');
        let hours = parseInt(parts[0]);
        let minutes = parseInt(parts[1]);
        let seconds = parseInt(parts[2]);
        return hours * 3600 + minutes * 60 + seconds;
    }

    let dateParts = date.trim().split('-');
    let year = parseInt(dateParts[0]);
    let month = parseInt(dateParts[1]);
    let day = parseInt(dateParts[2]);

    let isEid = (year === 2025 && month === 4 && day >= 10 && day <= 30);

    const EID_QUOTA    = 6 * 3600;
    const NORMAL_QUOTA = 8 * 3600 + 24 * 60;

    let quota = isEid ? EID_QUOTA : NORMAL_QUOTA;
    let activeSeconds = toSeconds(activeTime);

    return activeSeconds >= quota;
}

// ============================================================
// Function 5: addShiftRecord(textFile, shiftObj)
// textFile: (typeof string) path to shifts text file
// shiftObj: (typeof object) has driverID, driverName, date, startTime, endTime
// Returns: object with 10 properties or empty object {}
// ============================================================
function addShiftRecord(textFile, shiftObj) {
    // TODO: Implement this function
}

// ============================================================
// Function 6: setBonus(textFile, driverID, date, newValue)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// date: (typeof string) formatted as yyyy-mm-dd
// newValue: (typeof boolean)
// Returns: nothing (void)
// ============================================================
function setBonus(textFile, driverID, date, newValue) {
    // TODO: Implement this function
}

// ============================================================
// Function 7: countBonusPerMonth(textFile, driverID, month)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// month: (typeof string) formatted as mm or m
// Returns: number (-1 if driverID not found)
// ============================================================
function countBonusPerMonth(textFile, driverID, month) {
    // TODO: Implement this function
}

// ============================================================
// Function 8: getTotalActiveHoursPerMonth(textFile, driverID, month)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// month: (typeof number)
// Returns: string formatted as hhh:mm:ss
// ============================================================
function getTotalActiveHoursPerMonth(textFile, driverID, month) {
    // TODO: Implement this function
}

// ============================================================
// Function 9: getRequiredHoursPerMonth(textFile, rateFile, bonusCount, driverID, month)
// textFile: (typeof string) path to shifts text file
// rateFile: (typeof string) path to driver rates text file
// bonusCount: (typeof number) total bonuses for given driver per month
// driverID: (typeof string)
// month: (typeof number)
// Returns: string formatted as hhh:mm:ss
// ============================================================
function getRequiredHoursPerMonth(textFile, rateFile, bonusCount, driverID, month) {
    // TODO: Implement this function
}

// ============================================================
// Function 10: getNetPay(driverID, actualHours, requiredHours, rateFile)
// driverID: (typeof string)
// actualHours: (typeof string) formatted as hhh:mm:ss
// requiredHours: (typeof string) formatted as hhh:mm:ss
// rateFile: (typeof string) path to driver rates text file
// Returns: integer (net pay)
// ============================================================
function getNetPay(driverID, actualHours, requiredHours, rateFile) {
    // TODO: Implement this function
}

module.exports = {
    getShiftDuration,
    getIdleTime,
    getActiveTime,
    metQuota,
    addShiftRecord,
    setBonus,
    countBonusPerMonth,
    getTotalActiveHoursPerMonth,
    getRequiredHoursPerMonth,
    getNetPay
};
