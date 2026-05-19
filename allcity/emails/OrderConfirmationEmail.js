import {
  Html, Head, Body, Container, Section,
  Text, Hr, Link, Preview, Img,
} from '@react-email/components';

export function OrderConfirmationEmail({
  orderNumber,
  customerName,
  items = [],
  total,
  shippingAddress,
  boxnowLockerName,
  boxnowLockerAddress,
  siteUrl = 'https://allcity-clothing.vercel.app',
}) {
  return (
    <Html>
      <Head />
      <Preview>Order #{orderNumber} confirmed — ALLCITY Clothing</Preview>
      <Body style={body}>
        <Container style={container}>

          {/* ── Logo ── */}
          <Section style={header}>
            <table width="100%" cellPadding="0" cellSpacing="0"><tbody><tr>
              <td align="center">
                <Img src={`${siteUrl}/logo.png`} width="110" alt="ALLCITY" style={{ display: 'block', margin: '0 auto' }} />
              </td>
            </tr></tbody></table>
          </Section>

          {/* Red bar */}
          <div style={redBar} />

          {/* ── Hero ── */}
          <Section style={hero}>
            <Text style={tag}>Order Confirmed</Text>
            <Text style={heading}>Thanks, {customerName || 'fam'}.</Text>
            <Text style={orderNum}>Order <span style={{ color: '#FF2200' }}>#{orderNumber}</span></Text>
            <Text style={para}>We'll ship within 2 business days. You'll get a tracking update once your parcel is on its way.</Text>
          </Section>

          <Hr style={divider} />

          {/* ── Items ── */}
          <Section style={section}>
            <Text style={sectionLabel}>Your Order</Text>
            {items.map((item, i) => (
              <table key={i} width="100%" cellPadding="0" cellSpacing="0" style={{ marginBottom: '16px' }}><tbody><tr>
                {item.image && (
                  <td style={{ width: '68px', verticalAlign: 'top', paddingRight: '14px' }}>
                    <Img src={item.image} width="60" height="80" alt={item.name}
                      style={{ display: 'block', objectFit: 'cover', border: '1px solid #1a1a1a' }} />
                  </td>
                )}
                <td style={{ verticalAlign: 'top' }}>
                  <Text style={itemName}>{item.name}</Text>
                  <Text style={itemMeta}>{item.size} · Qty {item.qty}</Text>
                </td>
                <td style={{ verticalAlign: 'top', textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <Text style={itemPrice}>€{(item.price * item.qty).toFixed(2)}</Text>
                </td>
              </tr></tbody></table>
            ))}
            <Hr style={divider} />
            <table width="100%" cellPadding="0" cellSpacing="0" style={{ marginTop: '14px' }}><tbody><tr>
              <td><Text style={totalLabel}>TOTAL</Text></td>
              <td align="right"><Text style={totalAmount}>€{Number(total).toFixed(2)}</Text></td>
            </tr></tbody></table>
          </Section>

          <Hr style={divider} />

          {/* ── Delivery ── */}
          <Section style={section}>
            <Text style={sectionLabel}>Delivery</Text>
            {boxnowLockerName ? (
              <table width="100%" cellPadding="0" cellSpacing="0"
                style={{ border: '1px solid rgba(255,34,0,0.2)', backgroundColor: 'rgba(255,34,0,0.04)' }}>
                <tbody><tr>
                  <td style={{ padding: '16px', verticalAlign: 'top', width: '36px', fontSize: '22px' }}>📦</td>
                  <td style={{ padding: '16px 16px 16px 0' }}>
                    <Text style={{ color: '#F0EDE8', fontSize: '13px', fontWeight: '600', margin: '0 0 3px' }}>{boxnowLockerName}</Text>
                    {boxnowLockerAddress && <Text style={{ color: 'rgba(240,237,232,0.4)', fontSize: '11px', margin: '0 0 6px' }}>{boxnowLockerAddress}</Text>}
                    <Text style={{ color: 'rgba(240,237,232,0.3)', fontSize: '11px', margin: '0', lineHeight: '1.5' }}>We'll notify you when your parcel is ready for pickup.</Text>
                  </td>
                </tr></tbody>
              </table>
            ) : shippingAddress ? (
              <Text style={para}>{shippingAddress}</Text>
            ) : null}
          </Section>

          <Hr style={divider} />

          {/* ── Tagline ── */}
          <Section style={{ padding: '20px 32px' }}>
            <Text style={{ color: 'rgba(240,237,232,0.07)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0', textAlign: 'center' }}>
              HOOD CONTROLLING. F*CK THE GAME.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* ── Footer ── */}
          <Section style={{ padding: '20px 32px 28px' }}>
            <table width="100%" cellPadding="0" cellSpacing="0"><tbody><tr>
              <td align="center">
                <Link href="https://instagram.com/allcity_clothing" style={footerLink}>@allcity_clothing</Link>
                <span style={{ color: 'rgba(240,237,232,0.2)', fontSize: '12px' }}> · </span>
                <Link href="mailto:allcityclo@gmail.com" style={footerLink}>allcityclo@gmail.com</Link>
              </td>
            </tr></tbody></table>
            <Text style={{ color: 'rgba(240,237,232,0.15)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '10px 0 0', textAlign: 'center' }}>
              ALLCITY Clothing · Athens, GR
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

const body       = { backgroundColor: '#080808', margin: '0', padding: '20px 0', fontFamily: '"Courier New", Courier, monospace' };
const container  = { backgroundColor: '#080808', border: '1px solid #1a1a1a', margin: '0 auto', maxWidth: '520px' };
const header     = { padding: '36px 32px 28px' };
const redBar     = { height: '3px', backgroundColor: '#FF2200' };
const hero       = { padding: '32px 32px 24px' };
const tag        = { color: '#FF2200', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 12px' };
const heading    = { color: '#F0EDE8', fontSize: '30px', fontWeight: '700', margin: '0 0 6px', letterSpacing: '-0.5px' };
const orderNum   = { color: 'rgba(240,237,232,0.35)', fontSize: '13px', margin: '0 0 16px' };
const para       = { color: 'rgba(240,237,232,0.5)', fontSize: '13px', lineHeight: '1.7', margin: '0' };
const divider    = { borderColor: '#1a1a1a', margin: '0' };
const section    = { padding: '28px 32px' };
const sectionLabel = { color: 'rgba(240,237,232,0.25)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 18px' };
const itemName   = { color: '#F0EDE8', fontSize: '13px', fontWeight: '600', margin: '0 0 4px' };
const itemMeta   = { color: 'rgba(240,237,232,0.35)', fontSize: '11px', margin: '0' };
const itemPrice  = { color: '#F0EDE8', fontSize: '13px', margin: '0' };
const totalLabel = { color: 'rgba(240,237,232,0.3)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0' };
const totalAmount = { color: '#FF2200', fontSize: '22px', fontWeight: '700', margin: '0' };
const footerLink = { color: 'rgba(240,237,232,0.4)', fontSize: '12px', textDecoration: 'none' };
