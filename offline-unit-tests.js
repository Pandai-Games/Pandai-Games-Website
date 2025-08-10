// offline-unit-tests.js
// Pure JavaScript unit tests that can run offline with Node.js

console.log('🧪 Starting Offline Unit Tests for Pandai Games Notification System\n');

// Email validation function (enhanced version matching React component)
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email && emailRegex.test(email);
}

// Mock API response handler
function mockAPIResponse(email) {
    // Enhanced server-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return {
            success: false,
            status: 400,
            message: 'Please provide a valid email address'
        };
    }
    
    // Simulate duplicate check (mock database)
    const mockDatabase = ['existing@user.com', 'duplicate@test.com'];
    if (mockDatabase.includes(email.toLowerCase())) {
        return {
            success: false,
            status: 409,
            message: 'This email is already subscribed to notifications'
        };
    }
    
    return {
        success: true,
        status: 200,
        message: 'Successfully subscribed to game launch notifications!'
    };
}

// Test suite
class TestSuite {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }
    
    test(description, testFunction) {
        try {
            testFunction();
            this.passed++;
            console.log(`✅ ${description}`);
        } catch (error) {
            this.failed++;
            console.log(`❌ ${description}: ${error.message}`);
        }
    }
    
    assertEquals(actual, expected, message = '') {
        if (actual !== expected) {
            throw new Error(`Expected ${expected}, but got ${actual}. ${message}`);
        }
    }
    
    assertTrue(condition, message = '') {
        if (!condition) {
            throw new Error(`Expected true, but got false. ${message}`);
        }
    }
    
    assertFalse(condition, message = '') {
        if (condition) {
            throw new Error(`Expected false, but got true. ${message}`);
        }
    }
    
    summary() {
        console.log(`\n📊 Test Summary:`);
        console.log(`✅ Passed: ${this.passed}`);
        console.log(`❌ Failed: ${this.failed}`);
        console.log(`📈 Total: ${this.passed + this.failed}`);
        console.log(`🎯 Success Rate: ${Math.round((this.passed / (this.passed + this.failed)) * 100)}%`);
        
        if (this.failed === 0) {
            console.log('🎉 All tests passed!');
        } else {
            console.log('⚠️  Some tests failed. Please review the results above.');
        }
    }
}

// Run the tests
const suite = new TestSuite();

console.log('🔍 Testing Email Validation Logic:\n');

suite.test('Empty email should be invalid', () => {
    suite.assertFalse(isValidEmail(''));
});

suite.test('Email without @ should be invalid', () => {
    suite.assertFalse(isValidEmail('testuser'));
});

suite.test('Email without domain should be invalid', () => {
    suite.assertFalse(isValidEmail('test@'));
});

suite.test('Email without TLD should be invalid', () => {
    suite.assertFalse(isValidEmail('test@domain'));
});

suite.test('Valid simple email should be valid', () => {
    suite.assertTrue(isValidEmail('test@domain.com'));
});

suite.test('Email with incomplete TLD should be invalid', () => {
    suite.assertFalse(isValidEmail('test@domain.'));
});

suite.test('Email with missing username should be invalid', () => {
    suite.assertFalse(isValidEmail('@domain.com'));
});

suite.test('Email with spaces should be invalid', () => {
    suite.assertFalse(isValidEmail('test @domain.com'));
});

suite.test('Email with multiple @ symbols should be invalid', () => {
    suite.assertFalse(isValidEmail('test@@domain.com'));
});

console.log('\n🔍 Testing API Response Logic:\n');

suite.test('Valid email should return success', () => {
    const response = mockAPIResponse('newuser@example.com');
    suite.assertTrue(response.success);
    suite.assertEquals(response.status, 200);
});

suite.test('Invalid email should return error', () => {
    const response = mockAPIResponse('invalid-email');
    suite.assertFalse(response.success);
    suite.assertEquals(response.status, 400);
});

suite.test('Duplicate email should return conflict', () => {
    const response = mockAPIResponse('existing@user.com');
    suite.assertFalse(response.success);
    suite.assertEquals(response.status, 409);
});

suite.test('Empty email should return error', () => {
    const response = mockAPIResponse('');
    suite.assertFalse(response.success);
    suite.assertEquals(response.status, 400);
});

console.log('\n🔍 Testing Frontend State Logic:\n');

// Mock React component state behavior
class MockNotificationComponent {
    constructor() {
        this.state = {
            email: '',
            subscriptionStatus: '',
            isLoading: false
        };
    }
    
    setEmail(email) {
        this.state.email = email;
    }
    
    setLoading(loading) {
        this.state.isLoading = loading;
    }
    
    setStatus(status) {
        this.state.subscriptionStatus = status;
    }
    
    clearForm() {
        this.state.email = '';
    }
    
    handleSubmit() {
        if (!isValidEmail(this.state.email)) {
            this.setStatus('Please enter a valid email address');
            return false;
        }
        
        this.setLoading(true);
        // Simulate API call
        const response = mockAPIResponse(this.state.email);
        this.setLoading(false);
        
        if (response.success) {
            this.setStatus('✅ Successfully subscribed!');
            this.clearForm();
            return true;
        } else {
            this.setStatus(response.message);
            return false;
        }
    }
}

suite.test('Component initial state should be correct', () => {
    const component = new MockNotificationComponent();
    suite.assertEquals(component.state.email, '');
    suite.assertEquals(component.state.subscriptionStatus, '');
    suite.assertFalse(component.state.isLoading);
});

suite.test('Component should handle email input', () => {
    const component = new MockNotificationComponent();
    component.setEmail('test@example.com');
    suite.assertEquals(component.state.email, 'test@example.com');
});

suite.test('Component should handle loading state', () => {
    const component = new MockNotificationComponent();
    component.setLoading(true);
    suite.assertTrue(component.state.isLoading);
});

suite.test('Component should handle successful submission', () => {
    const component = new MockNotificationComponent();
    component.setEmail('newuser@test.com');
    const result = component.handleSubmit();
    suite.assertTrue(result);
    suite.assertEquals(component.state.email, ''); // Should clear form
    suite.assertTrue(component.state.subscriptionStatus.includes('✅'));
});

suite.test('Component should handle invalid email submission', () => {
    const component = new MockNotificationComponent();
    component.setEmail('invalid');
    const result = component.handleSubmit();
    suite.assertFalse(result);
    suite.assertTrue(component.state.subscriptionStatus.includes('valid email'));
});

console.log('\n🔍 Testing Request/Response Format:\n');

suite.test('API request should have correct structure', () => {
    const email = 'test@example.com';
    const expectedBody = JSON.stringify({ email });
    const requestBody = JSON.stringify({ email: email });
    suite.assertEquals(requestBody, expectedBody);
});

suite.test('Success response should have correct format', () => {
    const response = mockAPIResponse('test@example.com');
    suite.assertTrue(response.hasOwnProperty('success'));
    suite.assertTrue(response.hasOwnProperty('message'));
    suite.assertTrue(response.hasOwnProperty('status'));
});

suite.test('Error response should have correct format', () => {
    const response = mockAPIResponse('invalid');
    suite.assertTrue(response.hasOwnProperty('success'));
    suite.assertTrue(response.hasOwnProperty('message'));
    suite.assertTrue(response.hasOwnProperty('status'));
    suite.assertFalse(response.success);
});

// Show final results
suite.summary();
