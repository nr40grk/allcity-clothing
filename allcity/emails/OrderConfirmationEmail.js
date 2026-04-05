import {
  Html, Head, Body, Container, Section,
  Text, Hr, Link, Preview, Row, Column,
} from '@react-email/components';

export function OrderConfirmationEmail({ orderNumber, customerName, items = [], total, shippingAddress }) {
  return (
    <Html>
      <Head />
      <Preview>Order confirmed — #{orderNumber} · ALLCITY</Preview>
      <Body style={body}>
        <Container style={container}>

          {/* Header */}
          <Section style={header}>
            <table width="100%" cellPadding="0" cellSpacing="0">
              <tr>
                <td style={redBox}><Text style={logoText}>AC</Text></td>
                <td style={logoNameCell}><Text style={logoName}>ALL{'\n'}CITY</Text></td>
              </tr>
            </table>
          </Section>

          <Hr style={divider} />

          {/* Confirmation */}
          <Section style={content}>
            <Text style={tagline}>Order Confirmed</Text>
            <Text style={heading}>Thanks, {customerName || 'fam'}.</Text>
            <Text style={paragraph}>
              Your order <strong style={{ color: '#FF2200' }}>#{orderNumber}</strong> is confirmed.
              We'll ship within 2 business days and send you a tracking update.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Order items */}
          <Section style={content}>
            <Text style={sectionLabel}>Your Order</Text>
            {items.map((item, i) => (
              <Row key={i} style={itemRow}>
                <Column style={itemName}>
                  <Text style={itemText}>{item.name}</Text>
                  <Text style={itemMeta}>{item.size} × {item.qty}</Text>
                </Column>
                <Column style={itemPrice}>
                  <Text style={itemText}>€{(item.price * item.qty).toFixed(2)}</Text>
                </Column>
              </Row>
            ))}
            <Hr style={divider} />
            <Row style={totalRow}>
              <Column><Text style={totalLabel}>TOTAL</Text></Column>
              <Column style={itemPrice}><Text style={totalAmount}>€{Number(total).toFixed(2)}</Text></Column>
            </Row>
          </Section>

          {/* Shipping */}
          {shippingAddress && (
            <>
              <Hr style={divider} />
              <Section style={content}>
                <Text style={sectionLabel}>Shipping To</Text>
                <Text style={paragraph}>{shippingAddress}</Text>
              </Section>
            </>
          )}

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={paragraph}>
              Questions? DM us{' '}
              <Link href="https://instagram.com/allcity_clothing" style={redLink}>@allcity_clothing</Link>
              {' '}or email{' '}
              <Link href="mailto:allcity.clothing@gmail.com" style={redLink}>allcity.clothing@gmail.com</Link>
            </Text>
            <Text style={footerText}>ALLCITY Clothing · Athens, GR</Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

const body = { backgroundColor: '#080808', margin: '0', padding: '0', fontFamily: '"Courier New", Courier, monospace' };
const container = { backgroundColor: '#080808', border: '1px solid #1a1a1a', margin: '40px auto', padding: '0', maxWidth: '520px' };
const header = { padding: '32px 32px 24px' };
const redBox = { backgroundColor: '#FF2200', width: '48px', height: '48px', verticalAlign: 'middle', textAlign: 'center' };
const logoText = { color: '#080808', fontSize: '16px', fontWeight: '900', margin: '0', lineHeight: '48px' };
const logoNameCell = { paddingLeft: '12px', verticalAlign: 'middle' };
const logoName = { color: '#F0EDE8', fontSize: '20px', fontWeight: '900', margin: '0', lineHeight: '1', letterSpacing: '-1px', whiteSpace: 'pre' };
const divider = { borderColor: '#1a1a1a', margin: '0' };
const content = { padding: '32px' };
const tagline = { color: '#FF2200', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 12px' };
const heading = { color: '#F0EDE8', fontSize: '28px', fontWeight: '700', margin: '0 0 16px' };
const paragraph = { color: 'rgba(240,237,232,0.5)', fontSize: '13px', lineHeight: '1.7', margin: '0 0 8px' };
const sectionLabel = { color: 'rgba(240,237,232,0.3)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 16px' };
const itemRow = { marginBottom: '8px' };
const itemName = { width: '70%' };
const itemPrice = { width: '30%', textAlign: 'right' };
const itemText = { color: '#F0EDE8', fontSize: '13px', margin: '0' };
const itemMeta = { color: 'rgba(240,237,232,0.3)', fontSize: '11px', margin: '2px 0 0' };
const totalRow = { marginTop: '12px' };
const totalLabel = { color: 'rgba(240,237,232,0.4)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0' };
const totalAmount = { color: '#FF2200', fontSize: '20px', fontWeight: '700', margin: '0', textAlign: 'right' };
const footer = { padding: '24px 32px' };
const footerText = { color: 'rgba(240,237,232,0.2)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '8px 0 0' };
const redLink = { color: '#FF2200', textDecoration: 'none' };
