var validator = {
    
    // all available checks
    types: {},
    
    // error messages in the current 
    // validation session
    messages: [],
    
    // current validation config
    // name: validation type
    config: {},    
    
    // the interface method
    // `data` is key => value pairs 
    validate: function (data) {
        
        var i, msg, type, checker, result_ok;
        
        // reset all messages
        this.messages = [];
        
        for (i in data) {
        
            if (data.hasOwnProperty(i)) {
            
                type = this.config[i];
                checker = this.types[type];
                
                if (!type) {
                    continue; // no need to validate
                }
                if (!checker) { // uh-oh
                    throw {
                        name: "ValidationError",
                        message: "No handler to validate type " + type
                    };
                }
        
                result_ok = checker.validate(data[i]);
                if (!result_ok) {
                    msg = "Invalid value for *" + i + "*, " + checker.instructions;
                    this.messages.push(msg);
                }
            }
        }
        return this.hasErrors();
    },
    
    // helper
    hasErrors: function () {
        return this.messages.length !== 0;
    }
};



validator.types.isNonEmpty = {
    validate: function (value) {
        return !!value;
    },
    instructions: "the value cannot be empty"
};

validator.types.isNumber = {
    validate: function (value) {
        return !isNaN(Number(value));
    },
    instructions: "the value can only be a valid number, e.g. 1, 3.14 or 2010"
};

validator.types.isAlphaNum = {
    validate: function (value) {
        return !String(value).replace(/[a-z0-9]/ig, "").length;
    },
    instructions: "the value can only contain characters and numbers, no special symbols"
};



validator.config = {
    first_name: 'isNonEmpty',
    age: 'isNumber',
    username: 'isAlphaNum'
};


var data = {
    first_name: "",
    last_name: "Man",
    age: "unknown",
    username: "o_O"
};
validator.validate(data);
if (validator.hasErrors()) {
	//join method can make a String with Array
    console.log(validator.messages.join("\n"));
}
