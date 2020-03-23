import * as request from "request-promise-native";
import { writeFile } from 'fs';
import { Course } from "./Course"

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


