export interface Offerings {
    day: string,
    end: string,
    location: string,
    start: string,
}

export interface Course {
    credits: Number,
    department: string,
    description: string[],
    enrolled: Number,
    gereqs: string[],
    instructors: string[],
    level: Number,
    max: Number,
    name: string,
    number: Number,
    offerings: Offerings[],
    prerequisites: string,
    section: string,
    semester: Number,
    status: string,
    term: Number,
    type: string,
    year: Number,
}

