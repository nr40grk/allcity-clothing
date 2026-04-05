'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    nav: { home: 'Home', products: 'Products', shipping: 'Shipping & Payment' },
    home: {
      collection: 'SS25 Collection', location: 'Athens, GR',
      tagline: 'Apparel born in the streets. No rules. No limits. Hood Controlling. F*ck the Game. Allcity Clothing.',
      shopNow: 'Shop Now', viewAll: 'View All →', productsTitle: 'Products',
      strip1Label: 'Shipping', strip1Desc: 'Greece, Cyprus & Bulgaria: 1–3 days. International: calculated at checkout.',
      strip2Label: 'Street Quality', strip2Desc: 'Every piece is built for the city. No compromises on material or construction.',
      strip3Label: 'DM for Orders', strip3Desc: 'Reach us on Instagram @allcity_clothing or via email for any questions.',
    },
    products: { title: 'Products', items: 'Items', soldOut: 'Sold Out', viewProduct: 'View Product →' },
    product: {
      taxIncluded: 'Tax included.', size: 'Size', quantity: 'Quantity',
      addToCart: 'Add to Cart', buyNow: 'Buy Now', soldOut: 'Sold Out',
      selectSize: 'Please select a size.', addedToCart: 'Added to cart',
      youMayAlsoLike: 'You may also like', home: 'Home',
    },
    shipping: {
      title: 'Shipping &\nPayment', shippingTitle: 'Shipping',
      shippingBody: 'All orders will be shipped via courier within 2 days after being confirmed.',
      estimatedDelivery: 'Estimated Delivery Time', domestic: 'Greece, Cyprus, Bulgaria',
      domesticTime: '1–3 working days', international: 'International', internationalTime: 'Calculated at checkout',
      note: '* For any issues or questions regarding your order, contact us and we will get back to you as soon as possible.',
      returnsTitle: 'Returns & Refunds', noReturns: 'NO RETURNS', noRefunds: 'NO REFUNDS',
      returnsNote: '* If your order arrives damaged or not as described, contact us immediately.',
      paymentTitle: 'Payment', paymentBody: 'We accept all major credit and debit cards, Apple Pay, and Google Pay — processed securely via Stripe.',
      contactTitle: 'Contact', findUs: 'Find us at @nr40_ath — Athens, GR',
    },
    checkout: {
      title: 'Checkout', contact: 'Contact', fullName: 'Full name', email: 'Email',
      phone: 'Phone (e.g. +30 69...)', deliveryMethod: 'Delivery Method',
      homeDelivery: 'Home / Address delivery', boxnowDelivery: 'BoxNow Locker (Greece only)',
      shippingAddress: 'Shipping Address', addressForLocker: 'Your Address (to find nearest locker)',
      street: 'Street address', city: 'City', postalCode: 'Postal code',
      findLocker: 'Find Nearest Locker →', searching: 'Searching...', selectedLocker: 'Selected Locker',
      orderSummary: 'Order Summary', total: 'Total', cardDetails: 'Card Details',
      stripeNote: 'Secured by Stripe. We never store card data.', pay: 'Pay', processing: 'Processing...',
      confirmed: 'Order Confirmed', confirmedNote: 'Thank you for your order. We will ship within 2 business days.',
    },
    footer: { subscribe: 'Subscribe to our emails', emailPlaceholder: 'Email', storeLocation: 'Store Location', findUs: 'Find us at @nr40_ath, Athens' },
  },
  el: {
    nav: { home: 'Αρχική', products: 'Προϊόντα', shipping: 'Αποστολή & Πληρωμή' },
    home: {
      collection: 'Συλλογή ΑΧ25', location: 'Αθήνα, GR',
      tagline: 'Ρούχα γεννημένα στους δρόμους. Χωρίς κανόνες. Χωρίς όρια. Hood Controlling. F*ck the Game. Allcity Clothing.',
      shopNow: 'Αγόρασε Τώρα', viewAll: 'Δες Όλα →', productsTitle: 'Προϊόντα',
      strip1Label: 'Αποστολή', strip1Desc: 'Ελλάδα, Κύπρος & Βουλγαρία: 1–3 μέρες. Διεθνώς: υπολογίζεται στο checkout.',
      strip2Label: 'Street Ποιότητα', strip2Desc: 'Κάθε κομμάτι φτιαγμένο για την πόλη. Χωρίς συμβιβασμούς.',
      strip3Label: 'Παραγγελίες μέσω DM', strip3Desc: 'Επικοινώνησε μαζί μας στο Instagram @allcity_clothing ή μέσω email.',
    },
    products: { title: 'Προϊόντα', items: 'Προϊόντα', soldOut: 'Εξαντλήθηκε', viewProduct: 'Δες Προϊόν →' },
    product: {
      taxIncluded: 'Συμπεριλαμβάνεται ΦΠΑ.', size: 'Μέγεθος', quantity: 'Ποσότητα',
      addToCart: 'Προσθήκη στο Καλάθι', buyNow: 'Αγόρασε Τώρα', soldOut: 'Εξαντλήθηκε',
      selectSize: 'Παρακαλώ επέλεξε μέγεθος.', addedToCart: 'Προστέθηκε στο καλάθι',
      youMayAlsoLike: 'Μπορεί να σου αρέσει επίσης', home: 'Αρχική',
    },
    shipping: {
      title: 'Αποστολή &\nΠληρωμή', shippingTitle: 'Αποστολή',
      shippingBody: 'Όλες οι παραγγελίες αποστέλλονται μέσω courier εντός 2 ημερών.',
      estimatedDelivery: 'Εκτιμώμενος Χρόνος Παράδοσης', domestic: 'Ελλάδα, Κύπρος, Βουλγαρία',
      domesticTime: '1–3 εργάσιμες ημέρες', international: 'Διεθνώς', internationalTime: 'Υπολογίζεται στο checkout',
      note: '* Για οποιοδήποτε πρόβλημα, επικοινώνησε μαζί μας.',
      returnsTitle: 'Επιστροφές & Επιστροφή Χρημάτων', noReturns: 'ΧΩΡ. ΕΠΙΣΤΡΟΦΩΝ', noRefunds: 'ΧΩΡ. ΕΠΙΣΤΡΟΦΗΣ ΧΡΗΜΑΤΩΝ',
      returnsNote: '* Αν η παραγγελία σου φτάσει κατεστραμμένη, επικοινώνησε μαζί μας άμεσα.',
      paymentTitle: 'Πληρωμή', paymentBody: 'Δεχόμαστε όλες τις μεγάλες κάρτες, Apple Pay και Google Pay — μέσω Stripe.',
      contactTitle: 'Επικοινωνία', findUs: 'Βρες μας στο @nr40_ath — Αθήνα, GR',
    },
    checkout: {
      title: 'Ολοκλήρωση Αγοράς', contact: 'Στοιχεία Επικοινωνίας', fullName: 'Ονοματεπώνυμο',
      email: 'Email', phone: 'Τηλέφωνο (π.χ. +30 69...)', deliveryMethod: 'Τρόπος Παράδοσης',
      homeDelivery: 'Παράδοση στη διεύθυνσή σου', boxnowDelivery: 'BoxNow Locker (μόνο Ελλάδα)',
      shippingAddress: 'Διεύθυνση Αποστολής', addressForLocker: 'Διεύθυνσή σου (για εύρεση κοντινού locker)',
      street: 'Οδός', city: 'Πόλη', postalCode: 'Ταχυδρομικός Κώδικας',
      findLocker: 'Βρες Κοντινό Locker →', searching: 'Αναζήτηση...', selectedLocker: 'Επιλεγμένο Locker',
      orderSummary: 'Σύνοψη Παραγγελίας', total: 'Σύνολο', cardDetails: 'Στοιχεία Κάρτας',
      stripeNote: 'Ασφαλής πληρωμή μέσω Stripe.', pay: 'Πληρωμή', processing: 'Επεξεργασία...',
      confirmed: 'Η Παραγγελία Επιβεβαιώθηκε', confirmedNote: 'Ευχαριστούμε. Θα αποσταλεί εντός 2 εργάσιμων ημερών.',
    },
    footer: { subscribe: 'Εγγραφή στο newsletter', emailPlaceholder: 'Email', storeLocation: 'Τοποθεσία Καταστήματος', findUs: 'Βρες μας στο @nr40_ath, Αθήνα' },
  },
};

const LanguageContext = createContext({ lang: 'en', setLang: () => {}, t: translations.en });

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('en');
  useEffect(() => {
    try { const s = localStorage.getItem('allcity_lang'); if (s === 'el' || s === 'en') setLangState(s); } catch {}
  }, []);
  function setLang(l) { setLangState(l); try { localStorage.setItem('allcity_lang', l); } catch {} }
  return <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() { return useContext(LanguageContext); }
export function useT() {
  const { t } = useContext(LanguageContext);
  return (keyPath) => keyPath.split('.').reduce((obj, key) => obj?.[key], t) ?? keyPath;
}
