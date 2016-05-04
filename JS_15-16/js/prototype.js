$(function() {
    function Human() {
        this.name = "John";
        this.age = 30;
        this.sex = 'male';
        this.height = 178;
        this.weight = 77;
    }
    function Worker() {
        this.work = "develop";
        this.salary = 1000;
        this.working = function () {
            console.log('work');
        }
    }
    function Student(_education, _grant) {
        this.education = _education;
        this.grant = _grant;
        this.watch = function() {
            console.log('watch');
        }
    }
    Worker.prototype = new Human();
    Student.prototype = new Human();

    Worker.prototype.working = function () {
        console.log('working');
    }
    var newStudent1 = new Student('KNU', 787);
    var newStudent2 = new Student('KPI', 467);
    var newStudent3 = new Student('KNURE', 39658);
    //newStudent.working();
    console.log('newStudent1', newStudent1.education);
    console.log('newStudent2', newStudent2.education);
    console.log('newStudent3', newStudent3.education);
})