document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('copy').textContent = new Date().getFullYear();
    const contactForm = document.getElementById('contact-form');
    

    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Client-side validation
        if (!validateForm()) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
          return;
        }
        
        // Send data to server
        fetch('./api/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Object.fromEntries(formData))
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Show success message
            showAlert('success', data.message);
            contactForm.reset();
          } else {
            // Show error message
            showAlert('error', data.message || 'An error occurred. Please try again.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          showAlert('error', 'Failed to send message. Please check your connection and try again.');
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        });
      });
    }
    
    // Form validation function
    function validateForm() {
      let isValid = true;
      const form = document.getElementById('contact-form');
      
      // Validate name
      const nameInput = form.querySelector('input[name="name"]');
      if (!nameInput.value.trim()) {
        showAlert('error', 'Please enter your name');
        isValid = false;
      }
      
      // Validate email
      const emailInput = form.querySelector('input[name="email"]');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value)) {
        showAlert('error', 'Please enter a valid email address');
        isValid = false;
      }
      
      // Validate message
      const messageInput = form.querySelector('textarea[name="message"]');
      if (!messageInput.value.trim()) {
        showAlert('error', 'Please enter your message');
        isValid = false;
      }
      
      return isValid;
    }
    
    // Show alert message
    function showAlert(type, message) {
      // Remove any existing alerts
      const existingAlert = document.querySelector('.form-alert');
      if (existingAlert) {
        existingAlert.remove();
      }
      
      // Create alert element
      const alertDiv = document.createElement('div');
      alertDiv.className = `form-alert alert-${type}`;
      alertDiv.innerHTML = `
        <span>${message}</span>
        <button class="close-alert">&times;</button>
      `;
      
      // Insert alert
      const contactHeading = document.getElementById('contact-heading');
      if (contactHeading) {
        contactHeading.insertAdjacentElement('afterend', alertDiv);
      } else {
        contactForm.insertAdjacentElement('beforebegin', alertDiv);
      }
      
      // Close button functionality
      const closeBtn = alertDiv.querySelector('.close-alert');
      closeBtn.addEventListener('click', () => {
        alertDiv.remove();
      });
      
      // Auto-remove after 5 seconds
      setTimeout(() => {
        if (alertDiv.parentNode) {
          alertDiv.remove();
        }
      }, 5000);
    }
  });