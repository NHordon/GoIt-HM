var arrName = [];

for(var i = 0; i < 5; i++){
	arrName[i] = prompt("Заполняем массив имен, имя №"+(i+1)+":");
}
//тут тоже можно сделать проверку на заполнение... Нужно?

alert("Итого мы имеем массив: " + arrName);
// А теперь проверка на заполнение строки
do{
	var name = prompt('Введите имя');
}while(name.trim() == "");
//trim дополнительная проверка на пробелы
var flag = 0;

for(var i = 0; i < arrName.length; i++) {
  if (name == arrName[i]) {
    alert ( arrName[i] + ', вы успешно вошли!!' );
    flag = 1;
    break;
  };
};

if(flag == 0){
	alert("Ошибка! Введите имя");
};