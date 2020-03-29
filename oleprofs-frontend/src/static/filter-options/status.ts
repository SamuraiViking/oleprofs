interface statusOption {
    value: string;
    viewValue: string;
}


const statusOptions: statusOption[] = [
    { value: '', viewValue: 'All' },
    { value: 'C', viewValue: 'Closed' },
    { value: 'O', viewValue: 'Open' },
]

export default statusOptions;