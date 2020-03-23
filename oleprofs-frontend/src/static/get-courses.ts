import * as request from "request-promise-native";
import { writeFile } from 'fs';
import { Course } from "./Course"

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

async function getCourses(term: Number): Promise<void> {
    const baseUrl = `https://stolaf.dev/course-data/terms/${term}.json`;
    var options = {
        uri: baseUrl,
    };
    const courses: string = await request.get(options);
    const parsedCourses: Object[] = JSON.parse(courses)


    let filteredCourses: Course[] = [];
    parsedCourses.forEach((course: Course) => {

        if (course.name === 'Academic Internship') {
            return
        }

        if (course.name.includes('Lab')) {
            return
        }

        if (course.name.includes('Independent Research')) {
            return
        }

        if (course.name.includes('IR/')) {
            return
        }

        if (course.name.includes("IS/")) {
            return
        }

        if (course.name.includes("Senior Project")) {
            return
        }

        if (course.name.includes("Intercol")) {
            return
        }

        if (!Object.keys(course).includes("offerings")) {
            return
        }

        if (!Object.keys(course).includes("gereqs")) {
            course.gereqs = ["---"]
        }

        course.offerings = formatOfferings(course.offerings)


        const allSlashes = /\//g

        course.name = course.name.replace(allSlashes, ' / ')

        let filteredCourse: Course = {
            credits: course.credits,
            department: course.department,
            description: course.description,
            enrolled: course.enrolled,
            gereqs: course.gereqs,
            instructors: course.instructors,
            level: course.level,
            max: course.max,
            name: course.name,
            number: course.number,
            offerings: course.offerings,
            prerequisites: course.prerequisites,
            section: course.section,
            semester: course.semester,
            status: course.status,
            term: course.term,
            type: course.type,
            year: course.year,
        }
        filteredCourses.push(filteredCourse)
    })

    const coursesToWrite: string = JSON.stringify(filteredCourses)

    writeFile(`${term}.ts`, coursesToWrite, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("File created!");
    });
}

getCourses(20193)


