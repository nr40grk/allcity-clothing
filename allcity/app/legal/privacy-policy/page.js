'use client';
import LegalLayout from '@/components/LegalLayout';
import { useLanguage } from '@/components/LanguageProvider';

export default function PrivacyPolicyPage() {
  const { lang } = useLanguage();
  return (
    <LegalLayout
      title={lang === 'el' ? 'Πολιτική\nΑπορρήτου' : 'Privacy\nPolicy'}
      lastUpdated="17 May 2026"
    >
      {lang === 'el' ? <EL /> : <EN />}
    </LegalLayout>
  );
}

function EN() {
  return (
    <>
      <p>
        This Privacy Policy explains how <strong>ALLCITY Clothing</strong> ("we", "us", "ALLCITY")
        collects, uses, stores and discloses personal data when you visit
        <a href="https://www.allcityclothing.com"> www.allcityclothing.com</a> or place an order
        with us. It is issued in accordance with Regulation (EU) 2016/679 ("GDPR") and Greek
        Law 4624/2019.
      </p>

      <h2>1. Data Controller</h2>
      <p>
        The data controller of your personal data is{' '}
        <strong>nr40Athens E.E.</strong>, with registered office at{' '}
        Kanigos 27 &amp; Kapodistria, 10682 Athens, Greece, VAT EL802436040.
        Contact: <a href="mailto:allcityclo@gmail.com">allcityclo@gmail.com</a>.
      </p>

      <h2>2. Personal Data We Collect</h2>
      <h3>2.1 Data you provide directly</h3>
      <ul>
        <li><strong>Identification & contact</strong>: full name, email address, telephone number.</li>
        <li><strong>Shipping data</strong>: postal address, city, postal code, country, BoxNow locker details.</li>
        <li><strong>Order data</strong>: items purchased, sizes, quantities, order value, order date.</li>
        <li><strong>Newsletter</strong>: email address (only if you subscribe).</li>
        <li><strong>Communications</strong>: any information you choose to send by email or social media.</li>
      </ul>
      <h3>2.2 Data collected automatically</h3>
      <ul>
        <li><strong>Technical data</strong>: IP address, browser type and version, device type, operating system, referrer URL.</li>
        <li><strong>Usage data</strong>: pages visited, time spent, products viewed, basket activity.</li>
        <li><strong>Cookies and similar technologies</strong>: see our <a href="/legal/cookies">Cookie Policy</a>.</li>
      </ul>
      <h3>2.3 Data we do not collect</h3>
      <p>
        We do <strong>not</strong> store payment card data. All card payments are processed
        directly by Stripe; we only receive a tokenised transaction reference.
      </p>

      <h2>3. Purposes and Legal Bases</h2>
      <table>
        <thead>
          <tr><th>Purpose</th><th>Legal basis (Art. 6 GDPR)</th></tr>
        </thead>
        <tbody>
          <tr><td>Processing and delivering your order</td><td>Performance of contract — Art. 6(1)(b)</td></tr>
          <tr><td>Payment processing and fraud prevention</td><td>Performance of contract & legitimate interest — Art. 6(1)(b),(f)</td></tr>
          <tr><td>Invoicing, accounting and tax compliance</td><td>Legal obligation — Art. 6(1)(c)</td></tr>
          <tr><td>Customer support and after-sales</td><td>Performance of contract — Art. 6(1)(b)</td></tr>
          <tr><td>Newsletter / marketing emails</td><td>Consent — Art. 6(1)(a)</td></tr>
          <tr><td>Analytics and site optimisation</td><td>Consent (non-essential cookies) — Art. 6(1)(a)</td></tr>
          <tr><td>Defence of legal claims</td><td>Legitimate interest — Art. 6(1)(f)</td></tr>
        </tbody>
      </table>

      <h2>4. Recipients and Processors</h2>
      <p>
        Your personal data may be shared, only to the extent strictly necessary, with the
        following categories of recipients acting as data processors on our behalf under
        Article 28 GDPR:
      </p>
      <ul>
        <li><strong>Stripe Payments Europe Ltd.</strong> (Ireland) — payment processing.</li>
        <li><strong>BoxNow Greece S.A.</strong> — parcel locker delivery.</li>
        <li><strong>Courier service providers</strong> (e.g. ELTA Courier, Geniki Taxydromiki, ACS) — shipping outside the BoxNow network.</li>
        <li><strong>Resend, Inc.</strong> (USA) — transactional and marketing email delivery.</li>
        <li><strong>Vercel Inc.</strong> (USA) — website hosting and CDN.</li>
        <li><strong>Greek tax authorities</strong> — when required by law.</li>
      </ul>
      <p>
        We do not sell your personal data to any third party.
      </p>

      <h2>5. International Transfers</h2>
      <p>
        Some of our processors (Stripe, Resend, Vercel) are based in or transfer data to the
        United States. In all such cases the transfer is protected by the EU–US Data Privacy
        Framework adequacy decision (Commission Implementing Decision (EU) 2023/1795) and/or by
        Standard Contractual Clauses approved by the European Commission, in accordance with
        Articles 45–46 GDPR.
      </p>

      <h2>6. Retention Periods</h2>
      <ul>
        <li><strong>Order and invoice data</strong>: 10 years from issue, as required by Greek tax law (Codified Law 4308/2014).</li>
        <li><strong>Customer-support correspondence</strong>: up to 2 years after the last interaction.</li>
        <li><strong>Newsletter consent</strong>: until you unsubscribe.</li>
        <li><strong>Analytics data</strong>: up to 14 months (anonymised or aggregated thereafter).</li>
        <li><strong>Marketing consent records</strong>: 5 years after withdrawal of consent (proof of compliance).</li>
      </ul>

      <h2>7. Your Rights</h2>
      <p>
        Under Articles 15–22 GDPR you have the right to:
      </p>
      <ul>
        <li><strong>Access</strong> your personal data and obtain a copy;</li>
        <li><strong>Rectification</strong> of inaccurate or incomplete data;</li>
        <li><strong>Erasure</strong> ("right to be forgotten"), subject to legal retention obligations;</li>
        <li><strong>Restriction</strong> of processing;</li>
        <li><strong>Data portability</strong> in a structured, machine-readable format;</li>
        <li><strong>Object</strong> to processing based on legitimate interests, including direct marketing;</li>
        <li><strong>Withdraw consent</strong> at any time, without affecting prior lawful processing;</li>
        <li><strong>Not be subject</strong> to solely automated decision-making producing legal effects.</li>
      </ul>
      <p>
        To exercise any of these rights, write to{' '}
        <a href="mailto:allcityclo@gmail.com">allcityclo@gmail.com</a>. We respond within one
        month, extendable by a further two months for complex requests.
      </p>

      <h2>8. Right to Lodge a Complaint</h2>
      <p>
        You have the right to lodge a complaint with the Hellenic Data Protection Authority
        (Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα), 1–3 Kifissias Avenue, 11523 Athens,
        <a href="https://www.dpa.gr" target="_blank" rel="noreferrer"> www.dpa.gr</a>, or with
        the supervisory authority of your country of residence within the EU.
      </p>

      <h2>9. Security</h2>
      <p>
        We apply appropriate technical and organisational measures to protect personal data
        against accidental or unlawful destruction, loss, alteration, unauthorised disclosure or
        access — including TLS encryption in transit, role-based access controls, secure cloud
        hosting and minimisation of data collection. Despite these measures, no system is fully
        secure; we will notify you and the competent authority of any personal-data breach
        affecting your rights within 72 hours pursuant to Article 33 GDPR.
      </p>

      <h2>10. Children</h2>
      <p>
        The Website is not directed at children under 16. We do not knowingly collect personal
        data from children. If you believe that a child has provided us with personal data,
        please contact us and we will delete it.
      </p>

      <h2>11. Changes to this Policy</h2>
      <p>
        We may amend this Privacy Policy from time to time. The latest version is always
        available on this page with the date of last update. Substantial changes will be
        notified by email to active customers and newsletter subscribers.
      </p>

      <h2>12. Contact</h2>
      <p>
        Questions, requests or complaints: <a href="mailto:allcityclo@gmail.com">allcityclo@gmail.com</a>.
      </p>
    </>
  );
}

function EL() {
  return (
    <>
      <p>
        Η παρούσα Πολιτική Απορρήτου περιγράφει τον τρόπο με τον οποίο η{' '}
        <strong>ALLCITY Clothing</strong> («εμείς», «εμάς», «ALLCITY») συλλέγει, χρησιμοποιεί,
        αποθηκεύει και κοινοποιεί προσωπικά δεδομένα όταν επισκέπτεστε τον ιστότοπο
        <a href="https://www.allcityclothing.com"> www.allcityclothing.com</a> ή υποβάλλετε
        παραγγελία. Εκδίδεται σύμφωνα με τον Κανονισμό (ΕΕ) 2016/679 («ΓΚΠΔ») και τον
        Ν. 4624/2019.
      </p>

      <h2>1. Υπεύθυνος Επεξεργασίας</h2>
      <p>
        Υπεύθυνος επεξεργασίας των προσωπικών σας δεδομένων είναι η{' '}
        <strong>nr40Athens Ε.Ε.</strong>, με έδρα ΚΑΝΙΓΓΟΣ 27 &amp; ΚΑΠΟΔΙΣΤΡΙΟΥ, 10682 ΑΘΗΝΑ,
        Ελλάδα, ΑΦΜ 802436040. Επικοινωνία:{' '}
        <a href="mailto:allcityclo@gmail.com">allcityclo@gmail.com</a>.
      </p>

      <h2>2. Δεδομένα που Συλλέγουμε</h2>
      <h3>2.1 Δεδομένα που παρέχετε</h3>
      <ul>
        <li><strong>Ταυτοποίηση & επικοινωνία</strong>: ονοματεπώνυμο, email, τηλέφωνο.</li>
        <li><strong>Δεδομένα αποστολής</strong>: διεύθυνση, πόλη, Τ.Κ., χώρα, στοιχεία BoxNow locker.</li>
        <li><strong>Δεδομένα παραγγελίας</strong>: είδη, μεγέθη, ποσότητες, αξία, ημερομηνία.</li>
        <li><strong>Newsletter</strong>: email (μόνο αν εγγραφείτε).</li>
        <li><strong>Επικοινωνία</strong>: ό,τι μας στείλετε μέσω email ή social media.</li>
      </ul>
      <h3>2.2 Δεδομένα που συλλέγονται αυτόματα</h3>
      <ul>
        <li><strong>Τεχνικά</strong>: διεύθυνση IP, τύπος browser, συσκευή, λειτουργικό, referrer.</li>
        <li><strong>Χρήσης</strong>: σελίδες, χρόνος, προβολές προϊόντων, καλάθι.</li>
        <li><strong>Cookies</strong>: βλ. <a href="/legal/cookies">Πολιτική Cookies</a>.</li>
      </ul>
      <h3>2.3 Δεδομένα που δεν συλλέγουμε</h3>
      <p>
        Δεν αποθηκεύουμε δεδομένα καρτών. Όλες οι πληρωμές με κάρτα διεκπεραιώνονται απευθείας
        από τη Stripe· εμείς λαμβάνουμε μόνο ένα tokenized αναφορικό κωδικό συναλλαγής.
      </p>

      <h2>3. Σκοποί και Νομικές Βάσεις</h2>
      <table>
        <thead><tr><th>Σκοπός</th><th>Νομική βάση (αρ. 6 ΓΚΠΔ)</th></tr></thead>
        <tbody>
          <tr><td>Εκτέλεση και αποστολή παραγγελίας</td><td>Εκτέλεση σύμβασης — αρ. 6(1)(β)</td></tr>
          <tr><td>Πληρωμή και αποτροπή απάτης</td><td>Εκτέλεση σύμβασης & έννομο συμφέρον — αρ. 6(1)(β),(στ)</td></tr>
          <tr><td>Τιμολόγηση και φορολογικές υποχρεώσεις</td><td>Νομική υποχρέωση — αρ. 6(1)(γ)</td></tr>
          <tr><td>Εξυπηρέτηση πελατών</td><td>Εκτέλεση σύμβασης — αρ. 6(1)(β)</td></tr>
          <tr><td>Newsletter / προωθητικά email</td><td>Συγκατάθεση — αρ. 6(1)(α)</td></tr>
          <tr><td>Αναλυτικά / βελτιστοποίηση</td><td>Συγκατάθεση (μη απαραίτητα cookies) — αρ. 6(1)(α)</td></tr>
          <tr><td>Υπεράσπιση νομικών αξιώσεων</td><td>Έννομο συμφέρον — αρ. 6(1)(στ)</td></tr>
        </tbody>
      </table>

      <h2>4. Αποδέκτες και Εκτελούντες την Επεξεργασία</h2>
      <p>
        Τα προσωπικά σας δεδομένα μπορούν να κοινοποιηθούν, μόνο στο απολύτως αναγκαίο μέτρο,
        στις παρακάτω κατηγορίες αποδεκτών που ενεργούν ως εκτελούντες την επεξεργασία υπό το
        αρ. 28 ΓΚΠΔ:
      </p>
      <ul>
        <li><strong>Stripe Payments Europe Ltd.</strong> (Ιρλανδία) — επεξεργασία πληρωμών.</li>
        <li><strong>BoxNow Greece S.A.</strong> — παράδοση μέσω locker.</li>
        <li><strong>Εταιρείες courier</strong> (π.χ. ΕΛΤΑ Courier, Γενική Ταχυδρομική, ACS) — αποστολές εκτός BoxNow.</li>
        <li><strong>Resend, Inc.</strong> (ΗΠΑ) — αποστολή email.</li>
        <li><strong>Vercel Inc.</strong> (ΗΠΑ) — φιλοξενία ιστοτόπου και CDN.</li>
        <li><strong>Ελληνικές φορολογικές αρχές</strong> — όταν απαιτείται από τον νόμο.</li>
      </ul>
      <p>Δεν πωλούμε τα προσωπικά σας δεδομένα σε τρίτους.</p>

      <h2>5. Διεθνείς Διαβιβάσεις</h2>
      <p>
        Ορισμένοι εκτελούντες (Stripe, Resend, Vercel) εδρεύουν ή διαβιβάζουν δεδομένα στις
        ΗΠΑ. Σε όλες αυτές τις περιπτώσεις η διαβίβαση προστατεύεται από την απόφαση επάρκειας
        του Πλαισίου Προστασίας Δεδομένων ΕΕ–ΗΠΑ (Εκτελεστική Απόφαση (ΕΕ) 2023/1795) ή/και από
        Τυποποιημένες Συμβατικές Ρήτρες, σύμφωνα με τα αρ. 45–46 ΓΚΠΔ.
      </p>

      <h2>6. Χρόνοι Διατήρησης</h2>
      <ul>
        <li><strong>Παραγγελίες/τιμολόγια</strong>: 10 έτη (Ν. 4308/2014).</li>
        <li><strong>Επικοινωνία υποστήριξης</strong>: έως 2 έτη.</li>
        <li><strong>Συγκατάθεση newsletter</strong>: μέχρι την ανάκληση.</li>
        <li><strong>Αναλυτικά</strong>: έως 14 μήνες (μετά ανωνυμοποίηση).</li>
        <li><strong>Αρχείο συγκαταθέσεων</strong>: 5 έτη μετά την ανάκληση.</li>
      </ul>

      <h2>7. Τα Δικαιώματά σας</h2>
      <p>Σύμφωνα με τα αρ. 15–22 ΓΚΠΔ έχετε δικαίωμα:</p>
      <ul>
        <li><strong>Πρόσβασης</strong> και λήψης αντιγράφου των δεδομένων σας·</li>
        <li><strong>Διόρθωσης</strong>·</li>
        <li><strong>Διαγραφής</strong> («δικαίωμα στη λήθη»), με την επιφύλαξη υποχρεώσεων διατήρησης·</li>
        <li><strong>Περιορισμού</strong> της επεξεργασίας·</li>
        <li><strong>Φορητότητας</strong>·</li>
        <li><strong>Εναντίωσης</strong>, ιδίως στην απευθείας εμπορική προώθηση·</li>
        <li><strong>Ανάκλησης συγκατάθεσης</strong> ανά πάσα στιγμή·</li>
        <li><strong>Μη υπαγωγής</strong> σε αυτοματοποιημένη λήψη αποφάσεων με νομικά αποτελέσματα.</li>
      </ul>
      <p>
        Για την άσκηση των δικαιωμάτων σας: <a href="mailto:allcityclo@gmail.com">allcityclo@gmail.com</a>.
        Απαντούμε εντός ενός μηνός, με δυνατότητα παράτασης δύο μηνών για σύνθετες αιτήσεις.
      </p>

      <h2>8. Δικαίωμα Καταγγελίας</h2>
      <p>
        Έχετε δικαίωμα καταγγελίας στην Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα,
        Λ. Κηφισίας 1–3, 11523 Αθήνα,
        <a href="https://www.dpa.gr" target="_blank" rel="noreferrer"> www.dpa.gr</a>,
        ή στην αρχή της χώρας κατοικίας σας εντός ΕΕ.
      </p>

      <h2>9. Ασφάλεια</h2>
      <p>
        Εφαρμόζουμε κατάλληλα τεχνικά και οργανωτικά μέτρα: κρυπτογράφηση TLS, έλεγχο
        πρόσβασης, ασφαλή cloud φιλοξενία, ελαχιστοποίηση συλλογής. Σε περίπτωση παραβίασης
        δεδομένων που επηρεάζει τα δικαιώματά σας, ενημερώνουμε εσάς και την αρμόδια αρχή
        εντός 72 ωρών (αρ. 33 ΓΚΠΔ).
      </p>

      <h2>10. Παιδιά</h2>
      <p>
        Ο Ιστότοπος δεν απευθύνεται σε παιδιά κάτω των 16. Δεν συλλέγουμε εν γνώσει μας
        δεδομένα παιδιών. Αν εντοπίσετε τέτοια περίπτωση, επικοινωνήστε μαζί μας για διαγραφή.
      </p>

      <h2>11. Αλλαγές στην Πολιτική</h2>
      <p>
        Η Πολιτική μπορεί να τροποποιηθεί. Η τελευταία έκδοση είναι πάντα διαθέσιμη εδώ.
        Σημαντικές αλλαγές κοινοποιούνται με email σε ενεργούς πελάτες και συνδρομητές
        newsletter.
      </p>

      <h2>12. Επικοινωνία</h2>
      <p>Ερωτήσεις/αιτήματα/καταγγελίες: <a href="mailto:allcityclo@gmail.com">allcityclo@gmail.com</a>.</p>
    </>
  );
}
