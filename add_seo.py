import os
import glob

files = glob.glob('*.html')
head_injection = """
  <!-- SEO & OpenGraph Tags -->
  <meta name="robots" content="index, follow" />
  <meta name="author" content="UNITED SIKHS" />
  <meta property="og:title" content="UNITED SIKHS | Recognize the Human Race as One" />
  <meta property="og:description" content="UNITED SIKHS is a UN-affiliated international non-profit committed to empowering disadvantaged communities through humanitarian aid, civil rights advocacy, and community education." />
  <meta property="og:image" content="https://united-sikhs-demo-h67xak4rz-rahul-lalia.vercel.app/images/logo-lockup.png" />
  <meta property="og:url" content="https://united-sikhs-demo-h67xak4rz-rahul-lalia.vercel.app/" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="UNITED SIKHS | Recognize the Human Race as One" />
  <meta name="twitter:description" content="UNITED SIKHS is a UN-affiliated international non-profit committed to empowering disadvantaged communities." />
  <meta name="twitter:image" content="https://united-sikhs-demo-h67xak4rz-rahul-lalia.vercel.app/images/logo-lockup.png" />
"""

for f in files:
    with open(f, 'r') as fp:
        content = fp.read()
    if 'og:title' not in content:
        content = content.replace('</head>', head_injection + '</head>')
        with open(f, 'w') as fp:
            fp.write(content)
print("SEO tags added.")
