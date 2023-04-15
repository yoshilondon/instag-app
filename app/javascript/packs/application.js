// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
// import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
// Turbolinks.start()
ActiveStorage.start()

//= require jquery3
//= require popper
//= require bootstrap





// $('.profilePage_image').on('click', () => {
//   axios.get('/profile')
//     .then((response) => {
//       console.log(response)
//     })
// })

// document.addEventListener('turbolinks:load', function() {

//   $('.profile_usericon').on('click', () => {
//     if ($('.avatar_edit_form').removeClass('hidden')){
//       $('.avatar_edit_form').removeClass('hidden')
//     } else {
//        $('.avatar_edit_form').addClass('hidden')
//     }
//   })
// })