import RMTProfs from '../../static/profsData';
import allProfs from '../../static/valid_profs'

// Every Stolaf Prof on Rate my Professor
// 
const RMTProfsNames = Object.keys(RMTProfs);
// Every Stolaf Prof on Rate my Professor who's name was not found in valid_profs.ts
const unusedRMTProfs = RMTProfsNames.filter(prof => !allProfs.includes(prof))
// Every Stolaf Prof on Rate my Professor who's name


let count = 0;
unusedRMTProfs.forEach(unusedProf => {

    allProfs.forEach(allProf => {

        const splitAllProf = allProf.split(' ');

        if (splitAllProf.length === 3) {
            allProf = splitAllProf[0] + ' ' + splitAllProf[2]
        }


        if (allProf === unusedProf) {
            count += 1;
            console.log(`${allProf}\t\t${unusedProf}`)
        }
    });
});
console.log(count)


// valid_profs.forEach(prof => {
//     if (RMTProfNames.includes(prof)) {
//         RMTProfFound[prof] = true
//     }
// });

// const RMTFoundProfs = Object.keys(RMTProfFound)
// const RMTmissingProfs = RMTProfNames.filter(prof => RMTFoundProfs.indexOf(prof) < 0)



// let RMTProfNameToUnfoundProf = {}

// RMTProfNames.forEach(prof => {

//     if (!RMTProfNameToUnfoundProf.hasOwnProperty(prof)) {
//         RMTProfNameToUnfoundProf[prof] = []
//     }

//     RMTmissingProfs.forEach(missingProf => {

//         if (prof === missingProf) {
//             console.log(`${prof} - ${missingProf}`)
//         }

//         const profLastLetter = prof[prof.length - 1]
//         const missingProfLastLetter = missingProf[missingProf.length - 1]

//         if (prof[0] === missingProf[0] && profLastLetter === missingProfLastLetter) {
//             RMTProfNameToUnfoundProf[prof].push(missingProf);
//         }
//     });
// });

// // console.log(RMTProfNameToUnfoundProf)


