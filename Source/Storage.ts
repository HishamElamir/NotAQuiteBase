class BasicStorage {

    /*
        Variables
    */
    //  DataStorage
    private Data: any = Array();
    private Length: number = 0;
    //  Cols Name
    private Columns: String[] = Array();
    //  Scheme
    private Scheme: JSON = null;
    //  Meta data
    private MetaData: Object = {
        primary: [],
        default: [],
        autoIncrement: {},
    };
    /*
        Functions
    */
    constructor (scheme: any){
        //  adding scheme
        this.Scheme = scheme;

        for (let key in this.Scheme) {
            if(this.Scheme[key]['attr'] === 'auto-increment'){
                this.MetaData['autoIncrement'][key] = 0;
            }
        }
    };

    public Insert = function (values) {
        //  Validation
        var row = {};
        var errors = [];
        for (let key in this.Scheme){
            if(this.Scheme[key]['attr'] === 'auto-increment') { //  check if id
                row[key] = this.MetaData['autoIncrement'][key];
                this.MetaData['autoIncrement'][key]++;
            } else if(values[key]) {
                if ( this.CheckValueType(values[key], this.Scheme[key]['type']) ){ //  check type
                    row[key] = values[key];
                } else {
                    errors.push( 'Error: ' + values[key] + ' in ' + key +  ' is not of type ' + this.Scheme[key]['type'] );
                }
            } else if (this.Scheme[key]['default']) { //  check if no value then default
                if ( this.CheckValueType(this.Scheme[key]['default'], this.Scheme[key]['type']) ){
                    row[key] = this.Scheme[key]['default'];
                } else {
                    errors.push( 'Error: ' + this.Scheme[key]['default'] + ' in ' + key + ' is not of type ' + this.Scheme[key]['type'] );
                }
            } else if (this.Scheme[key]['Null'] === false && !values[key]) {
                errors.push( 'Error: Missing ' + key + ' of insertion.');
            } else if (this.Scheme[key]['Null'] === true && !values[key]) {
                row[key] = NaN;
            }
        }
        //  Insertion
        if(errors.length < 1){
            this.Data.push(row);
            this.Length++;

            return true;
        } else {
            return errors;
        }
    };
    Delete = function () {};
    Update = function () {};
    SelectCol = function () {};
    SelectAll = function () {
        return this.Data;
    };
    GetColsNames = function () {
        var cols = []
        for (let key in this.Scheme) {
            cols.push(key);
        }
        return cols;
    };
    
    /**
     * Waiting for enhancement
     */
    private CheckValueType = function (value: any, type: string) {
        if (type === 'string'){
            if(typeof(value) === 'string') return true;
            else return false;
        } else if (type === 'number') {
            if(Number.isInteger(value) === true) return true;
            else return false;
        } else if (type === 'boolean') {
            if(typeof(value) === 'boolean') return true;
            else return false;
        }
    }
};