$(function() {
    function Human() {
        this.name = "John";
        this.age = 30;
        this.sex = 'male';
        this.height = 178;
        this.weight = 77;
    }
    function Worker(place, salary) {
        this.work = place;
        this.salary = salary;
        this.working = function () {
           return 'go work';
        }
    }
    //Worker.prototype.working = function () {
    //    console.log('working');
    //}
    Worker.prototype = new Human();

    function Student(_education, _grant) {
        this.education = _education;
        this.grant = _grant;
        this.watch = function() {
            return 'watch';
        }
    }
    Student.prototype = new Human();
    var newStudent1 = new Student('KNU', 787);
    var newStudent2 = new Student('KPI', 467);
    var newStudent3 = new Student('KNURE', 39658);

    var newWorker1 = new Worker('It',200);
    var newWorker2 = new Worker('Economyst', 150);


    console.log(newWorker2.name);
    console.log(newWorker1.working());
    //newStudent.working();

    console.log(newStudent1.watch());
    console.log('newStudent2', newStudent2.age);
    console.log('newStudent3', newStudent3.education);
})