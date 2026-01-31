import { LightningElement, track } from 'lwc';

export default class FilterListPattern extends LightningElement {

    // -------------------------------
    // SOURCE DATA (IMMUTABLE)
    // -------------------------------
    records = [
        { id: 1, name: 'Alice', dept: 'Engineering' },
        { id: 2, name: 'Bob', dept: 'Sales' },
        { id: 3, name: 'Carol', dept: 'Engineering' }
    ];

    // -------------------------------
    // FILTER STATE
    // -------------------------------
    selectedDept = '';
    searchText = '';

    // -------------------------------
    // UI OPTIONS
    // -------------------------------
    departmentOptions = [
        { label: 'All', value: '' },
        { label: 'Engineering', value: 'Engineering' },
        { label: 'Sales', value: 'Sales' }
    ];

    columns = [
        { label: 'Name', fieldName: 'name' },
        { label: 'Department', fieldName: 'dept' }
    ];

    // -------------------------------
    // FILTER LOGIC (COMPUTED)
    // -------------------------------
    get filteredRecords() {
        // Outer return: returns the full filtered array to the template.
        return this.records.filter((record) => {
            // Callback function (runs once per record):
            // return true to keep the record, false to exclude it.
            const matchesDept =
                !this.selectedDept || record.dept === this.selectedDept;

            const matchesSearch =
                !this.searchText ||
                record.name.toLowerCase().includes(this.searchText);
            console.log('matchesDept', matchesDept);
            console.log('matchesSearch', matchesSearch);
            return matchesDept && matchesSearch;
        });
    }

    // -------------------------------
    // EVENT HANDLERS
    // -------------------------------
    handleDeptChange(event) {
        this.selectedDept = event.target.value;
    }

    handleSearchChange(event) {
        this.searchText = event.target.value.toLowerCase();
    }
}