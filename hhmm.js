const dayStart = "07:30";
const dayEnd = "17:45";

function convertHHMMToMinutes(time) {
  if (time.length === 4) {
    return (time[0] * 60) + (time[2] * 10) + Number(time[3]);
  } else {
    return (time[0] * 600) + (time[1] * 60) + (time[3] * 10) + Number(time[4]);
  }
};

let dayStartInMinutes = convertHHMMToMinutes(dayStart);
let dayEndInMinutes = convertHHMMToMinutes(dayEnd);

function scheduleMeeting(startTime, durationMinutes) {
  let startTimeInMinutes = convertHHMMToMinutes(startTime);
  let meetingEndTimeInMinutes = startTimeInMinutes + durationMinutes;

  return startTimeInMinutes >= dayStartInMinutes && startTimeInMinutes <= dayEndInMinutes && meetingEndTimeInMinutes >= dayStartInMinutes && meetingEndTimeInMinutes <= dayEndInMinutes
}

console.log(scheduleMeeting("7:00",15));     // false
console.log(scheduleMeeting("07:15",30));    // false
console.log(scheduleMeeting("7:30",30));     // true
console.log(scheduleMeeting("11:30",60));    // true
console.log(scheduleMeeting("17:00",45));    // true
console.log(scheduleMeeting("17:30",30));    // false
console.log(scheduleMeeting("18:00",15));    // false


