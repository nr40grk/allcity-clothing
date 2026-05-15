'use client';
import LegalLayout from '@/components/LegalLayout';
import { useLanguage } from '@/components/LanguageProvider';

export default function CookiesPage() {
  const { lang } = useLanguage();
  return (
    <LegalLayout
      title={lang === 'el' ? 'Πολιτική\nCookies' : 'Cookie\nPolicy'}
      lastUpdated="15 May 2026"
    >
      {lang === 'el' ? <EL /> : <EN />}
    </LegalLayout>
  );
}

function EN() {
  return (
    <>
      <p>
        This Cookie Policy explains how ALLCITY Clothing uses cookies and similar technologies on
        <a href="https://www.allcityclothing.com"> www.allcityclothing.com</a>. It is issued in
        accordance with Article 4(5) of Greek Law 3471/2006 (transposing the ePrivacy Directive
        2002/58/EC) and Article 6 of Regulation (EU) 2016/679 (GDPR). It complements our{' '}
        <a href="/legal/privacy-policy">Privacy Policy</a>.
      </p>

      <h2>1. What is a Cookie?</h2>
      <p>
        A cookie is a small text file stored by your browser when you visit a website. Cookies
        allow the site to remember your actions and preferences (language, login, items in basket)
        over a period of time. We also use similar technologies — local storage, pixels, web
        beacons — which are referred to collectively as "cookies" in this policy.
      </p>

      <h2>2. Legal Basis</h2>
      <p>
        Cookies that are strictly necessary for the functioning of the Website are placed without
        consent (Article 4(5) of Law 3471/2006). All other cookies — analytics, marketing,
        personalisation — are placed only after you provide explicit, freely given, specific,
        informed and unambiguous consent through our cookie banner. You can withdraw consent at
        any time by clicking "Cookie settings" in the footer.
      </p>

      <h2>3. Cookies We Use</h2>

      <h3>3.1 Strictly Necessary</h3>
      <table>
        <thead>
          <tr><th>Name</th><th>Purpose</th><th>Duration</th><th>Provider</th></tr>
        </thead>
        <tbody>
          <tr><td>allcity_lang</td><td>Stores selected language (EN / EL)</td><td>Persistent (localStorage)</td><td>First-party</td></tr>
          <tr><td>__stripe_mid</td><td>Stripe fraud-prevention identifier</td><td>1 year</td><td>Stripe</td></tr>
          <tr><td>__stripe_sid</td><td>Stripe session for payment flow</td><td>30 minutes</td><td>Stripe</td></tr>
          <tr><td>cookie_consent</td><td>Stores your cookie preferences</td><td>12 months</td><td>First-party</td></tr>
        </tbody>
      </table>

      <h3>3.2 Functional (require consent)</h3>
      <table>
        <thead>
          <tr><th>Name</th><th>Purpose</th><th>Duration</th><th>Provider</th></tr>
        </thead>
        <tbody>
          <tr><td>cart_id</td><td>Remembers items in your basket between visits</td><td>30 days</td><td>First-party</td></tr>
        </tbody>
      </table>

      <h3>3.3 Analytics (require consent)</h3>
      <table>
        <thead>
          <tr><th>Name</th><th>Purpose</th><th>Duration</th><th>Provider</th></tr>
        </thead>
        <tbody>
          <tr><td>_va_*</td><td>Aggregated, privacy-friendly traffic analytics — pages visited, referrers, anonymous device type</td><td>Session</td><td>Vercel Analytics</td></tr>
          <tr><td>_vsi_*</td><td>Core Web Vitals and performance measurement</td><td>Session</td><td>Vercel Speed Insights</td></tr>
        </tbody>
      </table>

      <h3>3.4 Marketing (require consent)</h3>
      <p>
        We do not currently use marketing or advertising cookies. If we add them in future, this
        table and the consent banner will be updated accordingly and your prior consent will be
        requested.
      </p>

      <h2>4. Managing Your Preferences</h2>
      <p>
        You can change your cookie preferences at any time:
      </p>
      <ul>
        <li>Click <strong>"Cookie settings"</strong> in the footer of the Website.</li>
        <li>Configure or disable cookies in your browser. Most browsers allow you to refuse cookies, delete existing cookies, and be notified before new cookies are placed.</li>
        <li>Use private/incognito browsing mode.</li>
      </ul>
      <p>
        Disabling strictly-necessary cookies may prevent parts of the Website (such as checkout)
        from functioning correctly.
      </p>

      <h2>5. Third-Party Cookies and International Transfers</h2>
      <p>
        Stripe (Ireland / USA), Vercel (USA) and any other processors named above may place
        cookies on your device. These transfers are protected by the EU–US Data Privacy Framework
        and/or Standard Contractual Clauses (see Section 5 of our{' '}
        <a href="/legal/privacy-policy">Privacy Policy</a>).
      </p>

      <h2>6. Changes to this Policy</h2>
      <p>
        We may update this Cookie Policy when we add or remove cookies or change their purpose.
        The latest version is always available on this page with the date of last update.
      </p>

      <h2>7. Contact</h2>
      <p>
        For questions about cookies and tracking technologies write to{' '}
        <a href="mailto:allcityclo@gmail.com">allcityclo@gmail.com</a>.
      </p>
    </>
  );
}

function EL() {
  return (
    <>
      <p>
        Η παρούσα Πολιτική Cookies εξηγεί τη χρήση cookies και παρόμοιων τεχνολογιών στον
        ιστότοπο <a href="https://www.allcityclothing.com">www.allcityclothing.com</a>.
        Εκδίδεται σύμφωνα με το αρ. 4 παρ. 5 του Ν. 3471/2006 (Οδηγία 2002/58/ΕΚ) και το αρ. 6
        του Κανονισμού (ΕΕ) 2016/679 (ΓΚΠΔ). Συμπληρώνει την{' '}
        <a href="/legal/privacy-policy">Πολιτική Απορρήτου</a>.
      </p>

      <h2>1. Τι είναι ένα Cookie</h2>
      <p>
        Cookie είναι ένα μικρό αρχείο κειμένου που αποθηκεύεται στο πρόγραμμα περιήγησής σας.
        Επιτρέπει στον ιστότοπο να θυμάται ενέργειες και προτιμήσεις (γλώσσα, σύνδεση, καλάθι).
        Χρησιμοποιούμε επίσης παρόμοιες τεχνολογίες (local storage, pixels, web beacons), οι
        οποίες αναφέρονται συλλογικά ως «cookies» στην παρούσα Πολιτική.
      </p>

      <h2>2. Νομική Βάση</h2>
      <p>
        Τα απολύτως απαραίτητα cookies τοποθετούνται χωρίς συγκατάθεση (αρ. 4 παρ. 5
        Ν. 3471/2006). Όλα τα υπόλοιπα — αναλυτικά, marketing, εξατομίκευσης — τοποθετούνται
        μόνο μετά από ελεύθερη, ρητή, ειδική, ενημερωμένη και αδιαμφισβήτητη συγκατάθεση μέσω
        του cookie banner. Μπορείτε ανά πάσα στιγμή να ανακαλέσετε τη συγκατάθεσή σας μέσω της
        επιλογής «Ρυθμίσεις Cookies» στο υποσέλιδο.
      </p>

      <h2>3. Cookies που Χρησιμοποιούμε</h2>

      <h3>3.1 Απολύτως Απαραίτητα</h3>
      <table>
        <thead><tr><th>Όνομα</th><th>Σκοπός</th><th>Διάρκεια</th><th>Πάροχος</th></tr></thead>
        <tbody>
          <tr><td>allcity_lang</td><td>Αποθήκευση γλώσσας (EN/EL)</td><td>Μόνιμο (localStorage)</td><td>First-party</td></tr>
          <tr><td>__stripe_mid</td><td>Αναγνωριστικό Stripe για αποτροπή απάτης</td><td>1 έτος</td><td>Stripe</td></tr>
          <tr><td>__stripe_sid</td><td>Συνεδρία Stripe για ροή πληρωμής</td><td>30 λεπτά</td><td>Stripe</td></tr>
          <tr><td>cookie_consent</td><td>Αποθήκευση προτιμήσεων cookies</td><td>12 μήνες</td><td>First-party</td></tr>
        </tbody>
      </table>

      <h3>3.2 Λειτουργικά (απαιτείται συγκατάθεση)</h3>
      <table>
        <thead><tr><th>Όνομα</th><th>Σκοπός</th><th>Διάρκεια</th><th>Πάροχος</th></tr></thead>
        <tbody>
          <tr><td>cart_id</td><td>Διατήρηση καλαθιού μεταξύ επισκέψεων</td><td>30 ημέρες</td><td>First-party</td></tr>
        </tbody>
      </table>

      <h3>3.3 Αναλυτικά (απαιτείται συγκατάθεση)</h3>
      <table>
        <thead><tr><th>Όνομα</th><th>Σκοπός</th><th>Διάρκεια</th><th>Πάροχος</th></tr></thead>
        <tbody>
          <tr><td>_va_*</td><td>Συγκεντρωτικά αναλυτικά κίνησης</td><td>Συνεδρία</td><td>Vercel Analytics</td></tr>
          <tr><td>_vsi_*</td><td>Μετρήσεις Core Web Vitals</td><td>Συνεδρία</td><td>Vercel Speed Insights</td></tr>
        </tbody>
      </table>

      <h3>3.4 Marketing (απαιτείται συγκατάθεση)</h3>
      <p>
        Δεν χρησιμοποιούμε επί του παρόντος marketing/διαφημιστικά cookies. Εάν προστεθούν στο
        μέλλον, ο πίνακας και το banner συγκατάθεσης θα ενημερωθούν και θα ζητηθεί η
        συγκατάθεσή σας.
      </p>

      <h2>4. Διαχείριση Προτιμήσεων</h2>
      <ul>
        <li>Επιλέξτε <strong>«Ρυθμίσεις Cookies»</strong> στο υποσέλιδο.</li>
        <li>Ρυθμίστε ή απενεργοποιήστε cookies από τον browser σας.</li>
        <li>Χρησιμοποιήστε ιδιωτική περιήγηση (incognito).</li>
      </ul>
      <p>
        Η απενεργοποίηση των απολύτως απαραίτητων cookies ενδέχεται να εμποδίσει τη λειτουργία
        τμημάτων του Ιστοτόπου (π.χ. checkout).
      </p>

      <h2>5. Cookies Τρίτων & Διεθνείς Διαβιβάσεις</h2>
      <p>
        Stripe (Ιρλανδία/ΗΠΑ), Vercel (ΗΠΑ) και άλλοι εκτελούντες μπορεί να τοποθετούν cookies.
        Οι διαβιβάσεις προστατεύονται από το Πλαίσιο Προστασίας Δεδομένων ΕΕ–ΗΠΑ ή/και Τυποποιημένες
        Συμβατικές Ρήτρες (βλ. ενότητα 5 της <a href="/legal/privacy-policy">Πολιτικής Απορρήτου</a>).
      </p>

      <h2>6. Τροποποιήσεις</h2>
      <p>
        Η Πολιτική μπορεί να ενημερώνεται. Η τρέχουσα έκδοση είναι πάντα διαθέσιμη εδώ με την
        ημερομηνία τελευταίας ενημέρωσης.
      </p>

      <h2>7. Επικοινωνία</h2>
      <p>
        Ερωτήσεις: <a href="mailto:allcityclo@gmail.com">allcityclo@gmail.com</a>.
      </p>
    </>
  );
}
