import { format } from "path"

let offerings = [
    {
        "day": "Mo",
        "end": "14:55",
        "location": "TBA",
        "start": "14:00"
    },
    {
        "day": "We",
        "end": "14:55",
        "location": "TBA",
        "start": "14:00"
    },
    {
        "day": "Fr",
        "end": "14:55",
        "location": "TBA",
        "start": "14:00"
    }
]

function daySylabol(day) {
    const daysToSymbol = {
        Mo: 'M', Tu: 'T', We: 'W', Th: 'Th', Fr: 'F',
    }
    return daysToSymbol[day]
}

function formatTimeTracker(timeTracker) {
    let formattedOfferings = []
    Object.keys(timeTracker).forEach((time) => {
        const days = timeTracker[time]
        const formattedTime = time.replace(/:/g, '');
        const formattedOffering = `${days} ${formattedTime}`
        formattedOfferings.push(formattedOffering)
    })
    return formattedOfferings
}


function formatOfferings(offerings) {
    let timeTracker = {}
    offerings.forEach((offering) => {
        const day = daySylabol(offering.day)
        const time = `${offering.start} - ${offering.end}`

        Object.keys(timeTracker).includes(time)
            ? timeTracker[time] += day
            : timeTracker[time] = day
    })
    const formattedOfferings = formatTimeTracker(timeTracker)
    return formattedOfferings
}

const formatedOfferings = formatOfferings(offerings)

console.log(formatedOfferings)

