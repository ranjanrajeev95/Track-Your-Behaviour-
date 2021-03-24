const mood = document.getElementById('mood');
const positiveMo = document.getElementById('positive-plus');
const negativeMo = document.getElementById('negative-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


// const randomFeelings = [
//  {id: 1, text: 'Happy', amount: 40},
//  {id: 2, text: 'Anxious', amount: 30},
//  {id: 3, text: 'Excited', amount: 15},
//  {id: 4, text: 'Tired', amount: -15}

// ];

const localStoragefeelings = JSON.parse(localStorage.getItem('feelings'));

let feelings = localStorage.getItem('feelings') !== null ? localStoragefeelings : [];

//add li to the Dom
function addFeelingDOM(feeling) {
	//Get the sign Based on the value 
	const sign = feeling.amount > 0 ? '+' : '-';

	const item = document.createElement('li');

	//add Class Based On value
	item.classList.add(feeling.amount > 0 ? 'plus' : 'minus');

	item.innerHTML = ` 
	${feeling.text}<span>${sign}${Math.abs(feeling.amount)}%</span>
	   <button class ="delete-btn" onclick ="removeFeeling(${feeling.id})">X</button>
	`;

	list.appendChild(item);

}



//Remove Feeling From the DOM
function removeFeeling(id)  {
	//inside the feelings array we want to filter with ID
	 feelings = feelings.filter(feeling => feeling.id !== id);

	 updateLocalStorage(); 
	 init();
}


//Add Feeling and submit it
function addFeeling(e) {
	e.preventDefault();

	if(text.value.trim() === '' || amount.value.trim() === '') {
		alert('Please Type How Do You Feel And Estimate it');
	} else {
		const feeling = {
			id: GenerateID(),
			text: text.value,
			amount: +amount.value
		};

	feelings.push(feeling);

	addFeelingDOM(feeling);

	updateValue();

	updateLocalStorage();

	text.value = '';

	amount.value = '';

	}
}

//local storage update
function updateLocalStorage() {
	localStorage.setItem('feelings',JSON.stringify(feelings));
}  

//Generate A Random ID
function GenerateID() {
	return Math.floor(Math.random() * 100000000 ) ;
}


//Update Values 
function updateValue() {
	//get the amount
	const amounts = feelings.map(feeling => feeling.amount);
	
	const positive = amounts.filter(item => item > 0)
							.reduce((acc,item) => (acc+=item), 0);

	const negative = amounts.filter(item => item < 0)
							.reduce((acc,item) => (acc+=item), 0);	


	//Display Mood based on The values (positive and negative)
	if(`${positive}`> 55 && `${negative}` < 30 ) {
	 	mood.innerText =`Optimistic : Great !`;
	} else if(`${positive}`> 70 && `${negative}`<90) {
	 	mood.innerText =`Happy : Enjoy your Moment !`;
	} else if(`${positive}`> 60 &&  `${negative}` < 20) {
	 	mood.innerText =`Excited : Wow Im Happy For you !`;
	} else if(`${positive}`< 90 && `${negative}` < 30) {
	 	mood.innerText =`Sad : Meditation Could Help !`;
	} else if(`${positive}`< 0 && `${negative}` < 10) {
	 	mood.innerText =`Tired : Go for a Short Run !`;
	} else {
	 	mood.innerText =`Calm : Enjoy Your Tranquility`;
	 } 
	positiveMo.innerText = `${positive}%`;
	negativeMo.innerText = `${negative}%`;

}


function init() {
	list.innerHTML = ""; 
	feelings.forEach(addFeelingDOM);
	updateValue();
}

init();


//EventListener
form.addEventListener('submit', addFeeling);
