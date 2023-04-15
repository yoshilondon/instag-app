import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

document.addEventListener('DOMContentLoaded', () => {
  const update = document.getElementById('profile_avatar')
  if (update) {
    update.addEventListener('change', (e) => {
      const file = update.files[0];   
      const reader = new FileReader(); 
      reader.readAsDataURL(file);
      reader.onload = () => {
        const image = reader.result;
        console.log(image);
        document.querySelector('.avatar-image').setAttribute('src', image);
      }
      $('.submit-btn').removeClass('hidden')

    });
  }
});
