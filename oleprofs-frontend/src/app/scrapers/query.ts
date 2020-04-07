import RMTProfs from '../../static/profsData';
import allProfs from '../../static/valid_profs'

// Every Stolaf Prof on Rate my Professor
// 
const RMTProfsNames = Object.keys(RMTProfs);
// Every Stolaf Prof on Rate my Professor who's name was not found in valid_profs.ts
const unusedRMTProfs = RMTProfsNames.filter(prof => !allProfs.includes(prof))
// Every Stolaf Prof on Rate my Professor who's name

function removeMiddleName(fullName) {
    fullName = fullName.split(" ");
    if (fullName.length !== 3) {
        return fullName
    }
    return fullName[0] + " " + fullName[2]
}

function firstAndLastNameMatchs(allProfs, unusedRMTProfs) {
    const foundProfs = {}
    unusedRMTProfs.forEach(unusedProf => {

        allProfs.forEach(allProf => {

            const profNoMiddleName = removeMiddleName(allProf)

            if (profNoMiddleName === unusedProf) {
                foundProfs[unusedProf] = allProf;
            }
        });
    });
    return foundProfs
}

const foundProfs = firstAndLastNameMatchs(allProfs, unusedRMTProfs)

Object.keys(foundProfs).forEach(foundProf => {
    const foundProfIdx = RMTProfsNames.indexOf(foundProf)
    RMTProfsNames.splice(foundProfIdx, 1)
    RMTProfsNames.push(foundProfs[foundProf])
});

const unusedRMTProfs2 = RMTProfsNames.filter(prof => !allProfs.includes(prof))

