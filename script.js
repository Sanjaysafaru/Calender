let daysList = document.querySelector(".ulDays");
let cMonth =  document.querySelector(".cMonth");
let cYear = document.querySelector(".cYear");
let prevNextIcon = document.querySelectorAll("img");
let months = document.querySelector(".months");
let monthsList = document.querySelector(".monthsList")
let month = document.querySelectorAll(".month");
let calender = document.querySelector(".calender");
let year = document.querySelector(".year");
let input = document.querySelector("input");


//Defining Months array, as currYear stores number form 0 to 11.
 let Months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

//Getting the present date
let date = new Date();
let currMonth = date.getMonth();
let currYear = date.getFullYear();


//funtion to print dates in the calender
const printCalender = () => {
    let firstDayofMonth = new Date(currYear,currMonth, 1).getDay();
    let lastDateofMonth = new Date(currYear,currMonth+1, 0).getDate();
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    //dates are defined as list items in html code, so we have to add dates as list items
    liList = "";

    //Adding dates of previous month
    for( let i = firstDayofMonth; i > 0; i--){
        liList += `<li class = "inactive" >${lastDateofLastMonth - i + 1 }</li>`;
    }

    //Adding dates of present month
    for(let i = 1; i <= lastDateofMonth; i++){
        //checking whether any date is same as today, if yes we add .active class to that date (list item)
        let isToday = i === new Date().getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
        liList += `<li class ="${isToday}">${i}</li>`;
    }

    //Adding dates of next month
    for(let i = lastDayofMonth; i < 6 ; i++){
        liList += `<li class = "inactive" > ${i-lastDayofMonth+1} </li>`
    }

    //Adding all list items to the already defined ul list in html
    daysList.innerHTML = liList;

    //Mentioning month and year of given dates as heading on top of calender
    cMonth.innerHTML = `${Months[currMonth]} `;
    cYear.innerHTML = `${currYear}`;
}

//calling the function to print dates in calender when web page is loaded
printCalender();

//defining funtions of given icons to show 
    //previous months dates, next month dates, and reset for showing present month and year respectively
prevNextIcon.forEach((icon) => {
    icon.addEventListener("click", () => {
        if(icon.id === "reload"){
            monthsList.style.display = "none";
            year.style.display = "none";
            calender.style.display = "block";
            date = new Date();
            currMonth = date.getMonth();
            currYear = date.getFullYear();
            printCalender();
        } else {
            currMonth = icon.id === "previous" ? (currMonth-1) : (currMonth+1) ;
            if(currMonth < 0){
                currYear -= 1;
                currMonth = 11;
            } else if (currMonth > 11){
                currYear += 1;
                currMonth = 0;
            }printCalender();
         }}
    );
});


//defining dropdown for selecting the required month
cMonth.addEventListener("click", () => {
    monthsList.style.display = "block";
    calender.style.display = "none";
});
//get the user choosed month and hide dropdown 
month.forEach((month) => {
        month.addEventListener("click" , () => {
            monthsList.style.display = "none";
            calender.style.display = "block";
            currMonth = Number(month.id);
            printCalender();
        });
    });


//defining dropdown for selecting the required year
cYear.addEventListener("click", () => {
    input.value = currYear;
    year.style.display = "block";
})
//get the user choosed year and hide dropdown 
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        if(input.value != 0){
            if(input.value < 1000 || input.value > 9999){
                alert("Enter year between 1000 and 9999");
            }else {
                currYear = input.value;
                printCalender();
                year.style.display = "none";
            }
        }else{
            year.style.display = "none";
        }
        
    }
})

    

    