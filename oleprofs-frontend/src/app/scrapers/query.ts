import RMTProfs from '../../static/profsData';
import allProfs from '../../static/valid_profs'

// Every Stolaf Prof on Rate my Professor
// 
const RMTProfsNames = Object.keys(RMTProfs);
// Every Stolaf Prof on Rate my Professor who's name was not found in valid_profs.ts
const unusedRMTProfs = RMTProfsNames.filter(prof => !allProfs.includes(prof))
// Every Stolaf Prof on Rate my Professor who's name

function partialPalendrome(str1, str2, num) {
    for (let i = 0; i < num; i++) {
        if (str1.length === 0 || str2.length === 0) {
            return false
        }
        if (str1[0] !== str2[0] || str1[str1.length - 1] !== str2[str2.length - 1]) {
            return false
        }
        str1 = str1.substring(1, str1.length - 1)
        str2 = str2.substring(1, str2.length - 1)
    }
    return true
}

function sameLastName(unusedProf, allProf) {

    unusedProf = unusedProf.split(" ")
    unusedProf = unusedProf[unusedProf.length - 1]

    allProf = allProf.split(" ")
    allProf = allProf[allProf.length - 1]

    if (unusedProf !== allProf) {
        return false;
    }

    return true
}

function profMatches(allProfs, unusedRMTProfs) {
    const foundProfs = []
    unusedRMTProfs.forEach(unusedProf => {
        allProfs.forEach(allProf => {

            if (!partialPalendrome(unusedProf, allProf, 3)) {
                return
            }
            if (!sameLastName(unusedProf, allProf)) {
                return
            }
            foundProfs.push({
                Stolaf: allProf,
                RMT: unusedProf,
            })
        });
    });
    return foundProfs
}

const foundProfs = profMatches(allProfs, unusedRMTProfs)

console.log(foundProfs)