import * as request from "request-promise-native";
import { writeFile } from 'fs';
import { Course } from "../interfaces/Course"

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

function invalidCourse(course) {
    const invalidNames = [
        'Academic Internship',
        'Independent Research',
        'IR/',
        'IS/',
        'Senior Project',
        'Intercol',
    ]

    // if course.name includes any of the invalidNames above return true
    for (let invalidName in invalidNames) {
        if (course.name.includes(invalidName)) {
            return true;
        }
    }

    // if course object has no offerings attrib return true
    if (!Object.keys(course).includes("offerings")) {
        return true
    }
    return false
}

function formatCourse(course) {
    course.offerings = formatOfferings(course.offerings)
    course.name = course.name.replace(/\//g, ' / ')

    if (course.prerequisites) {
        course.prerequisites = course.prerequisites.replace("Prerequisites:", '');
    }
    return course
}

function addDefaultsToCourse(course): Course {
    return {
        credits: course.credits || -1,
        department: course.department || '---',
        description: course.description || ['No Description'],
        enrolled: course.enrolled || -1,
        gereqs: course.gereqs || ['---'],
        instructors: course.instructors || ['---'],
        level: course.level || -1,
        max: course.max || -1,
        name: course.name || '---',
        number: course.number || -1,
        offerings: course.offerings || ['---'],
        prerequisites: course.prerequisites || 'None',
        section: course.section || '',
        semester: course.semester || -1,
        status: course.status || '',
        term: course.term || -1,
        type: course.type || '---',
        year: course.year || -1,
        profId: course.profId || -1,
    }
}

function formatCourses(courses) {
    let formattedCourses = []
    courses.forEach((course: Course) => {

        if (invalidCourse(course)) {
            return
        }

        course = formatCourse(course);
        course = addDefaultsToCourse(course);

        formattedCourses.push(course)
    })
    return formattedCourses
}

function writeCourses(file, courses) {
    writeFile(file, courses, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("File created!");
    });
}

async function getCourses(term: Number): Promise<void> {
    const url = `https://stolaf.dev/course-data/terms/${term}.json`
    const courses: string = await request.get(url);
    const parsedCourses: Object[] = await JSON.parse(courses)
    const formattedCourses = formatCourses(parsedCourses)
    const coursesToWrite: string = "export default " + JSON.stringify(formattedCourses)
    writeCourses(`${term}.ts`, coursesToWrite)
}

getCourses(20211)


