var resultNumber = document.querySelector(".res-num");
var emailNumber = document.querySelectorAll(".email-content");
var tableHeader = document.querySelectorAll("th");
var arrows = document.querySelectorAll(".up-arrow");
var from = document.querySelectorAll(".from");
var to = document.querySelectorAll(".to");
var recipient = document.querySelectorAll(".recipient p");
var hiddenReciever = document.querySelectorAll(".hidden-email");
var subject = document.querySelectorAll(".subject");
var date = document.querySelectorAll(".date");
var emptyEmailDiv = document.querySelector(".empty-email");
var table = document.getElementById("email-table");
var results = document.querySelector(".results");
var rotate = false;

for (let i = 0; i < tableHeader.length; i++) {
	tableHeader[i].addEventListener('click', () => {
		//sorting table on click on the table headers
		sortTable(i);

		if (i == 0) {
			//adjusting ascending and descending arrows rotation
			if (arrows[i].classList.contains("add-rotation")) {
				rotate = true;
			} else {
				rotate = false;
			}
			//when first arrow clicked we make sure to remove other arrows and their rotation
			arrows[1].classList.remove("add-rotation");
			arrows[2].classList.remove("add-rotation");
			arrows[3].classList.remove("add-rotation");
			arrows[1].classList.remove("rotate180");
			arrows[2].classList.remove("rotate180");
			arrows[3].classList.remove("rotate180");

			//when first header clicked we make sure to remove bold text from all other table data and add it to the appropriate one
			for (let j = 0; j < from.length; j++) {
				to[j].classList.remove("bold-text");
				subject[j].classList.remove("bold-text");
				date[j].classList.remove("bold-text");
				from[j].classList.add("bold-text");
			}
		}

		if (i == 1) {
			if (arrows[i].classList.contains("add-rotation")) {
				rotate = true;
			} else {
				rotate = false;
			}
			arrows[0].classList.remove("add-rotation");
			arrows[2].classList.remove("add-rotation");
			arrows[3].classList.remove("add-rotation");
			arrows[0].classList.remove("rotate180");
			arrows[2].classList.remove("rotate180");
			arrows[3].classList.remove("rotate180");


			for (let j = 0; j < to.length; j++) {
				from[j].classList.remove("bold-text");
				subject[j].classList.remove("bold-text");
				date[j].classList.remove("bold-text");
				to[j].classList.add("bold-text");
			}
		}

		if (i == 2) {
			if (arrows[i].classList.contains("add-rotation")) {
				rotate = true;
			} else {
				rotate = false;
			}

			arrows[0].classList.remove("add-rotation");
			arrows[1].classList.remove("add-rotation");
			arrows[3].classList.remove("add-rotation");
			arrows[0].classList.remove("rotate180");
			arrows[1].classList.remove("rotate180");
			arrows[3].classList.remove("rotate180");

			for (let j = 0; j < subject.length; j++) {
				from[j].classList.remove("bold-text");
				to[j].classList.remove("bold-text");
				date[j].classList.remove("bold-text");
				subject[j].classList.add("bold-text");
			}
		}

		if (i == 3) {
			if (arrows[i].classList.contains("add-rotation")) {
				rotate = true;
			} else {
				rotate = false;
			}

			arrows[0].classList.remove("add-rotation");
			arrows[1].classList.remove("add-rotation");
			arrows[2].classList.remove("add-rotation");
			arrows[0].classList.remove("rotate180");
			arrows[1].classList.remove("rotate180");
			arrows[2].classList.remove("rotate180");

			for (let j = 0; j < date.length; j++) {
				from[j].classList.remove("bold-text");
				to[j].classList.remove("bold-text");
				subject[j].classList.remove("bold-text");
				date[j].classList.add("bold-text");
			}
		}

		//removing the gray background color and arrows for all the headers
		for (let j = 0; j < tableHeader.length; j++) {
			if (tableHeader[j].classList.contains("add-gray")) {
				tableHeader[j].classList.remove("add-gray");
			}

			if (arrows[j].classList.contains("show-inline")) {
				arrows[j].classList.remove("show-inline");
			}
		}

		//adding gray background color and arrow to the clicked table header
		tableHeader[i].classList.add("add-gray");
		arrows[i].classList.add("show-inline");

		//adjusting position of the arrow. Either up for ascending or down for descending order
		if (arrows[i].classList.contains("add-rotation")) {
			if (rotate) {
				arrows[i].classList.add("rotate180");
				arrows[i].classList.remove("add-rotation");
				rotate = false;
			} else {
				arrows[i].classList.remove("rotate180");
			}
		} else {
			if (rotate) {
				arrows[i].classList.add("rotate180");
				rotate = false;
			} else {
				arrows[i].classList.remove("rotate180");
				arrows[i].classList.add("add-rotation");
				rotate = true;
			}
		}

		//hiding email body on click on the headers
		for (let j = 0; j < emailBody.length; j++) {
			emailBody[j].classList.add("hidden");
			from[j].classList.remove("remove-bb");
			to[j].classList.remove("remove-bb");
			subject[j].classList.remove("remove-bb");
			date[j].classList.remove("remove-bb");
			emailNumber[j].classList.remove("remove-bb");
		}
	});
}

//hide the table and show logo if there are no emails in date range
if (resultNumber.innerText == "0") {
	table.classList.add("hidden");
	emptyEmailDiv.classList.remove("hidden");
	results.classList.add("pd-bb");
}

//getting date picker date value
let startDate;
let endDate;
let calcStart;
let calcEnd;
let dates = [];
let newDates = [];
let foundDates = [];
let tableDate = [];
var todayTime = new Date();
var todayDate = todayTime.getFullYear() + '/' + (todayTime.getMonth() + 1) + '/' + todayTime.getDate();

//converting all the existing dates in the table to miliseconds and pushing them into an array
for (let i = 0; i < date.length; i++) {

	//if the email date does not have a year 2019 we assume that the email is from this year, 2021
	if (!date[i].innerText.includes("2019") && !date[i].innerText.includes("0:")) {
		newDates[i] = new Date(date[i].innerText + " 2021").getTime();
	}

	//if the email date only starts with '0:' than we assume it is from today 
	else if (date[i].innerText.includes("0:")) {
		newDates[i] = new Date(todayDate + " " + date[i].innerText).getTime();
	} else {
		newDates[i] = new Date(date[i].innerText).getTime();
	}

	dates.push(newDates[i]);
}


//date range picker function on the press of apply button
$('#date-picker').on('apply.daterangepicker', function(ev, picker) {
	startDate = picker.startDate.format('YYYY/MM/DD');
	endDate = picker.endDate.format('YYYY/MM/DD');

	calcStart = new Date(startDate).getTime();
	calcEnd = new Date(endDate).getTime();
	tableDate = [];
	foundDates = [];

	for (let i = 0; i < dates.length; i++) {
		//if the email date is in the range of the dates we chose we convert them into miliseconds and push them to 
		//new array which will contain all the found dates
		if (dates[i] >= calcStart && dates[i] <= calcEnd) {

			//email number is not 0 anymore so we remove some styling that kept our table hidden
			table.classList.remove("hidden");
			results.classList.remove("pd-bb");
			emptyEmailDiv.classList.add("hidden");

			if (!date[i].innerText.includes("2019") && !date[i].innerText.includes("0:")) {
				tableDate[i] = new Date(date[i].innerText + " 2021");
			} else if (date[i].innerText.includes("0:")) {
				tableDate[i] = new Date(todayDate + " " + date[i].innerText);
			} else {
				tableDate[i] = new Date(date[i].innerText);
			}

			//getting a number of the dates in the date range and pushing them into array so we can display total number of found emails
			if (tableDate[i].getTime() === dates[i]) {
				foundDates.push(tableDate[i]);
				emailNumber[i].classList.remove("hidden");
			}

		}
		//when emails are not in the date range we hide all the emails and table
		else {
			table.classList.add("hidden");
			results.classList.add("pd-bb");
			emptyEmailDiv.classList.remove("hidden");
			emailNumber[i].classList.add("hidden");
		}
		//display how many emails are found in the selected date range
		resultNumber.innerText = foundDates.length;
	}
});

var searchBtn = document.getElementById("search-btn");
var searchInput = document.getElementById("search-table");
var searchedEmails = [];
var emailObj = {};

//pushing email details into an aray of objects
for (let i = 0; i < emailNumber.length; i++) {
	emailObj.from = from[i].textContent.toLowerCase();
	emailObj.to = to[i].textContent.toLowerCase();
	emailObj.subject = subject[i].textContent.toLowerCase();
	searchedEmails.push(emailObj);
	emailObj = {};
}

//search emails when we click on the search button
searchBtn.addEventListener('click', () => {
	const value = searchInput.value;
	var foundEmails = [];
	for (let i = 0; i < emailNumber.length; i++) {

		if (searchedEmails[i].from.includes(value) || searchedEmails[i].to.includes(value) || searchedEmails[i].subject.includes(value)) {
			foundEmails.push(searchedEmails[i]);
			table.classList.remove("hidden");
			results.classList.remove("pd-bb");
			emptyEmailDiv.classList.add("hidden");

			emailNumber[i].classList.remove("hidden");
		} else {
			emailNumber[i].classList.add("hidden");
		}
		resultNumber.innerText = foundEmails.length;
	}
});

//expanding and collapsing email body on click on each email
var emailBody = document.querySelectorAll(".email-body");
var emailBodyText = document.querySelectorAll(".email-body-text");
var emailFrom = document.querySelectorAll(".email-from")
var emailTo = document.querySelectorAll(".email-to")
var emailSubject = document.querySelectorAll(".email-subject")
var emailText = document.querySelectorAll(".email-text")
var emailDate = document.querySelectorAll(".email-date")

for (let i = 0; i < emailNumber.length; i++) {


	//hiding all the email bodies
	emailBody[i].classList.add("hidden");
	emailBodyText[i].classList.add("hidden");

	//on click of each email we check if it is already opened, if so we will close it 
	//else we will remove the hidden class from it and hide all the others
	emailNumber[i].addEventListener('click', () => {
		if (emailBody[i].classList.contains("hidden")) {
			emailBody[i].classList.remove("hidden");
			emailBodyText[i].classList.remove("hidden");
			from[i].classList.add("remove-bb");
			to[i].classList.add("remove-bb");
			subject[i].classList.add("remove-bb");
			date[i].classList.add("remove-bb");
			emailNumber[i].classList.add("remove-bb");
			
			//display email body
			emailFrom[i].innerText = from[i].innerText
			emailTo[i].innerText = recipient[i].innerText
			emailSubject[i].innerText = subject[i].innerText
			emailDate[i].innerText = date[i].innerText

		} else {
			emailBody[i].classList.add("hidden");
			from[i].classList.remove("remove-bb");
			to[i].classList.remove("remove-bb");
			subject[i].classList.remove("remove-bb");
			date[i].classList.remove("remove-bb");
			emailNumber[i].classList.remove("remove-bb");
		}
	});
}

//https://www.w3schools.com/howto/howto_js_sort_table.asp
function sortTable(n) {
	var table, rows, switching, i, x, y, p, q, shouldSwitch, dir, switchcount = 0;
	table = document.getElementById("email-table");
	switching = true;
	// Set the sorting direction to ascending:
	dir = "asc";
	/* Make a loop that will continue until
	no switching has been done: */
	while (switching) {
		// Start by saying: no switching is done:
		switching = false;
		rows = document.querySelectorAll(".table-body");
		/* Loop through all table rows (except the
		first, which contains table headers): */
		for (i = 0; i < (rows.length - 1); i++) {
			// Start by saying there should be no switching:
			shouldSwitch = false;

			/* Get the two elements you want to compare,
			one from current row and one from the next: */
			x = rows[i].getElementsByTagName("TD")[n];
			y = rows[i + 1].getElementsByTagName("TD")[n];

			//p and q will be used to compare dates
			p = rows[i].getElementsByTagName("TD")[n].innerText;
			q = rows[i + 1].getElementsByTagName("TD")[n].innerText;

			//assigning these variables to hardcoded dates
			if (!p.includes("2019") && !p.includes("0:")) {
				p = new Date(x + " 2021").getTime();
			} else if (p.includes("0:")) {
				p = new Date(todayDate + " " + p).getTime();
			} else {
				p = new Date(p).getTime();
			}

			if (!q.includes("2019") && !q.includes("0:")) {
				q = new Date(q + " 2021").getTime();
			} else if (q.includes("0:")) {
				q = new Date(todayDate + " " + q).getTime();
			} else {
				q = new Date(q).getTime();
			}

			/* Check if the two rows should switch place,
			based on the direction, asc or desc: */
			if (dir == "asc") {
				if (n == 3) {
					if (p < q) {
						// If so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				} else if ((x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase())) {
					// If so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
				}
			} else if (dir == "desc") {
				if (n == 3) {
					if (p > q) {
						// If so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				} else if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
					// If so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
				}
			}
		}
		if (shouldSwitch) {
			/* If a switch has been marked, make the switch
			and mark that a switch has been done: */
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			// Each time a switch is done, increase this count by 1:
			switchcount++;
		} else {
			/* If no switching has been done AND the direction is "asc",
			set the direction to "desc" and run the while loop again. */
			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}
}