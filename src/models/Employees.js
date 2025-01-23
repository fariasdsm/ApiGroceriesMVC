import {model,Schema} from 'mongoose';

const employeeSchema = new Schema ({
    employee_number:{
        require:true,
        unique:true,
        type:String
    },
    name: String,
    lastname: String,
    email: String,
    age: Number,
    salary: Number
},{
    versionKey:false,
    timestamps:true
})

export default model ('employee',employeeSchema);