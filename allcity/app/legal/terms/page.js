'use client';
import LegalLayout from '@/components/LegalLayout';
import { useLanguage } from '@/components/LanguageProvider';

export default function TermsPage() {
  const { lang } = useLanguage();
  return (
    <LegalLayout
      title={lang === 'el' ? 'Όροι\nΧρήσης' : 'Terms of\nService'}
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
        These Terms of Service ("Terms") govern your access to and use of the website
        <a href="https://www.allcityclothing.com"> www.allcityclothing.com</a> ("the Website")
        and any purchase of goods offered through it. The Website is operated by{' '}
        <strong>nr40Athens E.E.</strong>, VAT EL802436040, registered at
        Kanigos 27 &amp; Kapodistria, 10682 Athens, Greece ("ALLCITY", "we", "us"). By using the Website or placing
        an order you agree to these Terms.
      </p>

      <div className="callout callout-red">
        These Terms are issued in accordance with Greek Law 2251/1994 on consumer protection,
        Greek Presidential Decree 131/2003, and Directives 2000/31/EC, 2011/83/EU and (EU)
        2019/771. Where you act as a "consumer" within the meaning of Greek and EU law, mandatory
        consumer-protection provisions take precedence over any conflicting clause of these Terms.
      </div>

      <h2>1. Definitions</h2>
      <ul>
        <li><strong>"Consumer"</strong> — any natural person acting outside their trade, business, craft or profession.</li>
        <li><strong>"Goods"</strong> — clothing and apparel offered for sale on the Website.</li>
        <li><strong>"Order"</strong> — your offer to purchase Goods submitted through the checkout.</li>
        <li><strong>"Contract"</strong> — the sales contract concluded upon our acceptance of the Order.</li>
      </ul>

      <h2>2. Eligibility</h2>
      <p>
        To place an order you must be at least 18 years old and have legal capacity to enter into
        binding contracts. By placing an order you confirm that the information you provide is
        accurate and complete.
      </p>

      <h2>3. Products and Availability</h2>
      <p>
        We make every effort to display the Goods accurately, but slight variations in colour,
        texture or measurements may occur. All Goods are subject to availability. We reserve the
        right to discontinue any product, limit quantities, or refuse any Order at our reasonable
        discretion (for example in case of pricing errors, suspected fraud, or breach of these
        Terms).
      </p>

      <h2>4. Prices</h2>
      <p>
        Prices are displayed in Euros (€) and include Greek VAT at the applicable rate. Shipping
        fees, where applicable, are calculated and shown before you confirm the Order. We may
        change prices at any time; the price applicable to your Order is the price displayed at
        the moment the Order is placed.
      </p>
      <p>
        In the event of an obvious typographical or technical error resulting in a manifestly
        incorrect price, we are entitled to cancel the affected Order and refund any amount paid.
      </p>

      <h2>5. Formation of the Contract</h2>
      <p>
        Display of Goods on the Website is an invitation to treat, not a binding offer.
        When you submit an Order through the checkout, you make a binding offer to purchase the
        selected Goods. The Contract is formed only upon our written confirmation of acceptance
        (the order-confirmation email). Until acceptance, we may decline the Order at our
        discretion. The Contract is concluded in English or Greek, depending on the language
        selected at checkout.
      </p>

      <h2>6. Payment</h2>
      <p>
        Payment is made online at the time of Order. We accept all major credit and debit cards,
        Apple Pay and Google Pay through <strong>Stripe Payments Europe Ltd.</strong>. Card data
        is processed directly by Stripe and is never stored by us. Charges are made at the moment
        of Order placement.
      </p>

      <h2>7. Delivery</h2>
      <ul>
        <li>Greece, Cyprus & Bulgaria: 1–3 working days from dispatch.</li>
        <li>International: calculated at checkout; delivery time depends on destination and customs.</li>
        <li>Delivery within Greece is primarily made via the BoxNow parcel-locker network. After Order confirmation we will contact you to arrange the locker.</li>
      </ul>
      <p>
        Risk of loss or damage passes to you upon physical possession of the Goods (Article 4 of
        Greek Law 2251/1994, transposing Article 20 of Directive 2011/83/EU). If you do not
        receive your Order within 30 days of confirmation you may request cancellation and a
        full refund.
      </p>
      <p>
        Customs duties, import taxes and similar charges for international orders are the
        recipient's responsibility.
      </p>

      <h2>8. Right of Withdrawal (14-day Cooling-off)</h2>
      <p>
        Consumers have the right to withdraw from the Contract within fourteen (14) calendar
        days, without giving any reason, in accordance with Articles 3e–3i of Greek Law
        2251/1994 (transposing Directive 2011/83/EU). The withdrawal period starts on the day
        you (or a third party indicated by you, other than the carrier) take physical possession
        of the Goods.
      </p>
      <p>
        Full procedure, exceptions, refund process and the model withdrawal form are set out in
        our <a href="/legal/returns">Returns & Refunds Policy</a>, which forms an integral part
        of these Terms.
      </p>

      <h2>9. Legal Guarantee of Conformity</h2>
      <p>
        All Goods are covered by the statutory two-year guarantee of conformity provided by
        Articles 5 and 5a of Greek Law 2251/1994 and Directive (EU) 2019/771. If the Goods
        delivered do not conform with the Contract (e.g. they are defective, not as described or
        not fit for purpose), you are entitled — at no cost — to have them repaired or replaced,
        or to obtain a proportionate price reduction or termination of the Contract, in the order
        and under the conditions provided by law. To exercise this right contact us at{' '}
        <a href="mailto:allcityclo@gmail.com">allcityclo@gmail.com</a> within two months from
        the discovery of the lack of conformity.
      </p>

      <h2>10. Intellectual Property</h2>
      <p>
        All trademarks, logos, designs, photographs, videos and other content on the Website are
        owned by ALLCITY or used under licence and are protected by Greek Law 2121/1993 on
        copyright as well as European and international law. You are granted a personal, limited,
        non-exclusive, non-transferable licence to access and use the Website for lawful personal
        purposes only. Any other use — including reproduction, distribution, modification, public
        communication or commercial exploitation — is prohibited without our prior written consent.
      </p>

      <h2>11. User Conduct</h2>
      <p>You agree not to:</p>
      <ul>
        <li>use the Website for any unlawful or fraudulent purpose;</li>
        <li>upload or transmit viruses or other harmful code;</li>
        <li>attempt to gain unauthorised access to the Website or its underlying systems;</li>
        <li>scrape, mirror, or otherwise reproduce the Website's content or design;</li>
        <li>impersonate any person or misrepresent your affiliation.</li>
      </ul>

      <h2>12. Limitation of Liability</h2>
      <p>
        Nothing in these Terms limits or excludes our liability for death or personal injury
        caused by our negligence, for fraud, or for any other liability that cannot be excluded
        under Greek or EU law.
      </p>
      <p>
        Subject to the preceding paragraph, our aggregate liability arising out of or in
        connection with any Contract, whether in contract, tort or otherwise, is limited to the
        total amount you paid under the Contract giving rise to the claim. We are not liable for
        indirect or consequential losses, loss of profit, loss of business, or loss of data.
      </p>

      <h2>13. Force Majeure</h2>
      <p>
        We are not liable for any failure or delay in performance caused by events beyond our
        reasonable control, including but not limited to acts of God, natural disasters, war,
        terrorism, civil unrest, strikes, epidemics or pandemics, failure of telecommunications
        or transport networks, and governmental restrictions.
      </p>

      <h2>14. Privacy and Cookies</h2>
      <p>
        Use of the Website is also governed by our{' '}
        <a href="/legal/privacy-policy">Privacy Policy</a> and{' '}
        <a href="/legal/cookies">Cookie Policy</a>, which form an integral part of these Terms.
      </p>

      <h2>15. Changes to the Terms</h2>
      <p>
        We may update these Terms from time to time. The version applicable to your Order is the
        one in force at the time the Order is placed. The current version is always available on
        this page with the date of last update.
      </p>

      <h2>16. Governing Law and Jurisdiction</h2>
      <p>
        These Terms and any Contract concluded under them are governed by Greek law. Mandatory
        consumer-protection provisions of the law of the country of your habitual residence
        within the European Union continue to apply. Any dispute arising out of or in connection
        with these Terms is subject to the jurisdiction of the competent courts of Athens, Greece,
        without prejudice to your right as a consumer to bring proceedings before the courts of
        your country of domicile within the EU pursuant to Article 18 of Regulation (EU) 1215/2012.
      </p>

      <h2>17. Online Dispute Resolution</h2>
      <p>
        Pursuant to Regulation (EU) 524/2013 we inform you of the existence of the European
        Online Dispute Resolution platform, available at{' '}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer">ec.europa.eu/consumers/odr</a>.
      </p>

      <h2>18. Contact</h2>
      <p>
        For any question concerning these Terms or your Order, please contact us at{' '}
        <a href="mailto:allcityclo@gmail.com">allcityclo@gmail.com</a>.
      </p>
    </>
  );
}

function EL() {
  return (
    <>
      <p>
        Οι παρόντες Όροι Χρήσης («Όροι») διέπουν την πρόσβαση και τη χρήση του ιστοτόπου
        <a href="https://www.allcityclothing.com"> www.allcityclothing.com</a> («ο Ιστότοπος»)
        και κάθε αγορά προϊόντων μέσω αυτού. Ο Ιστότοπος λειτουργεί από την{' '}
        <strong>nr40Athens Ε.Ε.</strong>, ΑΦΜ 802436040, με έδρα ΚΑΝΙΓΓΟΣ 27 &amp; ΚΑΠΟΔΙΣΤΡΙΟΥ,
        10682 ΑΘΗΝΑ, Ελλάδα («ALLCITY», «εμείς»). Με τη χρήση του Ιστοτόπου ή την υποβολή
        παραγγελίας αποδέχεστε τους παρόντες Όρους.
      </p>

      <div className="callout callout-red">
        Οι Όροι εκδίδονται σύμφωνα με τον Ν. 2251/1994, το Π.Δ. 131/2003 και τις Οδηγίες
        2000/31/ΕΚ, 2011/83/ΕΕ και (ΕΕ) 2019/771. Όπου ενεργείτε ως «καταναλωτής», οι
        αναγκαστικού δικαίου διατάξεις προστασίας υπερισχύουν κάθε αντίθετης ρήτρας.
      </div>

      <h2>1. Ορισμοί</h2>
      <ul>
        <li><strong>«Καταναλωτής»</strong> — φυσικό πρόσωπο που ενεργεί εκτός της εμπορικής ή επαγγελματικής του δραστηριότητας.</li>
        <li><strong>«Προϊόντα»</strong> — τα είδη ένδυσης που προσφέρονται προς πώληση.</li>
        <li><strong>«Παραγγελία»</strong> — η προσφορά αγοράς που υποβάλλετε μέσω του checkout.</li>
        <li><strong>«Σύμβαση»</strong> — η σύμβαση πώλησης που καταρτίζεται με την αποδοχή της Παραγγελίας από εμάς.</li>
      </ul>

      <h2>2. Προϋποθέσεις</h2>
      <p>
        Για να υποβάλετε παραγγελία πρέπει να έχετε συμπληρώσει το 18ο έτος και να διαθέτετε
        δικαιοπρακτική ικανότητα. Με την υποβολή Παραγγελίας βεβαιώνετε ότι τα στοιχεία σας
        είναι αληθή και πλήρη.
      </p>

      <h2>3. Προϊόντα και Διαθεσιμότητα</h2>
      <p>
        Καταβάλλουμε κάθε προσπάθεια ώστε η απεικόνιση των Προϊόντων να είναι ακριβής, ωστόσο
        ενδέχεται να υπάρχουν μικρές αποκλίσεις σε χρώμα, υφή ή διαστάσεις. Όλα τα Προϊόντα
        διατίθενται μέχρι εξαντλήσεως. Διατηρούμε το δικαίωμα να αποσύρουμε προϊόντα, να
        περιορίσουμε ποσότητες ή να αρνηθούμε εύλογα οποιαδήποτε Παραγγελία (π.χ. σε σφάλματα
        τιμών, υπόνοια απάτης, παραβίαση των Όρων).
      </p>

      <h2>4. Τιμές</h2>
      <p>
        Οι τιμές αναγράφονται σε Ευρώ (€) και συμπεριλαμβάνουν τον αναλογούντα ΦΠΑ. Τα έξοδα
        αποστολής υπολογίζονται και εμφανίζονται πριν την επιβεβαίωση της Παραγγελίας. Ισχύει η
        τιμή που εμφανίζεται κατά την υποβολή της Παραγγελίας.
      </p>
      <p>
        Σε προφανή τυπογραφικά ή τεχνικά σφάλματα δικαιούμαστε να ακυρώσουμε την επηρεαζόμενη
        Παραγγελία και να επιστρέψουμε κάθε καταβληθέν ποσό.
      </p>

      <h2>5. Κατάρτιση Σύμβασης</h2>
      <p>
        Η προβολή των Προϊόντων αποτελεί πρόσκληση προς υποβολή προσφοράς, όχι δεσμευτική
        προσφορά. Η Παραγγελία σας αποτελεί δεσμευτική προσφορά αγοράς. Η Σύμβαση καταρτίζεται
        μόνο με τη γραπτή επιβεβαίωση της παραγγελίας από εμάς. Συντάσσεται στα ελληνικά ή
        αγγλικά, ανάλογα με την επιλογή σας.
      </p>

      <h2>6. Πληρωμή</h2>
      <p>
        Η πληρωμή γίνεται διαδικτυακά μέσω <strong>Stripe Payments Europe Ltd.</strong>.
        Δεχόμαστε όλες τις μεγάλες κάρτες, Apple Pay και Google Pay. Δεν αποθηκεύουμε δεδομένα
        κάρτας. Η χρέωση πραγματοποιείται κατά την υποβολή της Παραγγελίας.
      </p>

      <h2>7. Αποστολή</h2>
      <ul>
        <li>Ελλάδα, Κύπρος & Βουλγαρία: 1–3 εργάσιμες ημέρες από την αποστολή.</li>
        <li>Διεθνώς: υπολογίζεται στο checkout, ανάλογα προορισμό και τελωνείο.</li>
        <li>Εντός Ελλάδας η αποστολή γίνεται κατά κανόνα μέσω BoxNow. Θα επικοινωνήσουμε για το locker μετά την επιβεβαίωση.</li>
      </ul>
      <p>
        Ο κίνδυνος μεταβαίνει σε εσάς με τη φυσική παραλαβή των Προϊόντων (αρ. 4 Ν. 2251/1994).
        Αν δεν παραλάβετε εντός 30 ημερών από την επιβεβαίωση, μπορείτε να ζητήσετε ακύρωση και
        πλήρη επιστροφή χρημάτων.
      </p>
      <p>
        Δασμοί, εισαγωγικοί φόροι και συναφή έξοδα για διεθνείς αποστολές βαρύνουν τον παραλήπτη.
      </p>

      <h2>8. Δικαίωμα Υπαναχώρησης (14 ημέρες)</h2>
      <p>
        Οι καταναλωτές δικαιούνται να υπαναχωρήσουν από τη Σύμβαση εντός δεκατεσσάρων (14)
        ημερολογιακών ημερών, χωρίς αιτιολόγηση, σύμφωνα με τα αρ. 3ε–3θ του Ν. 2251/1994
        (Οδηγία 2011/83/ΕΕ). Η προθεσμία αρχίζει από τη φυσική παραλαβή των Προϊόντων.
      </p>
      <p>
        Η διαδικασία, οι εξαιρέσεις και το υπόδειγμα εντύπου υπαναχώρησης βρίσκονται στην
        <a href="/legal/returns"> Πολιτική Επιστροφών</a>, που αποτελεί αναπόσπαστο τμήμα των
        Όρων.
      </p>

      <h2>9. Νόμιμη Εγγύηση Συμμόρφωσης</h2>
      <p>
        Όλα τα Προϊόντα καλύπτονται από τη νόμιμη διετή εγγύηση συμμόρφωσης (αρ. 5 και 5α
        Ν. 2251/1994 και Οδηγία (ΕΕ) 2019/771). Σε περίπτωση μη συμμόρφωσης, δικαιούστε
        — χωρίς επιβάρυνση — επισκευή ή αντικατάσταση, ή ανάλογη μείωση τιμής ή υπαναχώρηση,
        σύμφωνα με τη σειρά και τους όρους του νόμου. Επικοινωνήστε στο{' '}
        <a href="mailto:allcityclo@gmail.com">allcityclo@gmail.com</a> εντός δύο μηνών από τη
        διαπίστωση του ελαττώματος.
      </p>

      <h2>10. Πνευματική Ιδιοκτησία</h2>
      <p>
        Όλα τα εμπορικά σήματα, λογότυπα, σχέδια, φωτογραφίες, βίντεο και λοιπά στοιχεία είναι
        ιδιοκτησία της ALLCITY ή χρησιμοποιούνται κατόπιν άδειας και προστατεύονται από τον
        Ν. 2121/1993 και την ευρωπαϊκή/διεθνή νομοθεσία. Σας παρέχεται προσωπική, περιορισμένη,
        μη αποκλειστική, μη μεταβιβάσιμη άδεια χρήσης του Ιστοτόπου για νόμιμους προσωπικούς
        σκοπούς. Κάθε άλλη χρήση απαγορεύεται χωρίς προηγούμενη γραπτή άδεια.
      </p>

      <h2>11. Συμπεριφορά Χρήστη</h2>
      <p>Συμφωνείτε να μην:</p>
      <ul>
        <li>χρησιμοποιείτε τον Ιστότοπο για παράνομο ή δόλιο σκοπό·</li>
        <li>μεταφορτώνετε ιούς ή επιβλαβή κώδικα·</li>
        <li>επιχειρείτε μη εξουσιοδοτημένη πρόσβαση σε συστήματα·</li>
        <li>κάνετε scraping ή αναπαραγωγή του περιεχομένου ή σχεδιασμού·</li>
        <li>υποδύεστε άλλο πρόσωπο ή παρουσιάζετε ψευδή σχέση.</li>
      </ul>

      <h2>12. Περιορισμός Ευθύνης</h2>
      <p>
        Κανένα σημείο των Όρων δεν περιορίζει την ευθύνη μας για θάνατο ή σωματική βλάβη από
        αμέλειά μας, για δόλο, ή για ευθύνες που δεν μπορούν να αποκλειστούν κατά νόμο.
      </p>
      <p>
        Υπό την επιφύλαξη των ανωτέρω, η συνολική μας ευθύνη από οποιαδήποτε Σύμβαση
        περιορίζεται στο ποσό που καταβάλατε για την εν λόγω Σύμβαση. Δεν ευθυνόμαστε για
        έμμεσες ζημίες, διαφυγόντα κέρδη, απώλεια δραστηριότητας ή δεδομένων.
      </p>

      <h2>13. Ανωτέρα Βία</h2>
      <p>
        Δεν ευθυνόμαστε για καθυστερήσεις ή αδυναμία εκπλήρωσης λόγω γεγονότων εκτός εύλογου
        ελέγχου μας (φυσικές καταστροφές, πόλεμος, τρομοκρατία, απεργίες, επιδημίες, βλάβες
        δικτύων, κυβερνητικά μέτρα).
      </p>

      <h2>14. Απόρρητο και Cookies</h2>
      <p>
        Η χρήση του Ιστοτόπου διέπεται και από την <a href="/legal/privacy-policy">Πολιτική
        Απορρήτου</a> και την <a href="/legal/cookies">Πολιτική Cookies</a>, που αποτελούν
        αναπόσπαστο τμήμα των Όρων.
      </p>

      <h2>15. Τροποποιήσεις</h2>
      <p>
        Οι Όροι μπορούν να τροποποιηθούν. Στην Παραγγελία σας εφαρμόζεται η έκδοση που ισχύει
        κατά τη στιγμή υποβολής της. Η τρέχουσα έκδοση είναι πάντα διαθέσιμη εδώ.
      </p>

      <h2>16. Εφαρμοστέο Δίκαιο & Δικαιοδοσία</h2>
      <p>
        Οι Όροι και κάθε Σύμβαση διέπονται από το ελληνικό δίκαιο. Οι αναγκαστικού δικαίου
        διατάξεις προστασίας καταναλωτή της χώρας συνήθους διαμονής σας εντός ΕΕ εξακολουθούν
        να ισχύουν. Αρμόδια δικαστήρια είναι τα δικαστήρια Αθηνών, με την επιφύλαξη του
        δικαιώματός σας ως καταναλωτή να προσφύγετε στα δικαστήρια του τόπου κατοικίας σας
        (αρ. 18 Κανονισμού (ΕΕ) 1215/2012).
      </p>

      <h2>17. Ηλεκτρονική Επίλυση Διαφορών</h2>
      <p>
        Σύμφωνα με τον Κανονισμό (ΕΕ) 524/2013 σας ενημερώνουμε για την πλατφόρμα Ηλεκτρονικής
        Επίλυσης Διαφορών:{' '}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer">ec.europa.eu/consumers/odr</a>.
      </p>

      <h2>18. Επικοινωνία</h2>
      <p>
        Για κάθε ερώτηση σχετικά με τους Όρους ή την Παραγγελία σας:{' '}
        <a href="mailto:allcityclo@gmail.com">allcityclo@gmail.com</a>.
      </p>
    </>
  );
}
