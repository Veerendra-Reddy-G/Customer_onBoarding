import { validateEmail, validatePhone, validateDOB, validateDocumentId } from '@/utils/validation';

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('returns true for valid emails', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@example.co.uk')).toBe(true);
    });

    it('returns false for invalid emails', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
    });
  });


  describe('validateDOB', () => {
    it('returns true for dates that make person 18+ years old', () => {
      const eighteenYearsAgo = new Date();
      eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
      expect(validateDOB(eighteenYearsAgo.toISOString().split('T')[0])).toBe(true);
    });

    it('returns false for dates that make person under 18', () => {
      const seventeenYearsAgo = new Date();
      seventeenYearsAgo.setFullYear(seventeenYearsAgo.getFullYear() - 17);
      expect(validateDOB(seventeenYearsAgo.toISOString().split('T')[0])).toBe(false);
    });
  });

  describe('validateDocumentId', () => {
    it('returns true for valid document IDs', () => {
      expect(validateDocumentId('ABC123')).toBe(true);
      expect(validateDocumentId('123456')).toBe(true);
    });

    it('returns false for invalid document IDs', () => {
      expect(validateDocumentId('123')).toBe(false);
      expect(validateDocumentId('ABC')).toBe(false);
    });
  });
});