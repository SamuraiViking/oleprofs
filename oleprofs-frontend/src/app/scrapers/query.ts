import RMTProfs from '../../static/profsData';
import valid_profs from '../../static/valid_profs'

// RMTProfs = RateMyProfessor Prof

const RMTProfNames = Object.keys(RMTProfs);

const RMTProfFound = {}

valid_profs.forEach(prof => {
    if (RMTProfNames.includes(prof)) {
        RMTProfFound[prof] = true
    }
});

const RMTFoundProfs = Object.keys(RMTProfFound)

const RMTmissingProfs = RMTProfNames.filter(prof => RMTFoundProfs.indexOf(prof) < 0)

console.log(RMTmissingProfs);


