export class Question{
    _id: String;
    question: String;
    questionCategory: String;
    questionType: String;
    options: Array<any>;
    constructor(id,question, questionCategory, questionType, options){
        this._id= id;
        this.question= question;
        this.questionCategory = questionCategory;
        this.questionType = questionType;
        this.options = options;
    }
}