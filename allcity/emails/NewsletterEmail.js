import {
  Html, Head, Body, Container, Section,
  Text, Hr, Link, Preview,
} from '@react-email/components';

export function NewsletterEmail({ subject, bodyText, ctaText, ctaUrl, subscriberEmail }) {
  return (
    <Html>
      <Head />
      <Preview>{subject} · ALLCITY</Preview>
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

          {/* Content */}
          <Section style={content}>
            <Text style={tagline}>ALLCITY · Athens, GR</Text>
            <Text style={heading}>{subject}</Text>
            <Text style={paragraph}>{bodyText}</Text>
          </Section>

          {/* CTA */}
          {ctaText && ctaUrl && (
            <>
              <Hr style={divider} />
              <Section style={ctaSection}>
                <Link href={ctaUrl} style={ctaButton}>{ctaText} →</Link>
              </Section>
            </>
          )}

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>ALLCITY Clothing · Athens, GR · @allcity_clothing</Text>
            <Text style={footerText}>
              <Link
                href={`https://allcity-clothing.vercel.app/api/unsubscribe?email=${encodeURIComponent(subscriberEmail || '')}`}
                style={unsubLink}
              >
                Unsubscribe
              </Link>
            </Text>
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
const paragraph = { color: 'rgba(240,237,232,0.5)', fontSize: '13px', lineHeight: '1.8', margin: '0', whiteSpace: 'pre-line' };
const ctaSection = { padding: '24px 32px' };
const ctaButton = { backgroundColor: '#FF2200', color: '#080808', fontSize: '11px', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', padding: '14px 32px', display: 'inline-block' };
const footer = { padding: '24px 32px' };
const footerText = { color: 'rgba(240,237,232,0.2)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 8px' };
const unsubLink = { color: 'rgba(240,237,232,0.2)', textDecoration: 'underline' };
