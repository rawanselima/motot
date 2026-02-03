// Checkout functionality - FIXED VERSION
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentStep = 1;
let vodafoneReceiptFile = null;
let instapayReceiptFile = null;

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    console.log('Checkout page loaded');
    updateCartCount();
    loadOrderSummary();
    setupCheckoutSteps();
    setupFormValidation();
    setupMobileMenu();
    setupPaymentMethods();
    setupFileUploads();
    updateYear();
    
    // Check if cart is empty
    if (cart.length === 0) {
        showNotification('سلة التسوق فارغة. الرجاء إضافة منتجات قبل المتابعة.');
        // Add sample items for testing
        cart = [
            {
                id: 1,
                name: 'بطارية سيارة 70 أمبير',
                price: 1200,
                quantity: 1
            }
        ];
        localStorage.setItem('cart', JSON.stringify(cart));
        loadOrderSummary();
        updateCartCount();
    }
});

// Update current year in footer
function updateYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
}

// Load order summary
function loadOrderSummary() {
    console.log('Loading order summary...');
    const orderItems = document.getElementById('orderItems');
    const sidebarItems = document.getElementById('sidebarItems');
    
    if (!orderItems || !sidebarItems) {
        console.error('Order items containers not found');
        return;
    }
    
    if (cart.length === 0) {
        orderItems.innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 20px;">سلة التسوق فارغة</p>';
        sidebarItems.innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 20px;">سلة التسوق فارغة</p>';
        return;
    }
    
    // Load order items
    orderItems.innerHTML = cart.map(item => `
        <div class="order-item">
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>${item.price} جنيه × ${item.quantity}</p>
            </div>
            <div class="item-quantity">
                ${item.quantity} قطعة
            </div>
            <div class="item-total">
                ${(item.price * item.quantity).toFixed(2)} جنيه
            </div>
        </div>
    `).join('');
    
    // Load sidebar items
    sidebarItems.innerHTML = cart.map(item => `
        <div class="sidebar-item">
            <span class="sidebar-item-name">${item.name}</span>
            <span class="sidebar-item-quantity">×${item.quantity}</span>
            <span class="sidebar-item-price">${(item.price * item.quantity).toFixed(2)} جنيه</span>
        </div>
    `).join('');
    
    updateOrderTotals();
}

// Update order totals
function updateOrderTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 50; // Fixed shipping cost for Egypt
    const tax = subtotal * 0.14; // 14% VAT for Egypt
    const total = subtotal + shipping + tax;
    
    const orderSubtotal = document.getElementById('orderSubtotal');
    const orderShipping = document.getElementById('orderShipping');
    const orderTax = document.getElementById('orderTax');
    const orderTotal = document.getElementById('orderTotal');
    const sidebarTotal = document.getElementById('sidebarTotal');
    
    if (orderSubtotal) orderSubtotal.textContent = `${subtotal.toFixed(2)} جنيه`;
    if (orderShipping) orderShipping.textContent = `${shipping.toFixed(2)} جنيه`;
    if (orderTax) orderTax.textContent = `${tax.toFixed(2)} جنيه`;
    if (orderTotal) orderTotal.textContent = `${total.toFixed(2)} جنيه`;
    if (sidebarTotal) sidebarTotal.textContent = `${total.toFixed(2)} جنيه`;
}

// Setup checkout steps
function setupCheckoutSteps() {
    console.log('Setting up checkout steps...');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextStepId = this.dataset.next;
            goToStep(nextStepId);
        });
    });
    
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prevStepId = this.dataset.prev;
            goToStep(prevStepId);
        });
    });
    
    // Handle form submission
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // التأكد من أن النموذج كامل
            if (!validateCurrentStep()) {
                showNotification('يرجى ملء جميع الحقول المطلوبة');
                return;
            }
            
            confirmOrder();
        });
    }
}

// Go to specific step
function goToStep(stepId) {
    console.log(`Going to step: ${stepId}`);
    
    // Validate current step before proceeding (except when going back)
    const targetStepNumber = parseInt(stepId.replace('step', ''));
    if (targetStepNumber > currentStep && !validateCurrentStep()) {
        return;
    }
    
    // Hide all steps
    document.querySelectorAll('.checkout-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show target step
    const targetStep = document.getElementById(stepId);
    if (targetStep) {
        targetStep.classList.add('active');
    }
    
    // Update step indicators
    const stepNumber = parseInt(stepId.replace('step', ''));
    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.remove('active');
        if (index + 1 <= stepNumber) {
            step.classList.add('active');
        }
    });
    
    // Update current step
    currentStep = stepNumber;
    
    // Scroll to top of step
    const checkoutContent = document.querySelector('.checkout-content');
    if (checkoutContent) {
        checkoutContent.scrollTop = 0;
    }
    
    console.log(`Now at step: ${currentStep}`);
}

// Validate current step
function validateCurrentStep() {
    console.log(`Validating step ${currentStep}`);
    const currentStepElement = document.querySelector('.checkout-step.active');
    
    if (!currentStepElement) {
        console.error('No active step found');
        return false;
    }
    
    const requiredInputs = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');
    
    let isValid = true;
    requiredInputs.forEach(input => {
        // Skip file inputs and checkboxes
        if (input.type === 'file' || input.type === 'checkbox' || input.type === 'radio') {
            return;
        }
        
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
            
            // Add error message
            if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                const errorMsg = document.createElement('span');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'هذا الحقل مطلوب';
                errorMsg.style.color = '#e74c3c';
                errorMsg.style.fontSize = '0.9rem';
                errorMsg.style.display = 'block';
                errorMsg.style.marginTop = '5px';
                input.parentNode.appendChild(errorMsg);
            }
        } else {
            input.style.borderColor = '#ddd';
            const errorMsg = input.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('error-message')) {
                errorMsg.remove();
            }
        }
    });
    
    if (currentStep === 1) {
        const phoneInput = document.getElementById('phone');
        if (phoneInput && phoneInput.value.trim()) {
            const phoneRegex = /^(010|011|012|015)\d{8}$/;
            if (!phoneRegex.test(phoneInput.value.trim())) {
                phoneInput.style.borderColor = '#e74c3c';
                isValid = false;
                showNotification('يرجى إدخال رقم هاتف مصري صحيح (يبدأ بـ 010، 011، 012، أو 015)');
            }
        }
    }
    
    if (!isValid) {
        showNotification('يرجى ملء جميع الحقول المطلوبة بشكل صحيح');
    }
    
    return isValid;
}

// Setup form validation
function setupFormValidation() {
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.style.borderColor = '#ddd';
            const errorMsg = this.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('error-message')) {
                errorMsg.remove();
            }
        });
    });
}

// Setup payment methods - FIXED VERSION
function setupPaymentMethods() {
    console.log('Setting up payment methods...');
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    const paymentDetails = document.getElementById('paymentDetails');
    
    if (!paymentDetails) {
        console.error('Payment details section not found');
        return;
    }
    
    // Set cash as default checked
    const cashOption = document.querySelector('input[value="cash"]');
    if (cashOption) {
        cashOption.checked = true;
    }
    
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            const value = this.value;
            console.log(`Payment method changed to: ${value}`);
            
            const vodafoneDetails = document.getElementById('vodafoneDetails');
            const instapayDetails = document.getElementById('instapayDetails');
            
            // Show/hide payment details based on selection
            if (value === 'vodafone' || value === 'instapay') {
                paymentDetails.classList.remove('hidden');
                
                // Show specific payment method details
                if (value === 'vodafone') {
                    console.log('Showing Vodafone Cash details');
                    if (vodafoneDetails) vodafoneDetails.classList.add('active');
                    if (instapayDetails) instapayDetails.classList.remove('active');
                } else if (value === 'instapay') {
                    console.log('Showing Instapay details');
                    if (instapayDetails) instapayDetails.classList.add('active');
                    if (vodafoneDetails) vodafoneDetails.classList.remove('active');
                }
                
                // Update required fields
                updatePaymentRequiredFields(value);
            } else {
                console.log('Hiding payment details (cash selected)');
                paymentDetails.classList.add('hidden');
                if (vodafoneDetails) vodafoneDetails.classList.remove('active');
                if (instapayDetails) instapayDetails.classList.remove('active');
                
                // Remove required from payment fields
                updatePaymentRequiredFields('cash');
            }
        });
    });
}

// Setup file uploads - FIXED VERSION
function setupFileUploads() {
    console.log('Setting up file uploads...');
    
    // Vodafone Cash Upload
    const vodafoneUploadBox = document.getElementById('vodafoneUploadBox');
    const vodafoneReceiptInput = document.getElementById('vodafoneReceipt');
    const vodafonePreview = document.getElementById('vodafonePreview');
    const vodafonePreviewImg = document.getElementById('vodafonePreviewImg');
    const vodafoneFileName = document.getElementById('vodafoneFileName');
    const removeVodafoneBtn = document.getElementById('removeVodafone');
    
    if (vodafoneUploadBox && vodafoneReceiptInput) {
        vodafoneUploadBox.addEventListener('click', () => {
            console.log('Vodafone upload clicked');
            vodafoneReceiptInput.click();
        });
        
        vodafoneReceiptInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                console.log('Vodafone file selected:', file.name);
                
                if (file.size > 5 * 1024 * 1024) { // 5MB limit
                    showNotification('حجم الملف أكبر من 5MB. يرجى اختيار ملف أصغر.');
                    return;
                }
                
                if (!file.type.match('image.*')) {
                    showNotification('الرجاء اختيار صورة فقط.');
                    return;
                }
                
                vodafoneReceiptFile = file;
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    if (vodafonePreviewImg) vodafonePreviewImg.src = e.target.result;
                    if (vodafoneFileName) vodafoneFileName.textContent = file.name;
                    if (vodafonePreview) vodafonePreview.classList.remove('hidden');
                }
                reader.readAsDataURL(file);
            }
        });
    }
    
    if (removeVodafoneBtn) {
        removeVodafoneBtn.addEventListener('click', function() {
            console.log('Removing Vodafone receipt');
            vodafoneReceiptFile = null;
            if (vodafoneReceiptInput) vodafoneReceiptInput.value = '';
            if (vodafonePreview) vodafonePreview.classList.add('hidden');
        });
    }
    
    // Instapay Upload
    const instapayUploadBox = document.getElementById('instapayUploadBox');
    const instapayReceiptInput = document.getElementById('instapayReceipt');
    const instapayPreview = document.getElementById('instapayPreview');
    const instapayPreviewImg = document.getElementById('instapayPreviewImg');
    const instapayFileName = document.getElementById('instapayFileName');
    const removeInstapayBtn = document.getElementById('removeInstapay');
    
    if (instapayUploadBox && instapayReceiptInput) {
        instapayUploadBox.addEventListener('click', () => {
            console.log('Instapay upload clicked');
            instapayReceiptInput.click();
        });
        
        instapayReceiptInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                console.log('Instapay file selected:', file.name);
                
                if (file.size > 5 * 1024 * 1024) {
                    showNotification('حجم الملف أكبر من 5MB. يرجى اختيار ملف أصغر.');
                    return;
                }
                
                if (!file.type.match('image.*')) {
                    showNotification('الرجاء اختيار صورة فقط.');
                    return;
                }
                
                instapayReceiptFile = file;
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    if (instapayPreviewImg) instapayPreviewImg.src = e.target.result;
                    if (instapayFileName) instapayFileName.textContent = file.name;
                    if (instapayPreview) instapayPreview.classList.remove('hidden');
                }
                reader.readAsDataURL(file);
            }
        });
    }
    
    if (removeInstapayBtn) {
        removeInstapayBtn.addEventListener('click', function() {
            console.log('Removing Instapay receipt');
            instapayReceiptFile = null;
            if (instapayReceiptInput) instapayReceiptInput.value = '';
            if (instapayPreview) instapayPreview.classList.add('hidden');
        });
    }
    
    // Drag and drop functionality
    setupDragAndDrop(vodafoneUploadBox, vodafoneReceiptInput, (file) => {
        vodafoneReceiptFile = file;
    });
    
    setupDragAndDrop(instapayUploadBox, instapayReceiptInput, (file) => {
        instapayReceiptFile = file;
    });
}

// Setup drag and drop
function setupDragAndDrop(dropZone, fileInput, callback) {
    if (!dropZone) return;
    
    dropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = '#2c3e50';
        this.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
    });
    
    dropZone.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.borderColor = '#ddd';
        this.style.backgroundColor = '';
    });
    
    dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = '#ddd';
        this.style.backgroundColor = '';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.match('image.*') && file.size <= 5 * 1024 * 1024) {
                // Create a new FileList
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                fileInput.files = dataTransfer.files;
                
                // Trigger change event
                const event = new Event('change', { bubbles: true });
                fileInput.dispatchEvent(event);
                
                if (callback) callback(file);
            } else {
                showNotification('الرجاء اختيار صورة بحجم أقل من 5MB');
            }
        }
    });
}

// Update required fields based on payment method
function updatePaymentRequiredFields(paymentMethod) {
    // Reset all required fields first
    const vodafoneSenderNumber = document.getElementById('vodafoneSenderNumber');
    const instapaySenderMethod = document.getElementById('instapaySenderMethod');
    const instapaySenderInfo = document.getElementById('instapaySenderInfo');
    
    if (vodafoneSenderNumber) {
        vodafoneSenderNumber.required = false;
        vodafoneSenderNumber.style.borderColor = '#ddd';
    }
    
    if (instapaySenderMethod) {
        instapaySenderMethod.required = false;
        instapaySenderMethod.style.borderColor = '#ddd';
    }
    
    if (instapaySenderInfo) {
        instapaySenderInfo.required = false;
        instapaySenderInfo.style.borderColor = '#ddd';
    }
    
    // Set required fields based on payment method
    if (paymentMethod === 'vodafone') {
        if (vodafoneSenderNumber) vodafoneSenderNumber.required = true;
    } else if (paymentMethod === 'instapay') {
        if (instapaySenderMethod) instapaySenderMethod.required = true;
        if (instapaySenderInfo) instapaySenderInfo.required = true;
    }
}

// Validate payment details - FIXED VERSION
function validatePayment() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked');
    if (!paymentMethod) {
        showNotification('يرجى اختيار طريقة الدفع');
        return false;
    }
    
    const value = paymentMethod.value;
    console.log(`Validating payment: ${value}`);
    
    if (value === 'vodafone') {
        // Validate Vodafone Cash
        const senderNumberInput = document.getElementById('vodafoneSenderNumber');
        if (!senderNumberInput) {
            console.error('Vodafone sender number input not found');
            return false;
        }
        
        const senderNumber = senderNumberInput.value.trim();
        
        if (!senderNumber) {
            showNotification('يرجى إدخال الرقم المحول منه');
            senderNumberInput.style.borderColor = '#e74c3c';
            return false;
        }
        
        // Validate phone number format for Egypt
        const phoneRegex = /^(010|011|012|015)\d{8}$/;
        if (!phoneRegex.test(senderNumber)) {
            showNotification('يرجى إدخال رقم هاتف مصري صحيح (يبدأ بـ 010، 011، 012، أو 015)');
            senderNumberInput.style.borderColor = '#e74c3c';
            return false;
        }
        
        if (!vodafoneReceiptFile) {
            showNotification('يرجى رفع صورة إيصال التحويل');
            return false;
        }
        
    } else if (value === 'instapay') {
        // Validate Instapay
        const senderMethodInput = document.getElementById('instapaySenderMethod');
        const senderInfoInput = document.getElementById('instapaySenderInfo');
        
        if (!senderMethodInput || !senderInfoInput) {
            console.error('Instapay inputs not found');
            return false;
        }
        
        const senderMethod = senderMethodInput.value;
        const senderInfo = senderInfoInput.value.trim();
        
        if (!senderMethod) {
            showNotification('يرجى اختيار طريقة التحويل');
            senderMethodInput.style.borderColor = '#e74c3c';
            return false;
        }
        
        if (!senderInfo) {
            showNotification('يرجى إدخال المعلومات المحول منها');
            senderInfoInput.style.borderColor = '#e74c3c';
            return false;
        }
        
        if (!instapayReceiptFile) {
            showNotification('يرجى رفع صورة إيصال التحويل');
            return false;
        }
        
        // Validate based on sender method
        if (senderMethod === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(senderInfo)) {
                showNotification('يرجى إدخال بريد إلكتروني صحيح');
                senderInfoInput.style.borderColor = '#e74c3c';
                return false;
            }
        } else if (senderMethod === 'phone') {
            const phoneRegex = /^(010|011|012|015)\d{8}$/;
            if (!phoneRegex.test(senderInfo)) {
                showNotification('يرجى إدخال رقم هاتف مصري صحيح');
                senderInfoInput.style.borderColor = '#e74c3c';
                return false;
            }
        }
    }
    
    return true;
}

// Confirm order - FIXED VERSION
function confirmOrder() {
    console.log('Confirming order...');
    
    // Validate all steps
    if (!validateCurrentStep()) {
        return;
    }
    
    // Check terms agreement
    const termsCheckbox = document.getElementById('terms');
    if (!termsCheckbox || !termsCheckbox.checked) {
        showNotification('يجب الموافقة على الشروط والأحكام');
        return;
    }
    
    // Validate payment details if applicable
    const paymentMethodInput = document.querySelector('input[name="payment"]:checked');
    if (!paymentMethodInput) {
        showNotification('يرجى اختيار طريقة الدفع');
        return;
    }
    
    const paymentMethod = paymentMethodInput.value;
    
    if (paymentMethod === 'vodafone' || paymentMethod === 'instapay') {
        if (!validatePayment()) {
            return;
        }
    }
    
    // Collect form data
    const formData = {
        customerInfo: {
            fullName: document.getElementById('fullName')?.value || '',
            email: document.getElementById('email')?.value || '',
            phone: document.getElementById('phone')?.value || ''
        },
        shippingAddress: {
            address: document.getElementById('address')?.value || '',
            governorate: document.getElementById('governorate')?.value || '',
            city: document.getElementById('city')?.value || '',
            district: document.getElementById('district')?.value || '',
            postalCode: document.getElementById('postalCode')?.value || '',
            landmark: document.getElementById('landmark')?.value || ''
        },
        paymentMethod: paymentMethod,
        paymentDetails: getPaymentDetails(paymentMethod),
        orderItems: cart,
        orderTotal: document.getElementById('orderTotal')?.textContent || '0 جنيه',
        orderNumber: generateOrderNumber()
    };
    
    console.log('Order data collected:', formData);
    
    // Simulate order processing
    simulateOrderProcessing(formData);
}

// Get payment details based on method
function getPaymentDetails(paymentMethod) {
    if (paymentMethod === 'vodafone') {
        return {
            type: 'vodafone_cash',
            receiverNumber: '01013706142',
            senderNumber: document.getElementById('vodafoneSenderNumber')?.value.trim() || '',
            transactionNumber: document.getElementById('vodafoneTransactionNumber')?.value.trim() || '',
            receiptFile: vodafoneReceiptFile ? vodafoneReceiptFile.name : null,
            receiptSize: vodafoneReceiptFile ? vodafoneReceiptFile.size : null,
            receiptType: vodafoneReceiptFile ? vodafoneReceiptFile.type : null
        };
    } else if (paymentMethod === 'instapay') {
        return {
            type: 'instapay',
            receiverEmail: 'motor.fix@instapay.com',
            receiverName: 'Motor Fix Store',
            senderMethod: document.getElementById('instapaySenderMethod')?.value || '',
            senderInfo: document.getElementById('instapaySenderInfo')?.value.trim() || '',
            transactionNumber: document.getElementById('instapayTransactionNumber')?.value.trim() || '',
            receiptFile: instapayReceiptFile ? instapayReceiptFile.name : null,
            receiptSize: instapayReceiptFile ? instapayReceiptFile.size : null,
            receiptType: instapayReceiptFile ? instapayReceiptFile.type : null
        };
    } else {
        return { type: 'cash_on_delivery' };
    }
}

// Generate order number
function generateOrderNumber() {
    return 'MF-' + Date.now().toString().slice(-8) + '-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
}

// Simulate order processing
function simulateOrderProcessing(orderData) {
    console.log('Processing order...');
    console.log('Payment method:', orderData.paymentMethod);
    
    const confirmBtn = document.querySelector('.confirm-order');
    if (!confirmBtn) {
        console.error('Confirm button not found');
        return;
    }
    
    const originalText = confirmBtn.innerHTML;
    
    // Show loading state
    confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري معالجة الطلب...';
    confirmBtn.disabled = true;
    
    // Show payment loading if it's an online transfer
    const paymentLoading = document.getElementById('paymentLoading');
    if (paymentLoading && (orderData.paymentMethod === 'vodafone' || orderData.paymentMethod === 'instapay')) {
        paymentLoading.classList.remove('hidden');
    }
    
    // Simulate API call
    setTimeout(() => {
        console.log('Order processed successfully!');
        
        // Clear cart
        localStorage.removeItem('cart');
        cart = [];
        updateCartCount();
        
        // Save order to localStorage
        saveOrderToLocal(orderData);
        
        // Hide loading
        if (paymentLoading) {
            paymentLoading.classList.add('hidden');
        }
        
        // Show success message
        showSuccessModal(orderData);
        
        // Reset button
        confirmBtn.innerHTML = originalText;
        confirmBtn.disabled = false;
    }, 2000);
}

// Save order to localStorage
function saveOrderToLocal(orderData) {
    console.log('Saving order to localStorage...');
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orderData.orderDate = new Date().toISOString();
    orderData.status = 'pending';
    orderData.paymentStatus = 'pending';
    
    // If it's a transfer payment, status is "تحت المراجعة"
    if (orderData.paymentMethod === 'vodafone' || orderData.paymentMethod === 'instapay') {
        orderData.status = 'under_review';
        orderData.paymentStatus = 'waiting_verification';
    }
    
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));
    console.log('Order saved:', orderData.orderNumber);
}

function showSuccessModal(orderData) {
    console.log('Showing success modal for payment method:', orderData.paymentMethod);
    
    // Remove existing modal if any
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    // Messages based on payment method
    let paymentMessage = '';
    if (orderData.paymentMethod === 'vodafone' || orderData.paymentMethod === 'instapay') {
        paymentMessage = `
            <div class="payment-instruction" style="margin: 20px 0; padding: 15px; background: #fff3cd; border-right: 4px solid #ffc107; border-radius: 6px;">
                <p style="color: #856404; margin: 0;">
                    <i class="fas fa-clock"></i> سيتم التحقق من عملية التحويل خلال 1-3 ساعات عمل
                </p>
            </div>
        `;
    } else if (orderData.paymentMethod === 'cash') {
        paymentMessage = `
            <div class="payment-instruction" style="margin: 20px 0; padding: 15px; background: #d4edda; border-right: 4px solid #28a745; border-radius: 6px;">
                <p style="color: #155724; margin: 0;">
                    <i class="fas fa-money-bill-wave"></i> سيتم الدفع نقداً عند استلام الطلب
                </p>
            </div>
        `;
    }
    
    modal.innerHTML = `
        <div class="modal-content" style="background: white; padding: 40px; border-radius: 12px; max-width: 500px; width: 90%; text-align: center; box-shadow: 0 10px 50px rgba(0,0,0,0.3);">
            <div class="modal-icon" style="color: #28a745; font-size: 4rem; margin-bottom: 20px;">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3 style="color: #2c3e50; font-size: 1.8rem; margin-bottom: 15px;">تم تأكيد طلبك بنجاح!</h3>
            ${paymentMessage}
            <div class="modal-order-details" style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: right;">
                <h4 style="color: #2c3e50; margin-bottom: 15px; border-bottom: 2px solid #ddd; padding-bottom: 10px;">تفاصيل الطلب:</h4>
                <p style="margin: 10px 0; color: #555;"><strong>رقم الطلب:</strong> ${orderData.orderNumber}</p>
                <p style="margin: 10px 0; color: #555;"><strong>المبلغ الإجمالي:</strong> ${orderData.orderTotal}</p>
                <p style="margin: 10px 0; color: #555;"><strong>طريقة الدفع:</strong> ${getPaymentMethodName(orderData.paymentMethod)}</p>
                <p style="margin: 10px 0; color: #555;"><strong>تاريخ الطلب:</strong> ${new Date().toLocaleDateString('ar-EG')}</p>
            </div>
            <p style="margin: 20px 0 25px; color: #555; font-size: 0.95rem; line-height: 1.5;">
                شكراً لثقتك بنا! سيتم التواصل معك قريباً لتأكيد الطلب وتحديد موعد التوصيل.
            </p>
            <div class="modal-buttons">
                <button id="continueShoppingBtn" class="btn btn-primary" style="background: #2c3e50; color: white; padding: 12px 30px; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem; transition: all 0.3s ease;">
                    <i class="fas fa-shopping-cart"></i> مواصلة التسوق
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listener to continue shopping button
    const continueBtn = modal.querySelector('#continueShoppingBtn');
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            console.log('Continuing shopping...');
            modal.remove();
            window.location.href = '../index.html';
        });
        
        // Add hover effect
        continueBtn.addEventListener('mouseenter', function() {
            this.style.background = '#34495e';
            this.style.transform = 'translateY(-2px)';
        });
        
        continueBtn.addEventListener('mouseleave', function() {
            this.style.background = '#2c3e50';
            this.style.transform = 'translateY(0)';
        });
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            window.location.href = '../index.html';
        }
    });
}

// Get payment method name in Arabic
function getPaymentMethodName(method) {
    switch(method) {
        case 'vodafone': return 'فودافون كاش';
        case 'instapay': return 'انستا باي';
        case 'cash': return 'الدفع عند الاستلام';
        default: return method;
    }
}

// Update cart count
function updateCartCount() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = cartCount;
    });
}

// Show notification
function showNotification(message) {
    console.log('Notification:', message);
    
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background-color: #2c3e50;
        color: #fff;
        padding: 15px 25px;
        border-radius: 4px;
        z-index: 10000;
        box-shadow: 0 2px 15px rgba(0,0,0,0.1);
        animation: slideIn 0.3s ease;
        font-family: inherit;
        font-size: 0.95rem;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations for notification
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(-100%); opacity: 0; }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Mobile menu toggle
function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
}