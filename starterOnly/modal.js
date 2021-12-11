function editNav() {
  let x = document.getElementById("main-navbar");
  if (x.className === "main-navbar") {
    x.className += " responsive";
  } else {
    x.className = "main-navbar";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalValid = document.querySelector(".modal-validation");
const reserve = document.querySelector("[name='reserve']");
const formData = document.querySelectorAll(".formData");
const firstname = document.querySelector("#firstName");
const lastname = document.querySelector("#lastName");
const email = document.querySelector("#email");
const birthdate = document.querySelector("#birthdate");
const quantity = document.querySelector("#quantity");
const locations = document.querySelectorAll("[name='location']");
const checkbox1 = document.querySelector("#checkbox1");
let validities = new Map([
  ['firstName', false],
  ['lastName', false],
  ['email', false],
  ['birthdate',false],
  ['quantity',false],
  ['locations',false],
  ['checkbox1',false]
]);
const today = new Date(Date.now()).toJSON().split('T')[0];
birthdate.setAttribute('max',today);
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

reserve.addEventListener("submit", (e)=>{
  e.preventDefault();
  if(validate()){
    reserve.style.display = "none"
    modalValid.style.display ="grid"
  }
})
/**
 * launch modal form
 * @this {launchModal}
 * @return {void}
 */
function launchModal() {
  modalbg.style.display = "block";
}

/**
 * close modal form
 * @this {closeModal}
 * @return {void}
 */
function closeModal(){
  modalbg.style.display = "none";
  reserve.style.display = "block";
  modalValid.style.display ="none"
}

/**
 * check the validity of an input
 * @this {isValid}
 * @param {HTMLFormElement} input l'input à tester
 * @return {void}                 affiche un message d'erreur ou non
 */
function isValid(input){
  if(input.validity.patternMismatch || !input.value){
    input.parentNode.setAttribute('data-error-visible',true);
    validities.set(input.name,false);
  }
  else{
    input.parentNode.setAttribute('data-error-visible',false);
    validities.set(input.name,true);
  }
}

/**
 * check the validity of an input number
 * @this {isInRange}
 * @param {HTMLFormElement} input l'input à tester
 * @return {void}                 affiche un message d'erreur ou non
 */
function isInRange(input){
  if(input.validity.rangeOverflow || input.validity.rangeUnderflow || !input.value){
    input.parentNode.setAttribute('data-error-visible',true);
    validities.set(input.name,false);
  }
  else{
    input.parentNode.setAttribute('data-error-visible',false);
    validities.set(input.name,true);
  }
}

/**
 * check if a checkbox is checked
 * @this {isChecked}
 * @param {HTMLFormElement} checkbox checkbox à tester
 * @return {void}                 affiche un message d'erreur ou non
 */
function isChecked(checkbox){
  if(checkbox.checked){
    checkbox.parentNode.setAttribute('data-error-visible',false);
    validities.set(checkbox.id,true);
  }
  else{
    checkbox.parentNode.setAttribute('data-error-visible',true);
    validities.set(checkbox.id,false);
  }
}

/**
 * check if one radio button is checked
 * @this {isOneRadioCheck}
 * @return {boolean} true si au moins un bouton radio est coché, false sinon
 */
function isOneRadioCheck(){
  for(const checkbox of locations){
    if(checkbox.checked){
      locations[0].parentNode.setAttribute('data-error-visible',false);
      validities.set('locations',true);
      return true;
    }
  }
  locations[0].parentNode.setAttribute('data-error-visible',true);
  validities.set('locations',false);
  return false;
}

/**
 * check the validity of all input
 * @this {validate}
 * @return {boolean} true si tout les champs sont remplis, false sinon
 */
function validate(){
  isValid(firstname);
  isValid(lastname);
  isValid(email);
  isValid(quantity);
  isValid(birthdate);
  isOneRadioCheck();
  isChecked(checkbox1);
  return validities.get('firstName') && validities.get('lastName') && validities.get('email') && validities.get('quantity') && validities.get('birthdate') && validities.get('locations') && validities.get('checkbox1');
}