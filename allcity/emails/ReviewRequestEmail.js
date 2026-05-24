import {
  Html, Head, Body, Container, Section,
  Text, Hr, Link, Preview, Img,
} from '@react-email/components';

export function ReviewRequestEmail({
  customerName,
  orderNumber,
  reviewLink,
  siteUrl = 'https://www.allcityclothing.com',
}) {
  return (
    <Html>
      <Head />
      <Preview>Tell us what you think — ALLCITY Clothing</Preview>
      <Body style={body}>
        <Container style={container}>

          <Section style={header}>
            <table width="100%" cellPadding="0" cellSpacing="0"><tbody><tr>
              <td align="center">
                <Img src={`${siteUrl}/logo.png`} width="110" alt="ALLCITY" style={{ display: 'block', margin: '0 auto' }} />
              </td>
            </tr></tbody></table>
          </Section>

          <div style={redBar} />

          <Section style={hero}>
            <Text style={tag}>How was it?</Text>
            <Text style={heading}>Hey {customerName || 'fam'},</Text>
            <Text style={para}>Your order <span style={{ color: '#FF2200' }}>#{orderNumber}</span> is on its way. We would love to hear what you think about your ALLCITY piece.</Text>
            <Text style={para}>Drop a quick review — it helps the crew and keeps the streetwear real.</Text>
          </Section>

          <Hr style={divider} />

          <Section style={section}>
            <table width="100%" cellPadding="0" cellSpacing="0"><tbody><tr>
              <td align="center" style={{ padding: '12px 0 24px' }}>
                <Link href={reviewLink} style={cta}>Write a Review</Link>
              </td>
            </tr></tbody></table>
            <Text style={{ color: 'rgba(240,237,232,0.25)', fontSize: '11px', textAlign: 'center', margin: '0' }}>
              Your review will be published automatically after submission.
            </Text>
          </Section>

          <Hr style={divider} />

          <Section style={{ padding: '20px 32px' }}>
            <Text style={{ color: 'rgba(240,237,232,0.07)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0', textAlign: 'center' }}>
              HOOD CONTROLLING. F*CK THE GAME.
            </Text>
          </Section>

          <Hr style={divider} />

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
const para       = { color: 'rgba(240,237,232,0.5)', fontSize: '13px', lineHeight: '1.7', margin: '0 0 12px' };
const divider    = { borderColor: '#1a1a1a', margin: '0' };
const section    = { padding: '28px 32px' };
const cta        = { display: 'inline-block', backgroundColor: '#FF2200', color: '#080808', fontSize: '12px', fontWeight: '600', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', padding: '14px 32px', borderRadius: '0' };
const footerLink = { color: 'rgba(240,237,232,0.4)', fontSize: '12px', textDecoration: 'none' };
