'use client';
import LegalLayout from '@/components/LegalLayout';
import { useLanguage } from '@/components/LanguageProvider';

export default function ReturnsPage() {
  const { lang } = useLanguage();
  return (
    <LegalLayout
      title={lang === 'el' ? 'Επιστροφές\n& Χρήματα' : 'Returns\n& Refunds'}
      lastUpdated="15 May 2026"
    >
      {lang === 'el' ? <EL /> : <EN />}
    </LegalLayout>
  );
}

function EN() {
  return (
    <>
      <div className="callout callout-red">
        This Policy implements your statutory rights under Articles 3e–3i of Greek Law 2251/1994,
        which transpose Directive 2011/83/EU on consumer rights, and your legal guarantee of
        conformity under Articles 5–5a of Law 2251/1994 and Directive (EU) 2019/771. Nothing in
        this Policy affects your mandatory consumer rights.
      </div>

      <h2>1. Right of Withdrawal (14 Days)</h2>
      <p>
        If you are a consumer, you have the right to withdraw from your purchase within
        <strong> fourteen (14) calendar days</strong> from the day on which you (or a third
        party indicated by you, other than the carrier) take physical possession of the Goods,
        without giving any reason.
      </p>
      <p>
        To exercise the right of withdrawal you must inform us of your decision by an
        unequivocal statement (for example, an email) before the expiry of the 14-day period.
        You may use the model withdrawal form below, but it is not mandatory.
      </p>

      <h2>2. How to Withdraw</h2>
      <ol>
        <li>
          Send an email to <a href="mailto:allcityclo@gmail.com">allcityclo@gmail.com</a> with
          your name, order number, the items you wish to return and your IBAN for the refund.
          You may attach the model form in Section 8 of this page.
        </li>
        <li>
          We will reply within 48 hours with the return instructions and the address to which
          the parcel must be sent.
        </li>
        <li>
          Send the Goods back to us without undue delay and in any event no later than
          <strong> fourteen (14) days</strong> from the day you communicated your withdrawal.
          The deadline is met if you dispatch the Goods before the period expires.
        </li>
      </ol>

      <h2>3. Condition of Returned Goods</h2>
      <p>
        Goods must be returned <strong>unused, unworn, unwashed and in their original
        condition</strong>, with all tags attached and in the original packaging where possible.
        You are only liable for any diminished value of the Goods resulting from handling other
        than what is necessary to establish their nature, characteristics and functioning. This
        means you may inspect and try the item in the same way you would in a physical store; if
        you go further (e.g. you remove tags, wear the item outside, wash it) we may deduct a
        reasonable amount from your refund corresponding to the loss in value.
      </p>

      <h2>4. Cost of Returning the Goods</h2>
      <p>
        The <strong>direct cost of returning the Goods is borne by you</strong>, unless the
        return is due to a defect, non-conformity, or our error (wrong item, wrong size shipped),
        in which case we cover the return cost. We strongly recommend using a trackable shipping
        service; we cannot accept responsibility for parcels lost in transit on their way back to us.
      </p>

      <h2>5. Refund</h2>
      <p>
        We will reimburse all payments received from you, including the cost of standard
        delivery (but not any additional cost arising from your choice of a more expensive
        delivery method), <strong>without undue delay and not later than fourteen (14) days</strong>
        from the day on which we are informed of your decision to withdraw. We may, however,
        withhold reimbursement until we have received the Goods back or you have supplied
        evidence of having sent them, whichever is the earliest.
      </p>
      <p>
        Refunds are issued using the same means of payment used for the initial transaction
        (e.g. credit card, Apple Pay). You will not incur any fees as a result of the
        reimbursement.
      </p>

      <h2>6. Exceptions to the Right of Withdrawal</h2>
      <p>
        The right of withdrawal does not apply to (Article 3i of Law 2251/1994):
      </p>
      <ul>
        <li>Goods made to your specifications or clearly personalised (e.g. custom prints, name embroidery);</li>
        <li>Sealed Goods that are not suitable for return for hygiene reasons (e.g. underwear, swimwear) and have been unsealed after delivery;</li>
        <li>Goods which, after delivery, have become inseparably mixed with other items.</li>
      </ul>

      <h2>7. Defective or Non-Conforming Goods (Legal Guarantee)</h2>
      <p>
        Independently of the right of withdrawal, all Goods are covered by the statutory
        <strong> two-year guarantee of conformity</strong> under Greek Law 2251/1994 and EU
        Directive 2019/771. If your Goods arrive damaged, defective or not as described,
        contact us at <a href="mailto:allcityclo@gmail.com">allcityclo@gmail.com</a> with photos
        and your order number within two months from discovery. You are entitled — free of charge — to:
      </p>
      <ol>
        <li>repair or replacement (your choice, unless impossible or disproportionate); or</li>
        <li>a proportionate price reduction; or</li>
        <li>termination of the Contract and a full refund, if the defect is not minor.</li>
      </ol>
      <p>In such cases the return shipping is paid by us.</p>

      <h2>8. Model Withdrawal Form</h2>
      <p>
        You may copy and send the following form to{' '}
        <a href="mailto:allcityclo@gmail.com">allcityclo@gmail.com</a> (this is the model
        withdrawal form set out in Annex I(B) to Directive 2011/83/EU and Annex of Law
        2251/1994):
      </p>
      <div className="callout">
        <p>To: ALLCITY Clothing — allcityclo@gmail.com</p>
        <p>
          I/We (*) hereby give notice that I/We (*) withdraw from my/our (*) contract of sale of
          the following goods (*):
        </p>
        <p>______________________________________________</p>
        <p>Ordered on (*) / received on (*): _______________</p>
        <p>Order number: __________________________________</p>
        <p>Name of consumer(s): ____________________________</p>
        <p>Address of consumer(s): _________________________</p>
        <p>IBAN for refund: _______________________________</p>
        <p>Signature (only if this form is notified on paper): _____________</p>
        <p>Date: _________________________________________</p>
        <p>(*) Delete as appropriate.</p>
      </div>

      <h2>9. Out-of-Stock or Cancelled Orders</h2>
      <p>
        If we are unable to fulfil your Order (e.g. stock unavailable), we will inform you as
        soon as possible and refund all amounts paid within 14 days, using the same means of
        payment.
      </p>

      <h2>10. Disputes</h2>
      <p>
        If you are not satisfied with how we have handled a return, you may contact the
        Hellenic Consumer Ombudsman (<a href="https://www.synigoroskatanaloti.gr" target="_blank" rel="noreferrer">www.synigoroskatanaloti.gr</a>)
        or use the European Online Dispute Resolution platform at{' '}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer">ec.europa.eu/consumers/odr</a>.
      </p>

      <h2>11. Contact</h2>
      <p>
        For any return question, email{' '}
        <a href="mailto:allcityclo@gmail.com">allcityclo@gmail.com</a>. We aim to respond within
        one working day.
      </p>
    </>
  );
}

function EL() {
  return (
    <>
      <div className="callout callout-red">
        Η παρούσα Πολιτική εφαρμόζει τα νόμιμα δικαιώματά σας υπό τα αρ. 3ε–3θ του Ν. 2251/1994
        (μεταφορά Οδηγίας 2011/83/ΕΕ) και τη νόμιμη εγγύηση συμμόρφωσης υπό τα αρ. 5–5α του
        Ν. 2251/1994 και την Οδηγία (ΕΕ) 2019/771. Κανένα σημείο της Πολιτικής δεν επηρεάζει τα
        αναγκαστικού δικαίου δικαιώματά σας ως καταναλωτή.
      </div>

      <h2>1. Δικαίωμα Υπαναχώρησης (14 ημέρες)</h2>
      <p>
        Ως καταναλωτής έχετε το δικαίωμα να υπαναχωρήσετε από την αγορά σας εντός
        <strong> δεκατεσσάρων (14) ημερολογιακών ημερών</strong> από την ημέρα που εσείς (ή
        τρίτος εκτός του μεταφορέα) παραλάβατε φυσικά τα Προϊόντα, χωρίς αιτιολογία.
      </p>
      <p>
        Πρέπει να μας ενημερώσετε με σαφή δήλωση (π.χ. email) πριν τη λήξη της προθεσμίας.
        Μπορείτε να χρησιμοποιήσετε το υπόδειγμα στην ενότητα 8, χωρίς όμως να είναι υποχρεωτικό.
      </p>

      <h2>2. Διαδικασία Υπαναχώρησης</h2>
      <ol>
        <li>
          Στείλτε email στο <a href="mailto:allcityclo@gmail.com">allcityclo@gmail.com</a> με
          το όνομά σας, αριθμό παραγγελίας, τα προϊόντα προς επιστροφή και το IBAN σας.
        </li>
        <li>Θα απαντήσουμε εντός 48 ωρών με οδηγίες και διεύθυνση αποστολής.</li>
        <li>
          Αποστείλατε τα Προϊόντα χωρίς αδικαιολόγητη καθυστέρηση και σε κάθε περίπτωση εντός
          <strong> δεκατεσσάρων (14) ημερών</strong> από την ημέρα γνωστοποίησης της
          υπαναχώρησης. Η προθεσμία τηρείται αν αποστείλετε τα Προϊόντα εμπρόθεσμα.
        </li>
      </ol>

      <h2>3. Κατάσταση Προϊόντων</h2>
      <p>
        Τα Προϊόντα πρέπει να επιστραφούν <strong>αμεταχείριστα, αφόρετα, άπλυτα και στην
        αρχική τους κατάσταση</strong>, με όλες τις ετικέτες και κατά προτίμηση στην αρχική
        συσκευασία. Φέρετε ευθύνη μόνο για τη μείωση αξίας που οφείλεται σε χειρισμό πέραν του
        αναγκαίου για διαπίστωση φύσης, χαρακτηριστικών και λειτουργίας. Δηλαδή μπορείτε να
        δοκιμάσετε το ένδυμα όπως θα κάνατε σε φυσικό κατάστημα· αν προχωρήσετε περαιτέρω (π.χ.
        αφαίρεση ετικετών, χρήση εκτός σπιτιού, πλύσιμο) μπορούμε να αφαιρέσουμε εύλογο ποσό
        από την επιστροφή χρημάτων αντίστοιχο της απώλειας αξίας.
      </p>

      <h2>4. Κόστος Επιστροφής</h2>
      <p>
        Το <strong>άμεσο κόστος επιστροφής</strong> βαρύνει εσάς, εκτός αν η επιστροφή οφείλεται
        σε ελάττωμα, μη συμμόρφωση ή δικό μας σφάλμα (λάθος προϊόν/μέγεθος), οπότε το αναλαμβάνουμε
        εμείς. Συνιστούμε υπηρεσία με tracking· δεν φέρουμε ευθύνη για απώλεια κατά τη μεταφορά
        προς εμάς.
      </p>

      <h2>5. Επιστροφή Χρημάτων</h2>
      <p>
        Θα επιστρέψουμε όλα τα χρήματα που έχουμε λάβει από εσάς, συμπεριλαμβανομένου του
        κόστους τυπικής αποστολής (όχι του επιπλέον κόστους τυχόν ακριβότερης μεθόδου που
        επιλέξατε), <strong>χωρίς αδικαιολόγητη καθυστέρηση και το αργότερο εντός δεκατεσσάρων
        (14) ημερών</strong> από την ημέρα γνωστοποίησης της υπαναχώρησης. Μπορούμε όμως να
        παρακρατήσουμε την επιστροφή έως ότου λάβουμε πίσω τα Προϊόντα ή αποδείξετε την αποστολή
        τους, όποιο συμβεί πρώτο.
      </p>
      <p>
        Η επιστροφή γίνεται με το ίδιο μέσο πληρωμής που χρησιμοποιήσατε (π.χ. κάρτα, Apple Pay),
        χωρίς καμία χρέωση για εσάς.
      </p>

      <h2>6. Εξαιρέσεις</h2>
      <p>Το δικαίωμα υπαναχώρησης δεν εφαρμόζεται (αρ. 3θ Ν. 2251/1994) σε:</p>
      <ul>
        <li>Προϊόντα κατασκευασμένα σύμφωνα με τις προδιαγραφές σας ή σαφώς εξατομικευμένα (π.χ. custom prints, κεντήματα ονόματος)·</li>
        <li>Σφραγισμένα προϊόντα ακατάλληλα για επιστροφή για λόγους υγιεινής (π.χ. εσώρουχα, μαγιό) που αποσφραγίστηκαν μετά την παράδοση·</li>
        <li>Προϊόντα που έχουν αναμειχθεί αδιαχώριστα με άλλα είδη μετά την παράδοση.</li>
      </ul>

      <h2>7. Ελαττωματικά ή Μη Συμμορφωμένα Προϊόντα</h2>
      <p>
        Ανεξάρτητα από το δικαίωμα υπαναχώρησης, όλα τα Προϊόντα καλύπτονται από
        <strong> διετή νόμιμη εγγύηση συμμόρφωσης</strong> (Ν. 2251/1994, Οδηγία (ΕΕ) 2019/771).
        Αν παραλάβετε ελαττωματικό ή μη συμμορφωμένο προϊόν, επικοινωνήστε στο{' '}
        <a href="mailto:allcityclo@gmail.com">allcityclo@gmail.com</a> με φωτογραφίες και τον
        αριθμό παραγγελίας εντός δύο μηνών από τη διαπίστωση. Δικαιούστε — χωρίς επιβάρυνση —:
      </p>
      <ol>
        <li>επισκευή ή αντικατάσταση (κατ' επιλογή σας, εκτός αν είναι αδύνατο ή δυσανάλογο)·</li>
        <li>ανάλογη μείωση τιμής· ή</li>
        <li>υπαναχώρηση και πλήρη επιστροφή χρημάτων, εφόσον το ελάττωμα δεν είναι ασήμαντο.</li>
      </ol>
      <p>Στις περιπτώσεις αυτές τα έξοδα επιστροφής βαρύνουν εμάς.</p>

      <h2>8. Υπόδειγμα Εντύπου Υπαναχώρησης</h2>
      <p>
        Μπορείτε να αντιγράψετε και να αποστείλετε το παρακάτω έντυπο στο{' '}
        <a href="mailto:allcityclo@gmail.com">allcityclo@gmail.com</a> (υπόδειγμα Παραρτήματος
        I(Β) της Οδηγίας 2011/83/ΕΕ και του Παραρτήματος του Ν. 2251/1994):
      </p>
      <div className="callout">
        <p>Προς: ALLCITY Clothing — allcityclo@gmail.com</p>
        <p>
          Με το παρόν δηλώνω/δηλώνουμε (*) ότι υπαναχωρώ/υπαναχωρούμε (*) από τη σύμβαση
          πώλησης των κάτωθι αγαθών (*):
        </p>
        <p>______________________________________________</p>
        <p>Παραγγέλθηκαν (*) / παρελήφθησαν (*) στις: _______________</p>
        <p>Αριθμός παραγγελίας: ___________________________</p>
        <p>Ονοματεπώνυμο καταναλωτή/ών: ____________________</p>
        <p>Διεύθυνση καταναλωτή/ών: ________________________</p>
        <p>IBAN για επιστροφή: _____________________________</p>
        <p>Υπογραφή (μόνο σε έντυπη μορφή): _________________</p>
        <p>Ημερομηνία: ____________________________________</p>
        <p>(*) Διαγράψτε ό,τι δεν ισχύει.</p>
      </div>

      <h2>9. Παραγγελίες Εκτός Αποθέματος</h2>
      <p>
        Εάν δεν μπορούμε να εκτελέσουμε την παραγγελία σας (π.χ. εξάντληση αποθέματος), θα σας
        ενημερώσουμε άμεσα και θα επιστρέψουμε όλα τα ποσά εντός 14 ημερών, με το ίδιο μέσο
        πληρωμής.
      </p>

      <h2>10. Διαφορές</h2>
      <p>
        Σε περίπτωση διαφωνίας, μπορείτε να απευθυνθείτε στον Συνήγορο του Καταναλωτή{' '}
        (<a href="https://www.synigoroskatanaloti.gr" target="_blank" rel="noreferrer">www.synigoroskatanaloti.gr</a>)
        ή στην πλατφόρμα ΗΕΔ της ΕΕ:{' '}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer">ec.europa.eu/consumers/odr</a>.
      </p>

      <h2>11. Επικοινωνία</h2>
      <p>
        Για κάθε ερώτηση: <a href="mailto:allcityclo@gmail.com">allcityclo@gmail.com</a>.
        Στόχος μας είναι η απάντηση εντός μίας εργάσιμης ημέρας.
      </p>
    </>
  );
}
