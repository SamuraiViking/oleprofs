export interface Offerings {
    day: string,
    end: string,
    location: string,
    start: string,
}

export interface Course {
    credits: number,
    department: string,
    enrolled: number,
    gereqs: string[],
    instructors: string[],
    level: number,
    max: number,
    name: string,
    number: number,
    offerings: string[],
    prerequisites: string,
    description: string[],
    section: string,
    semester: number,
    status: string,
    term: number,
    type: string,
    year: number,
    profId: number,
}

