import { useLanguage } from "../../i18n";
import { PRIVACY_POLICY_VERSION } from "./policyVersions";
import { LegalPageLayout } from "./LegalPageLayout";

export function PrivacyPolicyPage() {
  const { t } = useLanguage();
  const p = t.legal.privacy;

  return (
    <LegalPageLayout title={p.pageTitle} version={PRIVACY_POLICY_VERSION}>
      <section>
        <h2 className="font-medium text-ink">{p.s1.heading}</h2>
        <p>
          {p.s1.before}{" "}
          <a className="text-brand underline" href="mailto:jinbochoapp@gmail.com">
            jinbochoapp@gmail.com
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="font-medium text-ink">{p.s2.heading}</h2>
        <ul className="list-inside list-disc space-y-1">
          {p.s2.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-medium text-ink">{p.s3.heading}</h2>
        <p>{p.s3.body}</p>
      </section>

      <section>
        <h2 className="font-medium text-ink">{p.s4.heading}</h2>
        <p>{p.s4.body}</p>
      </section>

      <section>
        <h2 className="font-medium text-ink">{p.s5.heading}</h2>
        <p>{p.s5.intro}</p>
        <ul className="list-inside list-disc space-y-1">
          {p.s5.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
          <li>{p.s5.aiItem}</li>
        </ul>
      </section>

      <section>
        <h2 className="font-medium text-ink">{p.s6.heading}</h2>
        <p>{p.s6.intro}</p>
        <ul className="list-inside list-disc space-y-1">
          {p.s6.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-medium text-ink">{p.s7.heading}</h2>
        <p>{p.s7.body}</p>
      </section>

      <section>
        <h2 className="font-medium text-ink">{p.s8.heading}</h2>
        <ul className="list-inside list-disc space-y-1">
          {p.s8.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-medium text-ink">{p.s9.heading}</h2>
        <p>
          <a className="text-brand underline" href="mailto:jinbochoapp@gmail.com">
            jinbochoapp@gmail.com
          </a>
        </p>
      </section>
    </LegalPageLayout>
  );
}
