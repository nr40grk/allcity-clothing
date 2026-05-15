'use client';
import LegalLayout from '@/components/LegalLayout';
import { useLanguage } from '@/components/LanguageProvider';

export default function ImprintPage() {
  const { lang } = useLanguage();
  return (
    <LegalLayout
      title={lang === 'el' ? 'Νομικές\nΠληροφορίες' : 'Legal\nNotice'}
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
        This Legal Notice is provided in accordance with Article 5 of Directive 2000/31/EC
        on electronic commerce, Article 4 of Greek Presidential Decree 131/2003,
        and Article 8 of Greek Law 2251/1994 on consumer protection.
      </p>

      <h2>Operator of the Website</h2>
      <table>
        <tbody>
          <tr><th>Trade name</th><td>ALLCITY Clothing</td></tr>
          <tr><th>Legal entity</th><td>[PLACEHOLDER: Full registered company name, e.g. "Ι. Παπαδόπουλος ΙΚΕ" or sole-proprietorship name]</td></tr>
          <tr><th>Registered office</th><td>[PLACEHOLDER: Street, Number, Postal Code, City], Greece</td></tr>
          <tr><th>VAT number (ΑΦΜ)</th><td>[PLACEHOLDER: e.g. EL123456789]</td></tr>
          <tr><th>Tax authority (ΔΟΥ)</th><td>[PLACEHOLDER: e.g. ΔΟΥ Αθηνών]</td></tr>
          <tr><th>G.E.MI. number</th><td>[PLACEHOLDER: General Commercial Registry number]</td></tr>
          <tr><th>Email</th><td><a href="mailto:allcityclo@gmail.com">allcityclo@gmail.com</a></td></tr>
          <tr><th>Instagram</th><td><a href="https://www.instagram.com/allcity_clothing" target="_blank" rel="noreferrer">@allcity_clothing</a></td></tr>
        </tbody>
      </table>

      <h2>Activity</h2>
      <p>
        Online retail sale of clothing and apparel via the website
        <a href="https://www.allcityclothing.com"> www.allcityclothing.com</a> ("the Website"),
        delivered within Greece, Cyprus, Bulgaria and internationally.
      </p>

      <h2>Responsible for Content</h2>
      <p>
        Responsible for content within the meaning of Greek and European media law:
        <strong> [PLACEHOLDER: Full name of legal representative]</strong>, at the registered
        office stated above.
      </p>

      <h2>Supervisory Authorities</h2>
      <ul>
        <li>
          <strong>General Secretariat for Consumer Affairs</strong> — Greek Ministry of Development,
          Pl. Kaningos, 10181 Athens —
          <a href="https://www.efpolis.gr" target="_blank" rel="noreferrer">www.efpolis.gr</a>.
        </li>
        <li>
          <strong>Consumer Ombudsman</strong> (Συνήγορος του Καταναλωτή) —
          <a href="https://www.synigoroskatanaloti.gr" target="_blank" rel="noreferrer">www.synigoroskatanaloti.gr</a>.
        </li>
        <li>
          <strong>Hellenic Data Protection Authority</strong> (ΑΠΔΠΧ) —
          <a href="https://www.dpa.gr" target="_blank" rel="noreferrer">www.dpa.gr</a>.
        </li>
      </ul>

      <h2>Online Dispute Resolution</h2>
      <p>
        Pursuant to Regulation (EU) 524/2013, consumers domiciled in the European Union may
        submit any dispute regarding an online sale to the European Commission's Online Dispute
        Resolution platform:
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer"> ec.europa.eu/consumers/odr</a>.
        We are not obliged and do not commit to participate in alternative dispute resolution
        proceedings before a consumer arbitration body.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        All content on the Website — including text, graphics, logos, photographs, videos and the
        "ALLCITY" trade name and visual identity — is the exclusive property of the operator or
        used under licence and is protected by Greek Law 2121/1993 on copyright, as well as by
        European and international intellectual-property law. Any reproduction, distribution or
        public communication without prior written consent is prohibited.
      </p>

      <h2>Disclaimer</h2>
      <p>
        The operator makes every effort to keep the information on the Website accurate and up to
        date but accepts no liability for typographical errors, temporary unavailability or
        inaccuracies in product descriptions, prices or stock availability. Confirmation of any
        order is subject to verification of price and stock prior to dispatch.
      </p>

      <h2>Contact</h2>
      <p>
        For any legal or compliance enquiry, please write to{' '}
        <a href="mailto:allcityclo@gmail.com">allcityclo@gmail.com</a>.
      </p>
    </>
  );
}

function EL() {
  return (
    <>
      <p>
        Οι παρούσες Νομικές Πληροφορίες παρέχονται σύμφωνα με το άρθρο 5 της Οδηγίας 2000/31/ΕΚ
        για το ηλεκτρονικό εμπόριο, το άρθρο 4 του Π.Δ. 131/2003 και το άρθρο 8 του Ν. 2251/1994
        για την προστασία των καταναλωτών.
      </p>

      <h2>Διαχειριστής Ιστοτόπου</h2>
      <table>
        <tbody>
          <tr><th>Διακριτικός τίτλος</th><td>ALLCITY Clothing</td></tr>
          <tr><th>Επωνυμία</th><td>[PLACEHOLDER: Πλήρης επωνυμία, π.χ. «Ι. Παπαδόπουλος ΙΚΕ»]</td></tr>
          <tr><th>Έδρα</th><td>[PLACEHOLDER: Οδός, Αριθμός, Τ.Κ., Πόλη], Ελλάδα</td></tr>
          <tr><th>ΑΦΜ</th><td>[PLACEHOLDER]</td></tr>
          <tr><th>ΔΟΥ</th><td>[PLACEHOLDER]</td></tr>
          <tr><th>Αρ. ΓΕΜΗ</th><td>[PLACEHOLDER]</td></tr>
          <tr><th>Email</th><td><a href="mailto:allcityclo@gmail.com">allcityclo@gmail.com</a></td></tr>
          <tr><th>Instagram</th><td><a href="https://www.instagram.com/allcity_clothing" target="_blank" rel="noreferrer">@allcity_clothing</a></td></tr>
        </tbody>
      </table>

      <h2>Δραστηριότητα</h2>
      <p>
        Λιανική πώληση ενδυμάτων μέσω του ιστοτόπου
        <a href="https://www.allcityclothing.com"> www.allcityclothing.com</a> («ο Ιστότοπος»),
        με αποστολή εντός Ελλάδας, Κύπρου, Βουλγαρίας και διεθνώς.
      </p>

      <h2>Υπεύθυνος Περιεχομένου</h2>
      <p>
        Υπεύθυνος για το περιεχόμενο, κατά την έννοια της ελληνικής και ευρωπαϊκής νομοθεσίας:
        <strong> [PLACEHOLDER: Ονοματεπώνυμο νόμιμου εκπροσώπου]</strong>, στην ανωτέρω διεύθυνση.
      </p>

      <h2>Εποπτικές Αρχές</h2>
      <ul>
        <li>
          <strong>Γενική Γραμματεία Καταναλωτή</strong> — Υπουργείο Ανάπτυξης, Πλ. Κάνιγγος,
          10181 Αθήνα — <a href="https://www.efpolis.gr" target="_blank" rel="noreferrer">www.efpolis.gr</a>.
        </li>
        <li>
          <strong>Συνήγορος του Καταναλωτή</strong> —
          <a href="https://www.synigoroskatanaloti.gr" target="_blank" rel="noreferrer">www.synigoroskatanaloti.gr</a>.
        </li>
        <li>
          <strong>Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (ΑΠΔΠΧ)</strong> —
          <a href="https://www.dpa.gr" target="_blank" rel="noreferrer">www.dpa.gr</a>.
        </li>
      </ul>

      <h2>Ηλεκτρονική Επίλυση Διαφορών</h2>
      <p>
        Σύμφωνα με τον Κανονισμό (ΕΕ) 524/2013, οι καταναλωτές που κατοικούν στην Ευρωπαϊκή
        Ένωση μπορούν να υποβάλλουν διαφορές που αφορούν διαδικτυακές πωλήσεις στην πλατφόρμα
        Ηλεκτρονικής Επίλυσης Διαφορών της Ευρωπαϊκής Επιτροπής:
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer"> ec.europa.eu/consumers/odr</a>.
        Δεν είμαστε υποχρεωμένοι και δεν δεσμευόμαστε να συμμετάσχουμε σε διαδικασία
        εναλλακτικής επίλυσης διαφορών ενώπιον φορέα διαιτησίας καταναλωτών.
      </p>

      <h2>Πνευματική Ιδιοκτησία</h2>
      <p>
        Όλο το περιεχόμενο του Ιστοτόπου — κείμενα, γραφικά, λογότυπα, φωτογραφίες, βίντεο, η
        επωνυμία «ALLCITY» και η οπτική ταυτότητα — αποτελούν αποκλειστική ιδιοκτησία του
        διαχειριστή ή χρησιμοποιούνται κατόπιν άδειας και προστατεύονται από τον Ν. 2121/1993
        περί πνευματικής ιδιοκτησίας, καθώς και από την ευρωπαϊκή και διεθνή νομοθεσία.
        Οποιαδήποτε αναπαραγωγή, διανομή ή δημόσια μετάδοση χωρίς προηγούμενη γραπτή
        συγκατάθεση απαγορεύεται.
      </p>

      <h2>Αποποίηση Ευθύνης</h2>
      <p>
        Καταβάλλουμε κάθε προσπάθεια ώστε οι πληροφορίες στον Ιστότοπο να είναι ακριβείς και
        ενημερωμένες, χωρίς όμως να φέρουμε ευθύνη για τυπογραφικά σφάλματα, προσωρινή
        μη διαθεσιμότητα ή ανακρίβειες σε περιγραφές προϊόντων, τιμές ή διαθεσιμότητα.
        Η επιβεβαίωση κάθε παραγγελίας υπόκειται σε επιβεβαίωση τιμής και διαθεσιμότητας
        πριν την αποστολή.
      </p>

      <h2>Επικοινωνία</h2>
      <p>
        Για κάθε νομικό ζήτημα ή ζήτημα συμμόρφωσης, επικοινωνήστε στο{' '}
        <a href="mailto:allcityclo@gmail.com">allcityclo@gmail.com</a>.
      </p>
    </>
  );
}
