var BasicStorage = /** @class */ (function () {
    /*
        Functions
    */
    function BasicStorage(scheme) {
        /*
            Variables
        */
        //  DataStorage
        this.Data = Array();
        this.Length = 0;
        //  Cols Name
        this.Columns = Array();
        //  Scheme
        this.Scheme = null;
        //  Meta data
        this.MetaData = {
            primary: [],
            "default": [],
            autoIncrement: {}
        };
        this.Insert = function (values) {
            //  Validation
            var row = {};
            var errors = [];
            for (var key in this.Scheme) {
                if (this.Scheme[key]['attr'] === 'auto-increment') {
                    row[key] = this.MetaData['autoIncrement'][key];
                    this.MetaData['autoIncrement'][key]++;
                }
                else if (values[key]) {
                    if (this.CheckValueType(values[key], this.Scheme[key]['type'])) {
                        row[key] = values[key];
                    }
                    else {
                        errors.push('Error: ' + values[key] + ' in ' + key + ' is not of type ' + this.Scheme[key]['type']);
                    }
                }
                else if (this.Scheme[key]['default']) {
                    if (this.CheckValueType(this.Scheme[key]['default'], this.Scheme[key]['type'])) {
                        row[key] = this.Scheme[key]['default'];
                    }
                    else {
                        errors.push('Error: ' + this.Scheme[key]['default'] + ' in ' + key + ' is not of type ' + this.Scheme[key]['type']);
                    }
                }
                else if (this.Scheme[key]['Null'] === false && !values[key]) {
                    errors.push('Error: Missing ' + key + ' of insertion.');
                }
                else if (this.Scheme[key]['Null'] === true && !values[key]) {
                    row[key] = NaN;
                }
            }
            //  Insertion
            if (errors.length < 1) {
                this.Data.push(row);
                this.Length++;
                return true;
            }
            else {
                return errors;
            }
        };
        this.Delete = function () { };
        this.Update = function () { };
        this.SelectCol = function () { };
        this.SelectAll = function () {
            return this.Data;
        };
        this.GetColsNames = function () {
            var cols = [];
            for (var key in this.Scheme) {
                cols.push(key);
            }
            return cols;
        };
        /**
         * Waiting for enhancement
         */
        this.CheckValueType = function (value, type) {
            if (type === 'string') {
                if (typeof (value) === 'string')
                    return true;
                else
                    return false;
            }
            else if (type === 'number') {
                if (Number.isInteger(value) === true)
                    return true;
                else
                    return false;
            }
            else if (type === 'boolean') {
                if (typeof (value) === 'boolean')
                    return true;
                else
                    return false;
            }
        };
        //  adding scheme
        this.Scheme = scheme;
        for (var key in this.Scheme) {
            if (this.Scheme[key]['attr'] === 'auto-increment') {
                this.MetaData['autoIncrement'][key] = 0;
            }
        }
    }
    ;
    return BasicStorage;
}());
;
