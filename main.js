import './src/styles/style.css';
const inputYear = document.querySelector('#year');
const inputMonth = document.querySelector('#month');
const inputDay = document.querySelector('#day');
const btnCalculate = document.querySelector('#btnCalculate');
const daysName = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
const workdays = ['Lunes','Martes','Miercoles','Jueves','Viernes'];
const textResult = document.querySelector('h2');
const imgResult = document.querySelector('img');

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

const getDays = (year, month) => {
  switch (month) {
    case '01': case '03': case '05': case '07': case '08': case '10': case '12':
      return 31
      break;
    case '02':
      return year%4 === 0 ? 29 : 28
    case '04': case '06': case '09': case '11':
      return 30;
    default:
      break;
  }
}
const setYear = () => {
  if(inputYear.value.length === 4){
    setDays();
  } else {
    inputYear.value = inputYear.value.substring(0,4);
  }
}
const setDays = () => {
  const days = getDays(inputYear.value,inputMonth.value);
  removeAllChildNodes(inputDay);
  for (let day = 1; day <= days; day++) {
    const optionElement = document.createElement('option');
    const formatDay = day < 10 ? `0${day}` : `${day}`;
    optionElement.value = formatDay;
    optionElement.text = formatDay;
    inputDay.appendChild(optionElement);
  }
}
const calculate = () => {
  const dateString = `${inputYear.value}/${inputMonth.value}/${inputDay.value}`;
  const nameDay = daysName[new Date(dateString).getDay()];
  const msg = workdays.includes(nameDay) ? `${nameDay} dia hábil` : `${nameDay} Dia inhabil`;
  textResult.textContent=msg;
  imgResult.src = workdays.includes(nameDay) ? '/img/work_day.svg' : '/img/rest_day.svg'
}
inputYear.addEventListener('input', setYear);
inputMonth.addEventListener('change', setDays);
btnCalculate.addEventListener('click', calculate);

const currentDay = new Date().toLocaleDateString().split('/');
inputYear.value = currentDay[2];
inputMonth.value = (parseInt(currentDay[1]) < 10 ? `0${currentDay[1]}`: `${currentDay[1]}`);
setDays();
inputDay.value = currentDay[0];
calculate();